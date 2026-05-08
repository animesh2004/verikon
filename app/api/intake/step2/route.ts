import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  id?: string;
  choice?: "call" | "brief";
  problem?: string;
  outcome?: string;
  budget?: string;
  timeline?: string;
  website?: string;
  notes?: string;
  hp?: string;
};

const MAX_LEN = 5000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (clean(body.hp)) return NextResponse.json({ ok: true });

  const id = clean(body.id);
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const choice = body.choice === "call" || body.choice === "brief" ? body.choice : null;
  if (!choice) {
    return NextResponse.json({ ok: false, error: "Invalid choice" }, { status: 400 });
  }

  const update: Record<string, unknown> = {
    next_step_choice: choice,
    step_completed: 2,
  };

  if (choice === "brief") {
    const problem = clean(body.problem);
    if (!problem) {
      return NextResponse.json(
        { ok: false, error: "Project description is required" },
        { status: 400 }
      );
    }
    update.problem = problem;
    update.outcome = clean(body.outcome) || null;
    update.budget = clean(body.budget) || null;
    update.timeline = clean(body.timeline) || null;
    update.website = clean(body.website) || null;
    update.notes = clean(body.notes) || null;
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[intake/step2] Supabase not configured");
    return NextResponse.json(
      { ok: false, error: "Server is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const { error } = await supabase
    .from("intake_submissions")
    .update(update)
    .eq("id", id);

  if (error) {
    console.error("[intake/step2] update failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

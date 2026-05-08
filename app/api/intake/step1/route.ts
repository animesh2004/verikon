import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  hp?: string;
};

const REQUIRED = ["name", "email", "phone", "service"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_LEN = 500;

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

  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    service: clean(body.service),
  };

  const missing = REQUIRED.filter((k) => !data[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing: ${missing.join(", ")}` },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[intake/step1] Supabase not configured");
    return NextResponse.json(
      { ok: false, error: "Server is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const existingId = clean(body.id);
  const fields = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    project_type: data.service,
  };

  if (existingId && UUID_RE.test(existingId)) {
    const { error } = await supabase
      .from("intake_submissions")
      .update(fields)
      .eq("id", existingId);
    if (error) {
      console.error("[intake/step1] update failed", error);
      return NextResponse.json(
        { ok: false, error: "Could not save. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, id: existingId });
  }

  const { data: row, error } = await supabase
    .from("intake_submissions")
    .insert({ ...fields, step_completed: 1 })
    .select("id")
    .single();

  if (error) {
    console.error("[intake/step1] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: row.id });
}

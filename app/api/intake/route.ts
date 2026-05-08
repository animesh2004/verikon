import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  website?: string;
  projectType?: string;
  services?: string[];
  problem?: string;
  outcome?: string;
  automation?: string;
  tools?: string;
  timeline?: string;
  budget?: string;
  notes?: string;
  hp?: string;
};

const REQUIRED = ["name", "email", "company", "projectType", "problem"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 5000;

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

  if (clean(body.hp)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    company: clean(body.company),
    role: clean(body.role),
    website: clean(body.website),
    projectType: clean(body.projectType),
    services: Array.isArray(body.services) ? body.services.map(clean).filter(Boolean).slice(0, 20) : [],
    problem: clean(body.problem),
    outcome: clean(body.outcome),
    automation: clean(body.automation),
    tools: clean(body.tools),
    timeline: clean(body.timeline),
    budget: clean(body.budget),
    notes: clean(body.notes),
  };

  const missing = REQUIRED.filter((k) => !data[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, error: `Missing: ${missing.join(", ")}` }, { status: 400 });
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[intake] SUPABASE_URL or SUPABASE_SECRET_KEY missing");
    return NextResponse.json(
      { ok: false, error: "Server is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const { data: inserted, error } = await supabase
    .from("intake_submissions")
    .insert({
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role || null,
      website: data.website || null,
      project_type: data.projectType,
      services: data.services,
      problem: data.problem,
      outcome: data.outcome || null,
      automation: data.automation || null,
      tools: data.tools || null,
      timeline: data.timeline || null,
      budget: data.budget || null,
      notes: data.notes || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[intake] supabase insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save submission. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: inserted.id });
}

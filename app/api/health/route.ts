import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json({
      ok: false,
      error: "Supabase not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local",
      env: {
        url: !!process.env.SUPABASE_URL,
        key: !!process.env.SUPABASE_SECRET_KEY,
      }
    }, { status: 500 });
  }

  // Quick reachability test with a hard 5s timeout (AbortSignal.timeout, not the
  // non-existent `timeout` fetch option).
  try {
    const reachTest = await fetch(process.env.SUPABASE_URL + "/auth/v1/health", {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    if (!reachTest.ok && reachTest.status !== 401) {
      return NextResponse.json({
        ok: false,
        error: "Supabase host reachable but unhealthy",
        status: reachTest.status,
        supabaseUrl: process.env.SUPABASE_URL,
      }, { status: 502 });
    }
  } catch (fetchErr) {
    const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    const dnsFail = /ENOTFOUND|getaddrinfo|could not be resolved/i.test(msg);
    return NextResponse.json({
      ok: false,
      error: dnsFail
        ? "Supabase hostname does not resolve. The project may be deleted, paused, or the URL is wrong."
        : "Could not reach Supabase",
      details: msg,
      supabaseUrl: process.env.SUPABASE_URL,
    }, { status: 502 });
  }

  try {
    const { error } = await supabase
      .from("intake_submissions")
      .select("id")
      .limit(1);

    if (error) {
      const missingTable = error.code === "42P01" || /relation .* does not exist/i.test(error.message);
      return NextResponse.json({
        ok: false,
        error: missingTable
          ? "Connected to Supabase but the `intake_submissions` table is missing. Run the schema migration."
          : "Database query failed",
        details: error.message,
        code: error.code,
      }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: "Supabase reachable and `intake_submissions` table is accessible",
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: "Connection exception",
      message: e instanceof Error ? e.message : String(e),
    }, { status: 500 });
  }
}

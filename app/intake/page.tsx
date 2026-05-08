import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Start a project — Verikon",
  description:
    "Tell us about your project. A short discovery brief so we can reply within 24 hours with an honest take and a path forward.",
};

export default function IntakePage() {
  return (
    <main id="main" className="min-h-screen">
      <header className="border-b hairline">
        <div className="container-px mx-auto max-w-7xl py-6 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-bold tracking-tightest">
            Verikon
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-fg transition-colors duration-250"
          >
            Back to site
          </Link>
        </div>
      </header>

      <section className="container-px mx-auto max-w-4xl pt-16 md:pt-24 pb-10">
        <div className="text-xs font-medium tracking-widest text-accent uppercase tabular">
          Project intake
        </div>
        <h1 className="mt-4 font-display text-h1 font-bold tracking-tightest leading-[1.02] text-balance">
          Tell us the shape of the problem.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
          A short brief so we can come to the first call already understanding your goals,
          constraints, and where automation can do the heavy lifting. Five minutes — no fluff.
        </p>
        <p className="mt-4 text-sm text-muted">
          Prefer email?{" "}
          <a
            href="mailto:hello@verikon.ai"
            className="text-fg underline underline-offset-4 decoration-fg/30 hover:decoration-fg inline-flex items-center gap-1"
          >
            hello@verikon.ai <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </section>

      <section className="container-px mx-auto max-w-4xl pb-24 md:pb-32">
        <div className="rounded-3xl border hairline bg-surface p-6 sm:p-10 md:p-14">
          <IntakeForm />
        </div>
      </section>
    </main>
  );
}

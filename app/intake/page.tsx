import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Start a project — Verikon",
  description:
    "Share your vision. We'll come to the first call understanding your goals, constraints, and how AI can solve it.",
};

export default function IntakePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 left-0 size-[40rem] rounded-full bg-[#FF6B35]/20 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-40 right-0 size-[35rem] rounded-full bg-[#2563EB]/20 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 size-[25rem] rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <section className="container-px mx-auto max-w-4xl pt-16 md:pt-24 pb-10 relative">
          <div className="text-xs font-medium tracking-widest text-[#FF6B35] uppercase tabular">
            Project intake
          </div>
          <h1 className="mt-4 font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tightest leading-[0.95] text-balance text-white">
            Let's build <span className="text-[#FF6B35]">something</span> that matters.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#999999] max-w-2xl leading-relaxed">
            Share your vision and constraints. We'll come prepared to the first call with a deep understanding of your problem and a concrete path to an AI-native solution.
          </p>
          <p className="mt-4 text-sm text-[#999999]">
            Prefer email?{" "}
            <a
              href="mailto:hello@verikon.ai"
              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-[#FF6B35] hover:text-[#FF6B35] inline-flex items-center gap-1 transition-colors duration-250"
            >
              hello@verikon.ai <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </section>

        <section className="container-px mx-auto max-w-4xl pb-24 md:pb-32 relative">
          <div className="rounded-3xl border border-[#FF6B35] bg-gradient-to-br from-[#0f1012] to-[#0a0b0d] p-6 sm:p-10 md:p-14 shadow-[0_10px_40px_rgba(255,107,53,0.15)]">
            <IntakeForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

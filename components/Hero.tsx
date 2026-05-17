"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-44 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 size-[24rem] md:size-[32rem] lg:size-[40rem] rounded-full bg-[#FF6B35]/20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-0 size-[20rem] md:size-[28rem] lg:size-[35rem] rounded-full bg-[#2563EB]/20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 size-[16rem] md:size-[20rem] lg:size-[25rem] rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="container-px mx-auto max-w-7xl 2xl:max-w-screen-2xl relative">
        <motion.div
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-[#1a1a1a] bg-[#0f1012]/80 backdrop-blur px-3 py-1 text-xs text-[#999999]"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-[#FF6B35]/60 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#FF6B35]" />
          </span>
          AI-first digital solutions agency
        </motion.div>

        <motion.h1
          {...rise(0.05)}
          className="mt-6 sm:mt-8 font-display font-bold tracking-tightest text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl leading-[0.95] max-w-[16ch] text-white"
        >
          Build what{" "}
          <span className="text-[#FF6B35]">matters</span>,{" "}
          launch what works.
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-6 sm:mt-8 max-w-2xl 2xl:max-w-3xl text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#999999] leading-relaxed"
        >
          We partner with founders and teams to build AI-native products that solve real problems.
          From concept to production, we handle the complexity so you can focus on impact.
        </motion.p>

        <motion.div {...rise(0.2)} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/intake"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-250 cursor-pointer"
          >
            Start a project
            <ArrowUpRight
              className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/intake"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-[#1a1a1a] text-sm font-medium text-white hover:border-[#FF6B35] hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all duration-250 cursor-pointer"
          >
            <Calendar className="size-4" aria-hidden="true" />
            Book a session
          </Link>
        </motion.div>


        <motion.div
          {...rise(0.35)}
          className="mt-16 sm:mt-20 md:mt-24 flex flex-wrap items-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4"
          aria-label="Selected past collaborators"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#555555]">
            Trusted by teams at
          </span>
          {["Northwind", "Kite", "Ledger AI", "Arc", "Helios", "Lumen"].map((n) => (
            <span
              key={n}
              className="font-display text-[#666666] text-sm sm:text-base md:text-lg font-medium"
            >
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

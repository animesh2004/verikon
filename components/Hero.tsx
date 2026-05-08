"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative pt-36 md:pt-44 pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="container-px mx-auto max-w-7xl relative">
        <motion.div
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-xs text-muted"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500/60 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          AI-first digital solutions agency
        </motion.div>

        <motion.h1
          {...rise(0.05)}
          className="mt-8 font-display font-bold tracking-tightest text-display leading-[0.95] max-w-[16ch]"
        >
          Engineering{" "}
          <span className="text-ink-400">intelligent</span>{" "}
          digital ecosystems.
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed"
        >
          Verikon designs and engineers AI automation, machine learning systems, web platforms, and
          custom software that streamline operations and accelerate growth — built for performance
          and long-term scale.
        </motion.p>

        <motion.div {...rise(0.2)} className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink-950 text-white text-sm font-medium hover:bg-ink-800 transition-colors duration-250 cursor-pointer"
          >
            Start a project
            <ArrowUpRight
              className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full border hairline-strong text-sm font-medium text-fg hover:bg-surface-2 transition-colors duration-250 cursor-pointer"
          >
            See our work
          </a>
        </motion.div>

        <motion.div
          {...rise(0.35)}
          className="mt-24 flex flex-wrap items-center gap-x-10 gap-y-4"
          aria-label="Selected past collaborators"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-ink-400">
            Trusted by teams at
          </span>
          {["Northwind", "Kite", "Ledger AI", "Arc", "Helios", "Lumen"].map((n) => (
            <span
              key={n}
              className="font-display text-ink-600 text-base md:text-lg font-medium"
            >
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

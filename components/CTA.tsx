"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="py-28 md:py-32 border-t hairline">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-ink-950 text-ink-50 p-10 md:p-16 lg:p-20"
        >
          <div className="absolute inset-0 grid-bg opacity-[0.08]" aria-hidden="true" />
          <div
            className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-accent/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <h2 className="font-display font-bold tracking-tightest text-h1 leading-[1.02] text-balance">
              Let's build something intelligent together.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-ink-300 max-w-xl leading-relaxed">
              Tell us the shape of the problem. We'll reply within 24 hours with an honest take and a
              path forward.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:hello@verikon.ai"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink-50 text-ink-950 text-sm font-medium hover:bg-white transition-colors duration-250 cursor-pointer"
              >
                hello@verikon.ai
                <ArrowUpRight
                  className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors duration-250 cursor-pointer"
              >
                Book a 20-min intro
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

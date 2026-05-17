"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="py-20 sm:py-24 md:py-28 lg:py-32 2xl:py-40 border-t border-[#1a1a1a]">
      <div className="container-px mx-auto max-w-7xl 2xl:max-w-screen-2xl">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#0a0b0d] to-[#090A0C] text-white p-6 sm:p-10 md:p-16 lg:p-20 border border-[#1a1a1a]"
        >
          <div className="absolute inset-0 grid-bg opacity-[0.08]" aria-hidden="true" />
          <div
            className="absolute -top-32 -right-32 size-[20rem] md:size-[28rem] lg:size-[35rem] rounded-full bg-[#FF6B35]/25 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute -bottom-24 -left-24 size-[18rem] md:size-[24rem] lg:size-[30rem] rounded-full bg-[#2563EB]/20 blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl 2xl:max-w-4xl">
            <h2 className="font-display font-bold tracking-tightest text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.02] text-balance">
              Let's build something intelligent together.
            </h2>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[#AAAAAA] max-w-xl leading-relaxed">
              Tell us the shape of the problem. We'll reply within 24 hours with an honest take and a
              path forward.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
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
              <a
                href="mailto:hello@verikon.ai"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#333333] text-sm font-medium hover:border-[#FF6B35] hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all duration-250 cursor-pointer text-[#999999] hover:text-white"
              >
                hello@verikon.ai
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

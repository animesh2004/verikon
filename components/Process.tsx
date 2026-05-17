"use client";

import { motion, useReducedMotion } from "motion/react";
import Section from "./Section";

const steps = [
  { n: "01", t: "Discover", d: "We map your users, data, and constraints. Nothing gets built before we agree on what 'done' means." },
  { n: "02", t: "Architect", d: "Systems design, model selection, and an evaluation harness — so we know quality before we ship." },
  { n: "03", t: "Build", d: "Daily shipping into a staging environment. You review real software, not slide decks." },
  { n: "04", t: "Evolve", d: "Launch, measure, iterate. Optional retainer to keep the system learning from real users." },
];

export default function Process() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="process"
      eyebrow="Process"
      title="A simple, focused workflow."
      description="Four steps. No surprises. You always know what's happening and what's next."
    >
      <div className="relative">
        <div
          className="absolute -top-32 right-1/4 size-[32rem] rounded-full bg-[#FF6B35]/16 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-0 size-[28rem] rounded-full bg-[#2563EB]/14 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <ol role="list" className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[#1a1a1a] pt-6"
          >
            <div className="text-[#FF6B35] font-display text-sm font-medium tabular">{s.n}</div>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">{s.t}</h3>
            <p className="mt-3 text-[#999999] leading-relaxed">{s.d}</p>
          </motion.li>
        ))}
        </ol>
      </div>
    </Section>
  );
}

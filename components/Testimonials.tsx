"use client";

import { motion, useReducedMotion } from "motion/react";
import Section from "./Section";

const quotes = [
  {
    q: "Verikon shipped a working AI agent in six weeks that our previous vendor couldn't deliver in a year. The eval rigor showed in production.",
    a: "Mira Chen",
    r: "VP Product, Northwind Labs",
  },
  {
    q: "They treated our problem like founders, not contractors. The data pipeline they built still runs without intervention two years later.",
    a: "Daniel Osei",
    r: "CEO, Kite Health",
  },
  {
    q: "Rare combination of senior taste, real engineering, and calm communication. Every meeting moved the work forward.",
    a: "Priya Raman",
    r: "Head of Design, Ledger AI",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <Section
      eyebrow="Kind words"
      title="Teams we've built with."
      description="Unedited quotes from founders and product leaders we've partnered with."
    >
      <ul role="list" className="grid md:grid-cols-3 gap-6">
        {quotes.map((t, i) => (
          <motion.li
            key={t.a}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border hairline bg-surface p-8 flex flex-col"
          >
            <svg
              className="size-6 text-accent/80"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.17 6C4.87 6 3 7.87 3 10.17v7.66h7.66V10.17H6.83c0-1.28 1.06-2.34 2.34-2.34V6H7.17zm10 0c-2.3 0-4.17 1.87-4.17 4.17v7.66h7.66V10.17h-3.83c0-1.28 1.06-2.34 2.34-2.34V6h-2z" />
            </svg>
            <blockquote className="mt-5 text-[1.0625rem] leading-relaxed text-fg text-balance">
              "{t.q}"
            </blockquote>
            <footer className="mt-8 pt-6 border-t hairline">
              <div className="font-medium">{t.a}</div>
              <div className="text-sm text-muted">{t.r}</div>
            </footer>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

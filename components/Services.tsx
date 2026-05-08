"use client";

import { motion, useReducedMotion } from "motion/react";
import { Brain, Database, Code2, Palette, Boxes, Plug } from "lucide-react";
import Section from "./Section";

const services = [
  {
    icon: Brain,
    title: "AI Automation & Machine Learning",
    body: "Production-grade ML pipelines, LLM workflows, and intelligent automation that move real business metrics.",
    cases: ["Agents", "RAG", "Forecasting"],
  },
  {
    icon: Database,
    title: "Web Scraping & Data Labeling",
    body: "High-throughput collection, cleaning, and human-in-the-loop labeling — the fuel layer for any ML system.",
    cases: ["Crawlers", "Pipelines", "Annotation"],
  },
  {
    icon: Code2,
    title: "Web & App Development",
    body: "Modern, fast, accessible web and mobile apps. Next.js, React Native, and a production foundation that scales.",
    cases: ["SaaS", "Mobile", "Marketing sites"],
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    body: "Interfaces worth paying for. Research-backed flows and design systems that scale across every surface.",
    cases: ["Design systems", "UX research", "Brand"],
  },
  {
    icon: Boxes,
    title: "SaaS & Custom Software",
    body: "Zero-to-one product builds and bespoke internal tools. Typed end-to-end, observable, ready for scale.",
    cases: ["MVPs", "Internal tools", "Platforms"],
  },
  {
    icon: Plug,
    title: "API Integrations & Intelligent Systems",
    body: "Stitching the stack: payments, CRM, data, and AI into reliable systems that just work in production.",
    cases: ["Integrations", "Webhooks", "Workflow"],
  },
];

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="The full stack — engineered intelligently."
      description="Six capabilities, one pod. Pick what you need; we'll bring the rest."
    >
      <ul
        role="list"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border hairline rounded-3xl overflow-hidden"
      >
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-surface p-8 md:p-10 flex flex-col transition-colors duration-250 hover:bg-surface-2"
          >
            <div className="inline-flex items-center justify-center size-10 rounded-xl bg-surface-2 group-hover:bg-bg transition-colors duration-250">
              <s.icon className="size-5 text-fg" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
            <ul className="mt-auto pt-6 flex flex-wrap gap-2" role="list">
              {s.cases.map((c) => (
                <li
                  key={c}
                  className="text-xs text-ink-600 border hairline rounded-full px-2.5 py-1 bg-bg"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

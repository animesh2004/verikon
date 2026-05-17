"use client";

import { motion, useReducedMotion } from "motion/react";
import { Brain, Zap, Code2, Boxes, Plug, MessageSquare } from "lucide-react";
import Section from "./Section";

const services = [
  {
    icon: Brain,
    title: "AI Agents & Autonomous Systems",
    body: "LLM-powered agents, agentic workflows, and autonomous systems that handle complex tasks end-to-end.",
    cases: ["Agents", "Workflows", "Automation"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    body: "Custom AI chatbots that engage customers, answer questions, and convert leads — built on the latest LLMs.",
    cases: ["Support", "Sales", "Conversational AI"],
  },
  {
    icon: Zap,
    title: "Edge AI & Embedded Models",
    body: "Deploy ML models at the edge. Fast inference, privacy-first, no cloud dependency — intelligence where it matters.",
    cases: ["On-device", "Real-time", "Privacy-first"],
  },
  {
    icon: Code2,
    title: "Web & App Development",
    body: "Modern, fast, accessible web and mobile apps. Next.js, React Native, and a production foundation that scales.",
    cases: ["SaaS", "Mobile", "Platforms"],
  },
  {
    icon: Boxes,
    title: "Full-Stack AI Products",
    body: "Zero-to-one AI product builds. Backend, frontend, model serving, and ops — fully integrated and production-ready.",
    cases: ["MVPs", "AI Products", "ML Ops"],
  },
  {
    icon: Plug,
    title: "AI Strategy & Technical Leadership",
    body: "Part advisor, part builder. We help define your AI strategy, architect your systems, and execute with precision.",
    cases: ["Strategy", "Architecture", "Hands-on"],
  },
];

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What we do."
      description="Six core capabilities built around shipping AI products that work."
    >
      <div className="relative">
        <div
          className="absolute -top-40 -right-20 size-[40rem] rounded-full bg-[#FF6B35]/18 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-32 size-[35rem] rounded-full bg-[#2563EB]/15 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <ul
          role="list"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-3xl overflow-hidden relative"
        >
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-[#0f1012] p-8 md:p-10 flex flex-col transition-all duration-250 hover:border-[#FF6B35] border border-[#1a1a1a] hover:shadow-[0_10px_40px_rgba(255,107,53,0.15)]"
          >
            <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#1a1a1a] group-hover:bg-[#FF6B35]/20 transition-colors duration-250">
              <s.icon className="size-5 text-[#FF6B35]" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{s.title}</h3>
            <p className="mt-3 text-[#999999] leading-relaxed">{s.body}</p>
            <ul className="mt-auto pt-6 flex flex-wrap gap-2" role="list">
              {s.cases.map((c) => (
                <li
                  key={c}
                  className="text-xs text-[#666666] border border-[#1a1a1a] rounded-full px-2.5 py-1 bg-[#0a0b0d]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
      </div>
    </Section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";

type Project = {
  name: string;
  category: string;
  blurb: string;
  result: string;
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1000&h=750&q=80&auto=format&fit=crop`;

const projects: Project[] = [
  {
    name: "NeuroDesk",
    category: "AI Agents",
    blurb: "AI support agent for a B2B SaaS — triages, drafts, and resolves tickets end-to-end.",
    result: "Avg. response 4h → 90s, 62% auto-resolution.",
    image: img("1518770660439-4636190af475"),
  },
  {
    name: "PulseRank",
    category: "ML Systems",
    blurb: "ML lead-scoring engine plugged into a fintech CRM, retrained nightly on closed-loop data.",
    result: "3.2× SQL-to-customer conversion in 90 days.",
    image: img("1551288049-bebda4e38f71"),
  },
  {
    name: "Lumen Books",
    category: "Web Dev",
    blurb: "Headless commerce platform on Next.js with edge-rendered catalog.",
    result: "P75 LCP 140ms; +28% conversion at launch.",
    image: img("1531297484001-80022131f5a1"),
  },
  {
    name: "Glide Health",
    category: "SaaS",
    blurb: "HIPAA-compliant patient SaaS — care plans, messaging, and outcome tracking.",
    result: "0-to-MVP in 11 weeks, 9 health systems on board.",
    image: img("1576091160399-112ba8d25d1d"),
  },
  {
    name: "Forge Logistics",
    category: "SaaS",
    blurb: "Multi-tenant fleet management platform with route optimization.",
    result: "Live in 9 cities; 18% cost-per-delivery reduction.",
    image: img("1586528116311-ad8dd3c8310d"),
  },
  {
    name: "Sage Inbox",
    category: "AI Systems",
    blurb: "Email AI that triages, drafts, and routes mail across 4 connected tools.",
    result: "12K msgs/day handled; 38% deflected from human review.",
    image: img("1555066931-4365d14bab8c"),
  },
];

export default function CaseStudies() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Recent projects."
      description="A selection of what we've shipped. Each built for speed, scale, and real-world impact."
    >
      <div className="relative">
        <div
          className="absolute top-20 -left-20 size-[40rem] rounded-full bg-[#2563EB]/16 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -right-32 size-[38rem] rounded-full bg-[#FF6B35]/14 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-3 relative"
        >
          {projects.map((p, i) => (
            <motion.li
              key={p.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#"
                className="group block h-full rounded-3xl border border-[#1a1a1a] overflow-hidden bg-[#0f1012] transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-0.5 hover:border-[#FF6B35] hover:shadow-[0_10px_40px_rgba(255,107,53,0.15)]"
                aria-label={`${p.name} — read full case study`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                        {p.category}
                      </div>
                      <div className="mt-2 font-display text-xl md:text-2xl font-semibold tracking-tight text-white">
                        {p.name}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-white/80">{p.blurb}</p>
                      <p className="text-sm font-medium text-[#FF6B35]">{p.result}</p>
                    </div>
                    <ArrowUpRight
                      className="size-5 text-[#FF6B35] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 self-end"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

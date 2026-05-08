"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";

type Project = {
  name: string;
  blurb: string;
  result: string;
  image: string;
};

type Group = {
  category: string;
  projects: Project[];
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1000&h=750&q=80&auto=format&fit=crop`;

const groups: Group[] = [
  {
    category: "AI Automation & Machine Learning",
    projects: [
      {
        name: "NeuroDesk",
        blurb: "AI support agent for a B2B SaaS — triages, drafts, and resolves tickets end-to-end.",
        result: "Avg. response 4h → 90s, 62% auto-resolution.",
        image: img("1518770660439-4636190af475"),
      },
      {
        name: "PulseRank",
        blurb: "ML lead-scoring engine plugged into a fintech CRM, retrained nightly on closed-loop data.",
        result: "3.2× SQL-to-customer conversion in 90 days.",
        image: img("1551288049-bebda4e38f71"),
      },
      {
        name: "OrchestraOps",
        blurb: "Anomaly detection across CI/CD logs with auto-remediation runbooks.",
        result: "78% fewer pipeline failures, 4× faster MTTR.",
        image: img("1517694712202-14dd9538aa97"),
      },
    ],
  },
  {
    category: "Web Scraping & Data Labeling",
    projects: [
      {
        name: "HarvestGrid",
        blurb: "Distributed scraping pipeline for an e-commerce intelligence client.",
        result: "12M pages/day at 99.6% success rate.",
        image: img("1558494949-ef010cbdcc31"),
      },
      {
        name: "LabelForge",
        blurb: "In-house annotation platform with three-tier QA and active-learning loop.",
        result: "99.4% inter-annotator agreement on vision tasks.",
        image: img("1542744173-8e7e53415bb0"),
      },
      {
        name: "MarketPulse",
        blurb: "Real-time competitor pricing dataset feeding a retail dynamic-pricing engine.",
        result: "Refresh latency cut from 6h to 90s.",
        image: img("1593642632559-0c6d3fc62b89"),
      },
    ],
  },
  {
    category: "Web & App Development",
    projects: [
      {
        name: "Lumen Books",
        blurb: "Headless commerce platform on Next.js with edge-rendered catalog.",
        result: "P75 LCP 140ms; +28% conversion at launch.",
        image: img("1531297484001-80022131f5a1"),
      },
      {
        name: "Tide Tracker",
        blurb: "React Native fitness app with offline-first sync and HealthKit integration.",
        result: "4.8★ App Store · 220K downloads in 6 months.",
        image: img("1512941937669-90a1b58e7e9c"),
      },
      {
        name: "Helios Console",
        blurb: "Internal admin tool for an energy operator, replacing a 12-year-old desktop app.",
        result: "Ops time cut 60%; 100% staff adoption in 4 weeks.",
        image: img("1504384308090-c894fdcc538d"),
      },
    ],
  },
  {
    category: "UI/UX & Product Design",
    projects: [
      {
        name: "Plume Banking",
        blurb: "Mobile banking redesign — onboarding, transfers, and a calmer account hub.",
        result: "2.4× weekly active, -55% support volume.",
        image: img("1556742049-0cfed4f6a45d"),
      },
      {
        name: "Atlas Studio",
        blurb: "Design system for a 60-person product org, tokens-to-Figma-to-code pipeline.",
        result: "Design-dev handoff time -70%.",
        image: img("1542831371-29b0f74f9713"),
      },
      {
        name: "Coreline IDE",
        blurb: "Reimagined onboarding and command surface for a developer IDE.",
        result: "Time-to-first-commit -55% for new users.",
        image: img("1551434678-e076c223a692"),
      },
    ],
  },
  {
    category: "SaaS & Custom Software",
    projects: [
      {
        name: "Glide Health",
        blurb: "HIPAA-compliant patient SaaS — care plans, messaging, and outcome tracking.",
        result: "0-to-MVP in 11 weeks, 9 health systems on board.",
        image: img("1576091160399-112ba8d25d1d"),
      },
      {
        name: "Forge Logistics",
        blurb: "Multi-tenant fleet management platform with route optimization.",
        result: "Live in 9 cities; 18% cost-per-delivery reduction.",
        image: img("1586528116311-ad8dd3c8310d"),
      },
      {
        name: "Sentinel HR",
        blurb: "Custom payroll engine for a workforce management firm, 14 jurisdictions.",
        result: "Reconciliation time 2 days → 20 minutes.",
        image: img("1488590528505-98d2b5aba04b"),
      },
    ],
  },
  {
    category: "API Integrations & Intelligent Systems",
    projects: [
      {
        name: "Junction",
        blurb: "Unified payments API spanning 7 PSPs with smart routing and fallback.",
        result: "Auth rate +4.1pp; vendor switch in minutes, not weeks.",
        image: img("1563013544-824ae1b704d3"),
      },
      {
        name: "Conduit",
        blurb: "Salesforce ↔ HubSpot ↔ ledger sync with reconciliation guarantees.",
        result: "Zero reconciliation incidents in 6 months.",
        image: img("1573164713988-8665fc963095"),
      },
      {
        name: "Sage Inbox",
        blurb: "Email AI that triages, drafts, and routes mail across 4 connected tools.",
        result: "12K msgs/day handled; 38% deflected from human review.",
        image: img("1555066931-4365d14bab8c"),
      },
    ],
  },
];

export default function CaseStudies() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Shipped, measured, scaled."
      description="A sample of recent projects across our six service areas. Full case studies available on request."
    >
      <div className="space-y-20">
        {groups.map((g) => (
          <div key={g.category}>
            <div className="flex items-baseline justify-between gap-6 mb-8 pb-5 border-b hairline-strong">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                {g.category}
              </h3>
              <span className="text-xs uppercase tracking-[0.2em] text-muted tabular shrink-0">
                {g.projects.length} projects
              </span>
            </div>
            <ul role="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.projects.map((p, i) => (
                <motion.li
                  key={p.name}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href="#"
                    className="group block h-full rounded-3xl border hairline overflow-hidden bg-surface transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-0.5 hover:border-ink-300 focus-visible:-translate-y-0.5"
                    aria-label={`${p.name} — read full case study`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden border-b hairline">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between text-white">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.2em] text-white/75">
                            {g.category.split(" ")[0]}
                          </div>
                          <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
                            {p.name}
                          </div>
                        </div>
                        <ArrowUpRight
                          className="size-5 text-white/85 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <Row label="Project" value={p.blurb} />
                      <Row label="Result" value={p.result} highlight />
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-ink-500 font-medium">
        {label}
      </div>
      <p
        className={`mt-1 text-sm leading-relaxed ${
          highlight ? "text-fg font-medium" : "text-muted"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

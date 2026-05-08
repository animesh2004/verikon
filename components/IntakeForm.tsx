"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

const PROJECT_TYPES = [
  "Web development",
  "UI/UX design",
  "AI automation",
  "Workflow / n8n system",
  "Custom software / MVP",
  "Not sure yet",
];

const SERVICES = [
  "Marketing site",
  "Web app / SaaS",
  "AI chatbot / assistant",
  "n8n workflows",
  "API integration",
  "Internal tools",
  "Design system",
  "Audit / consultation",
];

const TIMELINES = ["ASAP", "1–2 months", "3–6 months", "6+ months", "Just exploring"];

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k – $150k",
  "$150k+",
  "Not sure yet",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  projectType: string;
  services: string[];
  problem: string;
  outcome: string;
  automation: string;
  tools: string;
  timeline: string;
  budget: string;
  notes: string;
  hp: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  website: "",
  projectType: "",
  services: [],
  problem: "",
  outcome: "",
  automation: "",
  tools: "",
  timeline: "",
  budget: "",
  notes: "",
  hp: "",
};

const labelCls = "block text-sm font-medium text-fg mb-2";
const inputCls =
  "w-full h-12 px-4 rounded-xl border hairline bg-surface text-fg placeholder:text-muted/70 focus-visible:border-fg transition-colors duration-250";
const textareaCls =
  "w-full px-4 py-3 rounded-xl border hairline bg-surface text-fg placeholder:text-muted/70 focus-visible:border-fg transition-colors duration-250 resize-y min-h-[120px]";
const helpCls = "mt-2 text-xs text-muted";

export default function IntakeForm() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const toggleService = (s: string) =>
    setState((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border hairline bg-surface p-10 md:p-14 text-center"
      >
        <div className="inline-flex items-center justify-center size-14 rounded-full bg-fg text-bg mb-6">
          <Check className="size-6" aria-hidden="true" />
        </div>
        <h2 className="font-display text-h2 font-bold tracking-tightest">Thanks — we got it.</h2>
        <p className="mt-4 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Utkarsh and the team will review your brief and reply within 24 hours with an honest take
          and a path forward.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250"
        >
          Back to home
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-12">
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        value={state.hp}
        onChange={(e) => update("hp", e.target.value)}
        className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <Section
        index="01"
        title="About you"
        description="So we know who we're talking to."
      >
        <Field label="Full name" required>
          <input
            className={inputCls}
            type="text"
            required
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Work email" required>
          <input
            className={inputCls}
            type="email"
            required
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Company / startup" required>
          <input
            className={inputCls}
            type="text"
            required
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Your role">
          <input
            className={inputCls}
            type="text"
            value={state.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="Founder, Head of Product, Ops Lead…"
            autoComplete="organization-title"
          />
        </Field>
        <Field label="Website" full>
          <input
            className={inputCls}
            type="url"
            value={state.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://"
            autoComplete="url"
          />
        </Field>
      </Section>

      <Section
        index="02"
        title="Your project"
        description="What you're trying to build, and why it matters."
      >
        <Field label="Project type" required full>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((t) => (
              <Chip key={t} active={state.projectType === t} onClick={() => update("projectType", t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Services you're interested in" full>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Chip key={s} active={state.services.includes(s)} onClick={() => toggleService(s)}>
                {s}
              </Chip>
            ))}
          </div>
          <p className={helpCls}>Pick as many as apply.</p>
        </Field>
        <Field label="What problem are you trying to solve?" required full>
          <textarea
            className={textareaCls}
            required
            value={state.problem}
            onChange={(e) => update("problem", e.target.value)}
            placeholder="The current pain — what's broken, slow, missing, or costing you."
          />
        </Field>
        <Field label="What does success look like?" full>
          <textarea
            className={textareaCls}
            value={state.outcome}
            onChange={(e) => update("outcome", e.target.value)}
            placeholder="The outcome you'd celebrate 90 days after we ship."
          />
        </Field>
      </Section>

      <Section
        index="03"
        title="Automation & AI opportunities"
        description="Where humans are doing what software should."
      >
        <Field label="Repetitive tasks or manual workflows you'd like to automate" full>
          <textarea
            className={textareaCls}
            value={state.automation}
            onChange={(e) => update("automation", e.target.value)}
            placeholder="e.g. Lead routing from forms to CRM, weekly reports, invoice processing, support triage with an AI agent…"
          />
        </Field>
        <Field label="Tools you currently use" full>
          <input
            className={inputCls}
            type="text"
            value={state.tools}
            onChange={(e) => update("tools", e.target.value)}
            placeholder="Slack, Notion, HubSpot, Airtable, Zapier, Postgres…"
          />
          <p className={helpCls}>So we know what to integrate with via APIs or n8n.</p>
        </Field>
      </Section>

      <Section
        index="04"
        title="Scope & investment"
        description="Helps us figure out feasibility before the call."
      >
        <Field label="Timeline" full>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <Chip key={t} active={state.timeline === t} onClick={() => update("timeline", t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Budget range" full>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <Chip key={b} active={state.budget === b} onClick={() => update("budget", b)}>
                {b}
              </Chip>
            ))}
          </div>
          <p className={helpCls}>Honest ranges only — saves us both time.</p>
        </Field>
        <Field label="Anything else we should know?" full>
          <textarea
            className={textareaCls}
            value={state.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Constraints, deadlines, prior attempts, who else is involved…"
          />
        </Field>
      </Section>

      <div className="pt-2 border-t hairline">
        {error && (
          <p className="mb-4 text-sm text-[color:var(--destructive)]" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
          <p className="text-sm text-muted max-w-md">
            We'll reply within 24 hours with an honest take. Your details stay private — never shared,
            never sold.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending…" : "Send brief"}
            {status !== "submitting" && (
              <ArrowUpRight
                className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-12 pt-12 border-t hairline first:border-t-0 first:pt-0">
      <header>
        <div className="text-xs font-medium tracking-widest text-accent uppercase tabular">{index}</div>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tightest">{title}</h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">{description}</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className={labelCls}>
        {label}
        {required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center h-10 px-4 rounded-full border text-sm transition-colors duration-250 ${
        active
          ? "bg-fg text-bg border-transparent"
          : "bg-surface text-fg hairline hover:border-fg/40"
      }`}
    >
      {children}
    </button>
  );
}

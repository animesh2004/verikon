"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Calendar, FileText } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/astrobonanimesh-071/30min";

const SERVICES = [
  "Web development",
  "UI/UX design",
  "AI automation",
  "Workflow / n8n system",
  "Custom software / MVP",
  "Not sure yet",
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

type Step1Data = {
  name: string;
  email: string;
  phone: string;
  service: string;
  hp: string;
};

const EMPTY_STEP1: Step1Data = { name: "", email: "", phone: "", service: "", hp: "" };

type View =
  | { kind: "step1" }
  | { kind: "chooser"; id: string; firstName: string }
  | { kind: "call"; id: string; firstName: string }
  | { kind: "brief"; id: string; firstName: string }
  | { kind: "done"; mode: "call" | "brief"; firstName: string };

const inputCls =
  "w-full h-12 px-4 rounded-xl border hairline bg-surface text-fg placeholder:text-muted/70 focus-visible:border-fg transition-colors duration-250";
const textareaCls =
  "w-full px-4 py-3 rounded-xl border hairline bg-surface text-fg placeholder:text-muted/70 focus-visible:border-fg transition-colors duration-250 resize-y min-h-[120px]";
const labelCls = "block text-sm font-medium text-fg mb-2";
const helpCls = "mt-2 text-xs text-muted";

export default function IntakeForm() {
  const [view, setView] = useState<View>({ kind: "step1" });
  const [step1Data, setStep1Data] = useState<Step1Data>(EMPTY_STEP1);
  const [leadId, setLeadId] = useState<string | null>(null);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view.kind + ("id" in view ? view.id : "")}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {view.kind === "step1" && (
          <Step1
            values={step1Data}
            setValues={setStep1Data}
            existingId={leadId}
            onDone={(id, firstName) => {
              setLeadId(id);
              setView({ kind: "chooser", id, firstName });
            }}
          />
        )}
        {view.kind === "chooser" && (
          <Chooser
            onCall={() => setView({ kind: "call", id: view.id, firstName: view.firstName })}
            onBrief={() => setView({ kind: "brief", id: view.id, firstName: view.firstName })}
            onBack={() => setView({ kind: "step1" })}
          />
        )}
        {view.kind === "call" && (
          <CallView
            id={view.id}
            onConfirmed={() => setView({ kind: "done", mode: "call", firstName: view.firstName })}
            onBack={() => setView({ kind: "chooser", id: view.id, firstName: view.firstName })}
          />
        )}
        {view.kind === "brief" && (
          <BriefForm
            id={view.id}
            onDone={() => setView({ kind: "done", mode: "brief", firstName: view.firstName })}
            onBack={() => setView({ kind: "chooser", id: view.id, firstName: view.firstName })}
          />
        )}
        {view.kind === "done" && <DoneView mode={view.mode} firstName={view.firstName} />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────────────── STEP 1 ──────────────── */

function Step1({
  values,
  setValues,
  existingId,
  onDone,
}: {
  values: Step1Data;
  setValues: React.Dispatch<React.SetStateAction<Step1Data>>;
  existingId: string | null;
  onDone: (id: string, firstName: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = <K extends keyof Step1Data>(k: K, v: Step1Data[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));
  const { name, email, phone, service, hp } = values;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/intake/step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: existingId ?? undefined, name, email, phone, service, hp }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      onDone(json.id, name.trim().split(" ")[0] || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <ProgressLabel current={1} total={2} title="Let's get started." subtitle="Share a few details and we'll take it from there." />

      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => update("hp", e.target.value)}
        className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" required>
          <input
            className={inputCls}
            type="text"
            required
            value={name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Email address" required>
          <input
            className={inputCls}
            type="email"
            required
            value={email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Phone number" required>
          <input
            className={inputCls}
            type="tel"
            required
            value={phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+1 555 0123"
          />
        </Field>
        <Field label="What do you need help with?" required>
          <select
            className={inputCls + " appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2378716C%22><path d=%22M5.5 7.5l4.5 4.5 4.5-4.5%22 stroke=%22%2378716C%22 stroke-width=%221.5%22 fill=%22none%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:18px] pr-10"}
            required
            value={service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        {error && (
          <p className="mb-3 text-sm text-[color:var(--destructive)]" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="group w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? "Saving…" : "Continue"}
          {!busy && (
            <ArrowUpRight
              className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          )}
        </button>
        <p className={helpCls + " text-center"}>We respect your privacy. No spam, ever.</p>
      </div>
    </form>
  );
}

/* ──────────────── CHOOSER ──────────────── */

function Chooser({
  onCall,
  onBrief,
  onBack,
}: {
  onCall: () => void;
  onBrief: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8">
      <BackLink onClick={onBack} label="Edit your details" />
      <ProgressLabel current={2} total={2} title="Choose your preferred next step." subtitle="We can either discuss your project live or review a detailed brief." />
      <div className="grid md:grid-cols-2 gap-5">
        <ChooserCard
          icon={<Calendar className="size-5" aria-hidden="true" />}
          recommended
          title="Need immediate help?"
          body="Book a strategy call directly with our team and get expert guidance."
          cta="Book strategy call"
          onClick={onCall}
        />
        <ChooserCard
          icon={<FileText className="size-5" aria-hidden="true" />}
          title="Prefer async communication?"
          body="Fill a detailed project brief and our team will review it carefully."
          cta="Fill detailed brief instead"
          onClick={onBrief}
        />
      </div>
      <p className="text-xs text-muted text-center">
        Your information is safe with us.
      </p>
    </div>
  );
}

function ChooserCard({
  icon,
  recommended,
  title,
  body,
  cta,
  onClick,
}: {
  icon: React.ReactNode;
  recommended?: boolean;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "group relative text-left rounded-2xl border bg-surface p-6 transition-colors duration-250 lift " +
        (recommended ? "border-fg" : "hairline hover:border-fg/40")
      }
    >
      {recommended && (
        <span className="absolute top-4 right-4 inline-flex items-center h-6 px-2.5 rounded-full bg-fg text-bg text-[10px] font-medium tracking-wide uppercase">
          Recommended
        </span>
      )}
      <span className="inline-flex items-center justify-center size-10 rounded-xl bg-surface-2 text-fg">
        {icon}
      </span>
      <h3 className="mt-4 font-display font-bold text-lg tracking-tightest">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{body}</p>
      <div className="mt-6 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-fg text-bg text-sm font-medium group-hover:opacity-90 transition-opacity duration-250">
        {cta}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </div>
    </button>
  );
}

/* ──────────────── CALL ──────────────── */

function CallView({
  id,
  onConfirmed,
  onBack,
}: {
  id: string;
  onConfirmed: () => void;
  onBack: () => void;
}) {
  const markedRef = useRef(false);

  useEffect(() => {
    if (markedRef.current) return;
    markedRef.current = true;
    fetch("/api/intake/step2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, choice: "call" }),
    }).catch((err) => console.error("[step2 call] save failed", err));
  }, [id]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "object" || !e.data) return;
      const data = e.data as { event?: string };
      if (data.event === "calendly.event_scheduled") {
        onConfirmed();
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onConfirmed]);

  return (
    <div className="space-y-6">
      <BackLink onClick={onBack} label="Back to options" />
      <ProgressLabel current={2} total={2} title="Pick a time that works for you." subtitle="30 minutes. Real strategy. No fluff." />
      <div
        className="calendly-inline-widget rounded-2xl border hairline overflow-hidden"
        data-url={CALENDLY_URL}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}

/* ──────────────── BRIEF ──────────────── */

function BriefForm({
  id,
  onDone,
  onBack,
}: {
  id: string;
  onDone: () => void;
  onBack: () => void;
}) {
  const [problem, setProblem] = useState("");
  const [outcome, setOutcome] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/intake/step2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          choice: "brief",
          problem,
          outcome,
          budget,
          timeline,
          website,
          notes,
          hp,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <BackLink onClick={onBack} label="Back to options" />
      <ProgressLabel current={2} total={2} title="Project brief." subtitle="A bit more detail so we come prepared to the first call." />

      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid gap-5">
        <Field label="Project description" required>
          <textarea
            className={textareaCls}
            required
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Tell us about your project — what you're building, the current pain, anything we should know."
          />
        </Field>
        <Field label="Goals / what does success look like?">
          <textarea
            className={textareaCls}
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="The outcome you'd celebrate 90 days after we ship."
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Budget range">
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </Field>
          <Field label="Timeline">
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <Chip key={t} active={timeline === t} onClick={() => setTimeline(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Field>
        </div>
        <Field label="Website (if any)">
          <input
            className={inputCls}
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://"
            autoComplete="url"
          />
        </Field>
        <Field label="Anything else we should know?">
          <textarea
            className={textareaCls}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Constraints, deadlines, prior attempts, who else is involved…"
          />
        </Field>
      </div>

      <div>
        {error && (
          <p className="mb-3 text-sm text-[color:var(--destructive)]" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="group w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? "Sending…" : "Submit project brief"}
          {!busy && (
            <ArrowUpRight
              className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </form>
  );
}

/* ──────────────── DONE ──────────────── */

function DoneView({ mode, firstName }: { mode: "call" | "brief"; firstName: string }) {
  const reduce = useReducedMotion();
  const greeting = firstName ? `Thanks, ${firstName} — ` : "Thanks — ";
  const headline = mode === "call" ? `${greeting}your call is booked.` : `${greeting}we got your brief.`;
  const body =
    mode === "call"
      ? "Check your inbox for the calendar invite and a confirmation. We'll come prepared with notes."
      : "We'll review your brief and get back to you within 24 hours with an honest take and a path forward.";

  return (
    <div className="text-center py-4">
      <div className="relative inline-flex items-center justify-center mb-8">
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-fg/30"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          />
        )}
        <motion.div
          initial={reduce ? false : { scale: 0 }}
          animate={reduce ? {} : { scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.05 }}
          className="relative size-16 rounded-full bg-fg flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <motion.path
              d="M8 16.5 L13.5 22 L24 11"
              stroke="var(--bg)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1], delay: 0.38 }}
            />
          </svg>
        </motion.div>
      </div>
      <motion.h2
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="font-display text-h2 font-bold tracking-tightest"
      >
        {headline}
      </motion.h2>
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
        className="mt-4 text-lg text-muted max-w-xl mx-auto leading-relaxed"
      >
        {body}
      </motion.p>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      >
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250"
        >
          Back to home
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  );
}

/* ──────────────── SHARED BITS ──────────────── */

function ProgressLabel({
  current,
  total,
  title,
  subtitle,
}: {
  current: number;
  total: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 text-xs text-muted tabular">
        <span>
          Step {current} of {total}
        </span>
        <div className="flex-1 h-[3px] rounded-full bg-surface-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(current / total) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-fg"
          />
        </div>
      </div>
      <h2 className="mt-5 font-display text-h2 font-bold tracking-tightest">{title}</h2>
      <p className="mt-3 text-base text-muted leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}

function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 -ml-1 px-2 py-1 rounded-md text-sm text-muted hover:text-fg transition-colors duration-250"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </button>
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
      className={
        "inline-flex items-center h-10 px-4 rounded-full border text-sm transition-colors duration-250 " +
        (active ? "bg-fg text-bg border-transparent" : "bg-surface text-fg hairline hover:border-fg/40")
      }
    >
      {children}
    </button>
  );
}

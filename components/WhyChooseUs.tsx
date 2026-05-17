import { Zap, Gem, MessageSquare } from "lucide-react";
import Section from "./Section";

const pillars = [
  {
    icon: Zap,
    title: "Speed with substance",
    body: "We ship every day. Two-week cycles, daily staging deploys, and tight feedback loops — not quarterly big-bangs.",
  },
  {
    icon: Gem,
    title: "Production-grade quality",
    body: "Pixel-accurate UI, typed end-to-end, evaluated where it matters. Models with eval harnesses, not vibes.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    body: "A shared Slack channel, async Loom updates, and one point of contact who's also building. No telephone game.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section eyebrow="Why Verikon" title="Three things we don't compromise on.">
      <div className="relative">
        <div
          className="absolute -top-28 left-1/3 size-[32rem] rounded-full bg-[#2563EB]/16 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-20 size-[30rem] rounded-full bg-[#FF6B35]/14 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {pillars.map((p) => (
          <li
            key={p.title}
            className="group rounded-3xl border border-[#1a1a1a] p-8 bg-[#0f1012] transition-all duration-250 hover:border-[#FF6B35] hover:shadow-[0_10px_40px_rgba(255,107,53,0.15)]"
          >
            <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#1a1a1a] group-hover:bg-[#FF6B35]/20 transition-colors duration-250">
              <p.icon className="size-5 text-[#FF6B35]" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{p.title}</h3>
            <p className="mt-3 text-[#999999] leading-relaxed">{p.body}</p>
          </li>
        ))}
        </ul>
      </div>
    </Section>
  );
}

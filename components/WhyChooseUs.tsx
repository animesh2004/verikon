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
      <ul role="list" className="grid md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <li
            key={p.title}
            className="group rounded-3xl border hairline p-8 bg-surface transition-colors duration-250 hover:bg-surface-2"
          >
            <div className="inline-flex items-center justify-center size-10 rounded-xl bg-surface-2 group-hover:bg-bg transition-colors duration-250">
              <p.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-3 text-muted leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import Section from "./Section";

const stats = [
  { k: "15+", v: "AI-native products shipped from concept to production." },
  { k: "8", v: "Active partnerships with founders building the next wave." },
  { k: "100%", v: "Hands-on execution — we build, not just advise." },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Hands-on operators. AI-native by default."
      description="We're designers, engineers, and ML practitioners who've shipped to millions. Every Verikon engagement is led by the people building your product — strategy, design, and code, in one room."
    >
      <div className="relative">
        <div
          className="absolute -top-24 -right-32 size-[35rem] rounded-full bg-[#FF6B35]/15 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -left-20 size-[30rem] rounded-full bg-[#2563EB]/12 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <dl className="grid md:grid-cols-3 gap-10 md:gap-12 relative">
        {stats.map((s) => (
          <div key={s.k} className="border-t border-[#1a1a1a] pt-6">
            <dt className="font-display text-4xl md:text-5xl font-bold tracking-tightest tabular text-white">{s.k}</dt>
            <dd className="mt-3 text-[#999999] leading-relaxed">{s.v}</dd>
          </div>
        ))}
        </dl>
      </div>
    </Section>
  );
}

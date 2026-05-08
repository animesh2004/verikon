import Section from "./Section";

const stats = [
  { k: "120%", v: "Year-over-year growth in shipped AI features for retained partners." },
  { k: "60+", v: "Production projects delivered across web, mobile, and machine learning." },
  { k: "1 pod", v: "One team per engagement. No handoffs, no account managers." },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Hands-on operators. AI-native by default."
      description="We're designers, engineers, and ML practitioners who've shipped to millions. Every Verikon engagement is led by the people building your product — strategy, design, and code, in one room."
    >
      <dl className="grid md:grid-cols-3 gap-10 md:gap-12">
        {stats.map((s) => (
          <div key={s.k} className="border-t hairline-strong pt-6">
            <dt className="font-display text-h3 font-bold tracking-tightest tabular">{s.k}</dt>
            <dd className="mt-3 text-muted leading-relaxed">{s.v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

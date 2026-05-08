import Section from "./Section";

const groups = [
  {
    label: "AI / ML",
    items: ["Python", "PyTorch", "TensorFlow", "OpenAI", "Anthropic", "LangChain", "Hugging Face", "Pinecone"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "SwiftUI", "Flutter"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Go", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
  },
  {
    label: "Cloud / Data",
    items: ["AWS", "GCP", "Vercel", "Cloudflare", "Docker", "Kubernetes", "Snowflake", "Airflow"],
  },
];

export default function TechStack() {
  const all = groups.flatMap((g) => g.items);
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="Modern tools, used with intent."
      description="A pragmatic toolkit across AI, web, mobile, and infrastructure. We pick what fits the problem — not the trend."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g) => (
          <div
            key={g.label}
            className="rounded-3xl border hairline bg-surface p-6 transition-colors duration-250 hover:bg-surface-2"
          >
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              {g.label}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2" role="list">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="text-xs text-ink-600 border hairline rounded-full px-2.5 py-1 bg-bg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 marquee-mask overflow-hidden">
        <div className="marquee gap-12 text-ink-600">
          {[...all, ...all].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-base md:text-lg whitespace-nowrap"
              aria-hidden={i >= all.length}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

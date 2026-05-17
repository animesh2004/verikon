import Section from "./Section";

type Group = { label: string; items: string[] };

const groups: Group[] = [
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
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="Modern tools, used with intent."
      description="A pragmatic toolkit across AI, web, mobile, and infrastructure. We pick what fits the problem — not the trend."
    >
      <div className="relative">
        <div
          className="absolute -top-24 -right-32 size-[35rem] rounded-full bg-[#FF6B35]/16 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 -left-24 size-[30rem] rounded-full bg-[#2563EB]/12 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 auto-rows-[300px] gap-3 relative"
        >
          {groups.map((g) => (
            <li
              key={g.label}
              className="rounded-2xl border border-[#FF6B35] bg-gradient-to-br from-[#0f1012] to-[#0a0b0d] p-6 transition-all duration-250 hover:shadow-[0_10px_40px_rgba(255,107,53,0.2)] flex flex-col"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#FF6B35] font-semibold">
                {g.label}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2 content-start" role="list">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-white border border-[#1a1a1a] rounded-full px-3 py-1.5 bg-[#0a0b0d] hover:border-[#FF6B35]/50 transition-colors duration-250"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

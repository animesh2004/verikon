export default function Footer() {
  return (
    <footer className="border-t hairline py-12">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold tracking-tightest text-lg">
            Verikon<span className="text-accent">.</span>
          </div>
          <p className="mt-2 text-sm text-muted">An AI-first digital solutions agency. Remote-first, globally.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm">
          <a
            href="mailto:hello@verikon.ai"
            className="text-muted hover:text-fg transition-colors duration-250"
          >
            hello@verikon.ai
          </a>
          <a href="#" className="text-muted hover:text-fg transition-colors duration-250">
            Twitter
          </a>
          <a href="#" className="text-muted hover:text-fg transition-colors duration-250">
            LinkedIn
          </a>
        </nav>
        <div className="text-xs text-ink-500 tabular">© {new Date().getFullYear()} Verikon</div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 bg-[#090A0C]">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold tracking-tightest text-lg text-white">
            Verikon<span className="text-[#FF6B35]">.</span>
          </div>
          <p className="mt-2 text-sm text-[#999999]">An AI-first digital solutions agency. Remote-first, globally.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm">
          <a
            href="mailto:hello@verikon.ai"
            className="text-[#999999] hover:text-white transition-colors duration-250"
          >
            hello@verikon.ai
          </a>
          <a href="#" className="text-[#999999] hover:text-white transition-colors duration-250">
            Twitter
          </a>
          <a href="#" className="text-[#999999] hover:text-white transition-colors duration-250">
            LinkedIn
          </a>
        </nav>
        <div className="text-xs text-[#666666] tabular">© {new Date().getFullYear()} Verikon</div>
      </div>
    </footer>
  );
}

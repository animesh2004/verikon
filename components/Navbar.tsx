"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
];

export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color] duration-250 ease-out-soft",
          scrolled || mobileOpen
            ? "backdrop-blur-md bg-[rgba(9,10,12,0.8)] border-b border-[#1a1a1a]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-px mx-auto max-w-7xl 2xl:max-w-screen-2xl flex items-center justify-between h-16 2xl:h-20"
        >
          <a
            href="#"
            className="font-display font-bold tracking-tightest text-lg hover:opacity-80 transition-opacity duration-250 text-white"
          >
            Verikon<span className="text-[#FF6B35]">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-[#999999]">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-white transition-colors duration-250"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/intake"
            className="hidden md:inline-flex items-center h-9 px-6 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-all duration-250 cursor-pointer"
          >
            Start a project
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center size-11 -mr-2 rounded-full text-white hover:bg-white/10 transition-colors duration-250"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="md:hidden fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-[2px]"
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-[4.5rem] inset-x-4 z-50 rounded-3xl border border-[#1a1a1a] bg-[#0f1012] shadow-[0_24px_60px_-24px_rgba(255,107,53,0.2)] overflow-hidden"
            >
              <ul className="p-3 flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center py-3 px-4 rounded-2xl text-base text-white hover:bg-white/5 transition-colors duration-250"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="p-3 pt-0">
                <Link
                  href="/intake"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center h-12 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-all duration-250"
                >
                  Start a project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

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
            ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--bg)_75%,transparent)] border-b hairline"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-px mx-auto max-w-7xl flex items-center justify-between h-16"
        >
          <a
            href="#"
            className="font-display font-bold tracking-tightest text-lg hover:opacity-80 transition-opacity duration-250"
          >
            Verikon<span className="text-accent">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-fg transition-colors duration-250"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/intake"
            className="hidden md:inline-flex items-center h-9 px-4 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-opacity duration-250 cursor-pointer"
          >
            Start a project
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center size-11 -mr-2 rounded-full text-fg hover:bg-fg/5 transition-colors duration-250"
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
              className="md:hidden fixed inset-0 top-16 z-40 bg-fg/30 backdrop-blur-[2px]"
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
              className="md:hidden fixed top-[4.5rem] inset-x-4 z-50 rounded-3xl border hairline bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <ul className="p-3 flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center py-3 px-4 rounded-2xl text-base text-fg hover:bg-fg/5 transition-colors duration-250"
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
                  className="flex items-center justify-center h-12 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-250"
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

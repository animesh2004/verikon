"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color] duration-250 ease-out-soft",
        scrolled
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
        <a
          href="#contact"
          className="hidden md:inline-flex items-center h-9 px-4 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-85 transition-opacity duration-250 cursor-pointer"
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}

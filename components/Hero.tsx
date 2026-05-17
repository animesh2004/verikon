"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Calendar, Zap, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const OrbitingOrbs = ({ delay = 0 }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="60"
        r="6"
        fill="#FF6B35"
        style={{
          animation: "orbit1 8s infinite ease-in-out",
          animationDelay: `${delay}s`,
        }}
      />
      <circle
        cx="140"
        cy="120"
        r="4"
        fill="#2563EB"
        style={{
          animation: "orbit2 6s infinite ease-in-out",
          animationDelay: `${delay * 0.5}s`,
        }}
      />
      <circle
        cx="60"
        cy="140"
        r="5"
        fill="#FF6B35"
        style={{
          animation: "orbit2 7s infinite ease-in-out reverse",
          animationDelay: `${delay}s`,
        }}
      />
      <circle
        cx="100"
        cy="100"
        r="3"
        fill="#2563EB"
        style={{
          animation: "pulse-glow 3s infinite ease-in-out",
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  );
};

const FlowingGradient = ({ delay = 0 }) => (
  <div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    aria-hidden="true"
    style={{
      background: "radial-gradient(circle at 50% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
      animation: "flow-gradient 6s ease-in-out infinite",
      animationDelay: `${delay}s`,
    }}
  />
);

const NeuralLines = ({ delay = 0 }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
    viewBox="0 0 200 200"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line
      x1="30"
      y1="30"
      x2="170"
      y2="170"
      stroke="#FF6B35"
      strokeWidth="0.8"
      strokeDasharray="5,5"
      style={{
        animation: "dash 4s linear infinite",
        animationDelay: `${delay}s`,
      }}
    />
    <line
      x1="170"
      y1="30"
      x2="30"
      y2="170"
      stroke="#2563EB"
      strokeWidth="0.8"
      strokeDasharray="5,5"
      style={{
        animation: "dash 4s linear infinite reverse",
        animationDelay: `${delay * 0.5}s`,
      }}
    />
    <circle
      cx="100"
      cy="100"
      r="40"
      fill="none"
      stroke="#FF6B35"
      strokeWidth="0.5"
      opacity="0.3"
      style={{
        animation: "dash 8s linear infinite",
        animationDelay: `${delay}s`,
      }}
    />
  </svg>
);

const AnimatedIcon = ({ Icon, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -4, 0],
      rotateZ: [0, 2, -2, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <Icon className="size-6 text-[#FF6B35]" />
  </motion.div>
);

export default function Hero() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!document.getElementById("hero-animations")) {
      const style = document.createElement("style");
      style.id = "hero-animations";
      style.textContent = `
        @keyframes orbit1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(60px, -40px) scale(1.1); opacity: 0.5; }
          50% { transform: translate(0, -80px) scale(0.8); opacity: 0.3; }
          75% { transform: translate(-60px, -40px) scale(1.1); opacity: 0.5; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        @keyframes orbit2 {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0.2; }
          33% { transform: translate(-50px, 50px) scale(1); opacity: 0.4; }
          66% { transform: translate(50px, 50px) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) scale(0.8); opacity: 0.2; }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: blur(1px); opacity: 0.4; }
          50% { filter: blur(2px); opacity: 0.7; }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flow-gradient {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const rise = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative pt-36 md:pt-44 pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 size-[40rem] rounded-full bg-[#FF6B35]/20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-0 size-[35rem] rounded-full bg-[#2563EB]/20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 size-[25rem] rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="container-px mx-auto max-w-7xl relative">
        <motion.div
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-[#1a1a1a] bg-[#0f1012]/80 backdrop-blur px-3 py-1 text-xs text-[#999999]"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-[#FF6B35]/60 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#FF6B35]" />
          </span>
          AI-first digital solutions agency
        </motion.div>

        <motion.h1
          {...rise(0.05)}
          className="mt-8 font-display font-bold tracking-tightest text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-[16ch] text-white"
        >
          Build what{" "}
          <span className="text-[#FF6B35]">matters</span>,{" "}
          launch what works.
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-8 max-w-2xl text-lg md:text-xl text-[#999999] leading-relaxed"
        >
          We partner with founders and teams to build AI-native products that solve real problems.
          From concept to production, we handle the complexity so you can focus on impact.
        </motion.p>

        <motion.div {...rise(0.2)} className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/intake"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-250 cursor-pointer"
          >
            Start a project
            <ArrowUpRight
              className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/intake"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-[#1a1a1a] text-sm font-medium text-white hover:border-[#FF6B35] hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all duration-250 cursor-pointer"
          >
            <Calendar className="size-4" aria-hidden="true" />
            Book a session
          </Link>
        </motion.div>


        <motion.div
          {...rise(0.35)}
          className="mt-24 flex flex-wrap items-center gap-x-10 gap-y-4"
          aria-label="Selected past collaborators"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#555555]">
            Trusted by teams at
          </span>
          {["Northwind", "Kite", "Ledger AI", "Arc", "Helios", "Lumen"].map((n) => (
            <span
              key={n}
              className="font-display text-[#666666] text-base md:text-lg font-medium"
            >
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

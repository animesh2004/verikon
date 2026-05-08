"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, description, children, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className={clsx("py-28 md:py-32 border-t hairline", className)}>
      <div className="container-px mx-auto max-w-7xl">
        <motion.header
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-5 font-medium">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display font-bold tracking-tightest text-h2 text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">{description}</p>
          )}
        </motion.header>
        {children && <div className="mt-16 md:mt-20">{children}</div>}
      </div>
    </section>
  );
}

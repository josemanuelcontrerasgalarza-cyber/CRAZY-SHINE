"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "span" | "li";
}

/** Fade + rise when the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 32, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1, ease, delay }}
    >
      {children}
    </Tag>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease, delay: i * 0.09 } }),
};

interface MaskedHeadlineProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3";
  /** Animate on mount instead of on scroll (for the hero). */
  immediate?: boolean;
  delay?: number;
  id?: string;
}

/** Headline where each line slides up from behind a mask — the signature reveal. */
export function MaskedHeadline({ lines, className, lineClassName, as = "h2", immediate, delay = 0, id }: MaskedHeadlineProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.16em] block overflow-hidden pb-[0.06em] pt-[0.16em]">
          <motion.span
            className={lineClassName ?? "block"}
            variants={reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : lineVariants}
            custom={i + delay * 10}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

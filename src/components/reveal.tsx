"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms, applied as a transition-delay. */
  delay?: number;
  className?: string;
  /** Render as something other than a div (e.g. "li", "article"). */
  as?: ElementType;
};

/**
 * Fades + lifts its children into view once, the first time they intersect.
 *
 * The element is always in the DOM and in the server-rendered HTML — only the
 * opacity is animated — so crawlers and AI answer engines still read the full
 * content. `globals.css` disables the animation entirely under
 * `prefers-reduced-motion`, and `layout.tsx` ships a <noscript> override so the
 * page is readable with JavaScript switched off.
 */
export function Reveal({ children, delay = 0, className = "", as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is missing, show immediately rather than never.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

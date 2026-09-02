"use client";

import React, { useEffect, useRef, useState } from "react";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "characters" | "words" | "lines";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random";
  transition?: {
    damping?: number;
    stiffness?: number;
    type?: string;
    duration?: number;
  };
  className?: string;
}

export function VerticalCutReveal({
  children,
  splitBy = "characters",
  staggerDuration = 0.04,
  staggerFrom = "center",
  className = ""
}: VerticalCutRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const text = typeof children === "string" ? children : String(children);
  const items = splitBy === "characters" ? text.split("") : text.split(" ");
  const total = items.length;

  const getDelay = (index: number) => {
    if (staggerFrom === "first") return index * staggerDuration;
    if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
    if (staggerFrom === "center") {
      const center = (total - 1) / 2;
      return Math.abs(index - center) * staggerDuration;
    }
    return Math.random() * staggerDuration * total;
  };

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap items-baseline ${className}`}
      aria-label={text}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-top"
          style={{ verticalAlign: "top" }}
        >
          <span
            className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isVisible ? "translateY(0%)" : "translateY(115%)",
              transitionDelay: `${getDelay(idx)}s`,
              whiteSpace: item === " " ? "pre" : "normal"
            }}
          >
            {item === " " ? "\u00A0" : item}
          </span>
          {splitBy === "words" && idx < total - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default VerticalCutReveal;

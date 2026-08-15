"use client";

import { ElementType, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TextEffectProps {
  text: string;
  hoverText?: string;
  href?: string;
  className?: string;
  delay?: number;
  /**
   * Element to render. Defaults to "h1" as in the source component; pass "p"
   * or "span" when the text is decorative so the page keeps a single h1.
   */
  as?: ElementType;
  /** Fill behind the revealed hover text. */
  highlightColor?: string;
  /** Text colour on that fill. */
  highlightTextColor?: string;
  /**
   * "hover"  — the original behaviour: an overlay reveals `hoverText` on hover.
   * "inView" — the text scrambles itself into place when scrolled into view,
   *            with no overlay. Suited to lists, where an absolutely
   *            positioned overlay would stack on top of the text beneath it.
   */
  trigger?: "hover" | "inView";
  /** The source component forces a single line. Set false to allow wrapping. */
  nowrap?: boolean;
  /**
   * Type styling. Kept as its own prop rather than left to `className`, because
   * this project's font sizes are custom names (`text-body-20`) that
   * tailwind-merge cannot recognise as sizes — passing one via `className`
   * would not override a size baked into the base classes.
   */
  typeClassName?: string;
}

/**
 * Scramble-on-hover display text.
 *
 * Adapted from the source component in three ways, all additive:
 *   1. `as` — the original always rendered an <h1>; decorative instances would
 *      otherwise create duplicate h1s on a page.
 *   2. `cn()` — merges classes so `className` can override the base styles
 *      rather than fighting them on stylesheet order.
 *   3. prefers-reduced-motion — the GSAP entrance and the letter scramble are
 *      skipped; the hover reveal still happens, instantly.
 *
 * GSAP is imported dynamically, so it lands in its own chunk and is only
 * fetched on pages that use this component.
 */
export function TextGlitch({
  text,
  hoverText,
  href,
  className = "",
  delay = 0,
  as: Tag = "h1",
  highlightColor = "#FFFF02",
  highlightTextColor = "#000000",
  trigger = "hover",
  nowrap = true,
  typeClassName = "text-[10vw] font-bold text-neutral-600/20",
}: TextEffectProps) {
  const textRef = useRef<HTMLElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [displayHoverText, setDisplayHoverText] = useState(hoverText || text);
  const hoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let cancelled = false;

    const loadGSAP = async () => {
      if (!textRef.current) return;

      if (prefersReducedMotion()) {
        textRef.current.style.backgroundSize = "100%";
        textRef.current.style.opacity = "1";
        return;
      }

      const { gsap } = await import("gsap");
      if (cancelled || !textRef.current) return;

      gsap.set(textRef.current, {
        backgroundSize: "0%",
        scale: 0.95,
        opacity: 0.7,
      });

      const tl = gsap.timeline({ delay });

      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }).to(
        textRef.current,
        {
          backgroundSize: "100%",
          duration: 2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3",
      );
    };

    loadGSAP();

    return () => {
      cancelled = true;
    };
  }, [delay]);

  /** Scrambles into `target`, settling one character at a time. */
  const scrambleTo = (target: string, onFrame: (value: string) => void) => {
    let iteration = 0;

    const id = setInterval(() => {
      onFrame(
        target
          .split("")
          .map((character, index) => {
            if (index < iteration) return target[index];
            // Spaces and punctuation hold their place so the shape stays legible.
            if (!/[a-z]/i.test(character)) return character;
            return letters[Math.floor(Math.random() * 26)];
          })
          .join(""),
      );

      if (iteration >= target.length) clearInterval(id);
      iteration += 1 / 3;
    }, 30);

    return id;
  };

  // "inView" mode: settle the text into place the first time it is scrolled to.
  useEffect(() => {
    if (trigger !== "inView") return;

    const node = textRef.current;
    if (!node) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setDisplayText(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = scrambleTo(text, setDisplayText);
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  const handleMouseEnter = () => {
    if (trigger !== "hover") return;

    if (hoverText && !prefersReducedMotion()) {
      let iteration = 0;

      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }

      hoverIntervalRef.current = setInterval(() => {
        setDisplayHoverText(
          hoverText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return hoverText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join(""),
        );

        if (iteration >= hoverText.length) {
          clearInterval(hoverIntervalRef.current!);
        }

        iteration += 1 / 3;
      }, 30);
    }

    if (spanRef.current) {
      spanRef.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }
  };

  const handleMouseLeave = () => {
    if (trigger !== "hover") return;

    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
    }
    setDisplayHoverText(hoverText || text);

    if (spanRef.current) {
      spanRef.current.style.clipPath = "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)";
    }
  };

  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  const spanContent = hoverText ? (
    href ? (
      <a href={href} target="_blank" rel="noreferrer" className="text-inherit no-underline">
        {displayHoverText}
      </a>
    ) : (
      displayHoverText
    )
  ) : (
    text
  );

  return (
    <Tag
      ref={textRef}
      className={cn(
        "relative m-0 flex cursor-pointer flex-col items-start justify-center overflow-hidden",
        "leading-none tracking-tight",
        "bg-gradient-to-r from-neutral-700 to-neutral-500 bg-clip-text bg-no-repeat",
        "border-b border-neutral-600/20",
        "transition-all duration-500 ease-out",
        typeClassName,
        className,
      )}
      style={{
        backgroundSize: "0%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        width: "100%",
        maxWidth: "100%",
        wordBreak: "break-word",
        whiteSpace: nowrap ? "nowrap" : "normal",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}

      {/* The overlay only exists in hover mode — in "inView" mode it would sit
          on top of the text beneath it with nothing to reveal. */}
      {trigger === "hover" && (
        <span
          ref={spanRef}
          aria-hidden="true"
          className="pointer-events-none absolute flex h-full w-full flex-col justify-center overflow-hidden font-bold transition-all duration-300 ease-out"
          style={{
            clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
            transformOrigin: "center",
            backgroundColor: highlightColor,
            color: highlightTextColor,
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {spanContent}
        </span>
      )}
    </Tag>
  );
}

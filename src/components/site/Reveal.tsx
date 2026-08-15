import { ElementType, ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /**
   * "lines" — children marked `.reveal-inner` rise out of their own baseline.
   * "wipe"  — the block is revealed with a clip-path inset.
   * "fadeUp" — fades in while translating up.
   * "scaleIn" — scales from 0.92 → 1 with fade.
   * "slideLeft" — slides in from the right.
   * "slideRight" — slides in from the left.
   */
  variant?: "lines" | "wipe" | "fadeUp" | "scaleIn" | "slideLeft" | "slideRight";
  as?: ElementType;
  id?: string;
  /** If true, animation scrubs with scroll position. */
  scrub?: boolean | number;
}

/**
 * GSAP-powered scroll reveal. Uses ScrollTrigger for premium, scroll-linked
 * animations. Falls back to immediate visibility for reduced-motion.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  as: Tag = "div",
  id,
  scrub = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const Component = Tag as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" });
      return;
    }

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};

    switch (variant) {
      case "wipe":
        fromVars = { clipPath: "inset(100% 0 0 0)" };
        toVars = { clipPath: "inset(0% 0 0 0)" };
        break;
      case "scaleIn":
        fromVars = { scale: 0.92, opacity: 0 };
        toVars = { scale: 1, opacity: 1 };
        break;
      case "slideLeft":
        fromVars = { x: 80, opacity: 0 };
        toVars = { x: 0, opacity: 1 };
        break;
      case "slideRight":
        fromVars = { x: -80, opacity: 0 };
        toVars = { x: 0, opacity: 1 };
        break;
      case "fadeUp":
      default:
        fromVars = { y: 50, opacity: 0 };
        toVars = { y: 0, opacity: 1 };
        break;
    }

    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      duration: scrub ? undefined : 0.9,
      delay: scrub ? undefined : delay / 1000,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: scrub ? "bottom 20%" : undefined,
        scrub: scrub === true ? 1 : scrub || undefined,
        once: true,
        toggleActions: scrub ? undefined : "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, delay, scrub]);

  return (
    <Component id={id} ref={ref} className={cn("gsap-reveal", className)}>
      {children}
    </Component>
  );
};

interface LinesProps {
  /** Each entry becomes one masked line. */
  lines: ReactNode[];
  className?: string;
  /** Milliseconds between line entrances. */
  stagger?: number;
  as?: ElementType;
}

/**
 * Display type, split into lines. Each line sits in an overflow-hidden mask and
 * rises from below its own baseline with GSAP ScrollTrigger, so letters appear
 * to come up out of the rule beneath them rather than fading in mid-air.
 */
export const Lines = ({ lines, className, stagger = 60, as: Tag = "span" }: LinesProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const Component = Tag as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const innerEls = el.querySelectorAll(".reveal-inner");
    if (!innerEls.length) return;

    if (prefersReducedMotion) {
      gsap.set(innerEls, { y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      innerEls,
      { y: "110%" },
      {
        y: "0%",
        duration: 0.8,
        ease: "power3.out",
        stagger: stagger / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  return (
    <Component ref={ref} className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={index} className="reveal-mask block">
          <span className="reveal-inner">
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
};

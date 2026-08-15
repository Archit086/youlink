import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Variant presets — each returns a GSAP `from` config + trigger opts */
/* ------------------------------------------------------------------ */

type AnimationVariant =
  | "fadeUp"
  | "fadeDown"
  | "wipeUp"
  | "wipeDown"
  | "scaleIn"
  | "slideLeft"
  | "slideRight"
  | "parallax";

interface UseScrollRevealOptions {
  /** Animation variant. Defaults to "fadeUp". */
  variant?: AnimationVariant;
  /** Extra delay before the animation starts (seconds). */
  delay?: number;
  /** How far the animation scrubs with scroll (true = 1:1 linked, number = smoothing). */
  scrub?: boolean | number;
  /** IntersectionObserver-style trigger point e.g. "top 85%". */
  start?: string;
  /** End point for scrubbed animations. */
  end?: string;
  /** Duration in seconds (ignored when scrub is used). */
  duration?: number;
  /** If true, animation only plays once. Defaults to true. */
  once?: boolean;
  /** Mark the trigger element for pinning. */
  pin?: boolean;
  /** How far to translate on parallax variant (px). */
  parallaxDistance?: number;
  /** GSAP easing string. */
  ease?: string;
  /** Additional GSAP `from` overrides. */
  fromVars?: gsap.TweenVars;
  /** Stagger children elements matching this selector. */
  staggerChildren?: string;
  /** Stagger amount in seconds. */
  staggerAmount?: number;
}

const VARIANT_FROM: Record<AnimationVariant, gsap.TweenVars> = {
  fadeUp: { y: 60, opacity: 0 },
  fadeDown: { y: -40, opacity: 0 },
  wipeUp: { clipPath: "inset(100% 0 0 0)" },
  wipeDown: { clipPath: "inset(0 0 100% 0)" },
  scaleIn: { scale: 0.92, opacity: 0 },
  slideLeft: { x: 80, opacity: 0 },
  slideRight: { x: -80, opacity: 0 },
  parallax: { y: 80 },
};

const VARIANT_TO: Record<AnimationVariant, gsap.TweenVars> = {
  fadeUp: { y: 0, opacity: 1 },
  fadeDown: { y: 0, opacity: 1 },
  wipeUp: { clipPath: "inset(0 0 0 0)" },
  wipeDown: { clipPath: "inset(0 0 0 0)" },
  scaleIn: { scale: 1, opacity: 1 },
  slideLeft: { x: 0, opacity: 1 },
  slideRight: { x: 0, opacity: 1 },
  parallax: { y: 0 },
};

/**
 * Attaches a GSAP ScrollTrigger animation to a ref'd element.
 *
 * Usage:
 * ```tsx
 * const ref = useScrollReveal<HTMLDivElement>({ variant: "fadeUp" });
 * return <div ref={ref}>…</div>;
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);

  const {
    variant = "fadeUp",
    delay = 0,
    scrub = false,
    start = "top 85%",
    end = "bottom 20%",
    duration = 0.9,
    once = true,
    pin = false,
    ease = "power3.out",
    fromVars = {},
    staggerChildren,
    staggerAmount = 0.12,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion: show immediately, no animation
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(el, VARIANT_TO[variant]);
      return;
    }

    const targets = staggerChildren ? el.querySelectorAll(staggerChildren) : el;
    const hasTargets = staggerChildren
      ? (targets as NodeListOf<Element>).length > 0
      : true;

    if (!hasTargets) return;

    const fromConfig: gsap.TweenVars = {
      ...VARIANT_FROM[variant],
      ...fromVars,
    };

    const toConfig: gsap.TweenVars = {
      ...VARIANT_TO[variant],
      duration: scrub ? undefined : duration,
      delay: scrub ? undefined : delay,
      ease,
      stagger: staggerChildren ? staggerAmount : undefined,
      scrollTrigger: {
        trigger: el,
        start,
        end: scrub ? end : undefined,
        scrub: scrub === true ? 1 : scrub || undefined,
        once,
        pin,
        toggleActions: scrub
          ? undefined
          : once
            ? "play none none none"
            : "play none none reverse",
      },
    };

    const tween = gsap.fromTo(targets, fromConfig, toConfig);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, delay, scrub, start, end, duration, once, pin, ease, staggerChildren, staggerAmount]);

  return ref;
}

/**
 * Inline GSAP ScrollTrigger for more complex, imperative setups.
 * Returns a ref and runs the provided callback with the element + gsap + ScrollTrigger.
 */
export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  setup: (el: T, gsapInstance: typeof gsap, ST: typeof ScrollTrigger) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const result = setup(el, gsap, ScrollTrigger);

    return () => {
      if (result && "kill" in result) {
        (result as gsap.core.Tween).scrollTrigger?.kill();
        result.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

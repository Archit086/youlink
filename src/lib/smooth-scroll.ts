import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/**
 * Initialise Lenis smooth scroll and wire it into GSAP's ticker so
 * ScrollTrigger stays perfectly in sync with the smooth-scrolled position.
 *
 * Call once in Layout; the returned `destroy` callback tears everything down.
 */
export function initSmoothScroll(): () => void {
  if (lenisInstance) return () => {};

  // Respect reduced-motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    // Still register ScrollTrigger but skip Lenis
    ScrollTrigger.defaults({ toggleActions: "play none none none" });
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
  });

  lenisInstance = lenis;

  // Pipe Lenis scroll position into ScrollTrigger on every frame
  lenis.on("scroll", ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker so both systems share one rAF loop
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000); // GSAP ticker gives seconds, Lenis expects ms
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0); // prevent GSAP from throttling on tab switch

  return () => {
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
    lenisInstance = null;
  };
}

/** Expose the active Lenis instance for programmatic scroll-to calls. */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

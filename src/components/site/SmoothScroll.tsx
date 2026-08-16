import { useEffect } from "react";

/**
 * Global smooth scrolling, wired into ScrollTrigger.
 *
 * Lenis takes over the wheel and drives scroll position on its own RAF loop,
 * which is what makes scrubbed pins feel continuous rather than stepped. GSAP's
 * ticker runs the loop so both share one frame, and `lagSmoothing(0)` stops GSAP
 * from skipping ahead after a slow frame — otherwise pinned sections jump.
 *
 * Skipped entirely for reduced-motion visitors. Touch scrolling is left native:
 * hijacking momentum scroll on a phone feels broken and costs battery.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        // Expo-out: covers most of the distance immediately, then settles.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Anchor links have to go through Lenis or they fight the RAF loop.
      const onAnchorClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]');
        const href = anchor?.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -60 });
      };
      document.addEventListener("click", onAnchorClick);

      ScrollTrigger.refresh();

      cleanup = () => {
        document.removeEventListener("click", onAnchorClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
};

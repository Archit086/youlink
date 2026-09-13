import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { startSmoothScroll } from "@/lib/smooth-scroll";

/**
 * Turns on weighted, eased scrolling for the whole site. Visitors who prefer
 * reduced motion keep the browser's native scrolling, and switching that
 * setting while the page is open takes effect immediately.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    // Lenis watches content size with ResizeObserver; without it (very old
    // browsers, test environments) native scrolling is the safe fallback.
    if (typeof window.ResizeObserver === "undefined") return;

    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const apply = () => {
      stop();
      stop = query?.matches ? () => {} : startSmoothScroll();
    };

    apply();
    query?.addEventListener?.("change", apply);

    return () => {
      query?.removeEventListener?.("change", apply);
      stop();
    };
  }, []);

  return null;
};

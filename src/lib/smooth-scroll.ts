import Lenis from "lenis";

let instance: Lenis | null = null;

/** The running smooth-scroll instance, or null when it is off. */
export const getLenis = () => instance;

/**
 * Starts site-wide smooth scrolling and returns a function that stops it.
 *
 * Every wheel, trackpad and touch gesture feeds a target position that the page
 * eases toward each frame, so a hard flick glides a measured distance instead of
 * throwing the reader down the page. Lenis moves the real window scroll, so
 * position: sticky, framer-motion's useScroll and in-page anchors all keep
 * working unchanged.
 */
export const startSmoothScroll = () => {
  instance?.destroy();

  instance = new Lenis({
    autoRaf: true,
    // Share of the remaining distance covered each frame: lower feels heavier.
    lerp: 0.08,
    // One wheel or trackpad step travels a little less than the browser default.
    wheelMultiplier: 0.8,
    // Ease finger swipes too, so a fling on a phone cannot overshoot the page.
    syncTouch: true,
    syncTouchLerp: 0.08,
    touchMultiplier: 1,
    // Links like #main scroll smoothly instead of jumping.
    anchors: true,
  });

  return () => {
    instance?.destroy();
    instance = null;
  };
};

/** Jump to the top without animating, through Lenis when it is running. */
export const scrollToTopImmediately = () => {
  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }
};

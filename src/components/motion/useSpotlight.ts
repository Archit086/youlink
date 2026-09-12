import { useEffect, useState, type RefObject } from "react";

export const SPOTLIGHT_RADIUS = 260;

/* Solid core to 40%, then a long feathered shoulder out to nothing. */
const stops = [
  [0, 1],
  [0.4, 1],
  [0.6, 0.75],
  [0.75, 0.4],
  [0.88, 0.12],
  [1, 0],
]
  .map(([stop, alpha]) => `rgba(255,255,255,${alpha}) ${stop * SPOTLIGHT_RADIUS}px`)
  .join(", ");

/**
 * The spotlight as a CSS mask. It gives the same falloff as a canvas radial
 * gradient exported to a data URL, without encoding an image every frame.
 */
export const spotlightMask = (x: number, y: number) =>
  `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x}px ${y}px, ${stops})`;

interface SpotlightState {
  /** Eased pointer position, relative to the element's top-left corner. */
  x: number;
  y: number;
  /** Eased parallax offset in pixels, for layers that drift with the cursor. */
  gridX: number;
  gridY: number;
}

const OFF: SpotlightState = { x: -9999, y: -9999, gridX: 0, gridY: 0 };

/**
 * Tracks the pointer over an element with easing: 0.1 per frame for the
 * spotlight, 0.06 for the parallax drift. Positions are local to the element,
 * so the light stays under the cursor while the page scrolls. The loop idles
 * while the element is off screen, and only re-renders when something moved.
 */
export const useSpotlight = (ref: RefObject<HTMLElement>, parallax = 0) => {
  const [state, setState] = useState<SpotlightState>(OFF);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let pointer: { x: number; y: number } | null = null;
    const smooth = { x: 0, y: 0 };
    const grid = { x: 0, y: 0 };
    let last = OFF;
    let visible = typeof IntersectionObserver === "undefined";
    let raf = 0;

    const handleMove = (event: PointerEvent) => {
      // Snap on first contact so the light doesn't streak in from a corner.
      if (!pointer) {
        smooth.x = event.clientX;
        smooth.y = event.clientY;
      }
      pointer = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || !pointer) return;

      const rect = element.getBoundingClientRect();
      smooth.x += (pointer.x - smooth.x) * 0.1;
      smooth.y += (pointer.y - smooth.y) * 0.1;

      if (parallax) {
        const targetX = ((pointer.x - rect.left) / rect.width - 0.5) * 2 * parallax;
        const targetY = ((pointer.y - rect.top) / rect.height - 0.5) * 2 * parallax;
        grid.x += (targetX - grid.x) * 0.06;
        grid.y += (targetY - grid.y) * 0.06;
      }

      const next = {
        x: smooth.x - rect.left,
        y: smooth.y - rect.top,
        gridX: grid.x,
        gridY: grid.y,
      };

      if (
        Math.abs(next.x - last.x) > 0.1 ||
        Math.abs(next.y - last.y) > 0.1 ||
        Math.abs(next.gridX - last.gridX) > 0.01 ||
        Math.abs(next.gridY - last.gridY) > 0.01
      ) {
        last = next;
        setState(next);
      }
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          });
    observer?.observe(element);

    window.addEventListener("pointermove", handleMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [ref, parallax]);

  return state;
};

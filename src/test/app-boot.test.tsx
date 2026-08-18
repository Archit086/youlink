import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

/**
 * Guards against the whole app blanking out.
 *
 * The page-level smoke test renders each page in isolation, which misses errors
 * thrown inside effects at the App/Layout level — an uncaught throw in a
 * `useEffect` unmounts the entire React tree and leaves a white page. That is
 * exactly how the WebGL background took the site down: jsdom has no WebGL, and
 * neither does a browser that has run out of contexts.
 *
 * jsdom deliberately keeps no WebGL here, so this asserts the app still boots
 * when the canvas cannot start.
 */
beforeAll(() => {
  class Observer {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = globalThis.ResizeObserver ?? (Observer as never);
  globalThis.IntersectionObserver = globalThis.IntersectionObserver ?? (Observer as never);
  window.scrollTo = () => {};
});

describe("app boots", () => {
  it("renders without unmounting, even with no WebGL available", async () => {
    const errors: unknown[] = [];
    const onError = (event: ErrorEvent) => errors.push(event.error ?? event.message);
    const onRejection = (event: PromiseRejectionEvent) => errors.push(event.reason);

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    render(<App />);

    // Let the async effects (gsap / lenis / three) settle.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);

    const messages = errors.map((error) => (error as Error)?.message ?? String(error));
    expect(messages).toEqual([]);

    // The tree is still mounted.
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

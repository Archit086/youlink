import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Index from "@/pages/Index";
import Work from "@/pages/Work";
import About from "@/pages/About";
import Services from "@/pages/Services";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Hire from "@/pages/Hire";
import Join from "@/pages/Join";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import RefundPolicy from "@/pages/RefundPolicy";
import NotFound from "@/pages/NotFound";

beforeAll(() => {
  // jsdom lacks IntersectionObserver, which drives the scroll reveals.
  class IO {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  // @ts-expect-error test shim
  globalThis.IntersectionObserver = IO;
  window.scrollTo = () => {};
});

const pages: [string, () => JSX.Element][] = [
  ["Index", Index],
  ["Work", Work],
  ["About", About],
  ["Services", Services],
  ["HowItWorks", HowItWorks],
  ["Pricing", Pricing],
  ["Hire", Hire],
  ["Join", Join],
  ["Terms", Terms],
  ["Privacy", Privacy],
  ["RefundPolicy", RefundPolicy],
  ["NotFound", NotFound],
];

describe("pages render", () => {
  it.each(pages)("%s renders with exactly one h1", (_name, Page) => {
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    cleanup();
  });
});

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { navLinks } from "@/data/site";

/** Local studio time, in the same mono register as every other label. */
const StudioClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const render = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
          .format(new Date())
          .toUpperCase(),
      );

    render();
    const id = window.setInterval(render, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-caption-20 uppercase tabular-nums">
      {time} IST
      <span className="ml-8 opacity-60">India</span>
    </span>
  );
};

/**
 * A 60px sticky bar, present from the first pixel and never hidden.
 * It is a grid of ruled cells: an inverted logo tile, the studio clock, the
 * navigation, the theme toggle, and a solid contact cell at the far edge.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-theme-fg/15 bg-theme-bg/70 backdrop-blur-xl">
      <div className="flex min-h-[var(--site-header-height)] items-stretch">
        {/* Inverted square tile — the strongest identity mark on the page. */}
        <Link
          to="/"
          aria-label="YouLink — home"
          className="flex size-[var(--site-header-height)] shrink-0 items-center justify-center bg-theme-fg text-theme-bg"
        >
          <span className="perspective-[1000px]">
            <span className="block animate-logo-coin font-mono text-caption-20 uppercase [transform-style:preserve-3d]">
              YL
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center border-l px-20 lg:flex">
          <StudioClock />
        </div>

        <nav aria-label="Primary" className="hidden items-stretch border-l lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center px-16 text-body-10 transition-opacity duration-500 ease-out",
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-stretch lg:ml-0">
          <ThemeToggle />

          {/* The contact pill — bordered, filling on hover. */}
          <div className="hidden items-center border-l pl-20 pr-16 lg:flex">
            <Link to="/hire" className="pill">
              Start a project
              <ArrowRightGlyph className="size-14" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex size-[var(--site-header-height)] shrink-0 items-center justify-center border-l bg-theme-fg font-mono text-caption-10 uppercase text-theme-bg lg:hidden"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile panel — the same ruled rows, at display scale. */}
      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t bg-theme-bg lg:hidden"
      >
        <nav aria-label="Mobile">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-baseline gap-16 border-b px-12 py-16 transition-colors duration-300 ease-out hover:bg-theme-fg hover:text-theme-bg"
            >
              <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-headline-10">{link.name}</span>
            </Link>
          ))}
        </nav>

        <Link
          to="/hire"
          className="flex items-center justify-between gap-16 bg-theme-fg px-12 py-20 text-theme-bg"
        >
          <span className="font-mono text-caption-20 uppercase">Start a project</span>
          <ArrowRightGlyph />
        </Link>

        <Link
          to="/join"
          className="flex items-center justify-between gap-16 border-b px-12 py-20"
        >
          <span className="font-mono text-caption-20 uppercase">Join as freelancer</span>
          <ArrowRightGlyph />
        </Link>

        <div className="px-12 py-16">
          <StudioClock />
        </div>
      </div>
    </header>
  );
};

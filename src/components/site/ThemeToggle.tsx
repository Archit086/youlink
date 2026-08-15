import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "youlink-theme";

/**
 * Light/dark toggle. The new theme is wiped across the page with a clip-path
 * sweep whose direction follows the switch, rather than cross-fading — the
 * overlay is a snapshot-coloured sheet that clears as the sweep completes.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      root.setAttribute("data-theme", next);
      window.localStorage.setItem(STORAGE_KEY, next);
      setTheme(next);
    };

    if (reduced) {
      apply();
      return;
    }

    // The sheet is painted in the incoming background colour and wiped across.
    const sheet = document.createElement("div");
    sheet.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:60",
      "pointer-events:none",
      `background:${next === "dark" ? "#1b1f27" : "#ffffff"}`,
      `animation:theme-sweep-${next === "dark" ? "ltr" : "rtl"} 600ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
    ].join(";");
    document.body.appendChild(sheet);

    window.setTimeout(apply, 260);
    window.setTimeout(() => sheet.remove(), 640);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="flex size-[var(--site-header-height)] shrink-0 items-center justify-center border-l font-mono text-caption-10 uppercase transition-colors duration-300 ease-out hover:bg-theme-fg hover:text-theme-bg"
    >
      {theme === "light" ? "Dk" : "Lt"}
    </button>
  );
};

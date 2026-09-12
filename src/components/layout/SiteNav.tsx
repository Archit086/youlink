import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/data/site";

const items = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
] as const;

/** The mark from the favicon, redrawn without its tile so it sits on imagery. */
const YouLinkMark = () => (
  <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
    <g stroke="#ffffff" strokeWidth="6" strokeLinecap="square" fill="none">
      <path d="M11 13 L22 30 L33 13" />
      <path d="M22 30 L22 51" />
      <path d="M44 13 L44 51 L55 51" />
    </g>
  </svg>
);

/**
 * The one navigation bar on the site: wordmark left, a glass pill of links
 * centred, the call to action right. The homepage floats it over the hero;
 * inner pages set it inside a sticky header.
 */
export const SiteNav = ({ className }: { className?: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav
      aria-label="Primary"
      className={cn("relative z-[100] flex items-center justify-between p-4 sm:p-5", className)}
    >
      <Link to="/" className="flex items-center gap-2" onClick={close}>
        <YouLinkMark />
        <span className="font-playfair text-2xl italic text-white">{brand.name}</span>
      </Link>

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-white/80 hover:bg-white/20 hover:text-white",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <Link
        to="/hire"
        className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 md:block"
      >
        Start a project
      </Link>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur-md md:hidden"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {menuOpen && (
        <div className="absolute left-4 right-4 top-full flex flex-col gap-1 rounded-3xl border border-white/30 bg-black/70 p-3 backdrop-blur-md md:hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={close}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/20"
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/hire"
            onClick={close}
            className="mt-2 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-900"
          >
            Start a project
          </Link>
        </div>
      )}
    </nav>
  );
};

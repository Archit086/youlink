import { Link } from "react-router-dom";
import { brand } from "@/data/site";
import { ArrowRightGlyph } from "@/components/site/Glyphs";

const columns = [
  {
    heading: "Studio",
    links: [
      { name: "Work", path: "/work" },
      { name: "Services", path: "/services" },
      { name: "About", path: "/about" },
    ],
  },
  {
    heading: "Engagement",
    links: [
      { name: "Process", path: "/how-it-works" },
      { name: "Pricing", path: "/pricing" },
      { name: "Start a project", path: "/hire" },
      { name: "Join as freelancer", path: "/join" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Refund Policy", path: "/refund-policy" },
    ],
  },
];

export const Footer = () => (
  <footer className="border-t">
    {/* Contact strip — one cell per channel, each with its own arrow */}
    <div className="grid border-b sm:grid-cols-2">
      <Link
        to="/hire"
        className="group flex items-center justify-between gap-24 border-b px-12 py-16 transition-colors duration-800 ease-out hover:bg-theme-fg hover:text-theme-bg sm:border-b-0 lg:px-20"
      >
        <span className="text-body-10">Start a project</span>
        <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
      </Link>

      <a
        href={brand.instagram}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-center justify-between gap-24 px-12 py-16 transition-colors duration-800 ease-out hover:bg-theme-fg hover:text-theme-bg sm:border-l lg:px-20"
      >
        <span className="text-body-10">Instagram {brand.instagramHandle}</span>
        <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4" />
      </a>
    </div>

    <div className="grid lg:grid-cols-4">
      <div className="cell lg:col-span-1">
        <p className="max-w-prose text-body-10 opacity-70">{brand.positioning}</p>
      </div>

      {columns.map((column) => (
        <nav key={column.heading} aria-label={column.heading} className="cell border-t lg:border-l lg:border-t-0">
          <h2 className="label opacity-60">{column.heading}</h2>
          <ul className="mt-20">
            {column.links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="link-wipe block py-6 font-mono text-caption-20 uppercase transition-opacity duration-300 ease-out hover:opacity-70"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    {/* The wordmark, run to the edges */}
    <div className="panel-ink overflow-hidden border-t px-12 pb-8 pt-16 lg:px-20">
      <p aria-hidden="true" className="whitespace-nowrap text-headline-50 leading-[0.75]">
        YouLink
      </p>
    </div>

    <div className="panel-ink flex flex-col gap-8 border-t px-12 py-14 font-mono text-caption-10 uppercase sm:flex-row sm:items-center sm:justify-between lg:px-20">
      <p className="opacity-60">© {new Date().getFullYear()} YouLink. All rights reserved.</p>
      <p className="opacity-60">{brand.tagline}</p>
    </div>
  </footer>
);

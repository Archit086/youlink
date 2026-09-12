import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { spotlightMask, useSpotlight } from "@/components/motion/useSpotlight";
import { ContactButton } from "@/components/site/Buttons";
import { brand } from "@/data/site";
import { footerMedia } from "@/data/media";

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

/**
 * Layered footer. Bottom to top:
 *   0   a 48px grid at 10% that drifts with the cursor
 *   10  the product still
 *   25  a haze overlay
 *   30  a looping video, shown only inside the cursor spotlight and only in
 *       the lower 60% of the footer
 *   35  a fade that ties the top edge into the page and keeps links readable
 *   40  the content
 */
export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { x, y, gridX, gridY } = useSpotlight(footerRef, 16);
  const mask = spotlightMask(x, y);

  // The video is only fetched once the footer approaches, and only plays while
  // it's on screen. Visitors who prefer reduced motion never get playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.src = footerMedia.video;
          if (!reduceMotion) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0C0C0C] px-5 pb-10 pt-24 sm:px-8 sm:pt-32 md:px-10 md:pt-40"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -top-4 z-0 h-[calc(100%+2rem)] w-[calc(100%+2rem)] opacity-10"
        style={{ transform: `translate3d(${gridX}px, ${gridY}px, 0)` }}
      >
        <defs>
          <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${footerMedia.base}")` }}
      />

      <img
        src={footerMedia.overlay}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: "inset(40% 0 0 0)" }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[35] bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/10 to-[#0C0C0C]/70"
      />

      <div className="relative z-40">
        <FadeIn delay={0} y={40} className="flex flex-col items-center gap-8 text-center md:gap-10">
          <h2
            className="display-serif"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Let&apos;s build
          </h2>
          <p
            className="max-w-[520px] font-light leading-snug text-[#D7E2EA] opacity-70"
            style={{ fontSize: "clamp(0.8rem, 1.4vw, 1.1rem)" }}
          >
            {brand.goal}
          </p>
          <ContactButton to="/hire">Start a project</ContactButton>
        </FadeIn>

        <div className="mx-auto mt-24 grid max-w-6xl gap-10 border-t border-[#D7E2EA]/15 pt-12 sm:grid-cols-2 md:mt-32 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[#D7E2EA] opacity-50">YouLink</p>
            <p className="text-sm font-light leading-relaxed text-[#D7E2EA] opacity-70">
              {brand.positioning}
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {brand.instagramHandle}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
              <p className="eyebrow text-[#D7E2EA] opacity-50">{column.heading}</p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm font-light text-[#D7E2EA] transition-opacity duration-200 hover:opacity-60"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-2 border-t border-[#D7E2EA]/15 pt-6 text-xs text-[#D7E2EA] opacity-50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YouLink. All rights reserved.</p>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

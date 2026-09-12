import { useRef } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/layout/SiteNav";
import { spotlightMask, useSpotlight } from "@/components/motion/useSpotlight";
import { brand } from "@/data/site";
import { heroImages } from "@/data/media";

/**
 * Full-viewport opening. A base image slowly settles out of a zoom while a
 * cursor-following spotlight uncovers a second image beneath it; the tagline
 * sits over both, and the promise and call to action anchor the floor.
 */
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = useSpotlight(sectionRef);
  const mask = spotlightMask(x, y);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <div
        aria-hidden="true"
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${heroImages.base}")` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${heroImages.reveal}")`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />

      {/* Pinned to the hero rather than the viewport, so it never floats over
          the white services panel further down. */}
      <SiteNav className="absolute left-0 right-0 top-0" />

      <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
        <h1 className="leading-[0.95] text-white">
          <span
            className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
          >
            We connect you
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
          >
            with a you
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block md:left-14"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm leading-relaxed text-white/80">{brand.promise}</p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">{brand.goal}</p>
        <Link
          to="/hire"
          className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
};

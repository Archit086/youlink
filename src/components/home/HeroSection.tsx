import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lines } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { brand, clients } from "@/data/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two full-bleed halves: the wordmark statement against a halftone field, then
 * a stack of inverted and accent panels carrying the positioning and the
 * client roster. No stock imagery — type, texture and colour blocks only.
 */
export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const statement = statementRef.current;
    const accent = accentRef.current;
    if (!section || !left || !right || !statement || !accent) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax: left text panel scrolls slightly slower (parallax feel)
      gsap.to(left, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Right panel has a subtle parallax in the opposite direction
      gsap.fromTo(
        right,
        { opacity: 0.3, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: right,
            start: "top 90%",
            once: true,
          },
        },
      );

      // Statement panel slides up
      gsap.fromTo(
        statement,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statement,
            start: "top 88%",
            once: true,
          },
        },
      );

      // Accent panel slides up with a slight delay
      gsap.fromTo(
        accent,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accent,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b">
      <div className="grid lg:grid-cols-2">
        {/* Left — the name, at the largest size the site uses */}
        <div
          ref={leftRef}
          className="flex min-h-[46svh] flex-col justify-center p-12 lg:min-h-[calc(100svh-var(--site-header-height))] lg:p-20"
        >
          <h1 className="text-headline-50">
            <Lines lines={["YouLink"]} />
          </h1>
          <p className="mt-24 max-w-prose font-mono text-caption-20 uppercase opacity-60">
            {brand.tagline}
          </p>
        </div>

        {/* Right — left transparent so the site-wide particle field shows through */}
        <div
          ref={rightRef}
          className="relative min-h-[32svh] border-t lg:border-l lg:border-t-0"
          aria-hidden="true"
        />
      </div>

      <div className="grid border-t lg:grid-cols-2">
        {/* Statement panel */}
        <div
          ref={statementRef}
          className="panel-ink flex flex-col justify-between border-b p-12 lg:border-b-0 lg:p-20"
        >
          <p className="max-w-prose text-body-30">
            We don't just create content or run ads — we build brands from the ground up.
          </p>

          <Link
            to="/hire"
            className="group mt-40 flex items-center justify-between gap-24 border-t pt-20 font-mono text-caption-20 uppercase transition-opacity duration-300 hover:opacity-70"
          >
            Start a project
            <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>
        </div>

        {/* Accent panel */}
        <div
          ref={accentRef}
          className="panel-accent flex flex-col justify-between p-12 lg:border-l lg:p-20"
        >
          <p className="max-w-prose text-body-30">{brand.positioning}</p>

          <div className="mt-40">
            <p className="font-mono text-caption-10 uppercase opacity-60">Working with</p>
            <div className="mt-16 border-t pt-16">
              <Marquee
                label="Selected clients"
                duration={44}
                items={clients.map((client) => (
                  <span
                    key={client.id}
                    className="flex items-center gap-24 whitespace-nowrap pr-24 font-mono text-caption-20 uppercase"
                  >
                    {client.name}
                    <span className="opacity-40">/</span>
                  </span>
                ))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

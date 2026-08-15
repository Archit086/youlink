import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lines } from "@/components/site/Reveal";
import { ArrowDiagonal, ArrowRightGlyph } from "@/components/site/Glyphs";
import { brand } from "@/data/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The closing destination. An inverted panel carrying the invitation, a long
 * drawn arrow, and a thin accent edge — one idea and one action.
 */
export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Large "YouLink" text scales from 0.8 → 1 as section enters view
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { scale: 0.8, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      }

      // Invitation panel fades up with parallax
      if (invitationRef.current) {
        gsap.fromTo(
          invitationRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: invitationRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Arrow draws in with a scale-x + fade
      if (arrowRef.current) {
        gsap.fromTo(
          arrowRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            opacity: 0.7,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: arrowRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="panel-ink border-t">
      <div className="grid lg:grid-cols-2">
        {/* The wordmark, at scale */}
        <div className="flex min-h-[40svh] flex-col justify-between border-b p-12 lg:min-h-[70svh] lg:border-b-0 lg:p-20">
          <p className="font-mono text-caption-10 uppercase opacity-60">{brand.tagline}</p>
          <p ref={wordmarkRef} className="text-headline-50" aria-hidden="true">
            YouLink
          </p>
        </div>

        {/* The invitation */}
        <div
          ref={invitationRef}
          className="relative flex min-h-[40svh] flex-col justify-between p-12 lg:min-h-[70svh] lg:border-l lg:p-20"
        >
          <h2 className="text-headline-30">
            <Lines lines={["Have a brand in mind?", "Let's build it."]} stagger={90} />
          </h2>

          <div ref={arrowRef}>
            <ArrowDiagonal className="my-40 ml-auto w-[40%] max-w-200 opacity-70" />
          </div>

          <div className="grid border-t sm:grid-cols-2">
            <Link
              to="/hire"
              className="group flex items-center justify-between gap-24 py-20 pr-16 font-mono text-caption-20 uppercase transition-opacity duration-300 hover:opacity-70"
            >
              Start a project
              <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
            </Link>

            <Link
              to="/join"
              className="group flex items-center justify-between gap-24 border-t py-20 pr-16 font-mono text-caption-20 uppercase transition-opacity duration-300 hover:opacity-70 sm:border-l sm:border-t-0 sm:pl-16"
            >
              Join as freelancer
              <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Accent edge */}
      <div className="h-8 bg-accent" aria-hidden="true" />
    </section>
  );
};

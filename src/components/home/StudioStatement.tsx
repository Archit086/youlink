import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { brand } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Section 02 — what YouLink is, and how it is put together. */
export const StudioStatement = () => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger each content block inside the scrolling body
      const blocks = body.querySelectorAll(".studio-block");
      gsap.fromTo(
        blocks,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: body,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, body);

    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" className="scroll-mt-[var(--site-header-height)] border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">02</span>
        <span className="label">The studio</span>
      </div>

      <div className="grid lg:grid-cols-3">
        {/* Pinned title against a scrolling body. */}
        <div className="cell pin lg:col-span-1">
          <h2 className="text-headline-20">
            <Lines lines={["Strategy,", "creativity,", "consistency."]} />
          </h2>
        </div>

        <div ref={bodyRef} className="border-t lg:col-span-2 lg:border-l lg:border-t-0">
          <div className="studio-block cell">
            <p className="text-body-30">{brand.reach}</p>
          </div>

          <div className="studio-block cell border-t">
            <p className="label opacity-60">The model</p>
            <p className="mt-16 max-w-prose text-body-20">{brand.model}</p>
          </div>

          <div className="studio-block cell border-t">
            <p className="label opacity-60">Our goal</p>
            <p className="mt-16 max-w-prose text-body-20">{brand.goal}</p>
            <Link to="/about" className="link-wipe mt-24 inline-block font-mono text-caption-10 uppercase">
              Read more about YouLink
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { services } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { WireFigure, ArrowRightGlyph } from "@/components/site/Glyphs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A sticky grey statement pinned beside a dark stack of numbered capabilities.
 * Each entry pairs an index, a two-line title, a paragraph, a wire figure and
 * a mono spec list marked with accent squares.
 *
 * GSAP ScrollTrigger drives:
 * — Left panel pins while the dark stack scrolls past (desktop)
 * — Each capability block reveals with a scrubbed clip-path wipe
 * — Wire figures scale in, spec items stagger from the right
 */
export const ServicesIndex = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Each capability block: wipe + fade-up reveal
      const blocks = stack.querySelectorAll(".service-block");
      blocks.forEach((block, index) => {
        // The whole block wipes in from the bottom
        gsap.fromTo(
          block,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 90%",
              once: true,
            },
          },
        );

        // Wire figure scales in with a subtle bounce
        const wire = block.querySelector(".wire-container");
        if (wire) {
          gsap.fromTo(
            wire,
            { scale: 0.7, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              delay: 0.2,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                once: true,
              },
            },
          );
        }

        // Spec items stagger in from the right
        const specs = block.querySelectorAll(".spec-item");
        if (specs.length) {
          gsap.fromTo(
            specs,
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.3,
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                once: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b">
      <div className="grid lg:grid-cols-2">
        {/* Left — pinned statement */}
        <div className="panel-grey pin-full flex flex-col justify-between p-12 lg:p-20">
          <h2 className="text-headline-40">
            <Lines lines={["Here's what", "YouLink does to", "your brand"]} />
          </h2>

          <div className="mt-40">
            <p className="max-w-prose text-body-10">{`We help businesses create a strong digital presence that looks professional, builds trust, and drives growth.`}</p>

            <Link
              to="/hire"
              className="group mt-24 inline-flex items-center gap-24 bg-ink px-16 py-12 font-mono text-caption-10 uppercase text-white transition-colors duration-800 ease-out hover:bg-accent hover:text-ink"
            >
              Talk to the studio
              <ArrowRightGlyph className="size-14 transition-transform duration-300 ease-out group-hover:translate-x-4" />
            </Link>
          </div>
        </div>

        {/* Right — dark capability stack */}
        <div ref={stackRef} className="panel-ink border-t lg:border-l lg:border-t-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-block grid gap-24 border-b p-12 last:border-b-0 lg:grid-cols-12 lg:gap-20 lg:p-20"
            >
              <div className="flex gap-16 lg:col-span-6">
                <span className="index-number pt-8">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-headline-10">{service.title}</h3>
              </div>

              <p className="max-w-prose text-body-10 opacity-80 lg:col-span-6">{service.summary}</p>

              <div className="wire-container lg:col-span-6">
                <WireFigure variant={index} />
              </div>

              <ul className="flex flex-col justify-end gap-8 lg:col-span-6">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="spec-item">
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

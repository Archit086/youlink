import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { clients, featuredClients } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { CaseCard } from "@/components/work/CaseCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Section 04 — a curated three, at deliberately different scales. */
export const FeaturedWork = () => {
  const [lead, ...supporting] = featuredClients;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header description fades up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Lead case card wipes in from bottom with scale
      if (leadRef.current) {
        gsap.fromTo(
          leadRef.current,
          { clipPath: "inset(100% 0 0 0)", scale: 0.97 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leadRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Supporting cards stagger-wipe in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".case-card-wrapper");
        gsap.fromTo(
          cards,
          { clipPath: "inset(100% 0 0 0)", scale: 0.96 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section ref={sectionRef} className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">05</span>
        <span className="label">Selected work</span>
        <Link to="/work" className="link-wipe ml-auto font-mono text-caption-10 uppercase">
          All {clients.length} brands
        </Link>
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-30">
            <Lines lines={["Legacy names,", "new cafés, and brands", "built from zero"]} />
          </h2>
        </div>
        <div ref={headerRef} className="cell border-t lg:border-l lg:border-t-0">
          <p className="max-w-prose text-body-20 opacity-70">
            We've worked with brands across diverse industries — from fashion and food to healthcare,
            retail, jewellery, and industrial sectors.
          </p>
        </div>
      </div>

      {lead && (
        <div ref={leadRef} className="border-b">
          <CaseCard client={lead} index="01" scale="feature" />
        </div>
      )}

      <div ref={gridRef} className="grid lg:grid-cols-2">
        {supporting.map((client, index) => (
          <div
            key={client.id}
            className={`case-card-wrapper ${index === 0 ? "border-b lg:border-b-0" : "lg:border-l"}`}
          >
            <CaseCard client={client} index={String(index + 2).padStart(2, "0")} />
          </div>
        ))}
      </div>
    </section>
  );
};

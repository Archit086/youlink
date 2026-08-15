import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clientProcess, principles } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Section 05 — why the work holds up: the model behind the delivery. */
export const OperatingModel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Description fades up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Principles — scale from 0.92 → 1 with stagger
      if (principlesRef.current) {
        const cards = principlesRef.current.querySelectorAll(".principle-card");
        gsap.fromTo(
          cards,
          { scale: 0.92, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: principlesRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Process steps — slide in from right with stagger
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll(".process-step");
        gsap.fromTo(
          steps,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: processRef.current,
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
        <span className="index-number">06</span>
        <span className="label">Operating model</span>
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-30">
            <Lines lines={["A structured", "freelance ecosystem —", "not a marketplace"]} />
          </h2>
        </div>
        <div ref={descRef} className="cell border-t lg:border-l lg:border-t-0">
          <p className="max-w-prose text-body-20 opacity-70">
            Skilled teams work under supervision, so quality, creativity, accountability and delivery
            stay predictable from the first brief to the final handover.
          </p>
        </div>
      </div>

      {/* Principles — ruled cells, three across. */}
      <div ref={principlesRef} className={cn(gridColumns({ sm: 2, lg: 3 }), "border-b")}>
        {principles.map((principle, index) => (
          <div
            key={principle.title}
            className={cn("principle-card cell", cellRules(index, { sm: 2, lg: 3 }))}
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-16 text-headline-10">{principle.title}</h3>
            <p className="mt-12 max-w-prose text-body-10 opacity-70">{principle.description}</p>
          </div>
        ))}
      </div>

      {/* Process — pinned label against a scrolling list. */}
      <div className="grid lg:grid-cols-3">
        <div className="cell pin lg:col-span-1">
          <p className="label opacity-60">How an engagement runs</p>
          <h3 className="mt-16 text-headline-20">Six steps, enquiry to handover.</h3>
          <Link to="/how-it-works" className="link-wipe mt-24 inline-block font-mono text-caption-10 uppercase">
            See the full process
          </Link>
        </div>

        <ol ref={processRef} className="border-t lg:col-span-2 lg:border-l lg:border-t-0">
          {clientProcess.map((step, index) => (
            <li
              key={step.title}
              className="process-step grid gap-8 border-b px-12 py-16 last:border-b-0 sm:grid-cols-[48px_1fr] lg:px-20"
            >
              <span className="index-number sm:pt-4">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h4 className="text-body-20">{step.title}</h4>
                <p className="mt-8 max-w-prose text-body-10 opacity-70">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { brand, services } from "@/data/site";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";

/**
 * The capability opener: three words set at display scale in an overlapping
 * collage, then the full capability grid cascading in beneath.
 *
 * Two scroll behaviours, both GSAP:
 *   1. A one-shot entrance timeline fired when the section reaches 80% of the
 *      viewport — the words rise in sequence, then the copy, then the columns.
 *   2. A continuous parallax scrub, each word drifting at a different rate so
 *      the collage gains depth as the section passes.
 *
 * Progressive enhancement, matching the other sections: the markup is a plain
 * stacked layout with everything visible. GSAP applies the hidden state and the
 * absolute positioning itself, and only inside a matchMedia query for large
 * viewports with motion allowed.
 */
export const WhatWeDo = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const root = sectionRef.current;
      if (cancelled || !root) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        const pick = <T extends HTMLElement>(selector: string) =>
          Array.from(root.querySelectorAll<T>(selector));

        // ---- Desktop: full collage, staggered entrance, parallax drift ----
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const what = root.querySelector<HTMLElement>("[data-word='what']");
          const we = root.querySelector<HTMLElement>("[data-word='we']");
          const does = root.querySelector<HTMLElement>("[data-word='do']");
          const copy = root.querySelector<HTMLElement>("[data-copy]");
          const columns = pick("[data-column]");
          if (!what || !we || !does) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          tl.from(what, { y: 80, autoAlpha: 0, duration: 1.2, ease: "power3.out" })
            .from(we, { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=1.1")
            .from(does, { y: 100, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=0.95")
            .from(copy, { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
            .from(
              columns,
              {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: { each: 0.08, from: "start" },
              },
              "-=0.5",
            );

          // Depth: each word drifts at its own rate across the section.
          const drifts: [HTMLElement, number][] = [
            [what, 60],
            [we, -30],
            [does, 20],
          ];

          const parallax = drifts.map(([element, distance]) =>
            gsap.to(element, {
              y: distance,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }),
          );

          return () => {
            parallax.forEach((tween) => {
              tween.scrollTrigger?.kill();
              tween.kill();
            });
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        // ---- Below lg: no collage, no parallax. A plain staggered fade. ----
        mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
          const items = pick("[data-word], [data-copy], [data-column]");

          const tween = gsap.from(items, {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });

        return () => mm.revert();
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-b">
      <div className="flex items-baseline gap-16 border-b border-theme-fg/15 px-16 py-18 lg:px-28">
        <span className="index-number">03</span>
        <span className="label-serif">( What we do )</span>
      </div>

      {/* The collage. Stacked on mobile, overlapped from lg up. */}
      <div className="relative px-12 py-32 lg:px-20 lg:py-48">
        <div className="relative lg:min-h-[62svh]">
          <h2 className="sr-only">What we do</h2>

          <span
            data-word="what"
            aria-hidden="true"
            className="word-collage text-outline block lg:absolute lg:bottom-0 lg:left-0"
          >
            WHAT
          </span>

          <span
            data-word="we"
            aria-hidden="true"
            className="word-collage block lg:absolute lg:left-[34%] lg:top-[6%]"
          >
            WE
          </span>

          <span
            data-word="do"
            aria-hidden="true"
            className="word-collage block lg:absolute lg:left-[52%] lg:top-[34%] lg:text-[clamp(6rem,21vw,19rem)]"
          >
            DO
          </span>

          {/* Supporting copy, set against the collage in the top-right */}
          <p
            data-copy
            className="mt-24 max-w-prose text-body-10 opacity-70 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:max-w-[34ch] lg:text-right"
          >
            {brand.reach}
          </p>
        </div>
      </div>

      {/* Capability columns — the cascade */}
      <div className={cn(gridColumns({ sm: 2, lg: 5 }), "border-t")}>
        {services.map((service, index) => (
          <div
            key={service.id}
            data-column
            className={cn("cell flex flex-col", cellRules(index, { sm: 2, lg: 5 }))}
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-12 text-body-20">{service.title}</h3>

            <ul className="mt-20 flex flex-col gap-8">
              {service.capabilities.map((capability) => (
                <li key={capability} className="spec-item">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

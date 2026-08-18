import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { services } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { WireFigure, ArrowRightGlyph } from "@/components/site/Glyphs";

/**
 * Scroll-driven capability stack.
 *
 * The whole section pins to the viewport and the page's scroll position scrubs
 * a GSAP timeline: each capability panel translates up over the one before it
 * while the outgoing panel drifts and dims, the index markers on the left
 * track the active entry, and the wire figures rotate across the full range.
 * Because the timeline is scrubbed rather than played, scrolling back up runs
 * it in reverse exactly.
 *
 * Progressive enhancement: the markup below is an ordinary stacked list. GSAP
 * applies the absolute positioning itself, and only inside a matchMedia query
 * for large viewports with motion allowed — so mobile and reduced-motion
 * visitors get the plain document flow with nothing pinned or hidden.
 */
export const ServicesIndex = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const root = sectionRef.current;
      const stack = stackRef.current;
      if (cancelled || !root || !stack) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
          const markers = Array.from(root.querySelectorAll<HTMLElement>("[data-marker]"));
          const figures = Array.from(root.querySelectorAll<HTMLElement>("[data-figure]"));
          if (panels.length < 2) return;

          const steps = panels.length - 1;

          // Take the panels out of flow only now, so the fallback stays intact.
          gsap.set(stack, { height: "calc(100svh - var(--site-header-height))" });
          gsap.set(panels, { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" });
          gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 0 });
          gsap.set(markers.slice(1), { autoAlpha: 0.25 });

          const tl = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: `+=${steps * 100}%`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, index) => {
            if (index === 0) return;
            const at = index - 1;

            // Outgoing panel drifts up and clears; incoming rises to meet it.
            tl.to(panels[index - 1], { yPercent: -20, autoAlpha: 0, scale: 0.98 }, at)
              .to(panel, { yPercent: 0, autoAlpha: 1 }, at)
              .fromTo(figures[index], { scale: 0.9 }, { scale: 1 }, at)
              .to(markers[index - 1], { autoAlpha: 0.25 }, at)
              .to(markers[index], { autoAlpha: 1 }, at);
          });

          // Continuous transforms across the whole scrub.
          tl.to(figures, { rotate: 140, duration: steps }, 0);
          tl.fromTo(
            barRef.current,
            { scaleX: 1 / panels.length },
            { scaleX: 1, duration: steps },
            0,
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
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
      <div className="grid lg:grid-cols-2">
        {/* Left — the statement, held in place for the whole scrub */}
        <div className="panel-grey flex flex-col justify-between p-16 lg:min-h-[calc(100svh-var(--site-header-height))] lg:p-28">
          <div>
            <h2 className="text-headline-40">
              <Lines lines={["Here's what", "YouLink does to", "your brand"]} />
            </h2>

            {/* Index markers — track the active capability */}
            <ol className="mt-56 hidden lg:block" aria-hidden="true">
              {services.map((service, index) => (
                <li
                  key={service.id}
                  data-marker
                  className="flex items-baseline gap-16 border-t border-theme-fg/15 py-10 font-mono text-caption-10 uppercase"
                >
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span>{service.title}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-40">
            {/* Scrub progress */}
            <span className="mb-24 hidden h-2 w-full bg-ink/15 lg:block" aria-hidden="true">
              <span ref={barRef} className="block h-full origin-left scale-x-0 bg-ink" />
            </span>

            <p className="max-w-prose text-body-10">
              We help businesses create a strong digital presence that looks professional, builds
              trust, and drives growth.
            </p>

            <Link
              to="/hire"
              className="pill mt-28 w-fit"
            >
              Talk to the studio
              <ArrowRightGlyph className="size-14 transition-transform duration-300 ease-out group-hover:translate-x-4" />
            </Link>
          </div>
        </div>

        {/* Right — the panels the scroll moves through. Each carries its own
            ground, so advancing the stack shifts the section between dark and
            light rather than only swapping text. */}
        <div
          ref={stackRef}
          className="surface relative overflow-hidden border-t lg:border-l lg:border-t-0"
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              data-panel
              className={cn(
                "relative grid content-center gap-24 border-b p-16 last:border-b-0",
                "lg:grid-cols-12 lg:gap-20 lg:border-b-0 lg:p-28",
                index % 2 === 0 ? "panel-ink" : "surface",
              )}
            >
              <div className="relative z-10 flex gap-16 lg:col-span-6">
                <span className="index-number pt-8">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="serif-accent text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1]">
                  {service.title}
                </h3>
              </div>

              <p className="relative z-10 max-w-prose text-body-10 opacity-80 lg:col-span-6">
                {service.summary}
              </p>

              <div data-figure className="relative lg:col-span-6">
                {/* Soft mass of light behind the geometry */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "orb pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2",
                    index % 2 === 1 && "orb-accent",
                  )}
                />
                <WireFigure variant={index} />
              </div>

              <ul className="flex flex-col justify-end gap-8 lg:col-span-6">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="spec-item">
                    {capability}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

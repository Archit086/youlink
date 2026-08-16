import { useEffect, useRef } from "react";
import { metrics } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven proof panels.
 *
 * The section pins and a scrubbed timeline brings each panel up in turn — the
 * panel wipes in from its own baseline while its number counts up, both tied
 * directly to scroll position. Because the count is a scrubbed tween rather
 * than a one-shot animation, scrolling back up counts the numbers down again.
 *
 * Progressive enhancement: the markup is a plain grid of panels with the final
 * values already in the DOM. GSAP only takes over inside a matchMedia query for
 * large viewports with motion allowed.
 */
const columns = [
  { tone: "panel-accent", offset: "lg:mt-0", height: "lg:min-h-[64svh]" },
  { tone: "panel-ink", offset: "lg:mt-[12svh]", height: "lg:min-h-[44svh]" },
  { tone: "panel-grey", offset: "lg:mt-[5svh]", height: "lg:min-h-[54svh]" },
];

export const MetricsBand = () => {
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

        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
          const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
          if (!panels.length) return;

          gsap.set(panels, { yPercent: 12, autoAlpha: 0, clipPath: "inset(100% 0 0 0)" });
          counters.forEach((counter) => {
            const target = Number(counter.dataset.count ?? "0");
            counter.textContent = "0".padStart(String(target).length, "0");
          });

          const tl = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: `+=${panels.length * 90}%`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, index) => {
            const at = index * 0.75;

            tl.to(panel, { yPercent: 0, autoAlpha: 1, clipPath: "inset(0% 0 0 0)" }, at);

            const counter = counters[index];
            if (!counter) return;

            const target = Number(counter.dataset.count ?? "0");
            const pad = String(target).length;
            const value = { current: 0 };

            // A scrubbed tween, so the count reverses with the scroll.
            tl.to(
              value,
              {
                current: target,
                onUpdate: () => {
                  counter.textContent = String(Math.round(value.current)).padStart(pad, "0");
                },
              },
              at,
            );
          });

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
    // data-field: the staggered offsets leave gaps between panels, and the
    // particle background is meant to show through them.
    <section ref={sectionRef} data-field aria-label="YouLink in numbers" className="border-b">
      <dl className="grid lg:grid-cols-3 lg:items-start">
        {metrics.map((metric, index) => {
          const column = columns[index % columns.length];
          return (
            <div
              key={metric.label}
              data-panel
              className={cn(column.offset, index > 0 && "border-t lg:border-l lg:border-t-0")}
            >
              <div
                className={cn(
                  "flex min-h-[38svh] flex-col justify-between p-12 lg:p-20",
                  column.height,
                  column.tone,
                )}
              >
                <dd className="text-digit-30 tabular-nums">
                  <span data-count={metric.value}>{metric.value}</span>
                </dd>

                <div className="mt-40">
                  <dt className="text-body-20">{metric.label}</dt>
                  <p className="mt-8 max-w-prose font-mono text-caption-10 uppercase opacity-60">
                    {metric.note}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

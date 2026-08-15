import { useEffect, useRef, useState } from "react";
import { metrics } from "@/data/site";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Counts to a whole number once in view, preserving any leading zeros. */
const CountUp = ({ value, inView }: { value: string; inView: boolean }) => {
  const target = Number(value);
  const [display, setDisplay] = useState(() => (Number.isNaN(target) ? value : "0".repeat(value.length)));
  const frame = useRef<number>();

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(target * eased)).padStart(value.length, "0"));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [inView, target, value]);

  return (
    <span className="tabular-nums">
      {Number.isNaN(target) ? value : display}
    </span>
  );
};

/**
 * Three colour panels at unequal heights and offsets. Each panel scales from
 * 0.95 → 1 and wipes in with clip-path as it enters view on a stagger,
 * like Aspen Search's stat cards.
 */
const columns = [
  { tone: "panel-accent", offset: "lg:mt-0", height: "lg:min-h-[64svh]" },
  { tone: "panel-ink", offset: "lg:mt-[12svh]", height: "lg:min-h-[44svh]" },
  { tone: "panel-grey", offset: "lg:mt-[5svh]", height: "lg:min-h-[54svh]" },
];

export const MetricsBand = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visiblePanels, setVisiblePanels] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisiblePanels([true, true, true]);
      return;
    }

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        gsap.fromTo(
          panel,
          {
            clipPath: "inset(100% 0 0 0)",
            scale: 0.95,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1,
            delay: index * 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              once: true,
              onEnter: () => {
                setVisiblePanels((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              },
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="YouLink in numbers" className="border-b">
      <dl className="grid lg:grid-cols-3 lg:items-start">
        {metrics.map((metric, index) => {
          const column = columns[index % columns.length];
          return (
            <div
              key={metric.label}
              ref={(el) => { panelRefs.current[index] = el; }}
              className={cn(column.offset, index > 0 && "border-t lg:border-l lg:border-t-0")}
            >
              <div
                className={cn(
                  "flex min-h-[38svh] flex-col justify-between p-12 lg:p-20",
                  column.height,
                  column.tone,
                )}
              >
                <dd className="text-digit-30">
                  <CountUp value={metric.value} inView={visiblePanels[index]} />
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

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/data/site";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";

/** Counts to a whole number once in view, preserving any leading zeros. */
const CountUp = ({ value }: { value: string }) => {
  const target = Number(value);
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
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
    <span ref={ref} className="tabular-nums">
      {Number.isNaN(target) ? value : display}
    </span>
  );
};

/**
 * Three colour panels at unequal heights and offsets.
 *
 * Not sticky — pinning them left large dead gaps and read as stuck rather than
 * as motion. Each panel instead wipes up as it enters view, on a stagger, so
 * the numbers arrive one after another while the page keeps scrolling normally.
 */
const columns = [
  { tone: "panel-accent", offset: "lg:mt-0", height: "lg:min-h-[64svh]" },
  { tone: "panel-ink", offset: "lg:mt-[12svh]", height: "lg:min-h-[44svh]" },
  { tone: "panel-grey", offset: "lg:mt-[5svh]", height: "lg:min-h-[54svh]" },
];

export const MetricsBand = () => (
  <section aria-label="YouLink in numbers" className="border-b">
    <dl className="grid lg:grid-cols-3 lg:items-start">
      {metrics.map((metric, index) => {
        const column = columns[index % columns.length];
        return (
          <Reveal
            key={metric.label}
            variant="wipe"
            delay={index * 160}
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
                <CountUp value={metric.value} />
              </dd>

              <div className="mt-40">
                <dt className="text-body-20">{metric.label}</dt>
                <p className="mt-8 max-w-prose font-mono text-caption-10 uppercase opacity-60">
                  {metric.note}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </dl>
  </section>
);

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  /** Rendered twice per track so the loop stays seamless on wide displays. */
  items: ReactNode[];
  className?: string;
  /** Seconds for one full pass. */
  duration?: number;
  label?: string;
}

/**
 * Two identical tracks, each translating 0 → -100% at a linear rate.
 * Pauses on hover. Under reduced motion the animation stops and the strip
 * becomes horizontally pannable instead — the content stays reachable.
 */
export const Marquee = ({ items, className, duration = 42, label }: MarqueeProps) => {
  const track = [...items, ...items];

  return (
    <div
      className={cn("marquee", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      role="group"
      aria-label={label}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>
          {track.map((item, index) => (
            <div key={`${copy}-${index}`} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

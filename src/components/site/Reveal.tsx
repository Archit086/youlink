import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  /**
   * "lines" — children marked `.reveal-inner` rise out of their own baseline.
   * "wipe"  — the block is revealed with a clip-path inset, not a fade.
   */
  variant?: "lines" | "wipe";
  as?: ElementType;
  id?: string;
}

/**
 * Scroll reveal. Sets data-visible on the wrapper once in view; the CSS in
 * index.css drives the mask. Reduced-motion visitors are marked visible
 * immediately and the transforms are neutralised.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  variant = "lines",
  as: Tag = "div",
  id,
}: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Component = Tag as ElementType;

  return (
    <Component
      id={id}
      ref={ref}
      data-visible={inView}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(variant === "wipe" && "reveal-wipe", className)}
    >
      {children}
    </Component>
  );
};

interface LinesProps {
  /** Each entry becomes one masked line. */
  lines: ReactNode[];
  className?: string;
  /** Milliseconds between line entrances. */
  stagger?: number;
  as?: ElementType;
}

/**
 * Display type, split into lines. Each line sits in an overflow-hidden mask and
 * rises from below its own baseline, so letters appear to come up out of the
 * rule beneath them rather than fading in mid-air.
 */
export const Lines = ({ lines, className, stagger = 60, as: Tag = "span" }: LinesProps) => {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const Component = Tag as ElementType;

  return (
    <Component ref={ref} data-visible={inView} className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={index} className="reveal-mask block">
          <span
            className="reveal-inner"
            style={{ "--reveal-delay": `${index * stagger}ms` } as React.CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
};

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CornerBadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * A label notched into the top-right corner of a panel. It carries only a
 * bottom and left rule, so it reads as cut out of the panel edge rather than
 * placed on top of it, and inverts when the panel (its `peer`) is hovered.
 */
export const CornerBadge = ({ children, className }: CornerBadgeProps) => (
  <span
    className={cn(
      "absolute right-0 top-0 z-10 border-b border-l bg-theme-bg p-10",
      "font-mono text-caption-10 uppercase text-theme-fg",
      "transition-colors duration-800 ease-out",
      "peer-hover:bg-theme-fg peer-hover:text-theme-bg",
      className,
    )}
  >
    {children}
  </span>
);

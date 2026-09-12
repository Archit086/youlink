import { useMemo, type CSSProperties, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds before the tween starts once the element is in view. */
  delay?: number;
  duration?: number;
  /** Starting offset, in pixels. */
  x?: number;
  y?: number;
}

/**
 * The one reveal primitive in the system: an in-view fade with a directional
 * offset. It plays once and never replays, so scrolling back up does not
 * re-animate a section the visitor has already read.
 */
export const FadeIn = ({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) => {
  // motion.create() is memoised per element type — calling it during render on
  // every pass would remount the subtree each time.
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
};

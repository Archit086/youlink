import { useEffect, useState } from "react";
import GenerativeTree from "@/components/ui/generative-tree";

/**
 * The fixed backdrop behind every inner page: a generative tree that grows once
 * and stays until the visitor moves to another page, which mounts a fresh one.
 * It never takes clicks, and visitors who prefer reduced motion get it paused.
 */
export const TreeBackground = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;

    setReduceMotion(query.matches);
    const update = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return (
    <GenerativeTree
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
      speed={reduceMotion ? 0 : 1}
      opacity={0.75}
    />
  );
};

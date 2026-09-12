import { useEffect, useRef, useState } from "react";
import { showcaseTiles } from "@/data/media";

const rowOne = showcaseTiles.slice(0, 11);
const rowTwo = showcaseTiles.slice(11);

/** Tripled so the strip stays filled however far the scroll drags it. */
const triple = <T,>(items: readonly T[]) => [...items, ...items, ...items];

const Tile = ({ src }: { src: string }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    loading="lazy"
    className="rounded-2xl object-cover"
    style={{ width: 420, height: 270, flex: "0 0 auto" }}
  />
);

/**
 * Two counter-running strips of work, driven by scroll position rather than a
 * timer — the rows only move while the visitor does. Purely decorative, so the
 * whole block is hidden from assistive tech.
 */
export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const node = sectionRef.current;
      if (!node) return;

      const sectionTop = node.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const shift = offset - 200;

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(calc(-33.333% + ${shift}px))`, willChange: "transform" }}
        >
          {triple(rowOne).map((src, index) => (
            <Tile key={`row-one-${index}`} src={src} />
          ))}
        </div>

        <div
          className="flex gap-3"
          style={{ transform: `translateX(calc(-33.333% - ${shift}px))`, willChange: "transform" }}
        >
          {triple(rowTwo).map((src, index) => (
            <Tile key={`row-two-${index}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
};

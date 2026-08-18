import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxMediaProps {
  src: string;
  alt?: string;
  className?: string;
  /** Drift distance in pixels, applied ± around centre. */
  distance?: number;
}

/**
 * An image that drifts slower than its frame as it passes the viewport.
 *
 * The frame crops, the media is overscaled in CSS so the drift never exposes an
 * edge, and GSAP scrubs the inner element between -distance and +distance. Set
 * up as progressive enhancement: without JS the image is simply a cropped,
 * slightly overscaled still.
 */
export const ParallaxMedia = ({ src, alt = "", className, distance = 50 }: ParallaxMediaProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const frame = frameRef.current;
      const media = mediaRef.current;
      if (cancelled || !frame || !media) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const tween = gsap.fromTo(
            media,
            { y: -distance },
            {
              y: distance,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });

        return () => mm.revert();
      }, frameRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [distance]);

  return (
    <div ref={frameRef} className={cn("parallax-frame", className)}>
      <img
        ref={mediaRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="parallax-media saturate-[0.35] transition-[filter,scale] duration-900 ease-out group-hover:saturate-100"
      />
    </div>
  );
};

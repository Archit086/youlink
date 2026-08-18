import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Marquee } from "@/components/site/Marquee";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { brand, clients } from "@/data/site";

/**
 * A full-viewport typographic composition in three stacked layers:
 *
 *   z-1  organic masses, morphing in CSS
 *   z-2  the wordmark, opaque, punching through them
 *   z-3  the UI — tagline, CTA, standing bar
 *
 * The masses paint in `--theme-fg`, so the composition inverts with the theme
 * rather than being locked to black.
 *
 * Entrance is a GSAP timeline on mount (not scroll-triggered), applied only at
 * lg with motion allowed. The markup renders fully visible, so mobile and
 * reduced-motion visitors simply see the finished composition.
 */
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  /**
   * Cursor-tracked reveal: the texture layer is masked to a soft disc that
   * follows the pointer, so the artwork appears around the letters as you move
   * across the wordmark and closes again when you leave. Pointer position is
   * written to CSS custom properties inside a rAF, so the mask updates on the
   * compositor rather than through React state.
   */
  useEffect(() => {
    const section = sectionRef.current;
    const layer = videoRef.current;
    if (!section || !layer) return;

    // Touch devices have no cursor; CSS shows the texture outright there.
    if (!window.matchMedia?.("(hover: hover)").matches) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      layer.style.setProperty("--mx", `${pending.x}px`);
      layer.style.setProperty("--my", `${pending.y}px`);
      pending = null;
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pending = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      layer.style.setProperty("--reveal-r", "clamp(220px, 24vw, 420px)");
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      layer.style.setProperty("--reveal-r", "0px");
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const { gsap } = await import("gsap");

      const root = sectionRef.current;
      if (cancelled || !root) return;

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        const query = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline();

          tl.from(query("[data-hero-blob]"), {
            scale: 0,
            autoAlpha: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
            transformOrigin: "50% 50%",
          })
            .from(
              "[data-hero-wordmark]",
              {
                clipPath: "inset(100% 0 0 0)",
                duration: 1.2,
                ease: "power4.out",
              },
              0.3,
            )
            .from(
              "[data-hero-tagline]",
              { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out" },
              0.8,
            )
            .from("[data-hero-cta]", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 1)
            .from("[data-hero-bar]", { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 1.2);

          return () => tl.kill();
        });

        // Below lg: a plain fade, no clip-path.
        mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
          const tween = gsap.from(
            query("[data-hero-blob], [data-hero-wordmark], [data-hero-tagline], [data-hero-cta], [data-hero-bar]"),
            { autoAlpha: 0, duration: 0.8, ease: "power2.out", stagger: 0.08 },
          );

          return () => tween.kill();
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
    <>
      <section
        ref={sectionRef}
        className="hero-light relative h-[100svh] w-full overflow-hidden border-b"
      >
        {/* Layer 1a — the masses */}
        <div className="hero-blob-container" aria-hidden="true">
          <div data-hero-blob className="hero-blob hero-blob--1" />
          <div data-hero-blob className="hero-blob hero-blob--2" />
          <div data-hero-blob className="hero-blob hero-blob--3" />
        </div>

        {/* Layer 1b — the texture, revealed around the cursor */}
        <div ref={videoRef} className="hero-video" aria-hidden="true">
          <video src="/media/hero-texture.mp4" autoPlay muted loop playsInline preload="metadata" />
        </div>

        {/* Layer 2 — the wordmark */}
        <div className="hero-wordmark">
          <h1 data-hero-wordmark className="hero-wordmark-text">
            YouLink
          </h1>
        </div>

        {/* Layer 3 — the UI */}
        <div className="hero-overlay">
          <div className="hero-overlay-top">
            <p data-hero-tagline className="hero-tagline">
              {brand.tagline}
            </p>

            <Link data-hero-cta to="/hire" className="pill mt-24">
              Start a project
              <ArrowRightGlyph className="size-14" />
            </Link>
          </div>

          <div data-hero-bar className="hero-overlay-bottom font-mono">
            <span>Creative platform in India</span>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="link-wipe"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* The positioning and the roster, carried over from the previous hero so
          the copy and client marquee are not lost with the layout change. */}
      <section className="border-b">
        <div className="grid lg:grid-cols-2">
          <div className="panel-ink flex flex-col justify-between border-b p-16 lg:border-b-0 lg:p-28">
            <p className="serif-accent max-w-[20ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2]">
              We don't just create content or run ads — we build brands from the ground up.
            </p>

            <Link to="/hire" className="pill mt-40 w-fit">
              Start a project
              <ArrowRightGlyph className="size-14" />
            </Link>
          </div>

          <div className="panel-accent flex flex-col justify-between p-16 lg:border-l lg:p-28">
            <p className="max-w-prose text-body-20">{brand.positioning}</p>

            <div className="mt-40">
              <p className="label-serif">( Working with )</p>
              <div className="mt-16 border-t border-ink/15 pt-16">
                <Marquee
                  label="Selected clients"
                  duration={52}
                  items={clients.map((client) => (
                    <span
                      key={client.id}
                      className="flex items-center gap-24 whitespace-nowrap pr-24 font-mono text-caption-20 uppercase"
                    >
                      {client.name}
                      <span className="opacity-40">/</span>
                    </span>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

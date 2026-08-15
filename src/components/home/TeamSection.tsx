import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { team, teamIsPlaceholder } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { CornerBadge } from "@/components/site/CornerBadge";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Portraits in a ruled row: greyscale image, role notched into the top-right
 * corner, and a solid name band beneath. The last card inverts so the row
 * doesn't read as four identical tiles.
 *
 * GSAP ScrollTrigger drives:
 * — Team cards wipe up with staggered clip-path
 * — Photos have subtle parallax (image moves slower than card)
 */
export const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Description fades up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Team cards stagger wipe-up + scale
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".team-card");
        gsap.fromTo(
          cards,
          { clipPath: "inset(100% 0 0 0)", scale: 0.95 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );

        // Parallax on photos inside each card
        const photos = gridRef.current.querySelectorAll(".team-photo");
        photos.forEach((photo) => {
          gsap.fromTo(
            photo,
            { y: 20, scale: 1.08 },
            {
              y: -20,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: photo.closest(".team-card") || photo,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b">
      <div className="flex flex-wrap items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">07</span>
        <span className="label">Team</span>
        {teamIsPlaceholder && (
          <span className="ml-auto bg-accent px-8 py-4 font-mono text-caption-10 uppercase text-ink">
            Placeholder — replace before launch
          </span>
        )}
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-30">
            <Lines lines={["Skilled teams,", "working under", "supervision"]} />
          </h2>
        </div>
        <div ref={descRef} className="cell border-t lg:border-l lg:border-t-0">
          <p className="max-w-prose text-body-20 opacity-70">
            Projects are run by supervisors, not handed to a stranger and hoped for. When you talk to
            YouLink, you're talking to the people accountable for the delivery.
          </p>
        </div>
      </div>

      <ul ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, index) => {
          const isLast = index === team.length - 1;
          return (
            <li
              key={member.id}
              className={cn(
                "team-card group border-t sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l",
                "lg:border-t-0 lg:[&:not(:first-child)]:border-l",
              )}
            >
              <div className="peer relative aspect-[4/5] overflow-hidden border-b">
                <img
                  src={member.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="team-photo h-full w-full object-cover grayscale transition-transform duration-800 ease-out group-hover:scale-110"
                />
                <CornerBadge>{member.role}</CornerBadge>
              </div>

              <div
                className={cn(
                  "flex items-end justify-between gap-16 p-12 transition-colors duration-800 ease-out lg:p-16",
                  isLast ? "bg-ink text-accent" : "bg-accent text-ink",
                )}
              >
                <div>
                  <p className="text-headline-10 leading-none">{member.name}</p>
                  <p className="mt-8 font-mono text-caption-10 uppercase opacity-70">{member.focus}</p>
                </div>
                <ArrowRightGlyph className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-4" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

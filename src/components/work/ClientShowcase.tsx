import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clients } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { TextGlitch } from "@/components/ui/text-glitch-effect";

/**
 * A title band over a three-column index: the active client's mark and counter
 * on the left, the standing statement in the middle, and the selectable roster
 * on the right. Selection follows the scroll and the pointer both.
 */
export const ClientShowcase = () => {
  const [activeId, setActiveId] = useState(clients[0].id);
  const rosterRef = useRef<HTMLUListElement>(null);
  /** Set while the pointer is driving selection, so scroll doesn't fight it. */
  const pointerHeld = useRef(false);

  const activeIndex = Math.max(
    0,
    clients.findIndex((client) => client.id === activeId),
  );
  const active = clients[activeIndex];

  const initials = active.name
    .replace(/[^A-Za-z\s.]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  /**
   * Each row owns a slice of the section's scroll range, so the detail panel
   * changes as the roster passes the upper middle of the viewport and reverses
   * on the way back up.
   */
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const roster = rosterRef.current;
      if (cancelled || !roster) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const rows = Array.from(roster.querySelectorAll<HTMLElement>("[data-row]"));

          const triggers = rows.map((row, index) =>
            ScrollTrigger.create({
              trigger: row,
              start: "top 60%",
              end: "bottom 60%",
              onEnter: () => !pointerHeld.current && setActiveId(clients[index].id),
              onEnterBack: () => !pointerHeld.current && setActiveId(clients[index].id),
            }),
          );

          return () => triggers.forEach((trigger) => trigger.kill());
        });

        return () => mm.revert();
      }, rosterRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section className="border-b">
      {/* Title band — display type against a texture panel */}
      <div className="grid border-b lg:grid-cols-2">
        <div className="p-12 lg:p-20">
          <h2 className="text-headline-50">
            <Lines lines={["Clients"]} />
          </h2>
        </div>
        <div
          className="halftone-fade min-h-[22svh] border-t lg:border-l lg:border-t-0"
          aria-hidden="true"
        />
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left — label, active client, and its mark */}
        <div className="flex flex-col border-b lg:col-span-3 lg:border-b-0 lg:border-r">
          <div className="p-12 lg:p-20">
            <p className="spec-item">Who we work with</p>
          </div>

          <div className="mt-auto">
            <div className="flex items-baseline justify-between gap-16 px-12 pb-12 lg:px-20">
              <span className="label truncate">{active.name}</span>
              <span className="label shrink-0 tabular-nums opacity-60">
                {String(activeIndex + 1).padStart(2, "0")} — {String(clients.length).padStart(2, "0")}
              </span>
            </div>

            <div className="panel-accent flex aspect-[16/10] items-center justify-center border-t lg:aspect-[4/3]">
              <span className="text-headline-40" aria-hidden="true">
                {initials}
              </span>
            </div>
          </div>
        </div>

        {/* Middle — the standing statement */}
        <div className="flex flex-col border-b p-12 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-20">
          <p className="max-w-prose text-body-10">
            We've worked with brands across diverse industries — from fashion and food to healthcare,
            retail, jewellery, and industrial sectors. Legacy names with decades of trust, new cafés
            finding an audience, and platforms we built a digital identity for from scratch.
          </p>

          <Link
            to="/hire"
            className="group mt-24 inline-flex w-fit items-center gap-24 bg-theme-fg px-16 py-12 font-mono text-caption-10 uppercase text-theme-bg transition-colors duration-800 ease-out hover:bg-accent hover:text-ink"
          >
            Work with us
            <ArrowRightGlyph className="size-14 transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>

          <p className="mt-auto max-w-prose border-t pt-16 text-body-10 opacity-70">
            {active.engagement}
          </p>
        </div>

        {/* Right — the roster */}
        <ul ref={rosterRef} className="lg:col-span-5">
          {clients.map((client, index) => {
            const isActive = client.id === activeId;
            return (
              <li key={client.id} data-row className="border-b last:border-b-0">
                <button
                  type="button"
                  onMouseEnter={() => {
                    pointerHeld.current = true;
                    setActiveId(client.id);
                  }}
                  onMouseLeave={() => {
                    pointerHeld.current = false;
                  }}
                  onFocus={() => setActiveId(client.id)}
                  onClick={() => setActiveId(client.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full flex-wrap items-center justify-between gap-x-20 gap-y-4 px-12 py-12 text-left",
                    "transition-colors duration-300 ease-out lg:px-20",
                    isActive && "bg-theme-fg text-theme-bg",
                  )}
                >
                  <TextGlitch
                    as="span"
                    text={client.name}
                    trigger="inView"
                    delay={index * 0.04}
                    typeClassName="text-body-20 font-book text-current"
                    className="block min-w-0 flex-1 truncate border-b-0 bg-none leading-none"
                  />

                  <span className="shrink-0 font-mono text-caption-10 uppercase opacity-60">
                    {client.sector}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

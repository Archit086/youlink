import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clients } from "@/data/site";
import { Lines } from "@/components/site/Reveal";
import { ArrowRightGlyph } from "@/components/site/Glyphs";
import { TextGlitch } from "@/components/ui/text-glitch-effect";

/**
 * A selectable index of client names. The active row inverts; the panel on the
 * left carries that client's profile and the work we did. There are no client
 * marks to publish, so the detail panel is set in type and the client's initials.
 */
export const ClientShowcase = () => {
  const [activeId, setActiveId] = useState(clients[0].id);
  const active = clients.find((client) => client.id === activeId) ?? clients[0];

  const initials = active.name
    .replace(/[^A-Za-z\s.]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section className="border-b">
      <div className="flex flex-wrap items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">04</span>
        <span className="label">Who we work with</span>
        <Link to="/work" className="link-wipe ml-auto font-mono text-caption-10 uppercase">
          All work
        </Link>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Detail panel */}
        <div className="border-b lg:col-span-3 lg:border-b-0 lg:border-r">
          <div className="pin flex h-full flex-col">
            <div className="p-12 lg:p-20">
              <p className="label opacity-60">{active.sector}</p>
              <p className="mt-16 max-w-prose text-body-10 opacity-80">{active.profile}</p>
              <p className="mt-20 border-t pt-16 max-w-prose text-body-10 opacity-80">
                {active.engagement}
              </p>
              {active.handle && (
                <p className="mt-20 font-mono text-caption-10 uppercase opacity-60">{active.handle}</p>
              )}
            </div>

            <div className="panel-ink mt-auto flex aspect-[4/3] items-center justify-center border-t lg:aspect-auto lg:flex-1">
              <span className="text-headline-40" aria-hidden="true">
                {initials}
              </span>
            </div>
          </div>
        </div>

        {/* Statement */}
        <div className="cell border-b lg:col-span-4 lg:border-b-0 lg:border-r">
          <h2 className="text-headline-20">
            <Lines lines={["Brands across", "six industries"]} />
          </h2>
          <p className="mt-24 max-w-prose text-body-10 opacity-70">
            We've worked with brands across diverse industries — from fashion and food to healthcare,
            retail, jewellery, and industrial sectors. Legacy names with decades of trust, new cafés
            finding an audience, and platforms we built a digital identity for from scratch.
          </p>

          <Link
            to="/hire"
            className="group mt-24 inline-flex items-center gap-24 bg-theme-fg px-16 py-12 font-mono text-caption-10 uppercase text-theme-bg transition-colors duration-800 ease-out hover:bg-accent hover:text-ink"
          >
            Work with us
            <ArrowRightGlyph className="size-14 transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>
        </div>

        {/* The roster — names settle into place as the section scrolls into view */}
        <ul className="lg:col-span-5">
          {clients.map((client, index) => {
            const isActive = client.id === activeId;
            return (
              <li key={client.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(client.id)}
                  onFocus={() => setActiveId(client.id)}
                  onClick={() => setActiveId(client.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full flex-wrap items-center justify-between gap-x-20 gap-y-4 px-12 py-12 text-left",
                    "transition-colors duration-300 ease-out lg:px-20",
                    isActive && "bg-theme-fg text-theme-bg",
                  )}
                >
                  {/* Settles into the real name as the section scrolls into view. */}
                  <TextGlitch
                    as="span"
                    text={client.name}
                    trigger="inView"
                    delay={index * 0.04}
                    typeClassName="text-body-20 font-book text-current"
                    // `block` overrides the component's flex container so
                    // `truncate` can actually ellipsize a long name.
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

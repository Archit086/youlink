import { cn } from "@/lib/utils";
import { team, teamIsPlaceholder } from "@/data/site";
import { Lines, Reveal } from "@/components/site/Reveal";
import { CornerBadge } from "@/components/site/CornerBadge";
import { ArrowRightGlyph } from "@/components/site/Glyphs";

/**
 * Portraits in a ruled row: greyscale image, role notched into the top-right
 * corner, and a solid name band beneath. The last card inverts so the row
 * doesn't read as four identical tiles.
 *
 * NOTE: the people here are placeholders — see `teamIsPlaceholder` in
 * src/data/site.ts. The banner below is deliberately visible so this cannot be
 * shipped unnoticed.
 */
export const TeamSection = () => (
  <section className="border-b">
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
      <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
        <p className="max-w-prose text-body-20 opacity-70">
          Projects are run by supervisors, not handed to a stranger and hoped for. When you talk to
          YouLink, you're talking to the people accountable for the delivery.
        </p>
      </Reveal>
    </div>

    <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member, index) => {
        const isLast = index === team.length - 1;
        return (
          <Reveal
            as="li"
            key={member.id}
            delay={index * 80}
            className={cn(
              "group border-t sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l",
              "lg:border-t-0 lg:[&:not(:first-child)]:border-l",
            )}
          >
            <div className="peer relative aspect-[4/5] overflow-hidden border-b">
              <img
                src={member.photo}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-transform duration-800 ease-out group-hover:scale-110"
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
          </Reveal>
        );
      })}
    </ul>
  </section>
);

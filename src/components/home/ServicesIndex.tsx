import { Link } from "react-router-dom";
import { services } from "@/data/site";
import { Lines, Reveal } from "@/components/site/Reveal";
import { WireFigure, ArrowRightGlyph } from "@/components/site/Glyphs";

/**
 * A sticky grey statement pinned beside a dark stack of numbered capabilities.
 * Each entry pairs an index, a two-line title, a paragraph, a wire figure and
 * a mono spec list marked with accent squares.
 */
export const ServicesIndex = () => (
  <section className="border-b">
    <div className="grid lg:grid-cols-2">
      {/* Left — pinned statement */}
      <div className="panel-grey pin-full flex flex-col justify-between p-12 lg:p-20">
        <h2 className="text-headline-40">
          <Lines lines={["Here's what", "YouLink does to", "your brand"]} />
        </h2>

        <div className="mt-40">
          <p className="max-w-prose text-body-10">{`We help businesses create a strong digital presence that looks professional, builds trust, and drives growth.`}</p>

          <Link
            to="/hire"
            className="group mt-24 inline-flex items-center gap-24 bg-ink px-16 py-12 font-mono text-caption-10 uppercase text-white transition-colors duration-800 ease-out hover:bg-accent hover:text-ink"
          >
            Talk to the studio
            <ArrowRightGlyph className="size-14 transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>
        </div>
      </div>

      {/* Right — dark capability stack */}
      <div className="panel-ink border-t lg:border-l lg:border-t-0">
        {services.map((service, index) => (
          <Reveal
            key={service.id}
            delay={index * 60}
            className="grid gap-24 border-b p-12 last:border-b-0 lg:grid-cols-12 lg:gap-20 lg:p-20"
          >
            <div className="flex gap-16 lg:col-span-6">
              <span className="index-number pt-8">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-headline-10">{service.title}</h3>
            </div>

            <p className="max-w-prose text-body-10 opacity-80 lg:col-span-6">{service.summary}</p>

            <div className="lg:col-span-6">
              <WireFigure variant={index} />
            </div>

            <ul className="flex flex-col justify-end gap-8 lg:col-span-6">
              {service.capabilities.map((capability) => (
                <li key={capability} className="spec-item">
                  {capability}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

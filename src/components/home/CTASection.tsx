import { Link } from "react-router-dom";
import { Lines } from "@/components/site/Reveal";
import { ArrowDiagonal, ArrowRightGlyph } from "@/components/site/Glyphs";
import { brand } from "@/data/site";

/**
 * The closing destination. An inverted panel carrying the invitation, a long
 * drawn arrow, and a thin accent edge — one idea and one action.
 */
export const CTASection = () => (
  <section className="panel-ink border-t">
    <div className="grid lg:grid-cols-2">
      {/* The wordmark, at scale */}
      <div className="flex min-h-[40svh] flex-col justify-between border-b p-16 lg:min-h-[78svh] lg:border-b-0 lg:p-28">
        <p className="label-serif">( {brand.tagline} )</p>
        <p className="text-headline-50" aria-hidden="true">
          YouLink
        </p>
      </div>

      {/* The invitation */}
      <div className="relative flex min-h-[40svh] flex-col justify-between p-16 lg:min-h-[78svh] lg:border-l lg:p-28">
        <h2 className="serif-accent text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1]">
          <Lines lines={["Have a brand in mind?", "Let's build it."]} stagger={90} />
        </h2>

        <ArrowDiagonal className="my-40 ml-auto w-[40%] max-w-200 opacity-70" />

        <div className="grid border-t border-theme-fg/15 sm:grid-cols-2">
          <Link
            to="/hire"
            className="group flex items-center justify-between gap-24 py-24 pr-16 font-mono text-caption-20 uppercase transition-opacity duration-500 hover:opacity-60"
          >
            Start a project
            <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>

          <Link
            to="/join"
            className="group flex items-center justify-between gap-24 border-t border-theme-fg/15 py-24 pr-16 font-mono text-caption-20 uppercase transition-opacity duration-500 hover:opacity-60 sm:border-l sm:border-t-0 sm:pl-16"
          >
            Join as freelancer
            <ArrowRightGlyph className="transition-transform duration-300 ease-out group-hover:translate-x-4" />
          </Link>
        </div>
      </div>
    </div>

    {/* Accent edge */}
    <div className="h-8 bg-accent" aria-hidden="true" />
  </section>
);

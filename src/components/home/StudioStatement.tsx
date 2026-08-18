import { Link } from "react-router-dom";
import { brand } from "@/data/site";
import { Lines, Reveal } from "@/components/site/Reveal";

/** Section 02 — what YouLink is, and how it is put together. */
export const StudioStatement = () => (
  <section id="studio" className="scroll-mt-[var(--site-header-height)] border-b">
    <div className="flex items-baseline gap-16 border-b border-theme-fg/15 px-16 py-18 lg:px-28">
      <span className="index-number">02</span>
      <span className="label-serif">( The studio )</span>
    </div>

    <div className="grid lg:grid-cols-3">
      {/* Pinned title against a scrolling body. */}
      <div className="cell pin lg:col-span-1">
        <h2 className="serif-accent text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.08]">
          <Lines lines={["Strategy,", "creativity,", "consistency."]} />
        </h2>
      </div>

      <div className="border-t border-theme-fg/15 lg:col-span-2 lg:border-l lg:border-t-0">
        <Reveal className="cell">
          <p className="text-body-30">{brand.reach}</p>
        </Reveal>

        <Reveal className="cell border-t border-theme-fg/15" delay={80}>
          <p className="label-serif">( The model )</p>
          <p className="mt-16 max-w-prose text-body-20">{brand.model}</p>
        </Reveal>

        <Reveal className="cell border-t border-theme-fg/15" delay={140}>
          <p className="label-serif">( Our goal )</p>
          <p className="mt-16 max-w-prose text-body-20">{brand.goal}</p>
          <Link to="/about" className="link-wipe mt-24 inline-block font-mono text-caption-10 uppercase">
            Read more about YouLink
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

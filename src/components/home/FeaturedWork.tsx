import { Link } from "react-router-dom";
import { clients, featuredClients } from "@/data/site";
import { Lines, Reveal } from "@/components/site/Reveal";
import { CaseCard } from "@/components/work/CaseCard";

/** Section 04 — a curated three, at deliberately different scales. */
export const FeaturedWork = () => {
  const [lead, ...supporting] = featuredClients;

  return (
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">05</span>
        <span className="label">Selected work</span>
        <Link to="/work" className="link-wipe ml-auto font-mono text-caption-10 uppercase">
          All {clients.length} brands
        </Link>
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-30">
            <Lines lines={["Legacy names,", "new cafés, and brands", "built from zero"]} />
          </h2>
        </div>
        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
          <p className="max-w-prose text-body-20 opacity-70">
            We've worked with brands across diverse industries — from fashion and food to healthcare,
            retail, jewellery, and industrial sectors.
          </p>
        </Reveal>
      </div>

      {lead && (
        <Reveal variant="wipe" className="border-b">
          <CaseCard client={lead} index="01" scale="feature" />
        </Reveal>
      )}

      <div className="grid lg:grid-cols-2">
        {supporting.map((client, index) => (
          <Reveal
            key={client.id}
            variant="wipe"
            delay={index * 90}
            className={index === 0 ? "border-b lg:border-b-0" : "lg:border-l"}
          >
            <CaseCard client={client} index={String(index + 2).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

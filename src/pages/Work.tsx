import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { Lines, Reveal } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";
import { CaseCard } from "@/components/work/CaseCard";
import { CTASection } from "@/components/home/CTASection";
import { clients, contentFormats, metrics, sectors } from "@/data/site";

const Work = () => {
  const lead = clients.find((client) => client.id === "chawlas") ?? clients[0];

  // The lead case is shown in full above, so it is not repeated in its sector.
  const groups = sectors
    .map((sector) => ({
      sector,
      items: clients.filter((client) => client.sector === sector && client.id !== lead.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Layout>
      {/* Page statement */}
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">01</span>
          <span className="label">Work</span>
        </div>

        <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
          <h1 className="text-headline-40">
            <Lines lines={[`${clients.length} brands.`, "Six industries."]} stagger={90} />
          </h1>
        </div>

        <div className="grid border-t lg:grid-cols-2">
          <Reveal className="cell">
            <p className="max-w-prose text-body-20 opacity-70">
              We've worked with brands across diverse industries — from fashion and food to
              healthcare, retail, jewellery, and industrial sectors. Legacy names, new cafés, and
              platforms we helped build from the ground up.
            </p>
          </Reveal>

          <dl className="grid border-t sm:grid-cols-3 lg:border-l lg:border-t-0">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-t p-12 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 lg:p-20">
                <dt className="order-2 font-mono text-caption-10 uppercase opacity-60">{metric.label}</dt>
                <dd className="order-1 text-digit-10">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Client index */}
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">02</span>
          <span className="label">Client index</span>
        </div>

        <ul>
          {clients.map((client, index) => (
            <Reveal
              as="li"
              key={client.id}
              delay={index * 35}
              className="flex flex-wrap items-baseline gap-x-20 gap-y-2 border-b px-12 py-12 font-mono text-caption-20 uppercase transition-colors duration-300 ease-out last:border-b-0 hover:bg-theme-fg hover:text-theme-bg lg:px-20"
            >
              <span className="w-24 shrink-0 tabular-nums opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="lg:w-280">{client.name}</span>
              <span className="basis-full pl-44 opacity-60 lg:basis-auto lg:flex-1 lg:pl-0">
                {client.sector}
              </span>
              {client.handle && <span className="hidden opacity-60 md:block">{client.handle}</span>}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Lead case */}
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">03</span>
          <span className="label">Featured</span>
        </div>
        <Reveal variant="wipe">
          <CaseCard client={lead} index="01" scale="feature" />
        </Reveal>
      </section>

      {/* Cases by sector */}
      {groups.map(({ sector, items }, sectorIndex) => (
        <section key={sector} className="border-b">
          <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
            <span className="index-number">{String(sectorIndex + 4).padStart(2, "0")}</span>
            <span className="label">{sector}</span>
            <span className="label-muted ml-auto">
              {items.length} {items.length === 1 ? "brand" : "brands"}
            </span>
          </div>

          <div className="grid lg:grid-cols-2">
            {items.map((client, index) => {
              // An odd trailing card takes the full width and steps up in scale.
              const isTrailingOdd = index === items.length - 1 && items.length % 2 === 1;
              return (
                <Reveal
                  key={client.id}
                  variant="wipe"
                  delay={index * 70}
                  className={cn(
                    "border-t first:border-t-0",
                    "lg:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(even)]:border-l",
                    isTrailingOdd && "lg:col-span-2 lg:border-l-0",
                  )}
                >
                  <CaseCard
                    client={client}
                    index={String(index + 1).padStart(2, "0")}
                    scale={isTrailingOdd ? "feature" : "standard"}
                  />
                </Reveal>
              );
            })}
          </div>
        </section>
      ))}

      {/* Output formats */}
      <section className="border-b">
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">07</span>
          <span className="label">Output</span>
        </div>

        <div className="grid border-b lg:grid-cols-2">
          <div className="cell">
            <h2 className="text-headline-30">
              <Lines lines={["Creative design work", "and reels"]} />
            </h2>
          </div>
          <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
            <p className="max-w-prose text-body-20 opacity-70">
              Alongside campaign and identity work, we produce the day-to-day content that keeps a
              brand visible.
            </p>
          </Reveal>
        </div>

        <ul className={gridColumns({ sm: 2, lg: 5 })}>
          {contentFormats.map((format, index) => (
            <Reveal
              as="li"
              key={format}
              delay={index * 60}
              className={cn("px-12 py-20 lg:px-20", cellRules(index, { sm: 2, lg: 5 }))}
            >
              <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-12 text-headline-10">{format}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Work;

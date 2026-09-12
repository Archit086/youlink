import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader, Panel, Section } from "@/components/site/Page";
import { ContactButton } from "@/components/site/Buttons";
import { CaseCard } from "@/components/work/CaseCard";
import { clients, clientsBySector, contentFormats, metrics } from "@/data/site";

const Work = () => (
  <Layout>
    <PageHeader
      eyebrow="01 — Work"
      title={`${clients.length} brands. Six industries.`}
      lead="We've worked with brands across diverse industries — from fashion and food to healthcare, retail, jewellery, and industrial sectors. Legacy names, new cafés, and platforms we helped build from the ground up."
    >
      <ContactButton to="/hire">Start a project</ContactButton>
    </PageHeader>

    <Section eyebrow="02 — By the numbers">
      <dl className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <FadeIn key={metric.label} delay={index * 0.08} y={30}>
            <Panel className="h-full">
              <dd
                className="display-sans"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
              >
                {metric.value}
              </dd>
              <dt className="mt-4 text-base font-medium text-[#D7E2EA]">{metric.label}</dt>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-60">
                {metric.note}
              </p>
            </Panel>
          </FadeIn>
        ))}
      </dl>
    </Section>

    <Section eyebrow="03 — Client index">
      <ul className="overflow-hidden rounded-[28px] border border-[#D7E2EA]/15 md:rounded-[36px]">
        {clients.map((client, index) => (
          <FadeIn
            as="li"
            key={client.id}
            delay={Math.min(index * 0.04, 0.4)}
            y={16}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-[#D7E2EA]/15 px-6 py-4 text-sm text-[#D7E2EA] transition-colors duration-300 first:border-t-0 hover:bg-[#D7E2EA]/[0.06]"
          >
            <span className="w-8 shrink-0 tabular-nums opacity-40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-medium md:w-64">{client.name}</span>
            <span className="basis-full pl-14 font-light opacity-50 md:basis-auto md:flex-1 md:pl-0">
              {client.sector}
            </span>
            {client.handle && (
              <span className="hidden font-light opacity-40 lg:block">{client.handle}</span>
            )}
          </FadeIn>
        ))}
      </ul>
    </Section>

    {clientsBySector.map(({ sector, items }, sectorIndex) => (
      <Section
        key={sector}
        eyebrow={`${String(sectorIndex + 4).padStart(2, "0")} — ${sector}`}
        title={`${items.length} ${items.length === 1 ? "brand" : "brands"}`}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((client, index) => (
            <CaseCard
              key={client.id}
              client={client}
              index={String(index + 1).padStart(2, "0")}
              delay={index * 0.07}
            />
          ))}
        </div>
      </Section>
    ))}

    <Section
      eyebrow="07 — Output"
      title="Creative design work and reels"
      lead="Alongside campaign and identity work, we produce the day-to-day content that keeps a brand visible."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {contentFormats.map((format, index) => (
          <FadeIn as="li" key={format} delay={index * 0.06} y={30}>
            <Panel className="h-full">
              <span
                className="display-sans block"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-base font-medium text-[#D7E2EA]">{format}</p>
            </Panel>
          </FadeIn>
        ))}
      </ul>
    </Section>
  </Layout>
);

export default Work;

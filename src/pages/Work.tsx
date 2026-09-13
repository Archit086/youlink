import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHeader, Panel, Section } from "@/components/site/Page";
import { ContactButton } from "@/components/site/Buttons";
import { CurrentBadge, InstagramLink } from "@/components/site/ClientBits";
import { CaseCard } from "@/components/work/CaseCard";
import { clients, clientsBySector, contentFormats, metrics } from "@/data/site";

const pad = (value: number) => String(value).padStart(2, "0");

const Work = () => (
  <Layout>
    <PageHeader
      eyebrow="01 — Work"
      title={clients.length + " brands. Seven industries."}
      lead="We've worked with brands across diverse industries — from fashion and food to healthcare, retail, jewellery, real estate, and industrial sectors. Legacy names, new cafés, and platforms we helped build from the ground up."
    >
      <ContactButton to="/hire">Start a project</ContactButton>
    </PageHeader>

    <Section eyebrow="02 — By the numbers">
      <dl className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <FadeIn key={metric.label} delay={index * 0.08} y={30}>
            <Panel className="h-full">
              <dd className="display-sans" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
                {metric.value}
              </dd>
              <dt className="mt-4 text-base font-medium text-mist">{metric.label}</dt>
              <p className="mt-2 text-sm font-light leading-relaxed text-mist opacity-60">
                {metric.note}
              </p>
            </Panel>
          </FadeIn>
        ))}
      </dl>
    </Section>

    <Section
      eyebrow="03 — Client index"
      lead="Every brand we've managed. Tap the Instagram mark to see their feed."
    >
      <ul className="overflow-hidden rounded-[28px] border border-mist/15 md:rounded-[36px]">
        {clients.map((client, index) => (
          <FadeIn
            as="li"
            key={client.id}
            delay={Math.min(index * 0.04, 0.4)}
            y={16}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-mist/15 px-6 py-4 text-sm text-mist transition-colors duration-300 first:border-t-0 hover:bg-mist/[0.06]"
          >
            <span className="w-8 shrink-0 tabular-nums opacity-40">{pad(index + 1)}</span>
            <span className="flex min-w-0 flex-1 flex-wrap items-center gap-3 font-medium md:w-72 md:flex-none">
              {client.name}
              {client.current && <CurrentBadge />}
            </span>
            <span className="hidden flex-1 font-light opacity-50 md:block">{client.sector ?? "—"}</span>
            <InstagramLink handle={client.handle} name={client.name} />
          </FadeIn>
        ))}
      </ul>
    </Section>

    {clientsBySector.map(({ sector, items }, sectorIndex) => (
      <Section
        key={sector}
        eyebrow={pad(sectorIndex + 4) + " — " + sector}
        title={items.length + (items.length === 1 ? " brand" : " brands")}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((client, index) => (
            <CaseCard key={client.id} client={client} index={pad(index + 1)} delay={index * 0.07} />
          ))}
        </div>
      </Section>
    ))}

    <Section
      eyebrow={pad(clientsBySector.length + 4) + " — Output"}
      title="Creative design work and reels"
      lead="Alongside campaign and identity work, we produce the day-to-day content that keeps a brand visible."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {contentFormats.map((format, index) => (
          <FadeIn as="li" key={format} delay={index * 0.06} y={30}>
            <Panel className="h-full">
              <span className="display-sans block" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                {pad(index + 1)}
              </span>
              <p className="mt-3 text-base font-medium text-mist">{format}</p>
            </Panel>
          </FadeIn>
        ))}
      </ul>
    </Section>
  </Layout>
);

export default Work;

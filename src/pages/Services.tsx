import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/motion/FadeIn";
import { Numbered, PageHeader, Panel, RuledList, Section } from "@/components/site/Page";
import { ContactButton, LiveProjectButton } from "@/components/site/Buttons";
import { contentFormats, services } from "@/data/site";

const deliveryHighlights = [
  {
    title: "Supervised delivery",
    description: "Every project is managed by an experienced supervisor who ensures quality standards.",
  },
  {
    title: "Quality assured",
    description: "Multiple review checkpoints before final delivery to guarantee excellence.",
  },
  {
    title: "Timely execution",
    description: "Milestone-based workflow ensures projects stay on track and on time.",
  },
];

const workflow = [
  "Requirement discussion & scoping",
  "Team & supervisor assignment",
  "Milestone-based execution",
  "Quality review & delivery",
];

const Services = () => (
  <Layout>
    <PageHeader
      eyebrow="01 — Services"
      title="Here's what YouLink does to your brand"
      lead="From website development and social media management to branding and marketing — all delivered by supervised, verified teams with accountability at every step."
    >
      <ContactButton to="/hire">Start a project</ContactButton>
    </PageHeader>

    <Section eyebrow="02 — How delivery works">
      <div className="grid gap-4 lg:grid-cols-3">
        {deliveryHighlights.map((item, index) => (
          <Numbered
            key={item.title}
            index={index + 1}
            title={item.title}
            description={item.description}
            delay={index * 0.07}
          />
        ))}
      </div>
    </Section>

    <Section eyebrow="03 — Capabilities" title="Five things we do, end to end">
      <div className="flex flex-col gap-4">
        {services.map((service, index) => (
          <FadeIn key={service.id} delay={index * 0.06} y={30}>
            <Panel id={service.id} className="scroll-mt-24 md:p-10">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span
                    className="display-sans block"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 font-medium leading-tight text-[#D7E2EA]"
                    style={{ fontSize: "clamp(1.25rem, 2.6vw, 2.1rem)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#D7E2EA] opacity-60 md:text-base">
                    {service.summary}
                  </p>
                  <LiveProjectButton to="/hire" className="mt-6">
                    Start with {service.title}
                  </LiveProjectButton>
                </div>

                <div className="lg:col-span-4">
                  <p className="eyebrow text-[#D7E2EA] opacity-50">What you get</p>
                  <RuledList items={service.capabilities} className="mt-4" />
                </div>

                {service.idealFor && (
                  <div className="lg:col-span-3">
                    <p className="eyebrow text-[#D7E2EA] opacity-50">Ideal for</p>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#D7E2EA] opacity-60">
                      {service.idealFor}
                    </p>
                  </div>
                )}
              </div>
            </Panel>
          </FadeIn>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="04 — Content output"
      title="The formats we shoot, week after week"
      lead="Creative design work and video content produced as part of ongoing social media engagements."
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

    <Section
      eyebrow="05 — Typical workflow"
      title="However the brief starts, delivery runs the same way"
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.map((step, index) => (
          <Numbered as="li" key={step} index={index + 1} title={step} delay={index * 0.06} />
        ))}
      </ol>

      <FadeIn delay={0.2} y={20} className="mt-10 flex flex-wrap gap-4">
        <ContactButton to="/hire">Start a project</ContactButton>
        <LiveProjectButton to="/pricing">View pricing</LiveProjectButton>
      </FadeIn>
    </Section>

    <Section>
      <p className="text-sm font-light text-[#D7E2EA] opacity-50">
        Looking to work with us instead?{" "}
        <Link to="/join" className="underline underline-offset-4 hover:opacity-80">
          Join the freelancer network
        </Link>
        .
      </p>
    </Section>
  </Layout>
);

export default Services;

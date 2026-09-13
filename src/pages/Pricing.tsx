import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/motion/FadeIn";
import { Numbered, PageHeader, Panel, RuledList, Section } from "@/components/site/Page";
import { ContactButton } from "@/components/site/Buttons";

const highlights = [
  {
    title: "Transparent pricing",
    description: "Clear pricing structure based on project scope. No hidden fees, no surprises.",
  },
  {
    title: "Legal agreements",
    description: "Every project comes with a service agreement protecting both parties.",
  },
  {
    title: "Milestone payouts",
    description: "Freelancers receive fair, timely payments based on milestone completion.",
  },
];

const quoteFactors = [
  { title: "Project scope & complexity", note: "Size, features, and technical requirements" },
  { title: "Timeline requirements", note: "Standard or expedited delivery" },
  { title: "Team expertise level", note: "Based on required skills and experience" },
  { title: "Support & maintenance needs", note: "Post-delivery support requirements" },
];

const included = [
  "Detailed project scoping and requirement analysis",
  "Supervisor-led team assignment",
  "Regular progress updates and communication",
  "Quality review at every milestone",
  "Legal-backed service agreement",
  "Post-delivery support as per scope",
  "Revision window within agreed terms",
  "Transparent breakdown of all costs",
];

const clientTerms = [
  "Payment schedule set out in your service agreement",
  "Multiple payment options available",
  "Invoice with complete breakdown",
];

const freelancerTerms = [
  "Milestone-based project payouts",
  "Fair, transparent payout structure",
  "Timely payments after milestone approval",
];

const Pricing = () => (
  <Layout>
    <PageHeader
      eyebrow="01 — Pricing & engagement"
      title="Priced to the brief, never to the guess"
      lead="Transparent, fair pricing for quality-controlled work. Every project is unique, so every quote is built from scope — with no hidden costs and no surprises."
    >
      <ContactButton to="/hire">Request a quote</ContactButton>
    </PageHeader>

    <Section eyebrow="02 — What you can count on">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <Numbered
            key={item.title}
            index={index + 1}
            title={item.title}
            description={item.description}
            delay={index * 0.06}
          />
        ))}
      </div>
    </Section>

    <Section eyebrow="03 — How pricing works" title="Custom quotes, built from four inputs">
      <div className="grid gap-4 lg:grid-cols-2">
        <ol className="grid gap-4 sm:grid-cols-2">
          {quoteFactors.map((factor, index) => (
            <Numbered
              as="li"
              key={factor.title}
              index={index + 1}
              title={factor.title}
              description={factor.note}
              delay={index * 0.06}
            />
          ))}
        </ol>

        <FadeIn delay={0.12} y={30}>
          <Panel className="h-full">
            <p className="eyebrow text-mist opacity-50">What's included</p>
            <RuledList items={included} className="mt-6" />
          </Panel>
        </FadeIn>
      </div>
    </Section>

    <Section eyebrow="04 — Payment terms" title="Two sides, the same rules">
      <div className="grid gap-4 lg:grid-cols-2">
        <FadeIn delay={0} y={30}>
          <Panel className="h-full">
            <p className="eyebrow text-mist opacity-50">For clients</p>
            <RuledList items={clientTerms} className="mt-6" />
          </Panel>
        </FadeIn>
        <FadeIn delay={0.1} y={30}>
          <Panel className="h-full">
            <p className="eyebrow text-mist opacity-50">For freelancers</p>
            <RuledList items={freelancerTerms} className="mt-6" />
          </Panel>
        </FadeIn>
      </div>
    </Section>

    <Section eyebrow="05 — Revisions & refunds" title="Revision & refund policy">
      <FadeIn delay={0} y={30}>
        <Panel>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-mist opacity-70 md:text-base">
            We offer revisions within the agreed scope. Refund policies are defined in the service
            agreement and depend on project stage and deliverables completed.
          </p>
          <Link
            to="/refund-policy"
            className="mt-6 inline-block text-sm font-medium text-mist underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            View the full policy
          </Link>
        </Panel>
      </FadeIn>
    </Section>
  </Layout>
);

export default Pricing;

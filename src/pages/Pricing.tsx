import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { Lines, Reveal } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";
import { ArrowLink } from "@/components/site/ArrowLink";
import { CTASection } from "@/components/home/CTASection";

const highlights = [
  {
    title: "Transparent pricing",
    description: "Clear pricing structure based on project scope. No hidden fees, no surprises.",
  },
  {
    title: "50% advance system",
    description: "Projects begin after 50% advance payment. Balance due upon final delivery.",
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
  "50% advance to initiate project",
  "Remaining 50% upon final delivery",
  "Multiple payment options available",
  "Invoice with complete breakdown",
];

const freelancerTerms = [
  "₹99/month platform subscription",
  "Milestone-based project payouts",
  "Fair, transparent payout structure",
  "Timely payments after milestone approval",
];

const Pricing = () => (
  <Layout>
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">01</span>
        <span className="label">Pricing &amp; engagement</span>
      </div>

      <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
        <h1 className="text-headline-40">
          <Lines lines={["Priced to the brief,", "never to the guess."]} stagger={90} />
        </h1>
      </div>

      <div className="cell border-t">
        <p className="max-w-prose text-body-20 opacity-70">
          Transparent, fair pricing for quality-controlled work. Every project is unique, so every
          quote is built from scope — with no hidden costs and no surprises.
        </p>
      </div>

      <div className={cn(gridColumns({ sm: 2, lg: 4 }), "border-t")}>
        {highlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 60} className={cn("cell", cellRules(index, { sm: 2, lg: 4 }))}>
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-16 text-headline-10">{item.title}</h2>
            <p className="mt-12 max-w-prose text-body-10 opacity-70">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">02</span>
        <span className="label">How pricing works</span>
      </div>

      <div className="cell border-b">
        <h2 className="text-headline-20">
          <Lines lines={["Custom quotes, built", "from four inputs."]} />
        </h2>
      </div>

      <div className="grid lg:grid-cols-2">
        <ol>
          {quoteFactors.map((factor, index) => (
            <Reveal
              as="li"
              key={factor.title}
              delay={index * 60}
              className="flex items-baseline gap-16 border-b px-12 py-16 last:border-b-0 lg:px-20"
            >
              <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-headline-10">{factor.title}</h3>
                <p className="mt-8 text-body-10 opacity-70">{factor.note}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={120}>
          <p className="label opacity-60">What's included</p>
          <ul className="mt-20">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-8 border-t py-10 font-mono text-caption-20 uppercase first:border-t-0"
              >
                <span className="opacity-40">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>

    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">03</span>
        <span className="label">Payment terms</span>
      </div>

      <div className="grid lg:grid-cols-2">
        <Reveal className="cell">
          <p className="label opacity-60">For clients</p>
          <ul className="mt-20">
            {clientTerms.map((item) => (
              <li key={item} className="border-t py-12 text-body-10 first:border-t-0">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={100}>
          <p className="label opacity-60">For freelancers</p>
          <ul className="mt-20">
            {freelancerTerms.map((item) => (
              <li key={item} className="border-t py-12 text-body-10 first:border-t-0">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="grid border-t lg:grid-cols-3">
        <div className="cell">
          <h3 className="text-headline-10">Revision &amp; refund policy</h3>
        </div>
        <div className="cell border-t lg:col-span-2 lg:border-l lg:border-t-0">
          <p className="max-w-prose text-body-10 opacity-70">
            We offer revisions within the agreed scope. Refund policies are defined in the service
            agreement and depend on project stage and deliverables completed.
          </p>
          <ArrowLink to="/refund-policy" className="mt-20">
            View the full policy
          </ArrowLink>
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Pricing;

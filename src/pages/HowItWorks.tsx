import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lines, Reveal } from "@/components/site/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { clientProcess, freelancerProcess } from "@/data/site";

interface TrackProps {
  index: string;
  label: string;
  titleLines: string[];
  lede: string;
  steps: readonly { title: string; description: string }[];
  action: { label: string; to: string };
}

/** A pinned title column against a scrolling list of ruled steps. */
const Track = ({ index, label, titleLines, lede, steps, action }: TrackProps) => (
  <section className="border-b">
    <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
      <span className="index-number">{index}</span>
      <span className="label">{label}</span>
    </div>

    <div className="grid lg:grid-cols-3">
      <div className="cell pin">
        <h2 className="text-headline-20">
          <Lines lines={titleLines} />
        </h2>
        <p className="mt-20 max-w-prose text-body-10 opacity-70">{lede}</p>
        <Button asChild variant="default" className="mt-24">
          <Link to={action.to}>{action.label}</Link>
        </Button>
      </div>

      <ol className="border-t lg:col-span-2 lg:border-l lg:border-t-0">
        {steps.map((step, stepIndex) => (
          <Reveal
            as="li"
            key={step.title}
            delay={stepIndex * 50}
            className="grid gap-8 border-b px-12 py-16 last:border-b-0 sm:grid-cols-[48px_1fr] lg:px-20"
          >
            <span className="index-number sm:pt-6">{String(stepIndex + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-headline-10">{step.title}</h3>
              <p className="mt-8 max-w-prose text-body-10 opacity-70">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

const HowItWorks = () => (
  <Layout>
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">01</span>
        <span className="label">Process</span>
      </div>

      <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
        <h1 className="text-headline-40">
          <Lines lines={["The whole path,", "in the open."]} stagger={90} />
        </h1>
      </div>

      <div className="cell border-t">
        <p className="max-w-prose text-body-20 opacity-70">
          A structured, transparent process designed for success — whether you're a client seeking
          quality work or a freelancer looking to grow.
        </p>
      </div>
    </section>

    <Track
      index="02"
      label="For clients"
      titleLines={["Get quality work", "delivered."]}
      lede="From enquiry to delivery, here's how we make sure your project succeeds."
      steps={clientProcess}
      action={{ label: "Start your project", to: "/hire" }}
    />

    <Track
      index="03"
      label="For freelancers"
      titleLines={["Join our verified", "network."]}
      lede="From application to earning, here's your journey to becoming a YouLink freelancer."
      steps={freelancerProcess}
      action={{ label: "Apply now", to: "/join" }}
    />

    <section className="grid border-b lg:grid-cols-2">
      <div className="cell">
        <h2 className="text-headline-20">Have questions before you start?</h2>
      </div>
      <div className="grid grid-cols-2 border-t lg:border-l lg:border-t-0">
        <Button asChild variant="outline" size="cell" className="border-y-0 border-l-0">
          <Link to="/pricing">View pricing</Link>
        </Button>
        <Button asChild variant="outline" size="cell" className="border-y-0 border-r-0">
          <Link to="/hire">Contact us</Link>
        </Button>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default HowItWorks;

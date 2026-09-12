import { Layout } from "@/components/layout/Layout";
import { Numbered, PageHeader, Section } from "@/components/site/Page";
import { ContactButton, LiveProjectButton } from "@/components/site/Buttons";
import { FadeIn } from "@/components/motion/FadeIn";
import { clientProcess, freelancerProcess } from "@/data/site";

interface TrackProps {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly { title: string; description: string }[];
  action: { label: string; to: string };
}

const Track = ({ eyebrow, title, lead, steps, action }: TrackProps) => (
  <Section eyebrow={eyebrow} title={title} lead={lead}>
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <Numbered
          as="li"
          key={step.title}
          index={index + 1}
          title={step.title}
          description={step.description}
          delay={index * 0.05}
        />
      ))}
    </ol>

    <FadeIn delay={0.2} y={20} className="mt-10">
      <ContactButton to={action.to}>{action.label}</ContactButton>
    </FadeIn>
  </Section>
);

const HowItWorks = () => (
  <Layout>
    <PageHeader
      eyebrow="01 — Process"
      title="The whole path, in the open"
      lead="A structured, transparent process designed for success — whether you're a client seeking quality work or a freelancer looking to grow."
    />

    <Track
      eyebrow="02 — For clients"
      title="Get quality work delivered"
      lead="From enquiry to delivery, here's how we make sure your project succeeds."
      steps={clientProcess}
      action={{ label: "Start your project", to: "/hire" }}
    />

    <Track
      eyebrow="03 — For freelancers"
      title="Join our verified network"
      lead="From application to earning, here's your journey to becoming a YouLink freelancer."
      steps={freelancerProcess}
      action={{ label: "Apply now", to: "/join" }}
    />

    <Section eyebrow="04 — Before you start" title="Have questions?">
      <div className="flex flex-wrap gap-4">
        <LiveProjectButton to="/pricing">View pricing</LiveProjectButton>
        <LiveProjectButton to="/hire">Contact us</LiveProjectButton>
      </div>
    </Section>
  </Layout>
);

export default HowItWorks;

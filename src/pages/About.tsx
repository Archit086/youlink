import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Numbered, PageHeader, Panel, Section } from "@/components/site/Page";
import { ContactButton } from "@/components/site/Buttons";
import { brand, principles } from "@/data/site";

const values = [
  {
    title: "Quality first",
    description:
      "Every project is executed with supervisor oversight, ensuring consistent, high-quality deliverables.",
  },
  {
    title: "Human-centric",
    description: "We prioritise people — fair payouts for freelancers, transparent pricing for clients.",
  },
  {
    title: "Mentorship-driven",
    description: "Our freelancers grow through continuous feedback, skill development, and guidance.",
  },
  {
    title: "Collaborative",
    description: "We believe in team-based delivery — where supervisors and freelancers work together.",
  },
];

const challenges = [
  "Inconsistent quality with no accountability",
  "Freelancers working in isolation without guidance",
  "Hidden pricing and unclear expectations",
  "No legal protection for either party",
];

const answers = [
  "Supervisor-led teams ensure quality at every step",
  "Verified freelancers with continuous mentorship",
  "Transparent pricing with no hidden costs",
  "Legal-backed service agreements for protection",
];

const About = () => (
  <Layout>
    <PageHeader eyebrow="01 — About" title="We connect you with a you" lead={brand.positioning}>
      <ContactButton to="/hire">Start a project</ContactButton>
    </PageHeader>

    {/* The promise, at scale */}
    <Section>
      <AnimatedText
        text={brand.promise}
        className="mx-auto max-w-4xl text-center font-medium leading-snug text-[#D7E2EA]"
        style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)" }}
      />
    </Section>

    <Section
      eyebrow="02 — How we work"
      title="A structured freelance ecosystem, supervised end to end"
      lead={brand.model}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <Numbered
            key={principle.title}
            index={index + 1}
            title={principle.title}
            description={principle.description}
            delay={index * 0.06}
          />
        ))}
      </div>
    </Section>

    <Section
      eyebrow="03 — The problem we solve"
      title="Freelance work usually breaks in the same four places"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <FadeIn delay={0} y={30}>
          <Panel className="h-full">
            <p className="eyebrow text-[#D7E2EA] opacity-50">Traditional freelancing</p>
            <ul className="mt-6">
              {challenges.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-t border-[#D7E2EA]/15 py-4 first:border-t-0"
                >
                  <span className="text-sm tabular-nums text-[#D7E2EA] opacity-40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-light text-[#D7E2EA] opacity-60">{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <Panel className="h-full border-[#D7E2EA]/40">
            <p className="eyebrow text-[#D7E2EA]">The YouLink answer</p>
            <ul className="mt-6">
              {answers.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-t border-[#D7E2EA]/15 py-4 first:border-t-0"
                >
                  <span className="text-sm tabular-nums text-[#D7E2EA] opacity-40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-light text-[#D7E2EA]">{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </FadeIn>
      </div>
    </Section>

    <Section eyebrow="04 — Values" title="What we hold to">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <Numbered
            key={value.title}
            index={index + 1}
            title={value.title}
            description={value.description}
            delay={index * 0.07}
          />
        ))}
      </div>
    </Section>

    <Section eyebrow="05 — Why we exist">
      <FadeIn delay={0} y={30}>
        <Panel className="md:p-12">
          <p
            className="max-w-3xl font-light leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)" }}
          >
            Talented freelancers often lack structure, and clients struggle to find reliable teams.
            We bridge that gap with a supervised ecosystem where freelancers grow, clients succeed,
            and quality is never compromised.
          </p>
          <p className="mt-8 max-w-2xl border-t border-[#D7E2EA]/15 pt-6 text-sm font-light text-[#D7E2EA] opacity-60">
            {brand.goal}
          </p>
        </Panel>
      </FadeIn>
    </Section>
  </Layout>
);

export default About;

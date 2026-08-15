import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { Lines, Reveal } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";
import { CTASection } from "@/components/home/CTASection";
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
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">01</span>
        <span className="label">About</span>
      </div>

      <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
        <h1 className="text-headline-40">
          <Lines lines={["We connect you", "with a you."]} stagger={90} />
        </h1>
      </div>

      <div className="grid border-t lg:grid-cols-2">
        <Reveal className="cell">
          <p className="max-w-prose text-body-20">{brand.positioning}</p>
        </Reveal>
        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
          <p className="max-w-prose text-body-10 opacity-70">{brand.reach}</p>
        </Reveal>
      </div>
    </section>

    {/* The promise, at scale */}
    <section className="border-b px-12 py-40 lg:px-20 lg:py-56">
      <p className="text-headline-30">
        <Lines lines={["We don't just create content", "or run ads — we build brands", "from the ground up."]} />
      </p>
    </section>

    {/* The model */}
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">02</span>
        <span className="label">How we work</span>
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-20">
            <Lines lines={["A structured freelance", "ecosystem, supervised", "end to end"]} />
          </h2>
        </div>
        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
          <p className="max-w-prose text-body-20 opacity-70">{brand.model}</p>
        </Reveal>
      </div>

      <div className={gridColumns({ sm: 2, lg: 3 })}>
        {principles.map((principle, index) => (
          <Reveal
            key={principle.title}
            delay={index * 60}
            className={cn("cell", cellRules(index, { sm: 2, lg: 3 }))}
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-16 text-headline-10">{principle.title}</h3>
            <p className="mt-12 max-w-prose text-body-10 opacity-70">{principle.description}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Problem / answer */}
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">03</span>
        <span className="label">The problem we solve</span>
      </div>

      <div className="cell border-b">
        <h2 className="text-headline-20">
          <Lines lines={["Freelance work usually breaks", "in the same four places."]} />
        </h2>
      </div>

      <div className="grid lg:grid-cols-2">
        <Reveal className="cell">
          <p className="label opacity-60">Traditional freelancing</p>
          <ul className="mt-20">
            {challenges.map((item, index) => (
              <li key={item} className="flex items-start gap-16 border-t py-12 first:border-t-0">
                <span className="index-number pt-2">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-body-10 opacity-70">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={100}>
          <p className="label">The YouLink answer</p>
          <ul className="mt-20">
            {answers.map((item, index) => (
              <li key={item} className="flex items-start gap-16 border-t py-12 first:border-t-0">
                <span className="index-number pt-2">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-body-10">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>

    {/* Values */}
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">04</span>
        <span className="label">Values</span>
      </div>

      <div className={gridColumns({ sm: 2, lg: 4 })}>
        {values.map((value, index) => (
          <Reveal
            key={value.title}
            delay={index * 70}
            className={cn("cell", cellRules(index, { sm: 2, lg: 4 }))}
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-16 text-headline-10">{value.title}</h3>
            <p className="mt-12 max-w-prose text-body-10 opacity-70">{value.description}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Why we exist */}
    <section className="grid border-b lg:grid-cols-3">
      <div className="cell pin">
        <p className="label opacity-60">Why we exist</p>
      </div>
      <Reveal className="cell border-t lg:col-span-2 lg:border-l lg:border-t-0" delay={80}>
        <p className="max-w-prose text-body-30">
          Talented freelancers often lack structure, and clients struggle to find reliable teams. We
          bridge that gap with a supervised ecosystem where freelancers grow, clients succeed, and
          quality is never compromised.
        </p>
        <p className="mt-32 max-w-prose border-t pt-20 text-body-10 opacity-70">{brand.goal}</p>
      </Reveal>
    </section>

    <CTASection />
  </Layout>
);

export default About;

import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lines, Reveal } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";
import { CTASection } from "@/components/home/CTASection";
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
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">01</span>
        <span className="label">Services</span>
      </div>

      <div className="px-12 pb-24 pt-40 lg:px-20 lg:pb-40 lg:pt-56">
        <h1 className="text-headline-40">
          <Lines lines={["Here's what YouLink", "does to your brand."]} stagger={90} />
        </h1>
      </div>

      <div className="cell border-t">
        <p className="max-w-prose text-body-20 opacity-70">
          From website development and social media management to branding and marketing — all
          delivered by supervised, verified teams with accountability at every step.
        </p>
      </div>

      <div className={cn(gridColumns({ lg: 3 }), "border-t")}>
        {deliveryHighlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 70} className={cn("cell", cellRules(index, { lg: 3 }))}>
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-16 text-headline-10">{item.title}</h2>
            <p className="mt-12 max-w-prose text-body-10 opacity-70">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Services in full */}
    {services.map((service, index) => (
      <section
        key={service.id}
        id={service.id}
        className="scroll-mt-[var(--site-header-height)] border-b"
      >
        <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
          <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="label">{service.title}</span>
        </div>

        <div className="grid lg:grid-cols-12">
          <Reveal className="cell lg:col-span-5">
            <h2 className="text-headline-20">
              <Lines lines={[service.title]} />
            </h2>
            <p className="mt-20 max-w-prose text-body-10 opacity-70">{service.summary}</p>
            <Button asChild variant="outline" className="mt-24">
              <Link to="/hire">Start with {service.title}</Link>
            </Button>
          </Reveal>

          <Reveal className="cell border-t lg:col-span-4 lg:border-l lg:border-t-0" delay={90}>
            <p className="label opacity-60">What you get</p>
            <ul className="mt-20">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-8 border-t py-10 font-mono text-caption-20 uppercase first:border-t-0"
                >
                  <span className="opacity-40">—</span>
                  {capability}
                </li>
              ))}
            </ul>
          </Reveal>

          {service.idealFor && (
            <Reveal className="cell border-t lg:col-span-3 lg:border-l lg:border-t-0" delay={150}>
              <p className="label opacity-60">Ideal for</p>
              <p className="mt-20 max-w-prose text-body-10 opacity-70">{service.idealFor}</p>
            </Reveal>
          )}
        </div>
      </section>
    ))}

    {/* Content output */}
    <section className="border-b">
      <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
        <span className="index-number">06</span>
        <span className="label">Content output</span>
      </div>

      <div className="grid border-b lg:grid-cols-2">
        <div className="cell">
          <h2 className="text-headline-30">
            <Lines lines={["The formats we shoot,", "week after week"]} />
          </h2>
        </div>
        <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
          <p className="max-w-prose text-body-20 opacity-70">
            Creative design work and video content produced as part of ongoing social media
            engagements.
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

    {/* Typical workflow */}
    <section className="grid border-b lg:grid-cols-3">
      <div className="cell pin">
        <p className="label opacity-60">Typical workflow</p>
        <h2 className="mt-16 text-headline-20">However the brief starts, delivery runs the same way.</h2>
      </div>

      <ol className="border-t lg:col-span-2 lg:border-l lg:border-t-0">
        {workflow.map((step, index) => (
          <Reveal
            as="li"
            key={step}
            delay={index * 60}
            className="flex items-baseline gap-16 border-b px-12 py-16 last:border-b-0 lg:px-20"
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <p className="text-body-20">{step}</p>
          </Reveal>
        ))}
      </ol>
    </section>

    <CTASection />
  </Layout>
);

export default Services;

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { clientProcess, principles } from "@/data/site";
import { Lines, Reveal } from "@/components/site/Reveal";
import { cellRules, gridColumns } from "@/components/site/ruled-grid";

/** Section 05 — why the work holds up: the model behind the delivery. */
export const OperatingModel = () => (
  <section className="border-b">
    <div className="flex items-baseline gap-16 border-b px-12 py-14 lg:px-20">
      <span className="index-number">06</span>
      <span className="label">Operating model</span>
    </div>

    <div className="grid border-b lg:grid-cols-2">
      <div className="cell">
        <h2 className="text-headline-30">
          <Lines lines={["A structured", "freelance ecosystem —", "not a marketplace"]} />
        </h2>
      </div>
      <Reveal className="cell border-t lg:border-l lg:border-t-0" delay={90}>
        <p className="max-w-prose text-body-20 opacity-70">
          Skilled teams work under supervision, so quality, creativity, accountability and delivery
          stay predictable from the first brief to the final handover.
        </p>
      </Reveal>
    </div>

    {/* Principles — ruled cells, three across. */}
    <div className={cn(gridColumns({ sm: 2, lg: 3 }), "border-b")}>
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

    {/* Process — pinned label against a scrolling list. */}
    <div className="grid lg:grid-cols-3">
      <div className="cell pin lg:col-span-1">
        <p className="label opacity-60">How an engagement runs</p>
        <h3 className="mt-16 text-headline-20">Six steps, enquiry to handover.</h3>
        <Link to="/how-it-works" className="link-wipe mt-24 inline-block font-mono text-caption-10 uppercase">
          See the full process
        </Link>
      </div>

      <ol className="border-t lg:col-span-2 lg:border-l lg:border-t-0">
        {clientProcess.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 50}
            className="grid gap-8 border-b px-12 py-16 last:border-b-0 sm:grid-cols-[48px_1fr] lg:px-20"
          >
            <span className="index-number sm:pt-4">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4 className="text-body-20">{step.title}</h4>
              <p className="mt-8 max-w-prose text-body-10 opacity-70">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

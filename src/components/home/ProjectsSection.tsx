import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactButton, LiveProjectButton } from "@/components/site/Buttons";
import { InstagramLink } from "@/components/site/ClientBits";
import { currentClients } from "@/data/site";
import { caseMedia } from "@/data/media";

/* The clients YouLink is working with now, in the order YouLink lists them. */
const cases = currentClients
  .filter((client) => caseMedia[client.id])
  .map((client) => ({ client, media: caseMedia[client.id] }));

interface CaseCardProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  name: string;
  sector?: string;
  handle: string;
  media: { columnOne: [string, string]; columnTwo: string };
}

/** Pixels each card parks below the one before, so the stack shows its edges. */
const STACK_STEP = 28;

const frame = "w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]";

/**
 * One card in the stack. Its wrapper is a full viewport tall and sticks to the
 * top of the list, so the next wrapper scrolls up over it. As later cards
 * arrive, this one shrinks from its top edge.
 */
const CaseCard = ({ index, total, progress, name, sector, handle, media }: CaseCardProps) => {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="sticky top-0 flex h-screen items-start justify-center supports-[height:100svh]:h-svh"
      style={{ paddingTop: `calc(5vh + ${index * STACK_STEP}px)` }}
    >
      <motion.article
        className="w-full origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 will-change-transform sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-4 md:gap-8 md:px-4 md:pb-6">
          <div className="flex items-center gap-4 md:gap-8">
            <span className="display-sans" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col items-start gap-2">
              <h3
                className="font-medium leading-tight text-[#D7E2EA]"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {name}
              </h3>
              {sector && <span className="eyebrow text-[#D7E2EA] opacity-40">{sector}</span>}
              <InstagramLink handle={handle} name={name} />
            </div>
          </div>

          <LiveProjectButton to="/work">Live project</LiveProjectButton>
        </div>

        <div className="flex gap-3 md:gap-4">
          <div className="flex w-[40%] flex-col gap-3 md:gap-4">
            <img
              src={media.columnOne[0]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={frame}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={media.columnOne[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={frame}
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>

          <div className="w-[60%]">
            <img
              src={media.columnTwo}
              alt={`Work for ${name}`}
              loading="lazy"
              className={frame}
              style={{ height: "clamp(305px, 39vw, 588px)" }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

/**
 * YouLink's current clients as a stack: each card pins near the top of the
 * screen and the next slides up over it, leaving a band of every earlier card
 * showing above. Pulled up over the section above on its own rounded shoulder.
 */
export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="work"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="display-serif mb-16 text-center sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        Work
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
        {cases.map(({ client, media }, index) => (
          <CaseCard
            key={client.id}
            index={index}
            total={cases.length}
            progress={scrollYProgress}
            name={client.name}
            sector={client.sector}
            handle={client.handle}
            media={media}
          />
        ))}
      </div>

      <FadeIn delay={0.1} y={20} className="mt-4 flex justify-center">
        <ContactButton to="/work">See more work</ContactButton>
      </FadeIn>
    </section>
  );
};

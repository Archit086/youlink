import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

/* ------------------------------------------------------------------ */
/* Shared page furniture for every route other than the homepage.      */
/* Same vocabulary as the landing page: gradient display type, heavy    */
/* radii, hairline rules at 15% opacity.                                */
/* ------------------------------------------------------------------ */

export const pageX = "px-5 sm:px-8 md:px-10";

const displaySize: CSSProperties = { fontSize: "clamp(3rem, 7vw, 6rem)" };

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

/** The opening block of an inner page — index label, gradient title, lede. */
export const PageHeader = ({ eyebrow, title, lead, children }: PageHeaderProps) => (
  <header className={cn(pageX, "pb-16 pt-16 sm:pb-20 sm:pt-24 md:pb-24 md:pt-32")}>
    <div className="mx-auto max-w-6xl">
      <FadeIn as="p" delay={0} y={20} className="eyebrow text-mist opacity-50">
        {eyebrow}
      </FadeIn>

      <FadeIn
        as="h1"
        delay={0.1}
        y={40}
        className="display-serif mt-6"
        style={displaySize}
      >
        {title}
      </FadeIn>

      {lead && (
        <FadeIn
          as="p"
          delay={0.25}
          y={20}
          className="mt-8 max-w-2xl text-base font-light leading-relaxed text-mist opacity-70 md:text-lg"
        >
          {lead}
        </FadeIn>
      )}

      {children && (
        <FadeIn delay={0.35} y={20} className="mt-10">
          {children}
        </FadeIn>
      )}
    </div>
  </header>
);

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
  children: ReactNode;
}

/** A titled band. Content is centred on the same 6xl measure throughout. */
export const Section = ({ id, eyebrow, title, lead, className, children }: SectionProps) => (
  <section id={id} className={cn(pageX, "py-14 sm:py-16 md:py-20", className)}>
    <div className="mx-auto max-w-6xl">
      {(eyebrow || title || lead) && (
        <div className="mb-10 border-t border-mist/15 pt-8 md:mb-14">
          {eyebrow && <p className="eyebrow text-mist opacity-50">{eyebrow}</p>}
          {title && (
            <FadeIn
              as="h2"
              delay={0}
              y={30}
              className="mt-4 max-w-3xl font-medium leading-tight text-mist"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              {title}
            </FadeIn>
          )}
          {lead && (
            <FadeIn
              as="p"
              delay={0.1}
              y={20}
              className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-mist opacity-60 md:text-base"
            >
              {lead}
            </FadeIn>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

interface PanelProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

/** A soft card. The only container shape in the system. */
export const Panel = ({ id, className, children }: PanelProps) => (
  <div
    id={id}
    className={cn(
      "rounded-[28px] border border-mist/15 bg-mist/[0.03] p-6 md:rounded-[36px] md:p-8",
      className,
    )}
  >
    {children}
  </div>
);

interface NumberedProps {
  index: number;
  title: string;
  description?: string;
  children?: ReactNode;
  delay?: number;
  /** Pass "li" when the entry sits inside an ordered list. */
  as?: ElementType;
}

/** A numbered entry — the workhorse for principles, steps and values. */
export const Numbered = ({
  index,
  title,
  description,
  children,
  delay = 0,
  as,
}: NumberedProps) => (
  <FadeIn as={as} delay={delay} y={30}>
    <Panel className="h-full">
      <span
        className="display-sans block"
        style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-4 text-lg font-medium leading-tight text-mist md:text-xl">
        {title}
      </h3>
      {description && (
        <p className="mt-3 text-sm font-light leading-relaxed text-mist opacity-60">
          {description}
        </p>
      )}
      {children}
    </Panel>
  </FadeIn>
);

/** A plain bullet list with hairline rules between rows. */
export const RuledList = ({ items, className }: { items: readonly string[]; className?: string }) => (
  <ul className={className}>
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-3 border-t border-mist/15 py-3 text-sm font-light text-mist opacity-70 first:border-t-0"
      >
        <span className="opacity-40">—</span>
        {item}
      </li>
    ))}
  </ul>
);

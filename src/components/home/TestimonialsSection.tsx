import { FadeIn } from "@/components/motion/FadeIn";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { clients } from "@/data/site";

/*
 * Built from the client list in site.ts: each card is what YouLink did for a
 * named brand, in YouLink's own words. These are not customer quotes, and no
 * portraits are shown. When real testimonials are collected, pass them in the
 * same { text, name, role, image } shape.
 */
const entries: Testimonial[] = clients.map((client) => ({
  text: client.engagement,
  name: client.name,
  role: client.handle ?? client.sector,
}));

/** The full list, starting `offset` cards in, so neighbouring columns never line up. */
const rotate = (offset: number) => [...entries.slice(offset), ...entries.slice(0, offset)];

/*
 * Every column carries all eleven entries, so each loop is taller than the
 * viewport and never shows a gap. Columns appear one breakpoint at a time until
 * five fill a wide screen; the uneven durations keep them drifting apart.
 */
const columns = [
  { offset: 0, duration: 58, className: "min-w-0" },
  { offset: 2, duration: 70, className: "hidden min-w-0 sm:block" },
  { offset: 4, duration: 64, className: "hidden min-w-0 lg:block" },
  { offset: 6, duration: 76, className: "hidden min-w-0 xl:block" },
  { offset: 8, duration: 61, className: "hidden min-w-0 2xl:block" },
];

/** A full-width wall of client engagements, between the work and the footer. */
export const TestimonialsSection = () => (
  <section className="relative bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
    <FadeIn y={20} duration={0.8} delay={0.1} className="mx-auto flex max-w-[540px] flex-col items-center text-center">
      <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-md">
        Clients
      </span>
      <h2 className="display-serif mt-6" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
        Brands we&apos;ve built with
      </h2>
      <p className="mt-6 font-light leading-relaxed text-[#D7E2EA] opacity-70">
        Legacy names, new cafés, and platforms we helped build from the ground up.
      </p>
    </FadeIn>

    <div className="mt-14 grid h-screen min-h-[640px] grid-cols-1 gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {columns.map((column) => (
        <TestimonialsColumn
          key={column.offset}
          testimonials={rotate(column.offset)}
          duration={column.duration}
          className={column.className}
        />
      ))}
    </div>
  </section>
);

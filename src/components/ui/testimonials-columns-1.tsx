import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  /** Portrait URL. Without one, the card shows the name's initials. */
  image?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z]/g, "")[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * One endlessly scrolling column of cards. The list is rendered twice and the
 * track slides up by half its height, so the loop is seamless; the second copy
 * is hidden from assistive tech. Reduced-motion visitors get a static column.
 */
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className={props.className}>
      <motion.div
        animate={reduceMotion ? undefined : { translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-ground pb-6"
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex flex-col gap-6">
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="w-full rounded-3xl border border-mist/15 bg-mist/[0.03] p-10 text-mist shadow-lg shadow-black/40"
              >
                <p className="text-sm font-light leading-relaxed opacity-80">{text}</p>
                <div className="mt-5 flex items-center gap-3">
                  {image ? (
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        "border border-strong/30 bg-strong/10 text-xs font-medium text-strong",
                      )}
                    >
                      {initials(name)}
                    </span>
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium leading-5 text-strong">{name}</div>
                    <div className="text-sm leading-5 opacity-60">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

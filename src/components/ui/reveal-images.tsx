import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface ImageSource {
  src: string;
  alt: string;
}

export interface RevealImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
  /** A supporting line under the title. */
  description?: string;
  /** Makes the row a link, which also lets keyboard focus trigger the reveal. */
  href?: string;
}

const titleSize: CSSProperties = { fontSize: "clamp(2.5rem, 6vw, 5rem)" };

/* Two frames tucked behind the end of the title. On hover or keyboard focus
   they scale up out of nothing, and the front one fans out to the lower right. */
const container = "pointer-events-none absolute right-8 -top-1 z-40 h-20 w-16";
const effect = cn(
  "relative h-16 w-16 scale-0 overflow-hidden rounded-md opacity-0 shadow-none transition-all delay-100 duration-500",
  "group-hover:h-full group-hover:w-full group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-xl",
  "group-focus-visible:h-full group-focus-visible:w-full group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:shadow-xl",
);

function RevealImageListItem({ text, images, description, href }: RevealImageListItemProps) {
  const body = (
    <>
      <h3
        className="display-serif pr-12 transition-all duration-500 group-hover:opacity-40 group-focus-visible:opacity-40"
        style={titleSize}
      >
        {text}
      </h3>
      {description && (
        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-mist opacity-60 md:text-base">
          {description}
        </p>
      )}
      <div className={container} aria-hidden="true">
        <div className={effect}>
          <img alt="" src={images[1].src} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500",
          "group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12",
          "group-focus-visible:translate-x-6 group-focus-visible:translate-y-6 group-focus-visible:rotate-12",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img alt="" src={images[0].src} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </>
  );

  const classes = "group relative block h-fit w-fit overflow-visible py-8";

  return href ? (
    <Link to={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

interface RevealImageListProps {
  items: RevealImageListItemProps[];
  /** A small label above the list. */
  heading?: string;
  className?: string;
}

function RevealImageList({ items, heading, className }: RevealImageListProps) {
  return (
    <div className={cn("flex flex-col gap-1 bg-ground", className)}>
      {heading && (
        <p className="text-2xl font-medium tracking-[-0.03em] text-mist opacity-80 sm:text-3xl md:text-4xl">
          {heading}
        </p>
      )}
      {items.map((item) => (
        <RevealImageListItem key={item.text} {...item} />
      ))}
    </div>
  );
}

export { RevealImageList, RevealImageListItem };

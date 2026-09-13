import { useState, type CSSProperties, type SyntheticEvent } from "react";
import { cn } from "@/lib/utils";
import type { ClientGallery as Gallery } from "@/data/media";

/* Width ÷ height per image, remembered across mounts so a gallery seen once
   lays out correctly from its first paint. */
const measured = new Map<string, number>();

/* Shapes to assume until an image has loaded: logos square, work portrait. */
const ASSUMED = { logo: 1, work: 0.8 } as const;

interface Frame {
  src: string;
  alt: string;
  kind: keyof typeof ASSUMED;
}

interface ClientGalleryProps {
  gallery: Gallery;
  name: string;
  /** Cap on the row height when logo and work share one row (md and up). */
  maxHeight?: string;
  className?: string;
}

/**
 * A client's logo and work, each in a frame cut to that image's own shape, so
 * nothing is cropped. From md up they share one row at a single height, scaled
 * so the row exactly fills the width or stops at `maxHeight`. Below md the logo
 * sits on its own row above the work.
 */
export const ClientGallery = ({
  gallery,
  name,
  maxHeight = "min(56vh, 600px)",
  className,
}: ClientGalleryProps) => {
  const [, remeasure] = useState(0);

  const logoFrames: Frame[] = gallery.logo
    ? [{ src: gallery.logo, alt: name + " logo", kind: "logo" }]
    : [];
  const workFrames: Frame[] = gallery.work.map((src, index) => ({
    src,
    alt: "Work for " + name + " (" + (index + 1) + ")",
    kind: "work",
  }));
  const frames = [...logoFrames, ...workFrames];
  if (frames.length === 0) return null;

  const ratioOf = (frame: Frame) => measured.get(frame.src) ?? ASSUMED[frame.kind];
  const totalRatio = (list: Frame[]) => list.reduce((total, frame) => total + ratioOf(frame), 0);

  const handleLoad = (src: string) => (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    const ratio = naturalWidth / naturalHeight;
    if (Math.abs((measured.get(src) ?? 0) - ratio) > 0.001) {
      measured.set(src, ratio);
      remeasure((count) => count + 1);
    }
  };

  /* One height for a row: as tall as the cap allows, but never wider than the
     gallery. 100cqw is the gallery's own width (it is a size container). */
  const rowHeight = (list: Frame[], cap: string) =>
    list.length === 0
      ? "0px"
      : `min(${cap}, calc((100cqw - ${list.length - 1} * var(--gap)) / ${totalRatio(list).toFixed(4)}))`;

  const layout = {
    containerType: "inline-size",
    "--row-h": rowHeight(frames, maxHeight),
    "--logo-h": rowHeight(logoFrames, "min(36vh, 320px)"),
    "--work-h": rowHeight(workFrames, "min(60vh, 520px)"),
  } as CSSProperties;

  const renderFrame = (frame: Frame) => (
    <div
      key={frame.src}
      className="h-full shrink-0 overflow-hidden rounded-[24px] bg-strong/5 md:rounded-[32px]"
      style={{ aspectRatio: ratioOf(frame) }}
    >
      <img
        src={frame.src}
        alt={frame.alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad(frame.src)}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return (
    <div className={cn("w-full [--gap:0.75rem] md:[--gap:1rem]", className)} style={layout}>
      <div className="flex flex-col items-center gap-[var(--gap)] md:flex-row md:justify-center">
        {logoFrames.length > 0 && (
          <div className="flex h-[var(--logo-h)] gap-[var(--gap)] md:h-[var(--row-h)]">
            {logoFrames.map(renderFrame)}
          </div>
        )}
        {workFrames.length > 0 && (
          <div className="flex h-[var(--work-h)] gap-[var(--gap)] md:h-[var(--row-h)]">
            {workFrames.map(renderFrame)}
          </div>
        )}
      </div>
    </div>
  );
};

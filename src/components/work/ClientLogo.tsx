import { cn } from "@/lib/utils";
import type { ClientGallery } from "@/data/media";
import { logoFrames } from "@/data/logo-frames";

interface ClientLogoProps {
  clientId: string;
  gallery: ClientGallery;
  name: string;
  /** Height of a frame that is as tall as it is wide; others follow their shape. */
  size?: string;
  className?: string;
}

/**
 * A client's logo in a frame cut to the logo itself: circular emblems get a
 * circle, oval ones an oval, wordmarks a softly rounded box trimmed of empty
 * space. The frame data in logo-frames.ts is measured from the image, so the
 * whole logo always sits inside its frame. A logo file without measured data
 * (for example one swapped in later) is shown whole, in its own shape.
 */
export const ClientLogo = ({
  clientId,
  gallery,
  name,
  size = "clamp(150px, 16vw, 220px)",
  className,
}: ClientLogoProps) => {
  if (!gallery.logo) return null;

  const frame = logoFrames[clientId];

  if (!frame || frame.file !== gallery.logoFile) {
    return (
      <img
        src={gallery.logo}
        alt={name + " logo"}
        loading="lazy"
        decoding="async"
        className={cn("mx-auto block h-auto w-auto max-w-full rounded-[24px]", className)}
        style={{ maxHeight: size }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name + " logo"}
      className={cn("relative mx-auto overflow-hidden", className)}
      style={{
        aspectRatio: String(frame.aspect),
        width: `min(100%, calc(${size} * ${frame.aspect}))`,
        borderRadius: frame.shape === "rounded" ? "24px" : "50%",
      }}
    >
      <img
        src={gallery.logo}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          maxWidth: "none",
          width: `${100 / frame.w}%`,
          height: `${100 / frame.h}%`,
          left: `${(-frame.x / frame.w) * 100}%`,
          top: `${(-frame.y / frame.h) * 100}%`,
        }}
      />
    </div>
  );
};

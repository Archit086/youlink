import { cn } from "@/lib/utils";

/** The long diagonal arrow used in CTA panels. Drawn, not an icon font. */
export const ArrowDiagonal = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={cn("h-auto w-full", className)}>
    <path d="M4 96 L96 4" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    <path d="M40 4 H96 V60" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
  </svg>
);

/** The short arrow that sits in navigation and button cells. */
export const ArrowRightGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("size-16", className)}>
    <path d="M3 12h18M14 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/**
 * Line-art plotting figures that sit beside each capability entry. They are
 * generated geometry — a wire globe, an orbit, and a radial burst — so each
 * service gets its own technical mark without any raster asset.
 */
export const WireFigure = ({ variant, className }: { variant: number; className?: string }) => {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={cn("h-auto w-full max-w-240", className)}>
      {/* Dotted containment ring — counter-rotates against the figure inside. */}
      <circle cx="100" cy="100" r="72" {...shared} strokeDasharray="1 4" className="wire-spin-reverse" />

      {variant % 4 === 0 && (
        <g className="wire-spin">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="100" cy="100" rx={14 + i * 14} ry="70" {...shared} />
          ))}
          <line x1="28" y1="100" x2="172" y2="100" {...shared} />
        </g>
      )}

      {variant % 4 === 1 && (
        <g className="wire-breathe">
          <circle cx="100" cy="100" r="70" {...shared} />
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx="100" cy="100" rx="70" ry={16 + i * 18} {...shared} />
          ))}
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx="100" cy="100" rx={22 + i * 24} ry="70" {...shared} />
          ))}
        </g>
      )}

      {variant % 4 === 2 && (
        <g className="wire-spin">
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={100 + Math.cos(angle) * 14}
                y1={100 + Math.sin(angle) * 14}
                x2={100 + Math.cos(angle) * 70}
                y2={100 + Math.sin(angle) * 70}
                {...shared}
                className="wire-fade"
                style={{ animationDelay: `${(i % 12) * 0.18}s` }}
              />
            );
          })}
        </g>
      )}

      {variant % 4 === 3 && (
        <>
          <g className="wire-breathe">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx="100" cy="100" r={26 + i * 22} {...shared} />
            ))}
          </g>
          <g className="wire-spin">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={100 + Math.cos(angle) * 48}
                  cy={100 + Math.sin(angle) * 48}
                  r="3"
                  {...shared}
                />
              );
            })}
          </g>
        </>
      )}
    </svg>
  );
};

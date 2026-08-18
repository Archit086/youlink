import { Suspense, lazy } from "react";

// three.js is ~500KB — kept out of the initial bundle and streamed in behind
// the CSS halftone, which stands in until the canvas is ready.
const ParticleWave = lazy(() =>
  import("@/components/ui/particle-wave").then((module) => ({ default: module.ParticleWave })),
);

/**
 * One fixed canvas behind the whole document.
 *
 * Every opaque panel paints over it; wherever a section leaves a gap, the wave
 * shows through. A single shared instance rather than one per section — the
 * canvas is the most expensive thing on the page.
 */
export const SiteBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    {/* Permanent CSS texture. It shows while the chunk loads, and stays as the
        visible fallback if WebGL is unavailable and the canvas bails out. */}
    <div className="halftone absolute inset-0 opacity-30" />

    <Suspense fallback={null}>
      <ParticleWave density={180} opacity={0.5} />
    </Suspense>
  </div>
);

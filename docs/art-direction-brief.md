# Art-Direction Brief — YouLink dark motion system

This replaces the earlier "Swiss Editorial Grid" brief. That system (1px spacing base, zero radius,
hairline rules, Inter / DM Serif / JetBrains Mono, invertible light-dark pair) has been removed
entirely. Nothing from it survives in the codebase.

---

## 0. The one-line description

One near-black ground, one pale blue-grey ink, Inter throughout with Playfair Display italic for
display lines, glass pill navigation, heavy corner radii, and motion that is driven by scroll
position rather than by timers.

---

## 1. Tokens

### Colour

| Token   | Value     | Role                                                     |
| ------- | --------- | -------------------------------------------------------- |
| ink     | `#0C0C0C` | The ground. `html`, `body`, `#root` and the main wrapper.  |
| mist    | `#D7E2EA` | Body copy, rules, outlines. Display type is plain white.    |

Every section sits on the same ground; there are no light panels. Separation comes from spacing,
hairlines, and the heavy top radius on the work section.

Rules and panel edges are `mist` at 15% opacity. Secondary copy is `mist` at 60–70% opacity. Those
two values carry nearly all of the hierarchy; do not introduce a third grey.

### Accent

Three pill buttons, all sentence case, all taken from the homepage hero:

| Pill    | Style                                                         | Use                         |
| ------- | ------------------------------------------------------------- | --------------------------- |
| Orange  | `#e8702a`, hover `#d2611f` with a soft orange glow             | The primary call to action  |
| White   | `bg-white`, `text-gray-900`, semibold                          | The nav's "Start a project" |
| Glass   | `bg-white/20`, `border-white/30`, `backdrop-blur-md`            | Secondary actions, nav pill |

### Type

**Inter** (300–700) everywhere, with **Playfair Display italic** (400–600) as the display voice.
Both load from Google Fonts. Nothing is set in uppercase and nothing is letter-spaced open; the body
runs at `-0.02em`.

- Display (hero first line, page and section titles, the wordmark): Playfair italic 400, white,
  `line-height: 0.95`, `-0.04em`, via `.display-serif`.
- Numerals: Inter 400, white, `-0.06em`, via `.display-sans`. The hero's second line uses the same
  register at `-0.08em`.
- Titles: Inter 500, sentence case.
- Body: Inter 300, `leading-relaxed`.
- Eyebrows: Inter 500 at a small size, via `.eyebrow`.

Everything display-scale is fluid. The hero heading steps `text-5xl` → `sm:text-7xl` →
`md:text-8xl`; page and section headings use `clamp(3rem, 7–8vw, 6rem)`; numerals use
`clamp(3rem, 10vw, 140px)`.

### Navigation

One component, `SiteNav`, on every page: the Playfair wordmark with the YL mark on the left, a glass
pill of links centred, the white "Start a project" pill on the right, and a hamburger below `md`. The
homepage floats it over the hero; inner pages set it in a sticky `#0C0C0C` strip at 80% with a blur.

### Spacing and shape

Standard Tailwind scales — `px-6` is `1.5rem`, not `6px`. Radii are large and deliberate:

| Context                       | Radius                                       |
| ----------------------------- | -------------------------------------------- |
| Section shoulders, case cards | `40px` → `50px` → `60px` across breakpoints  |
| Content panels                | `28px` → `36px`                              |
| Inputs                        | `16px`                                       |
| Buttons                       | fully round                                  |

---

## 2. Composition

The homepage runs in four movements, in this order:

1. **Hero** — one `100dvh` viewport. A base image settles out of a slow zoom while a 260px spotlight
   trails the cursor and uncovers a second image beneath it. A glass pill nav across the top, the
   two-line tagline near the top third, the promise bottom-left and the goal plus an orange call to
   action bottom-right.
2. **About** — a centred statement revealed character by character as the reader scrolls, with four
   3D objects anchored in the corners.
3. **Services** — five large serif titles with their summaries. Hovering or focusing one dims it and
   fans two photos out from behind its last letters (`RevealImageList` in `components/ui`).
4. **Work** — YouLink's current clients as cards that stick and shrink into a stack, each with an
   Instagram link, then a "See more work" button to the full client list.

Inner pages use a smaller vocabulary from the same system: `PageHeader`, `Section`, `Panel`,
`Numbered` and `RuledList` in `src/components/site/Page.tsx`. They keep a 6xl measure and the same
eyebrow-plus-serif-title opening, over a fixed generative tree (`TreeBackground`, via
`Layout`) in bark brown and leaf green. It grows once and stays until the visitor changes page.
The homepage turns it off.

---

## 3. Motion

Two primitives in `src/components/motion/`, plus two effects built in place:

| Primitive      | Behaviour                                                                       |
| -------------- | ------------------------------------------------------------------------------- |
| `FadeIn`       | In-view fade with a directional offset. Plays once, never replays.               |
| Spotlight      | `useSpotlight`: pointer eased at 0.1 per frame, local to the section, as a CSS radial mask. Used by the hero and the footer, which also drifts its grid 16px at 0.06. |
| `AnimatedText` | Character opacity scrubbed from 0.2 to 1 by scroll progress.                     |
| Card stacking  | `useScroll` + `useTransform` in `ProjectsSection`; each card shrinks by 0.03.    |

Easing for reveals is `[0.25, 0.1, 0.25, 1]`; the default duration is 0.7s. Scroll listeners are
passive and transforms are marked `will-change: transform`.

`prefers-reduced-motion: reduce` collapses every animation and transition to ~0ms in `index.css`.
The scroll-driven transforms still track position, which is correct — they follow the reader rather
than playing at them.

---

## 4. Accessibility notes

- Decorative imagery (hero frames, ornaments) is `aria-hidden` with empty `alt`.
- `AnimatedText` exposes the full string once in an `sr-only` span and hides the animated glyphs.
- Focus is a 2px `mist` outline at 3px offset, defined once on `:focus-visible`.
- The homepage has no header bar by design; the hero's `<nav>` is the landmark.

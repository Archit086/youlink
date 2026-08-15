# Art-Direction Brief — "Swiss Editorial Grid" reference system

**Paste this whole file to your coding agent as the design specification.**

This document describes a *design language* observed on a reference site (aspensearch.com), broken
down into measurable rules: tokens, layout logic, motion curves, and interaction mechanics. Values
marked **[measured]** were read directly from the reference site's compiled CSS/HTML. Values marked
**[inferred]** are behavioural conclusions drawn from the markup.

---

## 0. NON-NEGOTIABLE GROUND RULES — read before anything else

You are implementing a **design system**, not cloning a website.

**Do not reproduce, at any point:**

- the reference site's company name, copy, headlines, taglines, or any body text
- its logo, wordmark, or symbol
- its client names, statistics, testimonials, team members, or contact details
- its imagery or illustrations
- its typeface (Suisse Intl / Suisse Intl Mono are commercially licensed — you must substitute)
- its exact section order and content structure verbatim

**Do reproduce:** the structural discipline, the token scale, the motion curves, the hairline-grid
composition logic, and the level of restraint.

The success test is:

> A designer looks at the result and says *"this has the same design maturity"* —
> not *"this is the same website."*

Everything below is a **rule about form**, and form is what you are borrowing. All content must come
from the project's own source of truth.

---

## 1. THE THESIS OF THIS DESIGN LANGUAGE

Six sentences that explain the whole system. If a decision contradicts these, the decision is wrong.

1. **Structure is drawn with 1px lines, not with boxes.** Sections are divided by hairline rules and
   borders, never by cards floating on a background.
2. **There is no border radius anywhere.** Not on buttons, not on inputs, not on images, not on
   panels. **[measured: zero `rounded-*` utilities in the entire document]**
3. **There are no shadows, no gradients, no blur, no glass.** Depth is created by inverting
   foreground and background colours, never by lighting effects.
   **[measured: zero `backdrop-blur`, zero `mix-blend`, no gradient utilities]**
4. **Typography carries one weight.** Nearly every size renders at weight 450 — hierarchy comes from
   *size and space*, not from bolding.
5. **Labels are monospace, uppercase, and tiny; content is sans and huge.** The tension between
   10–14px mono metadata and 52–200px display type *is* the aesthetic.
6. **Motion is slow, single-direction, and eased out.** 600–800ms wipes and fades, never bounces,
   never loops (except one marquee), never parallax-heavy.

---

## 2. FOUNDATIONS

### 2.1 The spacing unit is ONE PIXEL

**[measured: `--spacing: 0.0625rem`]**

This is the single most important implementation detail. The base spacing unit is redefined to 1px,
so every spacing utility is a literal pixel value:

```
p-10   = 10px      gap-8   = 8px
px-12  = 12px      gap-60  = 60px
py-20  = 20px      h-36    = 36px
px-20  = 20px      min-w-200 = 200px
```

**Implement this.** In Tailwind v4: `@theme { --spacing: 0.0625rem; }`. In Tailwind v3: override the
whole `spacing` scale so `n` = `n`px. Every number in this document assumes it.

If you do not do this, every measurement below will be 4× too large.

### 2.2 Colour — five values, and only five

**[measured]**

| Token         | Value     | Role                                                          |
| ------------- | --------- | ------------------------------------------------------------- |
| `black`       | `#232323` | The real "black" — a soft charcoal, never pure                 |
| `black-deep`  | `#000000` | Reserved for rare full-bleed moments                          |
| `white`       | `#ffffff` | Paper                                                          |
| `grey`        | `#d9d9d9` | The *only* neutral fill — a mid grey, not a 50-step ramp       |
| `accent`      | `#a1ffcb` | A single saturated accent (mint). Used ONLY as described in 2.3 |

There is no grey ramp. No `gray-50/100/200/…`. When you need a lighter tone you use **opacity on the
foreground colour** (`opacity-50`, `opacity-60`, `text-fg/65`), never a new colour.

For your project: keep your brand's own hues, but **reduce the palette to this cardinality** — one
near-black, one white, one mid-grey fill, one accent. Nothing else.

### 2.3 The accent colour has exactly two jobs

**[measured]** The mint accent never appears as a background for a section, a card, or body text. It
appears only as:

1. the **hover fill** that wipes across buttons
2. the **focus ring** (`4px` ring + `2px` offset)

That is the entire budget. This is what makes it read as expensive rather than decorative. Adopt the
same rule with your own accent hue.

### 2.4 The invertible theme pair

**[measured]** Colour is expressed as two RGB-triplet variables that get swapped:

```css
:root            { --theme-bg: 255 255 255; --theme-fg: 35 35 35; }  /* light */
[data-theme=dark]{ --theme-bg:  35  35  35; --theme-fg: 255 255 255; } /* dark  */
```

Everything then paints with `bg-theme-bg` / `text-theme-fg` / `border-theme-fg`. Two consequences you
must replicate:

- **Any block can be inverted** by re-declaring the two variables on its own wrapper. That is how the
  design gets "dark sections" without a second stylesheet.
- **A light/dark toggle is nearly free**, because every component already paints in relative terms.

Build your components so they *never* hardcode a colour that could be `theme-fg`.

### 2.5 The type scale — fluid, and named by role

**[measured]** All display sizes are `clamp()`ed against a viewport range of **375px → 1600px**
(`--layout-min-w: 375; --layout-max-w: 1600`). Below 375 and above 1600 the size locks.

| Token         | Min → Max | Weight | Line-height | Tracking |
| ------------- | --------- | ------ | ----------- | -------- |
| `caption-10`  | 12px      | 400    | 1.1         | −4%      |
| `caption-20`  | 14px      | 400    | 1.0         | −4%      |
| `body-10`     | 16px      | 450    | 1.3         | −4%      |
| `body-20`     | 24px      | 450    | 1.1         | −2%      |
| `body-30`     | 24 → 32px | 450    | 1.1         | −2%      |
| `headline-10` | 24 → 40px | 450    | 1.1         | −4%      |
| `headline-20` | 32 → 48px | 450    | 1.0         | −4%      |
| `headline-30` | 40 → 56px | 450    | 1.0         | −4%      |
| `headline-40` | 40 → 100px| 450    | 1.0         | −4%      |
| `headline-50` | 52 → 200px| 450    | **0.8**     | −4%      |
| `digit-10`    | 80px      | 450    | 1.0         | −4%      |
| `digit-20`    | 80 → 120px| 450    | 1.0         | −4%      |
| `digit-30`    | 80 → 140px| 450    | 1.0         | −4%      |

Non-obvious rules encoded in this table — copy all of them:

- **Weight 450 everywhere.** Not 400, not 500 — a slightly-heavier-than-book weight, used for *both*
  the 200px headline and the 16px body. If your font has no 450, use 400 for display and 500 for
  small labels, and never go above 600.
- **Tracking is negative at every size, including 12px.** −4% is roughly `-0.04em`. Small text gets
  the *same* tightening as display text.
- **Line-height shrinks as size grows**: 1.3 at body → 1.1 → 1.0 → **0.8** at the largest display.
  Sub-1.0 leading on the hero is the signature move.
- **There is a dedicated numeric scale** (`digit-*`, 80–140px) separate from headlines, because
  statistics are typeset as a display element in their own right.

### 2.6 Two families, strictly divided by role

**[measured: `--font-sans` = Suisse Intl, `--font-mono` = Suisse Intl Mono]**

- **Sans (neutral grotesque)** → all headlines, all body copy. Choose a neutral grotesque with a
  450-ish weight: Inter, Suisse-alike alternatives, Neue Haas Grotesk, or Helvetica Now. Not a
  geometric font (no Poppins/Montserrat), not a rounded font.
- **Mono** → *every* label, eyebrow, section number, button, badge, caption, and stat unit.
  **[measured: mono labels appear ~100× and are almost always `uppercase`]**

The mono/uppercase/small treatment is the system's connective tissue. Canonical label class:

```
font-mono text-caption-10 uppercase        /* 12px, tracking −4%, uppercase */
font-mono text-caption-20 uppercase        /* 14px variant for list rows   */
font-mono text-caption-10 uppercase opacity-60   /* de-emphasised metadata */
```

Free mono options: JetBrains Mono, IBM Plex Mono, Geist Mono, Space Mono.

### 2.7 Radius, shadow, and the things that don't exist

**[measured]**

```
border-radius : 0        — everywhere, no exceptions
box-shadow    : none     — one 1px token exists in the build and is effectively unused
backdrop-blur : never used
gradients     : never used
```

The only "elevation" primitive is `border` at 1px in the current foreground colour.

### 2.8 Breakpoints

**[measured]** `640px / 768px / 1024px / 1280px / 1536px`, with the fluid type range spanning
375 → 1600. Layout switches from stacked to split at **1024px** (`lg:`) in almost every case.

---

## 3. LAYOUT SYSTEM — the hairline grid

This is the part most agents get wrong. Read carefully.

### 3.1 Composition is drawn with dividers, not gaps

**[measured: ~167 uses of `divide-x` / `divide-y` / `border-t` / `border-l`, versus zero card-shadow
patterns]**

Sections are built as **adjacent cells that share 1px borders**, like a printed table or a
architectural plan:

```html
<div class="grid grid-cols-2 divide-x border-t border-b">
  <div class="px-12 py-20 lg:px-20">…</div>
  <div class="px-12 py-20 lg:px-20">…</div>
</div>
```

Rules:

- Cells touch. There is **no gutter gap between panels** — the 1px rule *is* the gutter.
- Padding lives **inside** each cell (`px-12 py-20`, growing to `lg:px-20`), never as margin between
  them.
- Section boundaries are `border-t` on the next section, so the page reads as one continuous ruled
  sheet from header to footer.
- Occasionally a cell overlaps its neighbour by 1px (`-mb-1`, `-ml-1`) to collapse doubled borders.
  **[measured]** Do the same rather than shipping 2px seams.

### 3.2 The dominant grid is TWO columns, not three or four

**[measured: `grid-cols-2` used 83×; `grid-cols-3` used 0×; `grid-cols-4` used 3×]**

This is a deliberate rejection of the "three feature cards" layout. Build with:

- **2-up splits** for nearly everything (label ↔ content, statement ↔ proof, media ↔ text)
- **asymmetric column starts** to break the symmetry: `lg:col-start-3`, `lg:col-start-4`,
  `lg:row-span-2`, `lg:row-start-2` **[measured]** — panels deliberately begin at odd grid positions
  and span unequal row counts
- 4-up **only** for a dense metadata strip, never for feature cards

### 3.3 Sticky panels are a primary layout device

**[measured: multiple panels use `lg:sticky lg:top-(--site-header-height)`]**

Define a header-height variable (`--site-header-height: 60px` **[measured]**) and pin content to it:

```html
<div class="lg:sticky lg:top-(--site-header-height) lg:min-h-[calc(100svh-var(--site-header-height))]">
```

Pattern to replicate: in a 2-column section, **one column scrolls while the other stays pinned** —
typically the label/title column pins while the list column scrolls past it. Note `100svh` (small
viewport height), not `100vh` — this is what prevents mobile browser-chrome jump.

Sticky is applied at `lg:` only. On mobile everything is static and stacked.

### 3.4 Full-bleed, not container-centred

Sections run edge to edge; the *padding inside cells* creates the margin. There is no
`max-w-7xl mx-auto` container hugging the middle of the page. Content max-widths are applied to
individual text blocks, not to the layout shell.

---

## 4. THE HEADER

**[measured, verbatim structure]**

```
sticky inset-x-0 top-0 z-2 grid min-h-(--site-header-height) grid-cols-2 border-b bg-theme-bg
```

Every detail worth copying:

- **Sticky from the very first pixel**, not "appears on scroll up." It never hides.
- **60px tall** — deliberately short. Compare with the 80–96px headers of typical templates.
- It is a **grid, not a flexbox row** — split into two halves that are themselves divided by borders,
  so the header reads as the top row of the page's table.
- A **`border-b` hairline** is always present, so the header is welded to the page rather than
  floating over it. No shadow, no blur, no transparency.
- The **logo sits in a perfect square tile** whose size equals the header height
  (`size-(--site-header-height)`), and that tile is **colour-inverted** (`bg-theme-fg text-theme-bg`)
  — a solid block of foreground colour in the corner. This is the strongest single identity move on
  the page and costs nothing to implement.
- Nav links are **mono, uppercase, caption-size** like every other label.
- The primary CTA is a button (see §6.1), pinned to the far edge with `ml-auto`.

For mobile, keep the 60px bar and the inverted logo tile; put nav behind a full-height panel that
uses the same ruled-row treatment as §6.3.

---

## 5. SECTION PATTERNS

**[inferred from markup + page structure]** The reference page runs roughly:
hero → about statement → statistics band → numbered capability categories → client showcase →
people → single testimonial → closing CTA → footer.

Do **not** copy that order. Copy the *treatment* of each pattern:

### 5.1 Hero

- One `headline-50` statement (52 → 200px, leading **0.8**, tracking −4%). It is the largest thing
  that will ever appear on the site, by a wide margin.
- Supporting copy is `body-10`/`body-20` — a *huge* jump down. Never use an intermediate size here;
  the gap between headline and body is the drama.
- Metadata around the headline is mono/uppercase/caption.
- **No hero image, no gradient, no illustration behind the type.** The one graphical element is a
  small logo mark with a slow 3D rotation (§7.4).
- The hero occupies roughly one viewport and ends on a hairline.

### 5.2 Statistics band

- Numbers use the dedicated `digit-*` scale (**80–140px**) — nearly hero-sized.
- The number is the hero of the cell; the label sits beneath in mono/uppercase/caption.
- `tabular-nums` is applied **[measured]** so digits align in a column.
- Laid out as adjacent divided cells (`divide-x`), not as three floating cards.
- Assert the number bluntly; put any qualification in a caption below.

### 5.3 Numbered capability / service categories

- Categories are numbered `01`, `02`, `03`… in mono caption, set **beside** an oversized title.
- Each category lists 3–4 sub-capabilities as short mono/uppercase lines
  **[measured: `flex items-start gap-8 font-mono text-caption-20 uppercase`, used 16×]**.
- Rows are separated by `border-t` hairlines — never by cards.
- Row hover changes colour only (see §7.5). It does not lift, scale, or shadow.

### 5.4 Client showcase

- A **horizontal marquee** of client marks, each paired with a small mono category label
  (see §6.4 for mechanics).
- Logos are normalised: consistent optical size, and **greyscale/monochrome by default**
  **[measured: `grayscale` filter present]** so the strip reads as one texture rather than a
  ransom note of brand colours.
- If you have no rights-cleared logos, set the client **names as type** in the same mono/uppercase
  treatment. This is a legitimate and often better-looking option — do not fabricate logo images.

### 5.5 Testimonial

- **One** quote, presented large (`headline-10`/`headline-20`), not a carousel of five.
- Attribution below in mono caption: name, role, company.
- Quote text is never restyled or "improved" — set it exactly as given.

### 5.6 Closing CTA

- The same CTA phrase recurs across the page (3+ times) **[measured]**, with the final one given a
  full section of its own.
- Oversized headline, one primary button, and a great deal of empty space. Treated as a
  **destination**, not a banner strip.

---

## 6. COMPONENTS — exact mechanics

### 6.1 The button — the system's signature component

**[measured, full spec]**

```
geometry : h-36 px-12         (36px tall, 12px horizontal padding — small and wide, never chunky)
type     : font-mono text-caption-10 uppercase
radius   : 0
border   : none in the filled variant
layout   : relative isolate inline-flex w-fit items-center overflow-hidden whitespace-nowrap
fill     : bg-theme-fg text-theme-bg      (primary = inverted block)
```

The hover is a **wipe, not a colour fade**:

```css
/* a ::before panel, full-size, scaled to zero on the x-axis */
before:absolute before:inset-y-0 before:left-0 before:w-full before:h-full
before:scale-x-0 before:origin-left before:bg-[accent]
before:transition-transform before:duration-800 before:ease-out
hover:before:scale-x-100
/* text colour transitions with it */
transition-[transform,color] duration-800 ease-out
```

Details that matter:

- The wipe takes **800ms** with `ease-out` = `cubic-bezier(.16, 1, .3, 1)` — it moves fast at the
  start and settles slowly. This is why it feels expensive rather than snappy.
- `origin-left` means it always wipes in one direction. Never centre-out.
- `isolate` + `overflow-hidden` + `z-0` on the panel keep the label above the fill.
- **Reduced-motion fallback is explicit**: `motion-reduce:before:hidden` plus
  `motion-reduce:hover:bg-[accent] motion-reduce:hover:text-black` — the hover *still works*, it just
  becomes an instant colour swap. Copy this; it is the correct way to do it.
- Disabled state: `disabled:opacity-50 disabled:grayscale disabled:pointer-events-none`.
- A secondary variant simply swaps which colour is the fill and which is the wipe
  (`bg-theme-bg text-theme-fg before:bg-theme-fg`).
- Some instances get `min-w-200` **[measured]** so button widths align to a column edge.

### 6.2 Links and underlines

Underlines animate with the same `scale-x` grammar: a 1px pseudo-element at `scale-x-0`, growing to
`scale-x-100` on hover, `origin-left`, 800ms `ease-out`. Never a `text-decoration` toggle.

### 6.3 The corner metadata badge

**[measured, used 6×]**

```
absolute top-0 right-0 z-1 border-b border-l bg-theme-bg p-10
font-mono text-caption-10 text-theme-fg uppercase
transition-colors duration-800 ease-out
peer-hover:bg-theme-fg peer-hover:text-theme-bg
```

A small label notched into the **top-right corner** of a panel, with only `border-b` and `border-l`
so it appears cut out of the panel edge rather than placed on top of it. On hover of the sibling
(`peer-hover`), it **inverts**. This is a cheap, highly distinctive detail — use it for tags like a
sector, a year, or an index number on cards and images.

### 6.4 Marquee

**[measured: the `marqy` pattern]**

```
[data-marqy-inner]   display:flex; scrollbar hidden
[data-marqy-content] will-change:transform; flex:1 0 auto;
                     animation-timing-function:linear; iteration-count:infinite
@keyframes           translateX(0) → translateX(-100%)
```

Non-negotiable details:

- **Two identical content tracks**, each animating `0 → -100%`. That is what makes the loop seamless.
  Duplicate the item list *within* each track if the content is narrower than a wide viewport.
- `animation-timing-function: linear` — a marquee must never ease.
- **`pause-on-hover`** is supported via `animation-play-state: paused`.
- **Reduced-motion behaviour is not "stop"** — the container becomes `overflow-x: scroll` so the
  visitor can pan the content manually. **[measured]** This is a genuinely thoughtful detail; copy it.

### 6.5 Images

- Always given an explicit `aspect-[…]` ratio **[measured: 26 uses]** so nothing reflows on load.
- Zero radius, zero shadow.
- Hover: `scale-110` inside an `overflow-hidden` frame — the frame stays put, the image grows.
- Filters (`grayscale`, `invert`) are used to normalise disparate source images into one palette.

### 6.6 Forms

Same rules as buttons: 0 radius, 1px border in `theme-fg`, mono uppercase labels at caption size,
no inner shadow, no rounded focus glow. Focus uses the ring described in §8.

### 6.7 Custom scrollbar

**[measured]** `--sb-size: 6px`, thumb and track drawn in `theme-bg`/`theme-fg` with a divider rule.
A 6px scrollbar coloured with the theme pair. Optional, but it is the kind of detail that signals
the whole page was considered.

---

## 7. MOTION SYSTEM

### 7.1 The four easing curves — use these exact values

**[measured]**

```css
--ease-out    : cubic-bezier(0.16, 1,    0.3,  1);    /* the workhorse — 90% of transitions */
--ease-in-out : cubic-bezier(0.87, 0,    0.13, 1);    /* symmetric, for reversible states   */
--ease-in     : cubic-bezier(0.55, 0,    1,    0.45); /* exits only                          */
--ease-spring : cubic-bezier(0.34, 1.56, 0.64, 1);    /* ONE overshoot, used sparingly at 450ms */
```

`--ease-out` here is the "expo out" curve: it covers most of the distance in the first 20% of the
duration, then glides. Combined with long durations, this is what reads as "expensive."

### 7.2 The duration ladder

**[measured]** `150ms` (default) · `200ms` · `300ms` · `450ms` · `600ms` · `800ms`

- **800ms** — signature wipes and reveals (buttons, underlines, panel inversions)
- **600ms** — section-level entrances
- **300ms / 200ms** — small colour and opacity changes
- **450ms** — the single spring-eased interaction

Note how long these are compared with the typical 150–200ms UI transition. Slowness is the point,
because almost nothing moves *position*.

### 7.3 Reveal on scroll

**[inferred from `data-text` (43×) and `data-inner` (16×) attributes]**

Text is **split into lines**, each line wrapped in an `overflow-hidden` mask, and each inner line
translated up from below its own baseline with a stagger. The mask means letters appear to rise out
of the rule beneath them rather than fading in mid-air.

Implement as:

```
outer  : overflow-hidden (per line)
inner  : translate-y-full → translate-y-0, 800ms, --ease-out, staggered 40–80ms per line
trigger: IntersectionObserver, fire once, threshold ~0.15, rootMargin bottom −10%
```

Images/panels use a `clip-path: inset(...)` wipe rather than an opacity fade
**[measured: the theme-sweep keyframes use exactly this technique]**.

### 7.4 The named animations

**[measured, all four]**

```css
@keyframes theme-sweep-ltr { 0% { clip-path: inset(0 100% 0 0) } 100% { clip-path: inset(0) } }
@keyframes theme-sweep-rtl { 0% { clip-path: inset(0 0 0 100%) } 100% { clip-path: inset(0) } }
@keyframes hero-logo-coin  { 0% { transform: translateZ(1px) rotateY(0) }
                           100% { transform: translateZ(1px) rotateY(-360deg) } }
@keyframes typewriter-cursor-blink { 0%,44% { opacity:1 } 56%,100% { opacity:0 } }
```

- **theme-sweep** — when the light/dark toggle fires, the new theme is *wiped across the page* with a
  clip-path, direction depending on which way you switched. The page does not cross-fade.
- **hero-logo-coin** — the logo mark rotates a full 360° on the Y axis over **20 seconds, linear,
  infinite**, inside a `perspective: 1000px` wrapper. It is so slow it reads as ambient rather than
  as an animation. This is the *only* looping decoration on the page.
- **typewriter-cursor-blink** — 1s `step-end`, asymmetric on/off (on 0–44%, off 56–100%).

Take the lesson, not the assets: **one** slow ambient loop, maximum, and it should be attached to the
brand mark.

### 7.5 Hover grammar

There are only four hover behaviours in the entire system. Use these and nothing else:

1. **Wipe** — a fill scales in on one axis from one edge (buttons, links)
2. **Invert** — foreground and background swap (`peer-hover` badges, rows, tiles)
3. **Scale** — image grows to 110% inside a fixed frame
4. **Colour** — text or border shifts, 200–300ms

Never: translate-Y lift, drop-shadow bloom, rotation, skew, or a glow.

### 7.6 Reduced motion is handled in BOTH directions

**[measured: the CSS contains both `@media (prefers-reduced-motion: no-preference)` and
`@media (prefers-reduced-motion: reduce)` blocks]**

This means animations are **opted into** for users who allow them, rather than bolted on and disabled
later. Structure your CSS the same way, and ensure every reduced-motion path still delivers the
*information* (see the marquee and button fallbacks above). Nothing should become invisible or
non-interactive when motion is off.

---

## 8. ACCESSIBILITY REQUIREMENTS

**[measured]**

- **Focus ring: 4px in the accent colour, with a 2px offset**, and `outline-style: none` replaced by
  a ring — a chunky, unmissable, on-brand focus state. Do not shrink it to 1px.
- Interactive elements carry explicit `aria-label`s where the visible content is a symbol
  (e.g. the logo tile links home with a label).
- Colour contrast: the `#232323` on `#ffffff` pairing is ~15:1. When you use opacity for
  de-emphasis, **verify the resulting composite still clears 4.5:1** — `opacity-50` on small text is
  the most common failure in this system, so audit every `opacity-50`/`opacity-60` label.

**One thing to do BETTER than the reference:** its markup is div-heavy — the page contains only one
`<section>` element and two `<h1>`s **[measured]**. Do not copy that. Your build must use:

- exactly one `<h1>` per page
- real `<section>`/`<nav>`/`<header>`/`<footer>`/`<main>` landmarks
- `<ul>`/`<ol>` for lists, `<dl>` for statistic pairs (with `<dt>` before `<dd>` in the DOM; use
  flex `order` if the value must display above the label)
- a skip-to-content link as the first focusable element

---

## 9. RESPONSIVE RULES

- Mobile is **stacked and static**: no sticky panels, no split grids, no parallax below `lg:`.
- Cell padding scales `px-12 py-20` → `lg:px-20`. Vertical rhythm grows more than horizontal.
- Fluid type does the heavy lifting — because sizes `clamp()` between 375 and 1600, you rarely need
  per-breakpoint font-size overrides. Set the clamp once.
- The 0.8 line-height on the largest display size is safe *only* because of the clamp. Verify the
  hero headline at 360px width: it must not clip, and it must not force horizontal scroll.
- Use `100svh`, never `100vh`, for any full-height panel.
- `overflow-x: clip` on marquee containers (not `hidden`, which would break sticky descendants).

---

## 10. PERFORMANCE RULES

- Self-host fonts; preload the two families; `font-display: swap`; ship only the weights you use
  (this system needs roughly 2 sans weights + 1 mono).
- Do not add an animation library for any of this. Everything above is CSS transitions, CSS
  keyframes, and one IntersectionObserver. **[inferred: the only motion dependency present is a tiny
  marquee helper]**
- `will-change: transform` on marquee tracks only, never globally.
- Explicit `aspect-ratio` on every image to eliminate layout shift.
- Code-split routes so heavy client SDKs load only on the pages that use them.

---

## 11. ANTI-PATTERNS — what this design conspicuously never does

If any of these appear in your output, the implementation has failed:

- ❌ rounded corners of any radius
- ❌ box-shadows, drop-shadows, or glows
- ❌ gradients (linear, radial, mesh, or "subtle")
- ❌ glassmorphism / `backdrop-blur` / translucent floating panels
- ❌ a 3-across grid of feature cards with an icon at the top of each
- ❌ decorative blurred colour blobs behind the hero
- ❌ icon circles / pill badges / chips
- ❌ centre-aligned everything
- ❌ multiple accent colours, or an accent used as a section background
- ❌ hover lifts (`translate-y-[-4px]`), bounces, or spring-scale on cards
- ❌ carousels with dots
- ❌ stock photography of people at laptops
- ❌ bold weights used to create hierarchy that size and space should create
- ❌ a grey ramp with 10 steps

---

## 12. ACCEPTANCE CHECKLIST

Before declaring the work finished, verify every line:

**Tokens**
- [ ] Base spacing unit is 1px and all spacing values are literal pixels
- [ ] Palette contains ≤5 colours; accent appears only in hover fills and focus rings
- [ ] Theme expressed as invertible `--theme-bg` / `--theme-fg` RGB triplets
- [ ] Type scale is fluid-clamped across a 375→1600 viewport range
- [ ] One type weight dominates; negative tracking at every size; leading <1.0 on the largest size
- [ ] Mono/uppercase used for 100% of labels, numbers, buttons, and captions
- [ ] `border-radius: 0` globally; no shadow utilities in the codebase

**Layout**
- [ ] Sections divided by 1px rules, with padding inside cells and no gutter gaps
- [ ] 2-column splits dominate; no 3-across card grids
- [ ] At least one section uses an asymmetric column start or row span
- [ ] At least one section pins a column with `sticky` + header-height offset
- [ ] Doubled borders collapsed with negative 1px margins

**Motion**
- [ ] The four easing curves defined as tokens and used by name
- [ ] Signature interactions run at 600–800ms, not 150ms
- [ ] Button hover is an origin-left `scale-x` wipe with a working reduced-motion fallback
- [ ] Scroll reveals use per-line masks, fire once, and are IntersectionObserver-driven
- [ ] At most one ambient looping animation, attached to the brand mark
- [ ] `prefers-reduced-motion` handled in both directions; nothing disappears when motion is off

**Quality**
- [ ] Focus ring is 4px accent + 2px offset and visible on every interactive element
- [ ] One `<h1>` per page; real landmarks; `<dl>` for stat pairs
- [ ] Every `opacity-50/60` text composite verified ≥4.5:1
- [ ] No horizontal scroll at 320/360/768/1024/1440/1920
- [ ] Hero headline does not clip at 360px width
- [ ] Zero console errors; no layout shift on image load

**Originality**
- [ ] No copy, name, logo, client, statistic, or image from the reference site appears anywhere
- [ ] The typeface is licensed or open-source, not the reference's commercial family
- [ ] Section order and content structure are derived from *our* material, not theirs
- [ ] A side-by-side comparison reads as "same discipline," not "same site"

---

## 13. HOW TO MAKE THIS YOURS RATHER THAN THEIRS

Apply the system, then deliberately diverge on at least three of these axes so the result has its own
identity:

1. **Palette** — keep your brand hue as the near-black or the accent; the reference's mint is theirs.
2. **The accent's shape** — they wipe left-to-right; you might invert on hover, or rule-under, or
   swap the fill on a corner notch instead.
3. **The label grammar** — mono/uppercase is the reference's tone of voice. A tightly-tracked
   small-caps sans, or a serif italic used for one accent word, achieves the same "considered" signal
   with a different personality.
4. **The ambient loop** — theirs is a rotating coin. Yours could be a slowly redrawing rule, a
   ticking clock of section numbers, or nothing at all.
5. **The grid rhythm** — they lean on 2-up splits; a 12-column asymmetric editorial grid with 7/5 and
   4/8 splits reads as equally disciplined and looks nothing alike.
6. **Section order** — build the narrative your content demands, not the one their content demanded.

Everything in sections 1–12 is *craft*, and craft is transferable. Everything that identifies the
reference — its words, marks, clients, and typeface — stays with the reference.

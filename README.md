# YouLink

Marketing site for YouLink — a collaborative creative and marketing platform.
Branding, social media management, website development, and marketing & ads,
delivered by supervised freelance teams.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (standard scales) + **shadcn/ui** primitives
- **Framer Motion** for every reveal, magnet and scroll-driven transform
- **React Router** for routing
- **Supabase** for enquiry/application persistence and the notification email function
- **Vitest** + Testing Library for tests

## Getting started

```sh
npm install
npm run dev      # http://localhost:8080
```

## Scripts

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run preview`   | Preview the production build         |
| `npm run lint`      | ESLint                               |
| `npm test`          | Run the test suite once              |
| `npm run test:watch`| Run tests in watch mode              |

## Environment

Copy `.env.example` to `.env` and fill in the Supabase values. `.env` is gitignored; never commit it.

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Without these the site renders, but `/hire` and `/join` submissions will fail.

## Design system

The visual system is documented in [`docs/art-direction-brief.md`](docs/art-direction-brief.md).
The short version:

1. **One ground (`#0C0C0C`) and one ink (`#D7E2EA`).** Hierarchy comes from opacity, not from a
   grey ramp. Every section sits on the same black ground.
2. **Inter everywhere, Playfair Display italic for display lines.** No uppercase anywhere. Headings
   use `.display-serif`, big numerals use `.display-sans`.
3. **One navigation bar** (`SiteNav`) on every page, and three sentence-case pill buttons: orange
   primary, white, and glass.
4. **Spacing is standard Tailwind** - `px-6` is `1.5rem`. Radii are large: 40-60px on section
   shoulders and cards, fully round on buttons.
5. **Motion is scroll-driven**: `FadeIn` and `AnimatedText` in `src/components/motion/`, plus the
   hero spotlight and the stacking work cards.

## Content

All business content (services, clients, process, metrics) lives in `src/data/site.ts`. Every entry
is sourced from either the YouLink portfolio deck or the previous site — nothing is invented. Keep it
that way when adding to it.

Presentation imagery lives separately in `src/data/media.ts` — the two hero frames, the footer's still, haze overlay and video, the corner
ornaments, the two showcase strips, and the three case frames. **All of it is placeholder art hot-linked
from third-party hosts.** Replace it with YouLink's own captures before launch; the layout expects
landscape frames for the showcase strip and one tall plus two stacked frames per case card.

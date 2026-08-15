# YouLink

Marketing site for YouLink — a collaborative creative and marketing platform.
Branding, social media management, website development, and marketing & ads,
delivered by supervised freelance teams.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (1px base spacing unit — see below) + **shadcn/ui** primitives
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

Copy the Supabase values into `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Without these the site renders, but `/hire` and `/join` submissions will fail.

## Design system

The visual system is documented in [`docs/art-direction-brief.md`](docs/art-direction-brief.md).
Two conventions are easy to trip over:

1. **The base spacing unit is 1px.** `px-12` is 12 pixels, not 48. This is configured via the
   `spacing` scale in `tailwind.config.ts`.
2. **Type is addressed by role, not size** — `text-caption-10`, `text-body-20`, `text-headline-50`,
   `text-digit-30`. Sizes are fluid between a 375px and 1600px viewport.

There is no border radius and there are no shadows anywhere in the system. Structure is drawn with
1px rules.

## Content

All business content (services, clients, process, metrics) lives in `src/data/site.ts`. Every entry
is sourced from either the YouLink portfolio deck or the previous site — nothing is invented. Keep it
that way when adding to it.

/**
 * Presentation media for the homepage.
 *
 * Deliberately kept out of `site.ts`, which carries only sourced business
 * facts. Everything here is art direction: the scrolling showcase strip and the
 * three stacked case cards. Swap these URLs for YouLink's own captures as soon
 * as the client work is exported.
 */

export interface CaseMedia {
  /** Two stacked frames in the narrow left column. */
  columnOne: [string, string];
  /** One tall frame in the wide right column. */
  columnTwo: string;
}

/** Keyed by the client `id` in `site.ts`. */
export const caseMedia: Record<string, CaseMedia> = {
  chawlas: {
    columnOne: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    ],
    columnTwo:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  "saloni-lingerie": {
    columnOne: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    ],
    columnTwo:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  dayalx: {
    columnOne: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    ],
    columnTwo:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
  "kaale-kulfi-wala": {
    columnOne: [
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1280&q=80",
  },
  "mrtc-jewellers": {
    columnOne: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1280&q=80",
  },
  "glass-decor": {
    columnOne: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1280&q=80",
  },
  "gift-heaven": {
    columnOne: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1280&q=80",
  },
  "goat": {
    columnOne: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1280&q=80",
  },
  "chaffeine": {
    columnOne: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1280&q=80",
  },
  "sri-onkar": {
    columnOne: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1280&q=80",
    ],
    columnTwo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1280&q=80",
  },
};

/** Decorative 3D objects anchored in the corners of the about section. */
export const aboutOrnaments = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  shape:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
} as const;

/**
 * The hero's two frames: the base image, and the one the cursor spotlight
 * reveals through it.
 */
export const heroImages = {
  base: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85",
  reveal:
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85",
} as const;

/**
 * The footer's layered background: a product still, a haze overlay on top of
 * it, and a looping video that the cursor spotlight reveals.
 */
export const footerMedia = {
  base: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85",
  video:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4",
  overlay: "https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png",
} as const;

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`;

/** Two frames per service, fanned out when a service title is hovered. Keyed by service `id`. */
export const serviceImages: Record<string, [{ src: string; alt: string }, { src: string; alt: string }]> = {
  branding: [
    { src: unsplash("photo-1561070791-2526d30994b5"), alt: "Designer sketching brand concepts" },
    { src: unsplash("photo-1558655146-d09347e92766"), alt: "Design tools on a desk" },
  ],
  "social-media": [
    { src: unsplash("photo-1611162617213-7d7a39e9b1d7"), alt: "Social media apps on a phone" },
    { src: unsplash("photo-1611162616305-c69b3fa7fbe0"), alt: "Instagram open on a phone" },
  ],
  "web-development": [
    { src: unsplash("photo-1498050108023-c5249f4df085"), alt: "Code on a laptop screen" },
    { src: unsplash("photo-1517694712202-14dd9538aa97"), alt: "Developer working on a laptop" },
  ],
  "marketing-ads": [
    { src: unsplash("photo-1460925895917-afdab827c52f"), alt: "Analytics dashboard on a laptop" },
    { src: unsplash("photo-1552664730-d307ca884978"), alt: "Team planning a campaign" },
  ],
  "content-research": [
    { src: unsplash("photo-1455390582262-044cdead277a"), alt: "Typewriter with a page of writing" },
    { src: unsplash("photo-1432888498266-38ffec3eaf0a"), alt: "Notebook and laptop for research" },
  ],
};

/**
 * Presentation media for the homepage.
 *
 * Deliberately kept out of `site.ts`, which carries only sourced business
 * facts. Everything here is art direction: hero,
 * services, footer and about imagery. Client logos and work are the exception:
 * they are real, and come from the folders in src/assets/clients.
 */

/*
 * Client photos live in src/assets/clients/<client id>/. In each folder, a file
 * with "logo" in its name is the logo, and every other image is a piece of work,
 * used in file-name order (up to MAX_WORK_IMAGES). No shape is assumed: the
 * gallery measures each image and cuts its frame to match.
 * See src/assets/clients/README.md.
 */
const clientPhotoFiles = import.meta.glob<string>(
  "/src/assets/clients/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" },
);

export interface ClientGallery {
  logo?: string;
  /** The logo file name, used to match its measured frame in logo-frames.ts. */
  logoFile?: string;
  work: string[];
}

export const MAX_WORK_IMAGES = 3;

/** Keyed by the client `id` in `site.ts`. */
export const clientGalleries: Record<string, ClientGallery> = {};

for (const path of Object.keys(clientPhotoFiles).sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true }),
)) {
  const [, , , , clientId, fileName] = path.split("/");
  const gallery = (clientGalleries[clientId] ??= { work: [] });
  if (/logo/i.test(fileName)) {
    if (!gallery.logo) {
      gallery.logo = clientPhotoFiles[path];
      gallery.logoFile = fileName;
    }
  } else if (gallery.work.length < MAX_WORK_IMAGES) {
    gallery.work.push(clientPhotoFiles[path]);
  }
}

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

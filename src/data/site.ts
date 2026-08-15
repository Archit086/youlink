/**
 * Single source of truth for YouLink's business content.
 *
 * Provenance rules for anything added here:
 *   - "portfolio"  → stated in the YouLink portfolio deck
 *   - "site"       → already published on the YouLink website
 * Nothing in this file is invented. No metric, client, quote or outcome is
 * recorded unless one of those two sources states it.
 */

export type Source = "portfolio" | "site";

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "YouLink",
  tagline: "we connect you with a you",
  instagram: "https://www.instagram.com/youlink.in/",
  instagramHandle: "@youlink.in",
  /** Portfolio deck, "about YouLink". */
  positioning:
    "YouLink is a collaborative creative and marketing platform focused on helping brands grow with strategy, creativity, and consistency.",
  promise:
    "We don't just create content or run ads — we build brands from the ground up.",
  model:
    "What makes YouLink different is our structured freelance ecosystem, where skilled teams work under supervision to ensure quality, creativity, accountability, and smooth delivery.",
  goal:
    "To help small businesses become recognisable brands through smart strategy and meaningful marketing.",
  reach:
    "From website development and social media management to branding and marketing, we help businesses create a strong digital presence that looks professional, builds trust, and drives growth.",
} as const;

/* ------------------------------------------------------------------ */
/* Metrics — counts of facts stated in the portfolio deck              */
/* ------------------------------------------------------------------ */

export const metrics = [
  {
    value: "11",
    label: "Brands in our portfolio",
    note: "Named client engagements across our current book of work.",
  },
  {
    value: "06",
    label: "Industries served",
    note: "Fashion, food, healthcare, retail, jewellery and industrial sectors.",
  },
  {
    value: "04",
    label: "Core capabilities",
    note: "Branding, social media management, website development, marketing & ads.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  idealFor?: string;
}

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding",
    summary:
      "Identity work for businesses that need to look like a brand before they can be treated as one — built to hold up across every surface a customer meets.",
    capabilities: [
      "Brand identity & logo design",
      "Brand messaging & voice",
      "Marketing collateral & graphics",
      "Presentation design",
    ],
    idealFor: "Startups, businesses needing a brand refresh, marketing teams",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    summary:
      "Day-to-day ownership of the feed: creative direction, content production and a posting rhythm consistent enough to compound.",
    capabilities: [
      "Creative design work & social assets",
      "Reels and video content",
      "Content strategy & calendars",
      "Audience engagement",
    ],
    idealFor: "Brands, growing businesses, retail and hospitality",
  },
  {
    id: "web-development",
    title: "Website Development",
    summary:
      "The part of the brand a client actually transacts with. Built by verified developers working under technical supervision.",
    capabilities: [
      "Website development",
      "UI/UX design & prototyping",
      "Mobile app development",
      "Custom software & API integrations",
    ],
    idealFor: "Startups, enterprises, businesses digitalising operations",
  },
  {
    id: "marketing-ads",
    title: "Marketing & Ads",
    summary:
      "Campaign work that puts the brand in front of the right audience, then reports honestly on what it moved.",
    capabilities: [
      "Digital marketing campaigns",
      "Performance analytics",
      "Email campaign content",
      "Influencer coordination",
    ],
    idealFor: "Brands, influencers, growing businesses, event companies",
  },
  {
    id: "content-research",
    title: "Content & Research",
    summary:
      "Words and evidence: the copy that carries the positioning, and the research that argues for it.",
    capabilities: [
      "Copywriting & content strategy",
      "Blog, article & product copy",
      "Market research & analysis",
      "Reports & documentation",
    ],
    idealFor: "E-commerce, content-driven businesses, researchers, consultants",
  },
];

/** Reel and video formats produced for clients — portfolio deck, "Reels / video content". */
export const contentFormats = [
  "Food reel",
  "Product shoot",
  "Promotional video",
  "Trend-based reel",
  "Collabs",
] as const;

/* ------------------------------------------------------------------ */
/* Clients — all eleven are named in the portfolio deck                */
/* ------------------------------------------------------------------ */

export interface Client {
  id: string;
  name: string;
  handle?: string;
  sector: string;
  /** What the client is, in the deck's own terms. */
  profile: string;
  /** What YouLink did for them, in the deck's own terms. */
  engagement: string;
  /** Only where the deck states a founding year. */
  since?: string;
  featured?: boolean;
}

export const sectors = [
  "Food & Hospitality",
  "Fashion, Retail & Lifestyle",
  "Healthcare, Industrial & Professional",
] as const;

export const clients: Client[] = [
  {
    id: "chawlas",
    name: "Chawla's",
    handle: "@chawlas_ambalacity",
    sector: "Food & Hospitality",
    profile:
      "One of India's leading family restaurant chains, known for its strong legacy and loyal customer base.",
    engagement:
      "We worked on enhancing their digital presence through engaging content, social media management, and modern brand communication while maintaining their legacy identity.",
    featured: true,
  },
  {
    id: "hungry-holics",
    name: "Hungry Holics",
    handle: "@hungryholicindia",
    sector: "Food & Hospitality",
    profile:
      "A vibrant café brand known for its youthful atmosphere and modern food experience.",
    engagement:
      "We helped strengthen their online presence through creative content, audience-focused branding, and engaging social media strategies designed to connect with younger consumers.",
  },
  {
    id: "kaale-kulfi-wala",
    name: "Kaale Kulfi Wala",
    handle: "@kaalekulfiwala",
    sector: "Food & Hospitality",
    since: "1996",
    profile:
      "A heritage dessert brand recognised for its authentic traditional flavours and long-standing reputation.",
    engagement:
      "Our work focused on improving their digital presentation and social media visibility while preserving the traditional essence of the brand.",
  },
  {
    id: "saloni-lingerie",
    name: "Saloni Lingerie",
    handle: "@saloniinnerwear",
    sector: "Fashion, Retail & Lifestyle",
    profile:
      "Recognised as one of North India's finest lingerie brands, with a strong presence in the retail market.",
    engagement:
      "At YouLink, we managed their social media operations through consistent branding, aesthetic content creation, and audience engagement strategies.",
    featured: true,
  },
  {
    id: "norton-baby-planet",
    name: "Norton Baby Planet",
    handle: "@babyplanetindia",
    sector: "Fashion, Retail & Lifestyle",
    profile:
      "One of the largest baby stores in Ambala Cantt, offering a wide range of products for infants, kids, and mothers.",
    engagement:
      "We worked on building a strong digital presence through engaging content, branding, and customer-focused social media management.",
  },
  {
    id: "mrtc-jewellers",
    name: "MRTC Jewellers",
    handle: "@mrtc_jewellers",
    sector: "Fashion, Retail & Lifestyle",
    since: "1900",
    profile:
      "A legacy jewellery brand and one of Ambala City's most trusted names in gold, silver, and diamond jewellery.",
    engagement:
      "At YouLink, we focused on strengthening their digital identity while preserving the heritage and trust associated with the brand.",
  },
  {
    id: "jayesth",
    name: "Jayesth Imitation Jewellers",
    sector: "Fashion, Retail & Lifestyle",
    profile:
      "Known for its stylish and affordable jewellery collections designed for modern customers.",
    engagement:
      "Our work focused on improving their social media branding and enhancing audience engagement through visually appealing digital content.",
  },
  {
    id: "dayalx",
    name: "DayalX",
    sector: "Healthcare, Industrial & Professional",
    profile:
      "An emerging scientific solutions platform focused on serving laboratories, colleges, universities, and schools across India.",
    engagement:
      "We helped build their digital identity from the ground up through branding, social media strategy, and long-term digital positioning.",
    featured: true,
  },
  {
    id: "ld-entreprises",
    name: "L.D. Entreprises",
    sector: "Healthcare, Industrial & Professional",
    profile:
      "A trusted supplier of scientific and laboratory materials for industrial and commercial clients.",
    engagement:
      "At YouLink, we worked on strengthening their professional digital presence to better represent their credibility and large-scale operations.",
  },
  {
    id: "sri-omkar-hospital",
    name: "Sri Omkar Hospital",
    sector: "Healthcare, Industrial & Professional",
    profile:
      "A specialised ENT and Eye care hospital dedicated to quality healthcare and patient-focused services.",
    engagement:
      "We assisted in enhancing their online visibility and creating a professional digital presence to help them connect better with the local community.",
  },
  {
    id: "glass-decor",
    name: "Glass Decor",
    sector: "Healthcare, Industrial & Professional",
    profile:
      "A premium aluminium doors and window systems brand known for its modern craftsmanship and quality solutions.",
    engagement:
      "Our work focused on improving their online brand image and positioning them as a premium player in the market.",
  },
];

export const featuredClients = clients.filter((client) => client.featured);

export const clientsBySector = sectors.map((sector) => ({
  sector,
  items: clients.filter((client) => client.sector === sector),
}));

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

/*  ⚠️  PLACEHOLDER DATA — NOT REAL PEOPLE  ⚠️
 *
 *  The portfolio deck contains no team information. Every entry below is
 *  invented at the client's request as a layout placeholder, and the photos are
 *  unrelated Unsplash stock.
 *
 *  REPLACE BEFORE THE SITE GOES LIVE. Publishing invented staff on a site that
 *  sells "a capable team" is a claim the business cannot back up.
 *  Set `teamIsPlaceholder` to false once real names and photos are in.
 */
export const teamIsPlaceholder = true;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  photo: string;
}

export const team: TeamMember[] = [
  {
    id: "placeholder-1",
    name: "Placeholder One",
    role: "Founder",
    focus: "Brand strategy & client partnerships",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "placeholder-2",
    name: "Placeholder Two",
    role: "Creative Lead",
    focus: "Art direction & campaign design",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "placeholder-3",
    name: "Placeholder Three",
    role: "Supervisor",
    focus: "Delivery oversight & quality review",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "placeholder-4",
    name: "Placeholder Four",
    role: "Social Lead",
    focus: "Content calendars & reels production",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
];

/* ------------------------------------------------------------------ */
/* Operating model — existing website content                          */
/* ------------------------------------------------------------------ */

export const principles = [
  {
    title: "Verified freelancers",
    description:
      "Every freelancer is screened, verified, and approved before joining our ecosystem.",
  },
  {
    title: "Supervisor-led teams",
    description:
      "Projects are managed by experienced supervisors ensuring quality at every step.",
  },
  {
    title: "Transparent pricing",
    description:
      "Clear pricing structure with no hidden fees. Know exactly what you're paying for.",
  },
  {
    title: "Legal-backed agreements",
    description:
      "Every project comes with proper service agreements protecting both parties.",
  },
  {
    title: "Mentorship culture",
    description:
      "Freelancers grow with us through continuous mentorship and feedback loops.",
  },
  {
    title: "Fair payouts",
    description:
      "Milestone-based payments ensure freelancers are compensated fairly and on time.",
  },
] as const;

export const clientProcess = [
  {
    title: "Submit project enquiry",
    description:
      "Fill out our project enquiry form with your requirements, timeline, and budget expectations.",
  },
  {
    title: "Requirement assessment",
    description:
      "Our team reviews your project, clarifies details, and prepares a comprehensive scope document.",
  },
  {
    title: "Team & supervisor assignment",
    description:
      "We match you with the right freelancer team led by an experienced supervisor for your project type.",
  },
  {
    title: "Legal agreement + 50% advance",
    description:
      "Sign a service agreement for legal protection. Project begins after 50% advance payment.",
  },
  {
    title: "Milestone-based execution",
    description:
      "Work progresses through defined milestones with regular updates and quality checkpoints.",
  },
  {
    title: "Delivery + post-support",
    description:
      "Final delivery after quality review, followed by post-project support as per agreement.",
  },
] as const;

export const freelancerProcess = [
  {
    title: "Apply via onboarding form",
    description:
      "Submit your profile with skills, experience, portfolio, and CV for initial screening.",
  },
  {
    title: "Profile screening & verification",
    description:
      "Our team reviews your application, verifies credentials, and assesses skill alignment.",
  },
  {
    title: "Approval by admin/supervisor",
    description:
      "Qualified applicants are approved and added to our verified freelancer network.",
  },
  {
    title: "Subscription payment (₹99/month)",
    description:
      "Activate your account with a nominal monthly subscription to access project opportunities.",
  },
  {
    title: "Assignment to supervised projects",
    description:
      "Get matched to projects based on your skills, work under supervisor guidance.",
  },
  {
    title: "Mentorship + payout cycle",
    description:
      "Receive continuous feedback, skill development support, and fair milestone-based payouts.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { name: "Work", path: "/work" },
  { name: "Services", path: "/services" },
  { name: "Process", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
] as const;

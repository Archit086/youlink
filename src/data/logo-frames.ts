/**
 * Where each client's logo sits inside its logo image, measured from the files
 * in src/assets/clients. ClientLogo uses this to cut a frame to the logo itself:
 * a circle for round emblems, an oval for oval ones, and a rounded box trimmed of
 * empty space for everything else.
 *
 * Each entry names the file it was measured from. If a client's logo file is
 * replaced, its entry no longer matches and the new logo is shown whole instead,
 * so a stale entry can never crop the wrong image.
 */

export interface LogoFrame {
  /** The logo file these numbers were measured from. */
  file: string;
  /** circle and ellipse clip to the logo outline; rounded trims empty space. */
  shape: "circle" | "ellipse" | "rounded";
  /** The logo's box as fractions of the image: left, top, width, height. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Width divided by height of that box, in pixels. */
  aspect: number;
}

export const logoFrames: Record<string, LogoFrame> = {
  "goat": {
    file: "Logo.JPG",
    shape: "circle",
    x: 0.0886,
    y: 0.1959,
    w: 0.8222,
    h: 0.6144,
    aspect: 1.0,
  },
  "chaffeine": {
    file: "Chaffiene Logo.JPG",
    shape: "circle",
    x: 0.15,
    y: 0.1592,
    w: 0.6969,
    h: 0.7099,
    aspect: 1.0,
  },
  "sri-onkar": {
    file: "Logo.jpg",
    shape: "circle",
    x: 0.0,
    y: 0.0,
    w: 1.0,
    h: 1.0,
    aspect: 1.0,
  },
  "skyrise": {
    file: "Logo.JPG",
    shape: "circle",
    x: 0.1688,
    y: 0.218,
    w: 0.6219,
    h: 0.6476,
    aspect: 1.0,
  },
  "norton-baby-planet": {
    file: "Logo.PNG",
    shape: "circle",
    x: 0.1913,
    y: 0.2969,
    w: 0.6115,
    h: 0.4594,
    aspect: 1.0,
  },
  "hungry-holics": {
    file: "Logo.PNG",
    shape: "circle",
    x: 0.1686,
    y: 0.1706,
    w: 0.6597,
    h: 0.6677,
    aspect: 1.0,
  },
  "papa-ji-daal-wale": {
    file: "Logo.PNG",
    shape: "circle",
    x: 0.1639,
    y: 0.2041,
    w: 0.673,
    h: 0.6136,
    aspect: 1.0,
  },
  "mrtc-jewellers": {
    file: "Logo.jpg",
    shape: "circle",
    x: 0.1795,
    y: 0.2713,
    w: 0.6478,
    h: 0.4604,
    aspect: 1.0,
  },
  "chawlas": {
    file: "Chawla Logo.JPG",
    shape: "ellipse",
    x: 0.0094,
    y: 0.1329,
    w: 0.9812,
    h: 0.7236,
    aspect: 2.1361,
  },
  "kaale-kulfi-wala": {
    file: "Logo.jpg",
    shape: "rounded",
    x: 0.0,
    y: 0.2101,
    w: 1.0,
    h: 0.5767,
    aspect: 1.7339,
  },
  "gift-heaven": {
    file: "Gift heaven Logo.JPG",
    shape: "rounded",
    x: 0.0525,
    y: 0.1675,
    w: 0.87,
    h: 0.7588,
    aspect: 2.2932,
  },
  "saloni-lingerie": {
    file: "Logo.jpg",
    shape: "rounded",
    x: 0.0,
    y: 0.1831,
    w: 1.0,
    h: 0.5931,
    aspect: 1.3488,
  },
  "anaura-studio": {
    file: "Anaura Logo.jpg",
    shape: "rounded",
    x: 0.1641,
    y: 0.2456,
    w: 0.6818,
    h: 0.4619,
    aspect: 1.1691,
  },
  "dayalx": {
    file: "DayalX Logo.jpg",
    shape: "rounded",
    x: 0.1538,
    y: 0.4266,
    w: 0.6953,
    h: 0.15,
    aspect: 3.625,
  },
  "glass-decor": {
    file: "Logo.PNG",
    shape: "rounded",
    x: 0.2639,
    y: 0.0,
    w: 0.4468,
    h: 0.116,
    aspect: 2.9397,
  },
};

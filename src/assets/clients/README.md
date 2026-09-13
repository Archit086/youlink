# Client photos

One folder per client. The site reads these folders directly: whatever is in a
client's folder is what appears on their cards, on the homepage (current clients)
and on the Work page (everyone). Changes show up the next time the site is built
or the dev server reloads.

| Folder               | Client               |
| -------------------- | -------------------- |
| `gift-heaven`        | Gift Heaven          |
| `goat`               | GOAT                 |
| `chaffeine`          | Chaffeine            |
| `saloni-lingerie`    | Saloni Lingerie      |
| `kaale-kulfi-wala`   | Kaale Kulfi Wala     |
| `sri-onkar`          | SriOnkar             |
| `skyrise`            | Skyrise              |
| `chawlas`            | Chawla's             |
| `norton-baby-planet` | Norton's Baby Planet |
| `mrtc-jewellers`     | MRTC                 |
| `hungry-holics`      | Hungry Holic         |
| `anaura-studio`      | Anaura Studio        |
| `papa-ji-daal-wale`  | Papa Ji Daal Wale    |
| `glass-decor`        | Glass Decor          |
| `dayalx`             | DayalX               |

Keep the folder names exactly as they are; they match the client IDs in
`src/data/site.ts`.

## What goes in a folder

- **One logo.** Any file with "logo" in its name, such as `Logo.png` or
  `Chawla Logo.jpg`. It is shown first.
- **Work images.** Every other image, shown after the logo in file-name order.
  Up to three are used; name them `1.jpg`, `2.jpg`, `3.jpg` to control the order.

## Where each image appears

- **Homepage (current clients):** the logo and work together in one row. Every
  frame takes its own image's shape, so nothing is cropped. On phones the logo
  gets its own row.
- **Work page (everyone):** only the logo, in a frame cut to the logo itself: a
  circle for round emblems, an oval for oval ones, a rounded box trimmed of empty
  space for everything else. Those frames are measured from each logo file and
  stored in `src/data/logo-frames.ts`.

**Replacing a logo:** a new logo file (different name) is shown whole, uncropped,
until its frame is measured again. Ask for the logo frames to be re-measured after
swapping logos.

## Shapes and sizes

Any shape works: portrait, square or wide.

- `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif`.
- Around 1600px on the long edge and under 500 KB each keeps the page fast.
  PNG photos and screenshots are often several MB; save them as JPG or WebP.

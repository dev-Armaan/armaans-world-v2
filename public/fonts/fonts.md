# Fonts

Fonts are self-hosted from `assets/fonts` via `next/font/local` in `app/layout.tsx`, so builds never fetch from Google Fonts:

- Space Grotesk 700 for headings
- DM Sans 400 and 500 for body text

The `.woff` copies are used by the generated Open Graph image (`app/opengraph-image.tsx`), which can't read `.woff2`.

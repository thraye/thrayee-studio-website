## Thrayee Studio brand assets

This directory contains the checked-in website branding assets for Thrayee Studio — an interior design studio based in Hyderabad.

### Source files (authoritative brand assets)

These three files are the canonical source assets provided by Thrayee Studio and must not be altered:

- `source/thrayee-icon-gold.png` — bare gold icon/emblem (flame/trishul mark), transparent background, no text. Used for favicon generation and compact logo applications.
- `source/thrayee-lockup-horizontal.png` — horizontal lockup: icon left, "THRAYEE STUDIO" wordmark + subtitle right, with "Designing beyond walls" tagline bar below. Used as the basis for `logo-horizontal.png` and `logo-navbar.png`.
- `source/thrayee-lockup-vertical.png` — vertical/stacked lockup: icon top, "THRAYEE STUDIO" wordmark centered below, subtitle, and "DESIGNING BEYOND WALLS" tagline bar. Used as the basis for `logo-primary.png`.

> **Note on service-line subtitle:** The source lockup images contain "ARCHITECTURE | LANDSCAPE | INTERIOR" as a subtitle baked into the raster. Per business positioning, Thrayee Studio is an **interior design studio only**. The subtitle in the source images is a historical brand artefact; wherever the subtitle is rendered as **live text** on the website it must read **"INTERIOR DESIGN"** — not the architecture/landscape line. The source image files themselves are kept as-is since they are the authoritative originals.

### Derived website variants

- `logo-primary.png` — primary full-color lockup for light backgrounds (derived from vertical lockup source)
- `logo-horizontal.png` — horizontal variant for wide layouts such as the footer (derived from horizontal lockup source)
- `logo-dark.png` — dark/charcoal wordmark variant for light backgrounds
- `logo-white.png` — light/white wordmark variant for dark backgrounds (e.g. `bg-charcoal` footer)
- `logo-monochrome.png` — single-color flattened lockup
- `logo-navbar.png` — compact horizontal lockup (icon + wordmark only, no subtitle/tagline bar), sized for navbar rendering at ~40–48 px height, exported at 2× for Retina clarity
- `logo-icon.png` — icon-only square mark, transparent background, for navbar compact/mobile use and as favicon source
- `og-image.png` — 1200×630 Open Graph / social preview image
- `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` — favicon set derived from the icon mark

### Runtime CSS-filter usage

True recoloring of raster PNG variants (e.g. producing a pure-white version) is not performed at build time. Instead the app applies a Tailwind/CSS filter at render time:

- **Navbar (unscrolled / transparent background):** `brightness-0 invert` is applied to `logo-navbar.png` so the dark wordmark reads white over the hero's dark overlay.
- **If a white-on-dark variant is needed elsewhere:** apply `filter: brightness(0) invert(1)` to `logo-primary.png` or `logo-icon.png` rather than maintaining a separate raster.
- **Scrolled navbar (light background):** no filter — the default dark-on-transparent mark is used as-is.

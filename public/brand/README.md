## Thrayee Studio brand assets

This directory contains the checked-in website branding assets for Thrayee Studio.

### Source files

- `source/thrayee-icon-gold.png` — icon mark used for favicon and compact logo applications
- `source/thrayee-lockup-vertical.png` — primary vertical lockup for light backgrounds
- `source/thrayee-lockup-horizontal.png` — alternate horizontal lockup for wide placements

### Derived website variants

- `logo-primary.png` — primary full-color lockup
- `logo-dark.png` — dark wordmark variant for light backgrounds
- `logo-white.png` — light wordmark variant for dark backgrounds
- `logo-monochrome.png` — single-color charcoal lockup
- `logo-navbar.png` — compact horizontal navbar lockup
- `logo-icon.png` — icon-only square mark
- `og-image.png` — Open Graph / social preview image
- `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` — favicon set derived from the icon mark

These variants are pre-generated raster files. The only runtime filter use in the app is a light/dark inversion of the compact monochrome navbar mark so it can stay legible over both the transparent hero state and the scrolled light navigation state.

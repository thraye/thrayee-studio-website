# Before-Placeholders

This folder holds "before" images for the **Before & After** comparison section on the website.

## Current State

The `BeforeAfter.tsx` component currently uses the corresponding **"after"** project images as
stand-in placeholders, with a CSS `grayscale + blur + brightness` filter applied to simulate
an un-renovated look. This is a visual placeholder only — the images are identical to the
finished project photos but desaturated.

## How to Replace Placeholders with Real "Before" Images

1. Generate or source real AI-rendered "before" photos (e.g., empty/bare room renders) for each
   project listed in `components/BeforeAfter.tsx`.

2. Save each image in this folder using the naming convention below:

   | Project              | Expected filename                       |
   |----------------------|-----------------------------------------|
   | Vasavi Residency     | `vasavi-residency-before.jpg`           |
   | Reddy Residency      | `reddy-residency-before.jpg`            |
   | Jayram Residence     | `jayram-residence-before.jpg`           |
   | Anantha Residency    | `anantha-residency-before.jpg`          |

3. In `components/BeforeAfter.tsx`, update the `before` field for each entry from the current
   after-image path to the new path, e.g.:

   ```tsx
   before: '/portfolio/before-placeholders/vasavi-residency-before.jpg',
   ```

   Also set `beforeIsPlaceholder: false` for that entry so the grayscale filter is removed and
   the placeholder label disappears.

No other code changes are needed.

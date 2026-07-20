# Before-AI Images

This folder holds **"before" images** for the **Before & After** comparison section on the website (`components/BeforeAfter.tsx`).

## Current State

The `BeforeAfterSlider` component currently uses the corresponding **"after"** project images as
visual stand-in placeholders (`beforeIsPlaceholder: true`), rendered through a CSS
`grayscale + contrast + blur + brightness` filter to simulate an un-renovated look.
No actual "before" files need to exist while the placeholders are active.

## How to Replace Placeholders with Real "Before" Images

1. Generate (or commission) an AI image for each project listed below.
2. Save the file to this folder using **exactly** the filename shown.
3. In `components/BeforeAfter.tsx` update the `before` field for that pair:
   ```diff
   - before: '/portfolio/projects/Vasavi Residency/1.png',
   + before: '/portfolio/before-ai/Vasavi Residency.jpg',
   ```
4. Set `beforeIsPlaceholder: false` for that pair — the CSS filter will be removed automatically.

## Required Files & Composition Guidance

Each AI-generated "before" image should depict the **same space before construction/renovation**:
- **Bare site or unfinished structure** — plain concrete/brick walls, raw floors, no furniture, no landscaping, no interiors.
- **Match the camera angle as closely as possible** to the corresponding "after" photograph.
- Recommended resolution: at least **1600 × 1200 px**, aspect ratio **4:3**.
- Save as **JPEG** (quality 80–90) to keep file size reasonable.

| Filename (save here)                          | Corresponds to "after" image                              |
|-----------------------------------------------|-----------------------------------------------------------|
| `Vasavi Residency.jpg`                        | `/portfolio/projects/Vasavi Residency/1.png`              |
| `Reddy Residency.jpg`                         | `/portfolio/projects/Reddy Residency/1.png`               |
| `Jayram Residence.jpg`                        | `/portfolio/projects/Jayram Residence/1.jpg`              |
| `Anantha Residency.jpg`                       | `/portfolio/projects/Anantha Residency/1.png`             |
| `Ashish Jubilee Hills Pent House.jpg`         | `/portfolio/projects/Ashish Jubilee Hills Pent House/1.jpeg` |
| `Aparna Zenith 4BHK Flat.jpg`                 | `/portfolio/projects/Aparna Zenith 4BHK Flat/1.jpg`       |

## AI Image Generation Prompt Template

Use a prompt similar to the following (adapt per project):

> "Interior of an empty, unfinished apartment: bare concrete walls, raw screed floor, exposed ceiling with no finishes, no furniture, no landscaping. Natural daylight from windows. [Describe specific camera angle from the reference photo, e.g., 'Wide-angle shot from the living room corner facing the balcony doorway']. Photorealistic, architectural photography style."

# SPARKATHON 2026 — ASSET INVENTORY & DISCIPLINE MATRIX

**Project Root:** `d:\temps\1\brochur e`  
**Discipline Mandate:** Strict division between `PRODUCTION_APPROVED` creative assets and `REFERENCE_ONLY` documentation. Assets marked `REFERENCE_ONLY` must **NEVER** be rendered directly as website imagery (no screenshots, no raster text embeds, no brochure captures).

---

## 1. Production-Approved Creative Assets

### A. Approved Cinematic Hero Video
| File Path | Dimensions / Duration | Codec / Specs | Role in Experience |
| :--- | :--- | :--- | :--- |
| `clips/intro clip 01.mp4` | 1280x720, 10.01s | H.264 / AAC, 24.0 fps | **Hero Opening Shot:** Cinematic cowboy galloping through desert canyon straight toward camera; full letterbox widescreen experience. |

---

### B. Approved Environmental Photography (Monochrome / Halftone Vintage)
| File Name | Resolution | Description | Intended Section / Usage |
| :--- | :--- | :--- | :--- |
| `ChatGPT Image Sep 13, 2026, 04_05_36 PM.png` | 1672 x 941 | Panoramic desert basin with windmill, cactus, and Monument Valley sandstone buttes | Section 02 & Section 03 background landscapes |
| `ChatGPT Image Sep 13, 2026, 04_08_11 PM.png` | 1024 x 1536 | Cowboy seated on wagon looking out over expansive desert mountains | Section 06 (Timeline Header / The Horizon) |
| `ChatGPT Image Sep 13, 2026, 04_10_49 PM.png` | 1536 x 1024 | Campfire with cast-iron cauldron hanging over blazing fire, barrels, stump | Section 06 (Stage 4: Refuel Phase) |
| `ChatGPT Image Sep 13, 2026, 04_24_11 PM.png` | 1536 x 1024 | Cowboy leaning against corral fence at dramatic sunset overlooking canyon | Section 06 (Stage 5: Final Boss / Valedictory) |
| `ChatGPT Image Sep 13, 2026, 04_30_19 PM.png` | 1536 x 1024 | Weathered wooden cabin outpost with rocking chair, lantern, vignette edges | Section 06 (Stage 1: Player Entry / Registration) |
| `ChatGPT Image Sep 13, 2026, 04_31_25 PM.png` | 1536 x 1024 | Steel windpump and split-rail corral fence with coiled lasso rope | Section 06 (Stage 2: The Beginning / Inauguration) |
| `ChatGPT Image Sep 13, 2026, 04_32_35 PM.png` | 1536 x 1024 | Monument Valley red rock buttes with weathered wagon wheel and cactus | Section 06 (Stage 3: The Quest / Exhibition) |

---

### C. Approved Sprites, Textures & Cutouts
| File Name | Resolution | Format | Description & Contents |
| :--- | :--- | :--- | :--- |
| `ChatGPT Image Sep 13, 2026, 04_08_18 PM.png` | 1227 x 1282 | RGBA (Alpha) | **Universal Western Sprite Sheet:** 2 seated cowboys, blank "WANTED DEAD OR ALIVE" parchment template, rusty horseshoe, 6-point metal Sheriff badge, split-rail wooden fence, Saguaro cactus, oak barrel, Monument Valley silhouette, torn paper cloud, coiled lasso rope, longhorn steer skull, 3-way wooden directional signpost, compass rose on torn map, tumbleweed, desert boulders, torn blood-red paper ribbons and strips. |
| `ChatGPT Image Sep 13, 2026, 06_33_25 PM.png` | 2170 x 725 | RGBA (Alpha) | **Cutout Western Typography Banner:** "JUDGING CRITERIA" in authentic Western slab typeface with cream fill and blood-red stroke. |
| `ChatGPT Image Sep 13, 2026, 04_37_44 PM.png` | 1024 x 1536 | RGB | **Untexted Open Innovation Layout:** Galloping wild horses under blazing white moon/sun across blood-red sky with wooden fence and barbed wire in foreground. |
| `ChatGPT Image Sep 13, 2026, 04_54_55 PM.png` | 1024 x 1536 | RGB | **Untexted Corral & Windmill Layout:** Weathered wooden fence post with hung black Stetson hat, coiled lasso, steel windpump, desert canyon background. |

---

## 2. Reference-Only Assets (NEVER Render Directly in Production)

| File Name | Primary Purpose | Why It Must NOT Be Rendered in UI |
| :--- | :--- | :--- |
| `Spark-a-thon.pdf` | Factual event source of truth | Multi-page PDF flyer with baked raster text and layout guidelines. Must be translated into semantic code, not embedded. |
| `brocuhre.png` | Layout and editorial annotation reference | Low-res raster capture of Page 8 with baked text ("SAME PLAYERS BIGGER STORIES"). Used purely to guide layout choreography. |
| `ChatGPT Image Sep 13, 2026, 03_57_54 PM.png` | Open Innovation layout reference | Pre-baked raster bullet text and title. Replaced by semantic HTML/CSS using untexted template `04_37_44 PM.png`. |
| `ChatGPT Image Sep 13, 2026, 04_52_47 PM.png` | How It Works & Judging Criteria reference | Pre-baked raster bullet text. Replaced by semantic HTML/CSS and cutout banner `06_33_25 PM.png`. |

---

## 3. Asset Gap Analysis (What is Missing & To Be Staged)

To execute the corrected architectural vision without violating asset discipline:

1. **Large Cinematic Frontier Map Base (Section 03):**
   * Needs a high-resolution illustrated parchment map canvas featuring topographic contour lines, desert canyons, and compass rose markings for the 5 Bounties camera journey.
2. **Sub-Sprite Extraction:**
   * Individual high-DPI transparent PNGs need to be cleanly cropped from the universal sprite sheet (`04_08_18 PM.png`):
     - `compass_rose.png` (for Map navigation)
     - `cow_skull.png` (environmental accent)
     - `sheriff_badge.png` (judging verdict stamp)
     - `wanted_poster_blank.png` (bounty claim manifest)
     - `lasso_rope.png` / `horseshoe.png` / `tumbleweed.png`
3. **Parchment & Film Grain Texture Overlays:**
   * High-frequency distressed paper texture and subtle 35mm film grain overlay to give the entire viewport a tactile, physical print sensation.
4. **Western Typography System:**
   * Western Display Serif: *Rye* / *Sancreek* (Google Fonts)
   * Condensed Editorial Uppercase: *Bebas Neue* / *Oswald* (Google Fonts)
   * Clean Body Font: *Cinzel* / *Outfit* / *Lora* (Google Fonts)
   * Handwritten Ink Script: *Caveat* / *Rock Salt* (Google Fonts)

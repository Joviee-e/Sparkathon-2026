# SPARKATHON 2026 — PROJECT STATE & GOVERNANCE

**Current Status:** Phase 3 (Section 03: Choose Bounty / The Five Bounties) Completed & Verified  
**Active Phase:** Awaiting User Review & Sign-Off on Phase 3  
**Next Phase:** Phase 4 — Section 04: How It Works (Frontier Workbench)  
**Code Modified:** `index.html`, `src/styles/bounties-map.css`, `src/main.js`, `test-section3.js`, `public/assets/images/compass-rose-parchment.png`  

---

## 1. Verified Event Facts (Absolute Source of Truth)

All factual data is locked to the official `Spark-a-thon.pdf` brochure and verified event documentation (`D:\Club\Core 26-27\Sparkathon\event explaination doc`). No details are invented or modified.

* **Event Title:** SPARKATHON 2026
* **Host Entity:** E-Cell FCRIT (Fr. C. Rodrigues Institute of Technology, Vashi, Navi Mumbai)
* **Official Date:** 08.10.26 (October 8, 2026)
* **Tagline:** "Where Innovation Meets Excellence"
* **Prize Pool:** ₹15,000 Total Cash Prize Pool
* **Strategic Growth Perks:**
  * Top ideas incubate into startups with dedicated resources & mentorship
  * Continuous industry mentorship to refine concepts and launch commercial ventures
  * Special incentive: Participants stand a chance to avail discounts **up to 25%* at E-Summit 2026-27** (*T&C Apply)
* **Team Structure:** Strictly team-based; **exactly 4 members per team**
* **Cohort Intake:** Capped strictly at **40 teams maximum** (160 total participants for the offline finale)
* **Admission Method:** **First-come, first-served basis** (no internal shortlisting rounds; registrations close upon reaching 40 valid teams)
* **Event Format:** Offline hackathon exhibition and pitch before an industry jury panel
* **The 5 Official Domains (Exact & Authoritative):**
  * `01 — AI / ML + CYBERSECURITY`
  * `02 — SMART ENERGY SYSTEMS`
  * `03 — ROBOTICS / DRONES / FIXED WING`
  * `04 — IOT / EMBEDDED SYSTEMS`
  * `05 — OPEN INNOVATION`

---

## 2. Core Creative Vision: "The Brochure Came Alive"

The website is not an event marketing landing page; it is an immersive cinematic voyage into a rugged Western frontier. The aesthetic reflects physical print, editorial photography, and handcrafted artifacts.

### The Color Palette
* **Deep Blood Red (`#8B0000` / `#9E0000`):** Header banners, animated trail route, wax seals, stamps, high-contrast typography strokes.
* **Warm Ivory & Aged Parchment (`#F4EFEA` / `#F7F2E7`):** Field manifests, map canvases, card backdrops.
* **Dark Espresso & Charred Black (`#14100E` / `#1F1A17`):** Deep canyon shadows, night skies, halftone woodcut ink.
* **Muted Brass & Dust Gold (`#C5A059` / `#D4AF37`):** Sheriff stars, metallic pins, border rules.
* **Weathered Sand & Clay (`#D8C3A5` / `#B85D3B`):** Environmental terrain.

### Prohibited Anti-Patterns (Zero Tolerance)
* ❌ Futuristic AI aesthetic / circuit boards / cyber glow
* ❌ Neon purple/blue gradients
* ❌ Glassmorphism / backdrop-blur generic cards
* ❌ SaaS layouts / generic dashboard metrics
* ❌ Generic rounded cards with excessive dropshadows
* ❌ Gratuitous 3D meshes or bouncing/spinning elements
* ❌ Unnecessary cursor gimmicks or trail effects

---

## 3. Approved Architectural Corrections (User Mandate)

| Area | Initial Proposal | Corrected Mandate |
| :--- | :--- | :--- |
| **The 5 Bounties** | 5 Wanted Posters on a wooden wall / carousel | **A Large Cinematic Frontier Map.** Full viewport terrain with drawn red trail, 5 X checkpoints, camera traveling through regions. Open Innovation breaks off into "The Unknown Frontier." |
| **Section Flow** | Conventional section order | **Strict 8-Stage Narrative:** Arrive (Hero) → Understand (What is) → Choose Bounty (Map) → Learn Process (How it Works) → Showdown (Judging) → Follow Trail (Timeline) → Claim Bounty (Rewards) → Register. |
| **How It Works** | 4-card sequence | **Frontier Workbench / Field Document.** Tangible progressive evolution: Present → Prototype → Solution → Pitch. |
| **Showdown** | 2-column numbered rules & scoring rubric | **High Noon Climax.** Dramatic negative space. Criteria hit like official verdict stamps. Climaxes in "One Winner Per Domain" → Recognition, Mentorship, Incubation. |
| **Timeline** | Pinned cards with static background | **Living Expedition Trail.** Dynamic time-of-day progression: Morning → Midday → Afternoon → Dusk. |
| **Hero Experience** | Standard video container | **Cinematic Film Opening.** Black → Desert/Canyon → Horse+Rider → Title → Dust → World. Reversible scroll preserves title. |

---

## 4. Phase 2 Implementation Summary (Section 02: Understand / What is SPARKATHON)

### Completed Deliverables:
1. **Physical Field Document Architecture:**
   - Designed and built Section 02 as a unified physical field document spread (`field-document`) inside an aged warm parchment canvas (`#F7F2E7`) with double-rule blood red (`#8B0000`) and gold pinstripe borders.
   - **Zero Card Clutter:** Replaced generic floating cards with a cohesive typographic editorial spread featuring authentic physical print language (registration marks, dispatch stamp, index marker `02 / UNDERSTAND`, Western display header, letterpress criteria pills).
2. **The Frontier Ledger Grid:**
   - Implemented an authentic ruled ledger table for verified specifications (08.10.26, ₹15,000, 4 Members, 40 Teams, First-come first-served, Offline exhibition & pitch).
3. **Strategic Growth Docket & Partner Perk Seal:**
   - Two-column hand-ruled letterpress docket for venture acceleration (Startup Incubation, Continuous Mentorship, E-Summit 25% discount incentive seal).
4. **Environmental Layering & Continuity:**
   - Retained atmospheric dust blend, barbed wire divider, and panoramic desert basin landscape bleeding across background.
5. **Motion & Scroll Choreography:**
   - GSAP timeline with bi-directional scrub and 100% reversible scroll restoring the Hero title and video.

---

## 5. Phase 3 Implementation Summary (Section 03: The Five Bounties — Large Cinematic Frontier Map)

### Core Creative Principle:
Section 03 is NOT a carousel, NOT five cards on a background, and NOT a horizontal slider. It is **ONE LARGE CINEMATIC FRONTIER MAP** (2600×1600 coordinate world) where the viewport is a physical camera traversing across uncharted geography, following an expedition trail drawn in blood-red ink.

### Completed Deliverables:
1. **Frontier Map Coordinate Canvas Architecture (`src/styles/bounties-map.css`):**
   - **Pinned Stage (`.bounties-pinned-stage`):** 520vh scroll track delivering deliberate, cinematic camera travel without rushing.
   - **Coordinate World (`.bounties-map-world`):** 2600px × 1600px aged parchment map with burnt edges, latitude/longitude grid, contour lines, arroyos, canyon formations, mountain silhouettes, and physical scale bar (`100 LEAGUES`).
   - **Editorial Heads-Up HUD (`.bounties-hud-overlay`):** Positioned discreetly at screen edges to avoid obstructing checkpoint pins. Displays `03 / CHOOSE YOUR BOUNTY`, `FIVE FRONTIERS. ONE CHALLENGE.`, and a real-time coordinate/waypoint tracker (`ACTIVE SECTOR // EXPEDITION ROUTE`).
   - **Compass Rose:** Extracted authentic antique compass rose on torn parchment from `public/assets/images/spritesheet.png` (`compass-rose-parchment.png`, 310×230 RGBA) anchored in the northwest territory.
2. **The Active Blood-Red Expedition Route:**
   - SVG vector path `#active-expedition-trail` connecting all 5 checkpoints with organic bezier curves mimicking hand-inked cartography.
   - Animated via `stroke-dasharray` and `stroke-dashoffset` in direct lockstep with camera travel (0% drawn at establish shot, 100% drawn upon reaching Destination 05).
3. **Five Authoritative Checkpoints & Inked Editorial Annotations:**
   - Each checkpoint features a stamped blood-red disc with an inked white `X`, coordinate label, and physical editorial annotation card with zero invented descriptions:
     - **Checkpoint 01 (X: 520, Y: 1120):** `SECTOR 01: CIPHER BASIN` → `01 — AI / ML + CYBERSECURITY`
     - **Checkpoint 02 (X: 1040, Y: 840):** `SECTOR 02: SUN-POWERED PLATEAU` → `02 — SMART ENERGY SYSTEMS`
     - **Checkpoint 03 (X: 1540, Y: 1180):** `SECTOR 03: APEX ESCARPMENT` → `03 — ROBOTICS / DRONES / FIXED WING`
     - **Checkpoint 04 (X: 1960, Y: 680):** `SECTOR 04: SILICON ARROYO` → `04 — IOT / EMBEDDED SYSTEMS`
     - **Checkpoint 05 (X: 2420, Y: 360):** `SECTOR 05: UNCHARTED BADLANDS` → `05 — OPEN INNOVATION`
4. **Climax: Breaking Beyond the Frontier into "The Unknown Frontier":**
   - At Checkpoint 05, the charted map border fractures along a ragged, burnt parchment edge.
   - The red trail extends past the perimeter into an open crimson void labeled **"THE UNKNOWN FRONTIER"**, backdropped by galloping wild horses (`public/assets/images/open-innovation-frame.png`).
5. **Camera Choreography Math & Pacing (`src/main.js`):**
   - GSAP ScrollTrigger timeline scrubs the camera transform:
     - Formula: `x = (window.innerWidth / 2) - (targetX * scale)`, `y = (window.innerHeight / 2) - (targetY * scale)`.
     - Overview Establish (0% - 18%): Wide survey of the entire frontier continent.
     - Waypoint 01 (18% - 36%): Pushes in on AI / ML + Cybersecurity.
     - Waypoint 02 (36% - 54%): Panning transition to Smart Energy Systems.
     - Waypoint 03 (54% - 72%): Glides down canyon pass to Robotics / Drones.
     - Waypoint 04 (72% - 85%): Rises northeast to IoT / Embedded Systems.
     - Waypoint 05 (85% - 94%): Breaches map border into Open Innovation / Unknown Frontier.
     - Full Route Pullback (94% - 100%): Pulls back to show the entire connected route.
6. **Responsive Design (Desktop, Tablet, Mobile):**
   - **Desktop:** Full 2D pinned camera travel with high-resolution map space.
   - **Tablet (820px):** Proportional scale camera travel preserving the cinematic journey.
   - **Mobile (390px):** Intentionally converts the pinned canvas into a vertical linear expedition trail down the map parchment. Checkpoints are connected sequentially by dashed red lines with 0px horizontal overflow (`scrollWidth === clientWidth`).
7. **Accessibility (`prefers-reduced-motion`):**
   - Static map overview displays all 5 checkpoints and the complete red trail simultaneously with zero camera motion.
8. **Map Asset Dependency Decoupling:**
   - The base map artwork `frontier-map-base.png` is documented as an asset dependency in `ASSET_INVENTORY.md`.
   - The structural SVG/CSS topographical layer is cleanly separated, allowing the final illustrated map base image to be slotted into `.bounties-map-base-artwork` without altering checkpoint coordinates, route geometry, camera choreography, or mobile logic.

---

## 6. Verification & Test Results (Phase 3)

- **Production Build:** `npm run build` compiled cleanly in **206ms** with 0 errors.
- **Automated Browser Test Suite (`test-section3.js` via Microsoft Edge):**
  1. Section 02 → Section 03 Transition: Seamless visual blend from field document into frontier map.
  2. Map Establish Shot (`01_map_establish_shot.png`): Full 2600×1600 map framed with compass rose and editorial HUD.
  3. Route Drawing & Checkpoint 01 (`02_checkpoint_01_aiml.png`): Red ink trail starts drawing and activates AI / ML + Cybersecurity.
  4. Checkpoint 03 (`03_checkpoint_03_robotics.png`): Camera centers on Robotics / Drones / Fixed Wing at Apex Escarpment.
  5. Checkpoint 05 & Unknown Frontier (`04_checkpoint_05_open_innovation.png`, `05_unknown_frontier_climax.png`): Trail breaks charted boundary with wild horses silhouette.
  6. Reversible Scroll to Section 02 (`06_reverse_scroll_to_section02.png`): Reversing scroll cleanly restores Section 02.
  7. Reversible Scroll to Hero (`07_reverse_scrolled_to_hero_title.png`): **Confirmed 100% restored:** `SPARKATHON` title, badges, letterbox bars, and video.
  8. Tablet Viewport (`08_tablet_map_overview.png`): Clean responsive layout at 820×1180.
  9. Mobile Viewport (`09_mobile_map_top.png`, `10_mobile_map_checkpoints.png`): Full vertical expedition journey verified at 390×844 with **zero horizontal overflow** (`hasOverflow: false`).

---

## 7. Current Milestone Checklist

- [x] Workspace & asset directory audit completed.
- [x] Factual source of truth locked against official brochure and documents.
- [x] Video frames and high-res sprite assets cataloged.
- [x] `ASSET_INVENTORY.md` created with strict production vs reference rules.
- [x] `PROJECT_STATE.md` established and maintained.
- [x] `DESIGN_ARCHITECTURE.md` updated with corrected 8-stage scroll choreography.
- [x] Phase 1: Global design foundation established.
- [x] Phase 1: Typography hierarchy & physical textures implemented.
- [x] Phase 1: Cinematic Hero opening implemented with approved video.
- [x] Phase 1: Bi-directional reversible scroll verified.
- [x] Phase 1: Hero → Section 02 environmental handoff created.
- [x] Phase 1: Browser automated tests executed and verified with screenshots.
- [x] Phase 2: Section 02 — Understand / What is SPARKATHON implemented as unified physical field document spread.
- [x] Phase 2: User Review & Sign-Off completed.
- [x] Phase 3: Section 03 — The Five Bounties (Large Cinematic Frontier Map) implemented & verified.
- [ ] Phase 3: User Review & Sign-Off (Current Step).
- [ ] Phase 4: Section 04 — How It Works (Frontier Workbench).
- [ ] Phase 4: Section 05 — The Showdown (High Noon Climax).
- [ ] Phase 5: Section 06 — The Expedition Trail (Living Timeline).
- [ ] Phase 5: Section 07 — Claim Your Bounty & Section 08 — Registration Office.

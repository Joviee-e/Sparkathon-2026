# SPARKATHON 2026 — PROJECT STATE & GOVERNANCE

**Current Status:** Phase 7 (Section 07: Claim the Bounty — Rewards & Strategic Perks) Completed & Verified  
**Active Phase:** Awaiting User Review & Sign-Off on Phase 7  
**Next Phase:** Phase 8 — Section 08: The Registration Office (Final Action)  
**Code Modified / Created:** `src/data/rewardsData.js`, `src/styles/claim-bounty.css`, `src/modules/claim-bounty-choreography.js`, `src/sections/Rewards/ClaimTheBounty.jsx`, `src/App.jsx`, `src/main.jsx`, `test-section7.js`  

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
* **How It Works Authoritative Specifications (Phase 4):**
  * **Present:** Projects are formally presented using **PowerPoint** or **Canva**.
  * **Prototype:** **Prototypes / POCs are encouraged.**
  * **Solution:** Participants must cover **Problem**, **Solution**, **Technical Details**, and **Market Impact**.
  * **Pitch:** Presentation duration: **5–10 MINUTES + Q&A**.

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
| **How It Works** | 4-card sequence | **The Bounty Hunter's Field Table.** Tangible progressive evolution: Present → Prototype → Solution → Pitch across one continuous physical workbench. |
| **Showdown** | 2-column numbered rules & scoring rubric | **High Noon Climax.** Dramatic negative space. Criteria hit like official verdict stamps. Climaxes in "One Winner Per Domain" → Recognition, Mentorship, Incubation. |
| **Timeline** | Pinned cards with static background | **Living Expedition Trail.** Dynamic time-of-day progression: Morning → Midday → Afternoon → Dusk. |
| **Hero Experience** | Standard video container | **Cinematic Film Opening.** Black → Desert/Canyon → Horse+Rider → Title → Dust → World. Reversible scroll preserves title. |

---

## 4. Phase 2 Implementation Summary (Section 02: Understand / What is SPARKATHON)
Implemented as unified physical field document spread (`field-document`) with frontier ledger grid, incubation docket, and 100% reversible scroll.

---

## 5. Phase 3 Implementation Summary (Section 03: The Five Bounties — Large Cinematic Frontier Map)
Implemented as 2600×1600 coordinate frontier map world with animated SVG red expedition trail, 5 authoritative checkpoints, Destination 05 Unknown Frontier climax, and decoupled base layer.

---

## 6. Phase 4 Implementation Summary (Section 04: How It Works — The Bounty Hunter's Field Table)

### Core Creative Principle:
Section 04 is NOT four cards, NOT a SaaS grid, and NOT four floating panels. It is **ONE CONTINUOUS CINEMATIC COMPOSITION** representing a rugged Western frontier field station / bounty hunter's worktable where an idea progressively evolves from draft manifest into a pitch ready for the showdown.

### Completed Deliverables:
1. **Field Table Composition & Stage Architecture (`src/styles/section4-field-table.css`):**
   - **Pinned Stage (`.field-table-pinned-stage`):** 480vh scroll track pinned with GSAP ScrollTrigger for tactile camera traversal across the workbench.
   - **The 2500×1500 Table Surface (`.field-table-surface`):** Deep weathered timber planks (`#171310`) with horizontal plank shadows, brass hardware brackets, oil-lamp warmth, and drafting props (map sheet fragment, brass calipers, carpenter pencil).
   - **Fixed Editorial HUD (`.field-table-hud`):** Displays `04 / HOW IT WORKS`, `THE BOUNTY HUNTER’S FIELD TABLE`, and an interactive Western process dial (`01 PRESENT → 02 PROTOTYPE → 03 SOLUTION → 04 PITCH`) that lights up in gold during each station's active phase.
2. **Approved Cinematic Video Integration (`public/assets/video/how-it-works.mp4`):**
   - Directly incorporates the approved 24fps production video (`how it works.mp4`) showing the craftsman's hands actively assembling a brass cylinder mechanism with wires over an expedition map by lantern light.
   - Framed within a dark walnut timber frame (`.video-timber-frame`) with corner brass brackets, live bench cam status dot, and caption strip (`MONUMENT EXPEDITION OUTPOST // CRAFTING BENCH`).
   - Serves as the living environmental anchor of the workbench.
3. **Four Tangible Field Stations (One Continuous Workflow):**
   - **Station 1: PRESENT (`#station-present`):**
     - Draft paper folio with brass paperclip, folded corner, and official manifest tag.
     - Content: `Projects are formally presented to the frontier jury using:` `PowerPoint` OR `Canva`.
   - **Station 2: PROTOTYPE (`#station-prototype`):**
     - Amber blueprint craft paper positioned beside the craftsman's hands in the video.
     - Content: `PROTOTYPES / POCS ARE ENCOURAGED` stamped in red ink. Explains physical and software validation.
   - **Station 3: SOLUTION (`#station-solution`):**
     - Four-quadrant engineering dossier with ruled borders and roman numerals:
       - `I. PROBLEM` — The critical frontier challenge or unaddressed market gap.
       - `II. SOLUTION` — The breakthrough innovation and functional mechanism.
       - `III. TECHNICAL DETAILS` — Architecture, algorithms, hardware, schemas, and stack.
       - `IV. MARKET IMPACT` — Commercial viability, scalability, and adoption economics.
   - **Station 4: PITCH (`#station-pitch`):**
     - Sealed final defense brief with double border.
     - Content: Large display numerals `5–10 MINUTES` + `JURY Q&A DEFENSE`.
     - Stamped Readiness Seal: `★ THE WORK IS READY. PROCEED TO SHOWDOWN. ★`
4. **Camera Choreography & Dwell Pacing (`src/modules/field-table-choreography.js`):**
   - GSAP ScrollTrigger timeline with camera centering math: `x = (cw/2) - (tx * scale)`, `y = (ch/2) - (ty * scale)`.
   - Built with dedicated travel and dwell/holding intervals:
     - 0% – 12%: Arrival & Overview (Video establishing).
     - 18% – 36%: Dwell on Station 1 (PRESENT).
     - 40% – 60%: Dwell on Station 2 (PROTOTYPE) + Craftsman Video.
     - 62% – 80%: Dwell on Station 3 (SOLUTION 4 Pillars).
     - 82% – 95%: Dwell on Station 4 (PITCH 5–10 Min + Q&A).
     - 95% – 100%: Pullback overview framing the whole table ready for showdown.
   - 100% reversible: Forward and backward scrubbing restores Section 03, Section 02, and Hero SPARKATHON title with zero permanent state destruction.
5. **Responsive Design:**
   - **Desktop:** Full 2D pinned camera travel across the 2500×1500 table surface.
   - **Tablet (820px):** Proportional scale framing preserving the workbench journey.
   - **Mobile (390×844):** Swapped to a vertical expedition journey down the timber table. The video is letterboxed at the top, and the 4 stations cascade down a red-stitched leather expedition ruler with **zero horizontal overflow** (`scrollWidth === clientWidth = 390px`).
6. **Accessibility (`prefers-reduced-motion`):**
   - All 4 stations and the video render statically in full visibility with no camera transforms.

---

## 7. Verification & Test Results (Phase 4)

- **Production Build:** `npm run build` compiled cleanly in **265ms** with 0 errors.
- **Automated Browser Test Suite (`test-section4.js` via Microsoft Edge):**
  1. Section 03 → Section 04 Transition: Seamless visual blend from Unknown Frontier into timber workbench (`01_transition_to_field_table.png`).
  2. Field Table Establish Shot (`02_field_table_establish_arrival.png`): Complete table overview with video and dockets.
  3. Station 01 PRESENT (`03_stage_01_present.png`): Centered on draft folio with PowerPoint & Canva.
  4. Station 02 PROTOTYPE (`04_stage_02_prototype.png`): Centered on craftsman assembling mechanism + POC mandate.
  5. Station 03 SOLUTION (`05_stage_03_solution.png`): Centered on 4 pillars dossier (Problem, Solution, Tech Details, Market Impact).
  6. Station 04 PITCH (`06_stage_04_pitch.png`): Centered on 5–10 Min + Q&A and "THE WORK IS READY" seal.
  7. Final Overview Pullback (`07_field_table_complete_overview.png`): Pullback framing all 4 stations across the workbench.
  8. Reversible Scroll to Section 03 (`08_reverse_scroll_to_section03.png`): Complete restoration of Section 03 map.
  9. Reversible Scroll to Hero (`09_reverse_scrolled_to_hero_title.png`): **Confirmed 100% restored:** `SPARKATHON` title, badges, letterbox bars, and video.
  10. Tablet Viewport (`10_tablet_field_table.png`): Clean responsive layout at 820×1180.
  11. Mobile Viewport (`11_mobile_field_table_top.png`, `12_mobile_field_table_stations.png`): Vertical expedition journey verified at 390×844 with **zero horizontal overflow** (`hasOverflow: false`).

---

## 8. Current Milestone Checklist

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
- [x] Phase 3: User Review & Sign-Off completed & pushed to GitHub (`0247a3a`).
- [x] Phase 4: Section 04 — How It Works (The Bounty Hunter's Field Table) implemented & verified.
- [x] React Architecture Migration: Migrated Vanilla JS/HTML Vite app to modular React architecture (`@vitejs/plugin-react`, `React 19`, `gsap.context()`, modular sections, 0 console errors).
- [x] Phase 5: Section 05 — The Showdown (High Noon / Judging Criteria) implemented & verified.
- [x] Phase 6: Section 06 — The Expedition Trail (Living Event-Day Timeline) implemented & verified.
- [x] Phase 6: User Review & Sign-Off completed (commit `647ea14`).
- [x] Phase 7: Section 07 — Claim the Bounty (Rewards & Strategic Perks) implemented & verified.
- [ ] Phase 7: User Review & Sign-Off (Current Step).
- [ ] Phase 8: Section 08 — The Registration Office (Final Action).

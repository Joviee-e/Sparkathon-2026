/**
 * GSAP ScrollTrigger Choreography for Phase 6: The Expedition Trail
 * SPARKATHON 2026 • E-Cell FCRIT
 * 
 * Strict Cinematic Mandates:
 * - One continuous camera journey through the living landscape (no detached cards)
 * - Restrained natural photographic exposure (no heavy artificial UI overlays)
 * - Physical editorial field log updates: "FIELD LOG // 0X OF 05"
 * - The 1:00 PM – 3:30 PM open canyon trail breathing room
 * - Final Boss as a climactic arrival at sunset
 * - Full reverse-scroll restoration and lifecycle cleanup
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initExpeditionTrailChoreography(containerRef, refs) {
  if (!containerRef) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const {
        stageElem,
        cameraTrack,
        trailPathActive,
        surveyorBead,
        fieldLogCounter,
        interludeElem,
        egressBridge,
        lightingExposure,
        panoramas,
        scenes,
      } = refs;

      if (!stageElem) return;

      // Master scrubbed continuous expedition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageElem,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stageElem.querySelector('.trail-pinned-viewport'),
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Prepare SVG route line length
      let pathLength = 1000;
      if (trailPathActive) {
        try {
          pathLength = trailPathActive.getTotalLength();
          gsap.set(trailPathActive, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        } catch (e) {
          // Fallback if SVG geometry calculation fails
        }
      }

      // Initial State: Establishing Caravan Vista
      tl.set(panoramas.establishing, { opacity: 0.5, scale: 1 });

      // Camera Track: Continual Subtle Parallax Pan through the landscape
      if (cameraTrack) {
        tl.to(cameraTrack, { yPercent: -4, scale: 1.04, ease: 'none', duration: 28 }, 0);
      }

      // ======================================================================
      // 01. TRAIL INGRESS & MILESTONE 01: PLAYER ENTRY (9:00 AM – 9:45 AM)
      // Morning cabin outpost
      // ======================================================================
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: pathLength * 0.82, ease: 'none', duration: 3 }, 0);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 220, cy: 180 }, ease: 'none', duration: 3 }, 0);
      }

      // Transition vista from establishing caravan to cabin outpost
      tl.to(panoramas.establishing, { opacity: 0, duration: 1.5 }, 0.5);
      tl.to(panoramas.p01, { opacity: 0.55, duration: 2 }, 0.5);

      // Reveal Landmark 01
      tl.to(scenes[0], {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          scenes[0]?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 01 OF 05';
        },
        onReverseComplete: () => {
          scenes[0]?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'EXPEDITION DEPARTURE';
        }
      }, 1.2);

      // Dwell at Milestone 01
      tl.to({}, { duration: 2 }, 2.7);

      // Milestone 01 moves past camera
      tl.to(scenes[0], {
        autoAlpha: 0,
        y: -24,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => scenes[0]?.classList.remove('active')
      }, 4.7);

      // ======================================================================
      // 02. ROUTE PROGRESS & MILESTONE 02: THE BEGINNING (10:00 AM – 10:30 AM)
      // Early morning windpump and split-rail fence
      // ======================================================================
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: pathLength * 0.62, ease: 'none', duration: 3 }, 4.7);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 780, cy: 320 }, ease: 'none', duration: 3 }, 4.7);
      }

      // Transition vista to Windpump & Split-Rail Fence
      tl.to(panoramas.p01, { opacity: 0, duration: 1.5 }, 5.2);
      tl.to(panoramas.p02, { opacity: 0.55, duration: 2 }, 5.2);

      // Reveal Landmark 02
      tl.to(scenes[1], {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          scenes[1]?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 02 OF 05';
        },
        onReverseComplete: () => {
          scenes[1]?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 01 OF 05';
        }
      }, 6.2);

      // Dwell at Milestone 02
      tl.to({}, { duration: 2 }, 7.7);

      // Milestone 02 moves past camera
      tl.to(scenes[1], {
        autoAlpha: 0,
        y: -24,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => scenes[1]?.classList.remove('active')
      }, 9.7);

      // ======================================================================
      // 03. ROUTE PROGRESS & MILESTONE 03: THE QUEST (10:30 AM – 12:30 PM)
      // Midday Monument Valley red rocks, wagon wheel & cactus
      // ======================================================================
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: pathLength * 0.42, ease: 'none', duration: 3 }, 9.7);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 300, cy: 470 }, ease: 'none', duration: 3 }, 9.7);
      }

      // Transition vista to Monument Valley Red Canyon
      tl.to(panoramas.p02, { opacity: 0, duration: 1.5 }, 10.2);
      tl.to(panoramas.p03, { opacity: 0.6, duration: 2 }, 10.2);

      // Reveal Landmark 03 (The Main Event - Extended Dwell)
      tl.to(scenes[2], {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          scenes[2]?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 03 OF 05';
        },
        onReverseComplete: () => {
          scenes[2]?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 02 OF 05';
        }
      }, 11.2);

      // Extended Dwell at The Quest
      tl.to({}, { duration: 2.5 }, 12.7);

      // Milestone 03 moves past camera
      tl.to(scenes[2], {
        autoAlpha: 0,
        y: -24,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => scenes[2]?.classList.remove('active')
      }, 15.2);

      // ======================================================================
      // 04. ROUTE PROGRESS & MILESTONE 04: REFUEL PHASE (12:30 PM – 1:00 PM)
      // Midday rest around the campfire cauldron
      // ======================================================================
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: pathLength * 0.24, ease: 'none', duration: 3 }, 15.2);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 720, cy: 600 }, ease: 'none', duration: 3 }, 15.2);
      }

      // Transition vista to Campfire Rest
      tl.to(panoramas.p03, { opacity: 0, duration: 1.5 }, 15.7);
      tl.to(panoramas.p04, { opacity: 0.55, duration: 2 }, 15.7);

      // Reveal Landmark 04
      tl.to(scenes[3], {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          scenes[3]?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 04 OF 05';
        },
        onReverseComplete: () => {
          scenes[3]?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 03 OF 05';
        }
      }, 16.7);

      // Dwell at Refuel Phase
      tl.to({}, { duration: 2 }, 18.2);

      // Milestone 04 moves past camera
      tl.to(scenes[3], {
        autoAlpha: 0,
        y: -24,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => scenes[3]?.classList.remove('active')
      }, 20.2);

      // ======================================================================
      // 05. TIME GAP INTERLUDE (1:00 PM – 3:30 PM: Genuine Open Canyon Trail)
      // Sparse composition • Breathing room • Light gradually lowers
      // ======================================================================
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: pathLength * 0.12, ease: 'none', duration: 2.5 }, 20.2);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 480, cy: 720 }, ease: 'none', duration: 2.5 }, 20.2);
      }

      // Campfire fades, revealing the open canyon panorama stretching to horizon
      tl.to(panoramas.p04, { opacity: 0, duration: 1.5 }, 20.5);
      tl.to(panoramas.establishing, { opacity: 0.45, duration: 2 }, 20.5);

      // Reveal Open Stretch Marker
      tl.to(interludeElem, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
        onStart: () => {
          interludeElem?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'EXPEDITION MARCH // OPEN TRAIL';
        },
        onReverseComplete: () => {
          interludeElem?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 04 OF 05';
        }
      }, 21.2);

      // Interlude Dwell
      tl.to({}, { duration: 1.8 }, 22.6);

      // Interlude Fades Out as Sunset Horizon Approaches
      tl.to(interludeElem, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => interludeElem?.classList.remove('active')
      }, 24.4);

      // ======================================================================
      // 06. FINAL BOSS ARRIVAL (3:30 PM – 4:00 PM)
      // Building anticipation -> Sunset canyon overlook with cowboy at fence
      // "We finally arrived."
      // ======================================================================
      // Complete route drawing to final canyon summit
      if (trailPathActive) {
        tl.to(trailPathActive, { strokeDashoffset: 0, ease: 'none', duration: 2.5 }, 24.4);
      }
      if (surveyorBead) {
        tl.to(surveyorBead, { attr: { cx: 580, cy: 870 }, ease: 'none', duration: 2.5 }, 24.4);
      }

      // Sunset vista gradually establishes and deepens
      tl.to(panoramas.establishing, { opacity: 0, duration: 1.5 }, 24.8);
      tl.to(panoramas.p05, { opacity: 0.65, duration: 2 }, 24.8);

      // Climax Arrival: Reveal Milestone 05
      tl.to(scenes[4], {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: 'power2.out',
        onStart: () => {
          scenes[4]?.classList.add('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'FIELD LOG // 05 OF 05';
        },
        onReverseComplete: () => {
          scenes[4]?.classList.remove('active');
          if (fieldLogCounter) fieldLogCounter.textContent = 'EXPEDITION MARCH // OPEN TRAIL';
        }
      }, 25.8);

      // Reveal Egress Bridge toward Phase 7
      if (egressBridge) {
        tl.to(egressBridge, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 27);
      }

      // Final Hold at Sunset Summit
      tl.to({}, { duration: 2 }, 28);
    });
  }, containerRef);

  return ctx;
}

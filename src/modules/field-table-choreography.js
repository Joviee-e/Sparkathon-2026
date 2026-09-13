import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Setup Section 04: The Bounty Hunter's Field Table Choreography
 * Camera travels across physical workbench: Arrival -> Present -> Prototype -> Solution -> Pitch -> Overview
 */
export function setupFieldTableChoreography() {
  const section = document.querySelector('.field-table-section');
  const stage = document.querySelector('.field-table-pinned-stage');
  const surface = document.getElementById('field-table-surface');
  const video = document.getElementById('field-table-video');
  const dialSteps = document.querySelectorAll('.hud-process-dial .dial-step');

  const stationPresent = document.getElementById('station-present');
  const stationPrototype = document.getElementById('station-prototype');
  const stationSolution = document.getElementById('station-solution');
  const stationPitch = document.getElementById('station-pitch');

  if (!section || !stage || !surface) return;

  // Reduced motion check
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  // Ensure Video Autoplay
  if (video) {
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resumeVideo = () => {
          video.play();
          window.removeEventListener('click', resumeVideo);
          window.removeEventListener('touchstart', resumeVideo);
        };
        window.addEventListener('click', resumeVideo, { once: true });
        window.addEventListener('touchstart', resumeVideo, { once: true });
      });
    }
  }

  if (prefersReduced || isMobile) {
    // Static accessible layout on mobile or reduced motion
    gsap.set(surface, { clearProps: 'all' });
    dialSteps.forEach((s) => s.classList.add('active'));
    return;
  }

  // Camera Centering Math
  const getCameraTransform = (tx, ty, scale) => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const x = (cw / 2) - (tx * scale);
    const y = (ch / 2) - (ty * scale);
    return { x, y, scale };
  };

  // Base overview scale for 2500x1500 surface
  const getBaseScale = () => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    return Math.min(cw / 2500, ch / 1500) * 0.94;
  };

  // Coordinated Waypoint Targets
  // Station 1: PRESENT (Draft Folio)
  const targetPresent = () => getCameraTransform(1500, 330, 1.05);

  // Station 2: PROTOTYPE (Artisan Crafting Hands + Blueprint Mandate)
  const targetPrototype = () => getCameraTransform(650, 700, 0.95);

  // Station 3: SOLUTION (4 Pillars Engineering Dossier)
  const targetSolution = () => getCameraTransform(1430, 860, 0.96);

  // Station 4: PITCH (Sealed Final Verdict Brief)
  const targetPitch = () => getCameraTransform(2150, 640, 1.05);

  // Initial & Final Full Table Overview
  const targetOverview = () => getCameraTransform(1250, 750, getBaseScale());
  const targetArrival = () => getCameraTransform(850, 420, Math.max(getBaseScale() * 1.15, 0.72));

  // Initial Map Setup
  const initialCam = targetArrival();
  gsap.set(surface, {
    x: initialCam.x,
    y: initialCam.y,
    scale: initialCam.scale
  });

  // Master Scrub Timeline (23s total duration with dedicated dwell windows)
  const tableTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      pin: stage,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;

        // Update HUD Process Dial based on current progression
        dialSteps.forEach((step, idx) => {
          if (idx === 0) step.classList.toggle('active', p >= 0.18 && p < 0.40);
          else if (idx === 1) step.classList.toggle('active', p >= 0.40 && p < 0.62);
          else if (idx === 2) step.classList.toggle('active', p >= 0.62 && p < 0.82);
          else if (idx === 3) step.classList.toggle('active', p >= 0.82);
        });
      }
    }
  });

  // --- INTERVAL 1: Travel from Arrival to Station 1 (PRESENT) ---
  // Time: 0.5s -> 3.5s
  tableTimeline.to(surface, {
    x: () => targetPresent().x,
    y: () => targetPresent().y,
    scale: () => targetPresent().scale,
    ease: 'power2.inOut',
    duration: 3.0
  }, 0.5);

  tableTimeline.to(stationPresent, {
    opacity: 1,
    scale: 1.04,
    ease: 'power2.out',
    duration: 1.5
  }, 1.2);

  // Hold / Dwell on PRESENT from 3.5s to 6.5s (camera stays locked on Station 1)

  // --- INTERVAL 2: Glide from Station 1 to Station 2 (PROTOTYPE) ---
  // Time: 6.5s -> 9.5s
  tableTimeline.to(surface, {
    x: () => targetPrototype().x,
    y: () => targetPrototype().y,
    scale: () => targetPrototype().scale,
    ease: 'power2.inOut',
    duration: 3.0
  }, 6.5);

  tableTimeline.to(stationPresent, {
    opacity: 0.7,
    scale: 1.0,
    duration: 1.2
  }, 6.5);

  tableTimeline.to(stationPrototype, {
    opacity: 1,
    scale: 1.04,
    ease: 'power2.out',
    duration: 1.5
  }, 7.2);

  // Hold / Dwell on PROTOTYPE from 9.5s to 12.5s (camera stays locked on craftsman & prototype)

  // --- INTERVAL 3: Pan from Station 2 to Station 3 (SOLUTION) ---
  // Time: 12.5s -> 15.5s
  tableTimeline.to(surface, {
    x: () => targetSolution().x,
    y: () => targetSolution().y,
    scale: () => targetSolution().scale,
    ease: 'power2.inOut',
    duration: 3.0
  }, 12.5);

  tableTimeline.to(stationPrototype, {
    opacity: 0.7,
    scale: 1.0,
    duration: 1.2
  }, 12.5);

  tableTimeline.to(stationSolution, {
    opacity: 1,
    scale: 1.03,
    ease: 'power2.out',
    duration: 1.5
  }, 13.2);

  // Hold / Dwell on SOLUTION from 15.5s to 18.0s (camera stays locked on 4 pillars dossier)

  // --- INTERVAL 4: Pan from Station 3 to Station 4 (PITCH) ---
  // Time: 18.0s -> 20.5s
  tableTimeline.to(surface, {
    x: () => targetPitch().x,
    y: () => targetPitch().y,
    scale: () => targetPitch().scale,
    ease: 'power2.inOut',
    duration: 2.5
  }, 18.0);

  tableTimeline.to(stationSolution, {
    opacity: 0.7,
    scale: 1.0,
    duration: 1.2
  }, 18.0);

  tableTimeline.to(stationPitch, {
    opacity: 1,
    scale: 1.04,
    ease: 'power2.out',
    duration: 1.5
  }, 18.6);

  // Hold / Dwell on PITCH from 20.5s to 22.0s (camera stays locked on 5-10 min + Q&A and readiness seal)

  // --- INTERVAL 5: Pullback to Complete Table Overview ---
  // Time: 22.0s -> 24.5s
  tableTimeline.to(surface, {
    x: () => targetOverview().x,
    y: () => targetOverview().y,
    scale: () => targetOverview().scale,
    ease: 'power2.inOut',
    duration: 2.5
  }, 22.0);

  tableTimeline.to([stationPresent, stationPrototype, stationSolution, stationPitch], {
    opacity: 1,
    scale: 1.0,
    duration: 1.5
  }, 22.5);

  // Handle Resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Setup Section 04: The Bounty Hunter's Field Table Choreography
 * Camera travels across physical workbench: Arrival -> Present -> Prototype -> Solution -> Pitch -> Overview
 */
export function setupFieldTableChoreography(sectionEl = null) {
  const section = sectionEl || document.querySelector('.field-table-section');
  if (!section) return null;

  const stage = section.querySelector('.field-table-pinned-stage');
  const surface = section.querySelector('#field-table-surface');
  const video = section.querySelector('#field-table-video');
  const dialSteps = section.querySelectorAll('.hud-process-dial .dial-step');

  const stationPresent = section.querySelector('#station-present');
  const stationPrototype = section.querySelector('#station-prototype');
  const stationSolution = section.querySelector('#station-solution');
  const stationPitch = section.querySelector('#station-pitch');

  if (!stage || !surface) return null;

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
    return null;
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
  const targetPresent = () => getCameraTransform(1500, 330, 1.05);
  const targetPrototype = () => getCameraTransform(650, 700, 0.95);
  const targetSolution = () => getCameraTransform(1430, 860, 0.96);
  const targetPitch = () => getCameraTransform(2150, 640, 1.05);
  const targetOverview = () => getCameraTransform(1250, 750, getBaseScale());
  const targetArrival = () => getCameraTransform(850, 420, Math.max(getBaseScale() * 1.15, 0.72));

  // Initial Map Setup
  const initialCam = targetArrival();
  gsap.set(surface, {
    x: initialCam.x,
    y: initialCam.y,
    scale: initialCam.scale
  });

  // Master Scrub Timeline
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

  // --- INTERVAL 2: Glide from Station 1 to Station 2 (PROTOTYPE) ---
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

  // --- INTERVAL 3: Pan from Station 2 to Station 3 (SOLUTION) ---
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

  // --- INTERVAL 4: Pan from Station 3 to Station 4 (PITCH) ---
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

  // --- INTERVAL 5: Pullback to Complete Table Overview ---
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

  return tableTimeline;
}

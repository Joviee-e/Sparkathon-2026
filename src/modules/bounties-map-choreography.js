import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WAYPOINTS_INFO } from '../data/bountiesData.js';

gsap.registerPlugin(ScrollTrigger);

export function setupBountiesMapChoreography(sectionEl) {
  if (!sectionEl) return null;

  const bountiesSection = sectionEl;
  const bountiesStage = sectionEl.querySelector('.bounties-pinned-stage');
  const mapWorld = sectionEl.querySelector('.bounties-map-world');
  const activeTrail = sectionEl.querySelector('#active-expedition-trail');
  const waypointDisplay = sectionEl.querySelector('#active-waypoint-display');
  const checkpoints = [
    sectionEl.querySelector('#cp-01'),
    sectionEl.querySelector('#cp-02'),
    sectionEl.querySelector('#cp-03'),
    sectionEl.querySelector('#cp-04'),
    sectionEl.querySelector('#cp-05')
  ];

  if (!bountiesSection || !mapWorld) return null;

  // Measure Trail Path Length
  let trailLength = 2800;
  if (activeTrail && typeof activeTrail.getTotalLength === 'function') {
    try {
      trailLength = activeTrail.getTotalLength();
    } catch (e) {
      trailLength = 2800;
    }
    activeTrail.style.strokeDasharray = `${trailLength}`;
    activeTrail.style.strokeDashoffset = `${trailLength}`;
  }

  const isMobile = window.innerWidth <= 768;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || isMobile) {
    checkpoints.forEach((cp) => {
      if (cp) cp.classList.add('active');
    });
    if (activeTrail) {
      activeTrail.style.strokeDashoffset = '0';
    }
    return null;
  }

  // Camera Coordinate Calculator
  const getCameraTransform = (tx, ty, scale) => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const x = (cw / 2) - (tx * scale);
    const y = (ch / 2) - (ty * scale);
    return { x, y, scale };
  };

  const baseScale = Math.min(window.innerWidth / 2600, window.innerHeight / 1600) * 0.94;
  const initialCam = getCameraTransform(1300, 800, baseScale);
  const cp01Cam = getCameraTransform(500, 520, 1.18);
  const cp02Cam = getCameraTransform(1120, 380, 1.18);
  const cp03Cam = getCameraTransform(1500, 840, 1.18);
  const cp04Cam = getCameraTransform(960, 1220, 1.18);
  const cp05Cam = getCameraTransform(2100, 920, 1.10);
  const finalCam = getCameraTransform(1300, 800, baseScale);

  // Initial Map Setup
  gsap.set(mapWorld, {
    x: initialCam.x,
    y: initialCam.y,
    scale: initialCam.scale
  });

  const updateWaypointHUD = (index) => {
    if (waypointDisplay && WAYPOINTS_INFO[index]) {
      waypointDisplay.textContent = WAYPOINTS_INFO[index];
    }
  };

  // Master Bi-Directional Scrubbed Map Timeline
  const bountiesTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: bountiesSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      pin: bountiesStage,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        checkpoints.forEach((cp, idx) => {
          if (!cp) return;
          const threshold = [0.15, 0.32, 0.50, 0.68, 0.84][idx];
          if (p >= threshold) {
            cp.classList.add('active');
          } else {
            cp.classList.remove('active');
          }
        });

        if (p < 0.12) updateWaypointHUD(0);
        else if (p < 0.28) updateWaypointHUD(1);
        else if (p < 0.46) updateWaypointHUD(2);
        else if (p < 0.64) updateWaypointHUD(3);
        else if (p < 0.80) updateWaypointHUD(4);
        else if (p < 0.94) updateWaypointHUD(5);
        else updateWaypointHUD(6);
      }
    }
  });

  bountiesTimeline
    // Stage 1 (0.00 -> 0.18): Camera establishes full map, then glides to Checkpoint 01
    .to(mapWorld, {
      x: cp01Cam.x,
      y: cp01Cam.y,
      scale: cp01Cam.scale,
      duration: 0.18,
      ease: 'power1.inOut'
    }, 0)
    .to(activeTrail, {
      strokeDashoffset: trailLength * 0.82,
      duration: 0.18,
      ease: 'none'
    }, 0)

    // Stage 2 (0.18 -> 0.36): Trail draws eastward across desert; camera tracks to Checkpoint 02
    .to(mapWorld, {
      x: cp02Cam.x,
      y: cp02Cam.y,
      scale: cp02Cam.scale,
      duration: 0.18,
      ease: 'power1.inOut'
    }, 0.18)
    .to(activeTrail, {
      strokeDashoffset: trailLength * 0.62,
      duration: 0.18,
      ease: 'none'
    }, 0.18)

    // Stage 3 (0.36 -> 0.54): Camera descends down canyon ridge to Checkpoint 03
    .to(mapWorld, {
      x: cp03Cam.x,
      y: cp03Cam.y,
      scale: cp03Cam.scale,
      duration: 0.18,
      ease: 'power1.inOut'
    }, 0.36)
    .to(activeTrail, {
      strokeDashoffset: trailLength * 0.44,
      duration: 0.18,
      ease: 'none'
    }, 0.36)

    // Stage 4 (0.54 -> 0.72): Camera sweeps southwest to Checkpoint 04
    .to(mapWorld, {
      x: cp04Cam.x,
      y: cp04Cam.y,
      scale: cp04Cam.scale,
      duration: 0.18,
      ease: 'power1.inOut'
    }, 0.54)
    .to(activeTrail, {
      strokeDashoffset: trailLength * 0.26,
      duration: 0.18,
      ease: 'none'
    }, 0.54)

    // Stage 5 (0.72 -> 0.90): CLIMAX — Trail cuts through border into THE UNKNOWN FRONTIER to Checkpoint 05
    .to(mapWorld, {
      x: cp05Cam.x,
      y: cp05Cam.y,
      scale: cp05Cam.scale,
      duration: 0.18,
      ease: 'power1.inOut'
    }, 0.72)
    .to(activeTrail, {
      strokeDashoffset: 0,
      duration: 0.18,
      ease: 'none'
    }, 0.72)

    // Stage 6 (0.90 -> 1.00): Camera pulls back to reveal the entire mapped frontier
    .to(mapWorld, {
      x: finalCam.x,
      y: finalCam.y,
      scale: finalCam.scale,
      duration: 0.10,
      ease: 'power2.out'
    }, 0.90);

  return bountiesTimeline;
}

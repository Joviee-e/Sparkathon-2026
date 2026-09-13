import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DustCanvas } from './modules/dust-canvas.js';
import { setupFieldTableChoreography } from './modules/field-table-choreography.js';

gsap.registerPlugin(ScrollTrigger);

class SparkathonExperience {
  constructor() {
    this.video = document.querySelector('.hero-video');
    this.dustCanvasEl = document.querySelector('.hero-dust-canvas');
    this.dustCanvas = null;
    this.heroTimeline = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    // 1. Initialize Canyon Dust Canvas
    if (this.dustCanvasEl) {
      this.dustCanvas = new DustCanvas(this.dustCanvasEl);
    }

    // 2. Video Playback & Mobile Autoplay Assurance
    this.setupVideo();

    // 3. Setup Reversible Cinematic Scroll Choreography
    if (this.reducedMotion) {
      this.setupReducedMotionHero();
    } else {
      this.setupCinematicHeroChoreography();
    }

    // 4. Setup Section 02 Editorial Field Document Choreography
    this.setupSection02Choreography();

    // 5. Setup Section 03 Large Cinematic Frontier Map Choreography
    this.setupBountiesMapChoreography();

    // 6. Setup Section 04 The Bounty Hunter's Field Table Choreography
    setupFieldTableChoreography();

    // 7. Handle Window Resize & Refresh
    this.setupResizeListener();
  }

  setupVideo() {
    if (!this.video) return;

    this.video.muted = true;
    this.video.playsInline = true;
    this.video.loop = true;

    const playPromise = this.video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay restricted by browser, relying on poster/click:', err);
        // Play on first user touch/click if restricted
        const resumeOnInteraction = () => {
          this.video.play();
          window.removeEventListener('click', resumeOnInteraction);
          window.removeEventListener('touchstart', resumeOnInteraction);
        };
        window.addEventListener('click', resumeOnInteraction, { once: true });
        window.addEventListener('touchstart', resumeOnInteraction, { once: true });
      });
    }
  }

  setupCinematicHeroChoreography() {
    const heroSection = document.querySelector('.hero-section');
    const heroStage = document.querySelector('.hero-stage');
    const blackout = document.querySelector('.hero-blackout');
    const letterboxTop = document.querySelector('.letterbox-top');
    const letterboxBottom = document.querySelector('.letterbox-bottom');
    const video = document.querySelector('.hero-video');
    const titleContainer = document.querySelector('.hero-choreo-container');
    const presentsBadge = document.querySelector('.hero-presents-badge');
    const mainTitle = document.querySelector('.hero-title');
    const broncoWatermark = document.querySelector('.hero-bronco-watermark');
    const tagline = document.querySelector('.hero-tagline');
    const metaBar = document.querySelector('.hero-meta-bar');
    const scrollPrompt = document.querySelector('.hero-scroll-prompt');

    if (!heroSection || !heroStage) return;

    // Initial State Setups for choreography
    gsap.set(blackout, { opacity: 1 });
    gsap.set(video, { scale: 1.08, filter: 'contrast(1.05) brightness(0.92)' });
    gsap.set(titleContainer, { opacity: 0, scale: 0.94, y: 25 });
    gsap.set(presentsBadge, { opacity: 0, y: -20 });
    gsap.set(mainTitle, { opacity: 0, scale: 0.90 });
    gsap.set(broncoWatermark, { opacity: 0, scale: 0.85 });
    gsap.set(tagline, { opacity: 0, y: 15 });
    gsap.set(metaBar, { opacity: 0, y: 15 });
    gsap.set(scrollPrompt, { opacity: 1 });

    // Master Bi-Directional Scrubbing Timeline
    this.heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.1, // Smooth cinematic damping
        pin: heroStage,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (this.dustCanvas) {
            this.dustCanvas.setScrollTurbulence(self.getVelocity());
          }
        }
      }
    });

    // Choreography Sequence (0.0 -> 1.0 of hero scroll progress)
    this.heroTimeline
      // Phase 1 (0.00 -> 0.18): Blackout opens; rider emerges in canyon
      .to(blackout, { opacity: 0, ease: 'power2.inOut', duration: 0.18 }, 0)
      .to(video, { scale: 1.02, duration: 0.45, ease: 'sine.out' }, 0)
      .to(scrollPrompt, { opacity: 0, y: 15, duration: 0.10, ease: 'power1.out' }, 0.04)

      // Phase 2 (0.15 -> 0.40): The SPARKATHON title lockup lands with physical weight
      .to(titleContainer, { opacity: 1, scale: 1.0, y: 0, duration: 0.22, ease: 'power2.out' }, 0.16)
      .to(presentsBadge, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.18)
      .to(broncoWatermark, { opacity: 0.20, scale: 1.0, duration: 0.25, ease: 'power2.out' }, 0.18)
      .to(mainTitle, { opacity: 1, scale: 1.0, duration: 0.22, ease: 'back.out(1.2)' }, 0.20)
      .to(tagline, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.24)
      .to(metaBar, { opacity: 1, y: 0, duration: 0.20, ease: 'power2.out' }, 0.26)

      // Phase 3 (0.40 -> 0.70): Title holds strong for readability; letterbox bars open outward
      .to(letterboxTop, { yPercent: -100, duration: 0.28, ease: 'power2.inOut' }, 0.45)
      .to(letterboxBottom, { yPercent: 100, duration: 0.28, ease: 'power2.inOut' }, 0.45)

      // Phase 4 (0.70 -> 1.00): Transition into the brochure world
      // Forward scroll carries the title into the dust; REVERSE SCROLL RESTORES IT PERFECTLY
      .to(titleContainer, { opacity: 0, y: -50, scale: 1.06, duration: 0.25, ease: 'power2.in' }, 0.72)
      .to(video, { filter: 'contrast(1.25) brightness(0.65)', duration: 0.25, ease: 'power1.inOut' }, 0.75);
  }

  setupReducedMotionHero() {
    const blackout = document.querySelector('.hero-blackout');
    const letterboxTop = document.querySelector('.letterbox-top');
    const letterboxBottom = document.querySelector('.letterbox-bottom');
    const titleContainer = document.querySelector('.hero-choreo-container');
    const presentsBadge = document.querySelector('.hero-presents-badge');
    const mainTitle = document.querySelector('.hero-title');
    const broncoWatermark = document.querySelector('.hero-bronco-watermark');
    const tagline = document.querySelector('.hero-tagline');
    const metaBar = document.querySelector('.hero-meta-bar');

    if (blackout) blackout.style.display = 'none';
    if (letterboxTop) letterboxTop.style.display = 'none';
    if (letterboxBottom) letterboxBottom.style.display = 'none';

    if (titleContainer) {
      gsap.set([titleContainer, presentsBadge, mainTitle, broncoWatermark, tagline, metaBar], {
        opacity: 1,
        y: 0,
        scale: 1
      });
    }
  }

  setupSection02Choreography() {
    const section = document.querySelector('.manifesto-section');
    const landscapeImg = document.querySelector('.manifesto-landscape-img');
    const marker = document.querySelector('.manifesto-section-marker');
    const doc = document.querySelector('.field-document');
    const stamp = document.querySelector('.document-ink-stamp');
    const headline = document.querySelector('.doc-headline');
    const manifestoBody = document.querySelector('.doc-manifesto-body');
    const ledgerWrap = document.querySelector('.doc-ledger-wrap');
    const docket = document.querySelector('.doc-incubation-docket');
    const footer = document.querySelector('.doc-footer');

    if (!section || !doc) return;

    if (this.reducedMotion) {
      gsap.set([landscapeImg, marker, doc, stamp, headline, manifestoBody, ledgerWrap, docket, footer], {
        opacity: 1,
        y: 0,
        scale: 1
      });
      return;
    }

    // Initial states for editorial reveal
    gsap.set(marker, { opacity: 0, y: -12 });
    gsap.set(doc, { opacity: 0, y: 40, scale: 0.98 });
    if (stamp) gsap.set(stamp, { opacity: 0, scale: 1.4, rotate: 12 });
    gsap.set(headline, { opacity: 0, y: 20 });
    gsap.set(manifestoBody, { opacity: 0, y: 15 });
    if (ledgerWrap) gsap.set(ledgerWrap, { opacity: 0, y: 20 });
    if (docket) gsap.set(docket, { opacity: 0, y: 20 });
    if (footer) gsap.set(footer, { opacity: 0 });

    // 1. Panoramic Landscape Drift (subtle parallax scrub)
    if (landscapeImg) {
      gsap.fromTo(landscapeImg, 
        { y: -25, scale: 1.06 },
        {
          y: 25,
          scale: 1.01,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }

    // 2. Editorial Section Marker
    gsap.to(marker, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse'
      }
    });

    // 3. Field Document Physical Settle
    gsap.to(doc, {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: doc,
        start: 'top 82%',
        toggleActions: 'play reverse play reverse'
      }
    });

    // 4. Inked Dispatch Stamp
    if (stamp) {
      gsap.to(stamp, {
        opacity: 0.85,
        scale: 1,
        rotate: 3,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: doc,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    // 5. Headline & Manifesto Body
    gsap.to(headline, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headline,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse'
      }
    });

    gsap.to(manifestoBody, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: manifestoBody,
        start: 'top 82%',
        toggleActions: 'play reverse play reverse'
      }
    });

    // 6. Frontier Ledger Grid
    if (ledgerWrap) {
      gsap.to(ledgerWrap, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ledgerWrap,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    // 7. Strategic Growth Docket & Footer Perk Seal
    if (docket) {
      gsap.to(docket, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: docket,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    if (footer) {
      gsap.to(footer, {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }
  }

  setupBountiesMapChoreography() {
    const bountiesSection = document.querySelector('.bounties-section');
    const bountiesStage = document.querySelector('.bounties-pinned-stage');
    const mapWorld = document.querySelector('.bounties-map-world');
    const activeTrail = document.getElementById('active-expedition-trail');
    const waypointDisplay = document.getElementById('active-waypoint-display');
    const checkpoints = [
      document.getElementById('cp-01'),
      document.getElementById('cp-02'),
      document.getElementById('cp-03'),
      document.getElementById('cp-04'),
      document.getElementById('cp-05')
    ];

    if (!bountiesSection || !mapWorld) return;

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

    if (this.reducedMotion || isMobile) {
      // Accessible static display for reduced motion and mobile
      checkpoints.forEach((cp) => {
        if (cp) cp.classList.add('active');
      });
      if (activeTrail) {
        activeTrail.style.strokeDashoffset = '0';
      }
      return;
    }

    // Camera Coordinate Calculator:
    // Calculates map scale and (x, y) to center a specific point (tx, ty) on screen
    const getCameraTransform = (tx, ty, scale) => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const x = (cw / 2) - (tx * scale);
      const y = (ch / 2) - (ty * scale);
      return { x, y, scale };
    };

    // Responsive Base Scale for overview (fit 2600 x 1600 map nicely within screen)
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

    const waypointsInfo = [
      'FRONTIER OVERVIEW',
      '01 — AI / ML + CYBERSECURITY',
      '02 — SMART ENERGY SYSTEMS',
      '03 — ROBOTICS / DRONES / FIXED WING',
      '04 — IOT / EMBEDDED SYSTEMS',
      '05 — OPEN INNOVATION (THE UNKNOWN FRONTIER)',
      'ALL FIVE FRONTIERS CHARTED'
    ];

    const updateWaypointHUD = (index) => {
      if (waypointDisplay && waypointsInfo[index]) {
        waypointDisplay.textContent = waypointsInfo[index];
      }
    };

    // Master Bi-Directional Scrubbed Map Timeline
    this.bountiesTimeline = gsap.timeline({
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
          // Set active checkpoint classes and update HUD cleanly and reversibly
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

    // Choreography Sequence (0.0 -> 1.0 of the bounties scroll distance):
    // Stage 1 (0.00 -> 0.18): Camera establishes full map, then glides to Checkpoint 01
    this.bountiesTimeline
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

      // Stage 6 (0.90 -> 1.00): Camera pulls back to reveal the entire mapped frontier with all 5 active waypoints!
      .to(mapWorld, {
        x: finalCam.x,
        y: finalCam.y,
        scale: finalCam.scale,
        duration: 0.10,
        ease: 'power2.out'
      }, 0.90);
  }

  setupResizeListener() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    }, { passive: true });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new SparkathonExperience();
});

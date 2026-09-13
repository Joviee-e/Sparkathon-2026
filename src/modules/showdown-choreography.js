import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Setup Section 05: The Showdown (High Noon / Judging Criteria) Choreography
 * Seamless arrival into high-noon clearing -> Banner mount -> 5 Sequential Verdicts ->
 * Climax "ONE WINNER PER DOMAIN" -> Triumvirate Rewards (Recognition, Mentorship, Incubation)
 */
export function setupShowdownChoreography(sectionEl = null) {
  const section = sectionEl || document.querySelector('.showdown-section');
  if (!section) return null;

  const stage = section.querySelector('.showdown-pinned-stage');
  const backdropImg = section.querySelector('.showdown-backdrop-img');
  const sunExposure = section.querySelector('.showdown-sun-exposure');
  const bannerMount = section.querySelector('.showdown-banner-mount');
  const placards = [
    section.querySelector('#crit-01'),
    section.querySelector('#crit-02'),
    section.querySelector('#crit-03'),
    section.querySelector('#crit-04'),
    section.querySelector('#crit-05')
  ];
  const climaxChamber = section.querySelector('.showdown-climax-chamber');
  const rewardTokens = section.querySelectorAll('.reward-token');

  if (!stage) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  if (prefersReduced || isMobile) {
    // Accessible static layout for mobile or reduced motion
    placards.forEach((p) => {
      if (p) {
        gsap.set(p, { clearProps: 'all' });
        p.classList.add('active');
      }
    });
    if (bannerMount) gsap.set(bannerMount, { clearProps: 'all', opacity: 1 });
    if (climaxChamber) {
      gsap.set(climaxChamber, { clearProps: 'all', opacity: 1 });
      climaxChamber.classList.add('active');
    }
    rewardTokens.forEach((tok) => gsap.set(tok, { clearProps: 'all', opacity: 1 }));
    return null;
  }

  // Initial States for choreography
  gsap.set(bannerMount, { opacity: 0, y: -45, scale: 0.94 });
  placards.forEach((p) => {
    if (p) gsap.set(p, { opacity: 0, y: 35, scale: 0.96 });
  });
  if (climaxChamber) {
    gsap.set(climaxChamber, { opacity: 0, scale: 0.92, y: 30 });
  }
  rewardTokens.forEach((tok) => {
    gsap.set(tok, { opacity: 0, y: 25 });
  });

  // Master Scrubbed High Noon Timeline (27s scrub length with deliberate dwell windows)
  const showdownTl = gsap.timeline({
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

        // Manage active classes for accessibility and pointer interaction
        if (placards[0]) placards[0].classList.toggle('active', p >= 0.16 && p < 0.32);
        if (placards[1]) placards[1].classList.toggle('active', p >= 0.32 && p < 0.46);
        if (placards[2]) placards[2].classList.toggle('active', p >= 0.46 && p < 0.60);
        if (placards[3]) placards[3].classList.toggle('active', p >= 0.60 && p < 0.72);
        if (placards[4]) placards[4].classList.toggle('active', p >= 0.72 && p < 0.84);
        if (climaxChamber) climaxChamber.classList.toggle('active', p >= 0.84);
      }
    }
  });

  // --- STAGE 1: ARRIVAL & HIGH NOON CLEARING ESTABLISH (0.0s -> 2.5s) ---
  if (backdropImg) {
    showdownTl.to(backdropImg, {
      scale: 1.0,
      filter: 'sepia(0.25) contrast(1.18) brightness(0.38)',
      duration: 3.0,
      ease: 'sine.out'
    }, 0);
  }

  if (sunExposure) {
    showdownTl.to(sunExposure, {
      opacity: 1,
      duration: 2.5,
      ease: 'power1.out'
    }, 0);
  }

  // --- STAGE 2: THE TITLE BANNER ENTERS (1.8s -> 4.2s) ---
  showdownTl.to(bannerMount, {
    opacity: 1,
    y: 0,
    scale: 1.0,
    duration: 2.2,
    ease: 'power2.out'
  }, 1.8);

  // --- STAGE 3: VERDICT 01 — CREATIVITY & INNOVATION (4.2s -> 8.0s) ---
  if (placards[0]) {
    showdownTl.to(placards[0], {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 1.8,
      ease: 'power2.out'
    }, 4.2);

    // Dwell on 01 until 7.0s, then transition out
    showdownTl.to(placards[0], {
      opacity: 0,
      y: -30,
      scale: 1.03,
      duration: 1.2,
      ease: 'power2.in'
    }, 7.0);
  }

  // --- STAGE 4: VERDICT 02 — TECHNICAL FEASIBILITY (8.2s -> 11.8s) ---
  if (placards[1]) {
    showdownTl.to(placards[1], {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 1.8,
      ease: 'power2.out'
    }, 8.2);

    // Dwell on 02 until 10.8s, then transition out
    showdownTl.to(placards[1], {
      opacity: 0,
      y: -30,
      scale: 1.03,
      duration: 1.2,
      ease: 'power2.in'
    }, 10.8);
  }

  // --- STAGE 5: VERDICT 03 — SCALABILITY & MARKET POTENTIAL (12.0s -> 15.6s) ---
  if (placards[2]) {
    showdownTl.to(placards[2], {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 1.8,
      ease: 'power2.out'
    }, 12.0);

    // Dwell on 03 until 14.6s, then transition out
    showdownTl.to(placards[2], {
      opacity: 0,
      y: -30,
      scale: 1.03,
      duration: 1.2,
      ease: 'power2.in'
    }, 14.6);
  }

  // --- STAGE 6: VERDICT 04 — PRESENTATION & CLARITY (15.8s -> 19.0s) ---
  if (placards[3]) {
    showdownTl.to(placards[3], {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 1.6,
      ease: 'power2.out'
    }, 15.8);

    // Dwell on 04 until 18.0s, then transition out
    showdownTl.to(placards[3], {
      opacity: 0,
      y: -30,
      scale: 1.03,
      duration: 1.2,
      ease: 'power2.in'
    }, 18.0);
  }

  // --- STAGE 7: VERDICT 05 — PROBLEM-SOLVING IMPACT (19.2s -> 22.4s) ---
  if (placards[4]) {
    showdownTl.to(placards[4], {
      opacity: 1,
      y: 0,
      scale: 1.0,
      duration: 1.6,
      ease: 'power2.out'
    }, 19.2);

    // Dwell on 05 until 21.4s, then transition out
    showdownTl.to(placards[4], {
      opacity: 0,
      y: -35,
      scale: 1.03,
      duration: 1.2,
      ease: 'power2.in'
    }, 21.4);
  }

  // --- STAGE 8: HIGH NOON CLIMAX — ONE WINNER PER DOMAIN (22.6s -> 26.5s) ---
  // Deliberate pause in negative space before the grand ruling lands
  if (bannerMount) {
    showdownTl.to(bannerMount, {
      y: -20,
      scale: 0.90,
      opacity: 0.45,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 22.2);
  }

  if (climaxChamber) {
    showdownTl.to(climaxChamber, {
      opacity: 1,
      scale: 1.0,
      y: 0,
      duration: 2.0,
      ease: 'power2.out'
    }, 22.8);
  }

  // Sequential Stamping of RECOGNITION, MENTORSHIP, INCUBATION
  if (rewardTokens && rewardTokens.length >= 3) {
    showdownTl.to(rewardTokens[0], {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'back.out(1.4)'
    }, 23.8);

    showdownTl.to(rewardTokens[1], {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'back.out(1.4)'
    }, 24.3);

    showdownTl.to(rewardTokens[2], {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'back.out(1.4)'
    }, 24.8);
  }

  // Stage 9: Subdued settling for Section 06 handoff
  showdownTl.to(stage, {
    duration: 1.5
  }, 25.5);

  return showdownTl;
}

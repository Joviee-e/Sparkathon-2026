import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DustCanvas } from '../../modules/dust-canvas.js';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroSectionRef = useRef(null);
  const heroStageRef = useRef(null);
  const videoRef = useRef(null);
  const dustCanvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const dustCanvasEl = dustCanvasRef.current;
    const heroSection = heroSectionRef.current;
    const heroStage = heroStageRef.current;
    if (!heroSection || !heroStage) return;

    let dustCanvasInstance = null;
    if (dustCanvasEl) {
      dustCanvasInstance = new DustCanvas(dustCanvasEl);
    }

    // Video Autoplay Resilience
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay restricted by browser, relying on interaction:', err);
          const resumeOnInteraction = () => {
            video.play();
            window.removeEventListener('click', resumeOnInteraction);
            window.removeEventListener('touchstart', resumeOnInteraction);
          };
          window.addEventListener('click', resumeOnInteraction, { once: true });
          window.addEventListener('touchstart', resumeOnInteraction, { once: true });
        });
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scoped GSAP Context for clean lifecycle management & teardown
    const ctx = gsap.context(() => {
      const blackout = heroSection.querySelector('.hero-blackout');
      const letterboxTop = heroSection.querySelector('.letterbox-top');
      const letterboxBottom = heroSection.querySelector('.letterbox-bottom');
      const titleContainer = heroSection.querySelector('.hero-choreo-container');
      const presentsBadge = heroSection.querySelector('.hero-presents-badge');
      const mainTitle = heroSection.querySelector('.hero-title');
      const broncoWatermark = heroSection.querySelector('.hero-bronco-watermark');
      const tagline = heroSection.querySelector('.hero-tagline');
      const metaBar = heroSection.querySelector('.hero-meta-bar');
      const scrollPrompt = heroSection.querySelector('.hero-scroll-prompt');

      if (reducedMotion) {
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
        return;
      }

      // Initial State Setups for choreography
      gsap.set(blackout, { opacity: 1 });
      if (video) gsap.set(video, { scale: 1.08, filter: 'contrast(1.05) brightness(0.92)' });
      gsap.set(titleContainer, { opacity: 0, scale: 0.94, y: 25 });
      gsap.set(presentsBadge, { opacity: 0, y: -20 });
      gsap.set(mainTitle, { opacity: 0, scale: 0.90 });
      gsap.set(broncoWatermark, { opacity: 0, scale: 0.85 });
      gsap.set(tagline, { opacity: 0, y: 15 });
      gsap.set(metaBar, { opacity: 0, y: 15 });
      gsap.set(scrollPrompt, { opacity: 1 });

      // Master Bi-Directional Scrubbing Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          pin: heroStage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (dustCanvasInstance) {
              dustCanvasInstance.setScrollTurbulence(self.getVelocity());
            }
          }
        }
      });

      tl
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

        // Phase 3 (0.40 -> 0.70): Title holds strong; letterbox bars open outward
        .to(letterboxTop, { yPercent: -100, duration: 0.28, ease: 'power2.inOut' }, 0.45)
        .to(letterboxBottom, { yPercent: 100, duration: 0.28, ease: 'power2.inOut' }, 0.45)

        // Phase 4 (0.70 -> 1.00): Title drifts into dust; reverse scroll restores cleanly
        .to(titleContainer, { opacity: 0, y: -50, scale: 1.06, duration: 0.25, ease: 'power2.in' }, 0.72)
        .to(video, { filter: 'contrast(1.25) brightness(0.65)', duration: 0.25, ease: 'power1.inOut' }, 0.75);

    }, heroSectionRef);

    return () => {
      ctx.revert();
      if (dustCanvasInstance) {
        dustCanvasInstance.destroy();
      }
    };
  }, []);

  return (
    <section
      className="hero-section"
      id="hero-expedition"
      ref={heroSectionRef}
      aria-label="Sparkathon Cinematic Opening"
    >
      <div className="hero-stage" ref={heroStageRef}>
        {/* Opening Film Blackout */}
        <div className="hero-blackout" aria-hidden="true" />

        {/* Anamorphic 2.39:1 Letterbox Bars */}
        <div className="letterbox-bar letterbox-top" aria-hidden="true" />
        <div className="letterbox-bar letterbox-bottom" aria-hidden="true" />

        {/* Approved Hero Video Environment */}
        <div className="hero-video-wrapper">
          <video
            ref={videoRef}
            className="hero-video"
            src="/assets/video/intro-clip.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/desert-canyon-panoramic.png"
            preload="auto"
            aria-label="Cinematic cowboy galloping through desert canyon"
          />
          <div className="hero-grade-overlay" aria-hidden="true" />
        </div>

        {/* Canyon Dust Particle Simulation Canvas */}
        <canvas ref={dustCanvasRef} className="hero-dust-canvas" aria-hidden="true" />

        {/* Typography & Graphic Choreography */}
        <div className="hero-choreo-container">
          {/* Top Presenter Badge */}
          <div className="hero-presents-badge">
            <span className="badge-star" aria-hidden="true">★</span>
            <span className="badge-text">E-Cell FCRIT Presents</span>
            <span className="badge-star" aria-hidden="true">★</span>
          </div>

          {/* Brochure Cover Halftone Bronco Watermark */}
          <img
            src="/assets/images/cowboy-bronco-transparent.png"
            className="hero-bronco-watermark"
            alt="Cowboy on bucking bronco woodcut"
            aria-hidden="true"
          />

          {/* Main Title Lockup */}
          <div className="hero-title-lockup">
            <h1 className="hero-title">SPARKATHON</h1>
          </div>

          {/* Tagline */}
          <p className="hero-tagline">WHERE INNOVATION MEETS EXCELLENCE</p>

          {/* Frontier Meta Data Ribbon */}
          <div className="hero-meta-bar">
            <div className="hero-meta-item">
              <span className="hero-meta-label">EXPEDITION DATE</span>
              <span className="hero-meta-value date">08.10.26</span>
            </div>

            <div className="hero-meta-script" aria-hidden="true">
              The Frontier of Innovation
            </div>

            <div className="hero-meta-item">
              <span className="hero-meta-label">TOTAL BOUNTY</span>
              <span className="hero-meta-value prize">₹15,000</span>
            </div>
          </div>
        </div>

        {/* Reversible Scroll Prompt Indicator */}
        <div className="hero-scroll-prompt" aria-hidden="true">
          <span className="scroll-prompt-text">Ride Forward To Explore</span>
          <div className="scroll-prompt-icon" />
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRITERIA_PILLS, LEDGER_SPECS, INCUBATION_ITEMS } from '../../data/manifestoData.js';

gsap.registerPlugin(ScrollTrigger);

export const WhatIsSparkathon = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const landscapeImg = section.querySelector('.manifesto-landscape-img');
      const marker = section.querySelector('.manifesto-section-marker');
      const doc = section.querySelector('.field-document');
      const stamp = section.querySelector('.document-ink-stamp');
      const headline = section.querySelector('.doc-headline');
      const manifestoBody = section.querySelector('.doc-manifesto-body');
      const ledgerWrap = section.querySelector('.doc-ledger-wrap');
      const docket = section.querySelector('.doc-incubation-docket');
      const footer = section.querySelector('.doc-footer');

      if (reducedMotion) {
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

      // 1. Panoramic Landscape Drift
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

      // 7. Strategic Growth Docket & Footer
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="manifesto-section"
      id="what-is-sparkathon"
      ref={sectionRef}
      aria-label="Section 02 — What is Sparkathon"
    >
      {/* Environmental Landscape Panoramic Layer */}
      <div className="manifesto-landscape-backdrop" aria-hidden="true">
        <img
          src="/assets/images/panoramic-desert-basin.png"
          className="manifesto-landscape-img"
          alt="Frontier desert basin with windmill, cactus, and sandstone buttes"
        />
        <div className="landscape-vignette-overlay" />
        <div className="landscape-sun-dust" />
      </div>

      {/* Editorial Spread Composition Container */}
      <div className="manifesto-composition-wrap">
        {/* Top Editorial Section Stamp / Index Marker */}
        <div className="manifesto-section-marker">
          <div className="marker-rule marker-rule-left" />
          <div className="marker-content">
            <span className="marker-num">02</span>
            <span className="marker-sep">/</span>
            <span className="marker-label">UNDERSTAND</span>
          </div>
          <div className="marker-rule marker-rule-right" />
        </div>

        {/* The Physical Field Document Spread */}
        <article className="field-document">
          {/* Corner Registration Marks */}
          <div className="reg-mark reg-tl" aria-hidden="true">┌</div>
          <div className="reg-mark reg-tr" aria-hidden="true">┐</div>
          <div className="reg-mark reg-bl" aria-hidden="true">└</div>
          <div className="reg-mark reg-br" aria-hidden="true">┘</div>

          {/* Inked Official Dispatch Stamp */}
          <div className="document-ink-stamp" aria-hidden="true">
            <div className="stamp-inner">
              <span className="stamp-org">E-CELL FCRIT</span>
              <span className="stamp-type">OFFICIAL DISPATCH</span>
              <span className="stamp-loc">OCTOBER 2026</span>
            </div>
          </div>

          {/* Document Header */}
          <header className="doc-header">
            <div className="doc-meta-top">
              <span className="doc-code">DISPATCH NO. 2026-FCRIT-0810</span>
              <span className="doc-stars" aria-hidden="true">★ ★ ★</span>
              <span className="doc-classification">AUTHORIZED EXPEDITION MANIFEST</span>
            </div>

            <h2 className="doc-headline">
              <span className="headline-sub">WHAT IS</span>
              <span className="headline-main">SPARKATHON?</span>
            </h2>

            <div className="doc-subline">
              <span className="doc-tagline">WHERE INNOVATION MEETS EXCELLENCE</span>
              <span className="doc-host">
                HOSTED BY E-CELL FCRIT • FR. C. RODRIGUES INSTITUTE OF TECHNOLOGY, VASHI, NAVI MUMBAI
              </span>
            </div>
          </header>

          <div className="doc-divider-rule" />

          {/* Core Narrative Manifesto */}
          <div className="doc-manifesto-body">
            <p className="manifesto-lead">
              A competition where pioneer teams develop innovative solutions to real-world problems in distinguished domains. Expeditions are evaluated by an expert industry jury on four uncompromising frontier pillars:
            </p>
            <div className="manifesto-criteria-block">
              {CRITERIA_PILLS.map((pill) => (
                <span key={pill} className="criteria-pill">{pill}</span>
              ))}
            </div>
          </div>

          {/* The Frontier Ledger */}
          <div className="doc-ledger-wrap">
            <div className="ledger-header">
              <span className="ledger-title">EXPEDITION SPECIFICATIONS &amp; COHORT ROSTER</span>
              <span className="ledger-rule-meta">OFFLINE FORMAT • STRICT PROTOCOL</span>
            </div>

            <div className="doc-ledger-grid">
              {LEDGER_SPECS.map((spec) => (
                <div key={spec.label} className="ledger-item">
                  <span className="ledger-label">{spec.label}</span>
                  <span className={`ledger-val ${spec.highlight ? 'highlight-red' : ''}`}>
                    {spec.value}
                  </span>
                  <span className="ledger-sub">{spec.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Growth & Venture Incubation */}
          <div className="doc-incubation-docket">
            <div className="docket-ribbon">
              <span className="docket-ribbon-text">STRATEGIC GROWTH &amp; VENTURE OPPORTUNITIES</span>
            </div>
            <div className="docket-content">
              {INCUBATION_ITEMS.map((item, idx) => (
                <React.Fragment key={item.num}>
                  <div className="docket-item">
                    <div className="docket-num">{item.num}</div>
                    <div className="docket-desc">
                      <strong>{item.title}</strong>
                      {' '}{item.desc}
                    </div>
                  </div>
                  {idx < INCUBATION_ITEMS.length - 1 && (
                    <div className="docket-divider" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Partner Perk Seal & Handwritten Note */}
          <footer className="doc-footer">
            <div className="doc-perk-seal">
              <span className="seal-badge">OFFICIAL INCENTIVE</span>
              <span className="seal-text">
                Participants stand a chance to avail discounts <strong className="seal-bold">up to 25%*</strong> at <strong className="seal-bold">E-Summit 2026-27</strong>
                <span className="seal-tc"> (*T&amp;C Apply)</span>
              </span>
            </div>

            <div className="doc-handwritten-note" aria-hidden="true">
              <span className="handwritten-text">"Where innovation meets excellence — claim your frontier."</span>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
};

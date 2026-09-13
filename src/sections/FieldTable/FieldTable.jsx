import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FIELD_STATIONS } from '../../data/fieldTableData.js';
import { setupFieldTableChoreography } from '../../modules/field-table-choreography.js';

gsap.registerPlugin(ScrollTrigger);

export const FieldTable = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      setupFieldTableChoreography(section);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="field-table-section"
      id="section-how-it-works"
      ref={sectionRef}
      aria-label="How It Works — The Bounty Hunter's Field Table"
    >
      {/* Seamless Narrative Transition Bridge from Section 03 Map */}
      <div className="field-table-transition-bridge" aria-hidden="true">
        <div className="field-table-dust-blend" />
        <div className="timber-divider-line">
          <span className="timber-rule" />
          <span className="timber-brand-stamp">WORKBENCH SPECIFICATION • STAGE 04</span>
          <span className="timber-rule" />
        </div>
      </div>

      {/* Pinned 100vh Stage */}
      <div className="field-table-pinned-stage">
        {/* Fixed Editorial HUD Overlay */}
        <header className="field-table-hud" aria-label="Field Table Navigation & Progress">
          <div className="hud-left">
            <div className="hud-marker">
              <span className="marker-num">04</span>
              <span className="marker-sep">/</span>
              <span className="marker-label">HOW IT WORKS</span>
            </div>
            <h2 className="hud-headline">THE BOUNTY HUNTER’S FIELD TABLE</h2>
            <p className="hud-subline">AN IDEA EVOLVES ACROSS THE FRONTIER WORKBENCH</p>
          </div>

          {/* Process Stage Meter / Dial */}
          <nav className="hud-process-dial" aria-label="Workflow Stages">
            {FIELD_STATIONS.map((st, idx) => (
              <React.Fragment key={st.id}>
                <div className={`dial-step ${idx === 0 ? 'active' : ''}`} data-step={idx}>
                  <span className="dial-index">{st.stepNumber}</span>
                  <span className="dial-name">{st.stepName}</span>
                </div>
                {idx < FIELD_STATIONS.length - 1 && (
                  <span className="dial-arrow">→</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </header>

        {/* The Camera Viewport Window */}
        <div className="field-table-viewport">
          {/* Deep Rustic Workbench Surface Container */}
          <div className="field-table-surface" id="field-table-surface">
            {/* Environmental Cinematic Video Anchor */}
            <div className="table-cinematic-window" aria-label="Cinematic Field Workshop Environment">
              <div className="video-timber-frame">
                <div className="frame-corner corner-tl" />
                <div className="frame-corner corner-tr" />
                <div className="frame-corner corner-bl" />
                <div className="frame-corner corner-br" />
                <video
                  className="field-table-video"
                  id="field-table-video"
                  src="/assets/video/how-it-works.mp4"
                  poster="/assets/images/how-it-works-poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Artisan crafting prototype on map workbench"
                />
                <div className="video-lantern-grade" aria-hidden="true" />
                <div className="video-caption-strip">
                  <span className="caption-stamp">MONUMENT EXPEDITION OUTPOST // CRAFTING BENCH</span>
                  <span className="caption-status">
                    <span className="status-dot" /> LIVE BENCH CAM
                  </span>
                </div>
              </div>
            </div>

            {/* Authentic Physical Worktable Accents */}
            <div className="table-ambient-props" aria-hidden="true">
              <div className="prop-map-sheet" />
              <div className="prop-brass-calipers" />
              <div className="prop-carpenter-pencil" />
            </div>

            {/* Connected Workflow Pipeline: 4 Tangible Field Stations */}
            <div className="table-stations-stream">
              {/* STATION 1: PRESENT */}
              <article className="table-station station-present active" id="station-present">
                <div className="station-card-inner folio-paper">
                  <div className="paper-clip-brass" aria-hidden="true" />
                  <div className="station-meta-bar">
                    <span className="station-tag">PHASE 01 // FORMAT BRIEF</span>
                    <span className="station-seal-mini">OFFICIAL MANIFEST</span>
                  </div>
                  <h3 className="station-title">PRESENT</h3>
                  <div className="station-content">
                    <p className="station-statement">Projects are formally presented to the frontier jury using:</p>
                    <div className="presentation-tools-block">
                      <div className="tool-pill pill-powerpoint">
                        <span className="tool-icon">▤</span>
                        <span className="tool-name">PowerPoint</span>
                      </div>
                      <span className="tool-conjunction">OR</span>
                      <div className="tool-pill pill-canva">
                        <span className="tool-icon">◈</span>
                        <span className="tool-name">Canva</span>
                      </div>
                    </div>
                    <p className="station-note">Structured slides, crisp visual architecture, and clean typographic evidence.</p>
                  </div>
                  <div className="paper-corner-fold" aria-hidden="true" />
                </div>
              </article>

              {/* STATION 2: PROTOTYPE */}
              <article className="table-station station-prototype" id="station-prototype">
                <div className="station-card-inner blueprint-paper">
                  <div className="station-meta-bar">
                    <span className="station-tag">PHASE 02 // TANGIBLE PROOF</span>
                    <span className="station-stamp-red">STRONGLY ENCOURAGED</span>
                  </div>
                  <h3 className="station-title">PROTOTYPE</h3>
                  <div className="station-content">
                    <div className="prototype-mandate-box">
                      <div className="mandate-headline">PROTOTYPES / POCS ARE ENCOURAGED</div>
                      <p className="mandate-body">
                        Bring your concept to life. Whether a functional software deploy, hardware assembly, or physical mechanism — proof of concept validates the frontier claim.
                      </p>
                    </div>
                    <div className="prototype-schematic-accent" aria-hidden="true">
                      <span className="schematic-mark">⚙</span>
                      <span className="schematic-text">PHYSICAL / DIGITAL ARTIFACT</span>
                      <span className="schematic-mark">⚡</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* STATION 3: SOLUTION */}
              <article className="table-station station-solution" id="station-solution">
                <div className="station-card-inner ledger-paper">
                  <div className="station-meta-bar">
                    <span className="station-tag">PHASE 03 // TECHNICAL DOSSIER</span>
                    <span className="station-seal-mini">FOUR PILLARS</span>
                  </div>
                  <h3 className="station-title">SOLUTION</h3>
                  <div className="station-content">
                    <p className="solution-intro">Participants must thoroughly cover four core criteria:</p>
                    <div className="solution-quadrant-grid">
                      <div className="quadrant-item">
                        <div className="quadrant-header">
                          <span className="quadrant-num">I</span>
                          <span className="quadrant-title">PROBLEM</span>
                        </div>
                        <p className="quadrant-desc">The critical frontier challenge, friction point, or unaddressed market gap.</p>
                      </div>
                      <div className="quadrant-item">
                        <div className="quadrant-header">
                          <span className="quadrant-num">II</span>
                          <span className="quadrant-title">SOLUTION</span>
                        </div>
                        <p className="quadrant-desc">The breakthrough innovation, value proposition, and functional mechanism.</p>
                      </div>
                      <div className="quadrant-item">
                        <div className="quadrant-header">
                          <span className="quadrant-num">III</span>
                          <span className="quadrant-title">TECHNICAL DETAILS</span>
                        </div>
                        <p className="quadrant-desc">System architecture, algorithms, embedded hardware, schemas, and implementation.</p>
                      </div>
                      <div className="quadrant-item">
                        <div className="quadrant-header">
                          <span className="quadrant-num">IV</span>
                          <span className="quadrant-title">MARKET IMPACT</span>
                        </div>
                        <p className="quadrant-desc">Commercial viability, user scalability, adoption economics, and expansion potential.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* STATION 4: PITCH */}
              <article className="table-station station-pitch" id="station-pitch">
                <div className="station-card-inner verdict-paper">
                  <div className="station-meta-bar">
                    <span className="station-tag">PHASE 04 // FINAL DEFENSE</span>
                    <span className="station-stamp-gold">OFFLINE JURY PITCH</span>
                  </div>
                  <h3 className="station-title">PITCH</h3>
                  <div className="station-content">
                    <div className="pitch-duration-lockup">
                      <div className="pitch-duration-value">5–10 MINUTES</div>
                      <div className="pitch-duration-label">+ JURY Q&amp;A DEFENSE</div>
                    </div>
                    <p className="pitch-instructions">
                      Step before the industry panel. Deliver the presentation, demonstrate the prototype, and defend your technical architecture under cross-examination.
                    </p>
                    <div className="showdown-readiness-seal">
                      <span className="seal-icon">★</span>
                      <span className="seal-text">THE WORK IS READY. PROCEED TO SHOWDOWN.</span>
                      <span className="seal-icon">★</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

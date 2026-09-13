import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JUDGING_CRITERIA, WINNER_OUTCOME } from '../../data/showdownData.js';
import { setupShowdownChoreography } from '../../modules/showdown-choreography.js';

gsap.registerPlugin(ScrollTrigger);

export const Showdown = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      setupShowdownChoreography(section);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="showdown-section"
      id="the-showdown"
      ref={sectionRef}
      aria-label="Section 05 — The Showdown High Noon Judging Criteria"
    >
      {/* Ingress Transition Bridge from Phase 4 Field Table */}
      <div className="showdown-transition-bridge" aria-hidden="true">
        <div className="showdown-dust-veil" />
        <div className="showdown-boundary-rule">
          <div className="showdown-boundary-line" />
          <span className="showdown-boundary-stamp">
            HIGH NOON SHOWDOWN // OFFICIAL VERDICT BOUNDARY
          </span>
          <div className="showdown-boundary-line" />
        </div>
      </div>

      {/* Pinned 100vh High Noon Stage */}
      <div className="showdown-pinned-stage">
        {/* Natural High Noon Sunlight Exposure (Photographic Wash) */}
        <div className="showdown-sun-exposure" aria-hidden="true" />

        {/* Distressed Frontier Landscape Backdrop */}
        <div className="showdown-backdrop-wrap" aria-hidden="true">
          <img
            src="/assets/images/monument-valley-cactus.png"
            className="showdown-backdrop-img"
            alt="Frontier showdown clearing under high noon sun"
          />
          <div className="showdown-backdrop-vignette" />
        </div>

        {/* Editorial Heads-Up Display (HUD) */}
        <header className="showdown-hud" aria-label="Showdown Header">
          <div className="showdown-hud-left">
            <div className="showdown-marker">
              <span className="marker-num">05</span>
              <span className="marker-sep">/</span>
              <span className="marker-label">THE SHOWDOWN</span>
            </div>
            <h2 className="showdown-hud-title">HIGH NOON VERDICT</h2>
            <p className="showdown-hud-subline">
              FIVE CRITERIA. ONE CHAMPION PER FRONTIER.
            </p>
          </div>

          <div className="showdown-hud-clock" aria-hidden="true">
            <span className="showdown-time-badge">STANDOFF HOUR</span>
            <span className="showdown-time-val">12:00 HIGH NOON</span>
          </div>
        </header>

        {/* High Noon Showdown Arena */}
        <div className="showdown-arena">
          {/* Approved Cutout Production Banner: "JUDGING CRITERIA" */}
          <div className="showdown-banner-mount" aria-label="Judging Criteria Banner">
            <div className="banner-timber-lintel">
              <div className="lintel-bolt bolt-left" aria-hidden="true" />
              <img
                src="/assets/images/judging-criteria-banner.png"
                className="judging-banner-img"
                alt="Judging Criteria"
              />
              <div className="lintel-bolt bolt-right" aria-hidden="true" />
            </div>
          </div>

          {/* 5 Sequential Verdict Placards */}
          <div className="showdown-verdict-sequence" aria-label="Five Judging Criteria">
            {JUDGING_CRITERIA.map((crit) => (
              <article
                key={crit.id}
                className="verdict-placard"
                id={crit.id}
                aria-label={`Criterion ${crit.number}: ${crit.title}`}
              >
                <div className="placard-stamp-seal" aria-hidden="true">
                  {crit.stampTag}
                </div>

                <div className="placard-header">
                  <span className="placard-num">{crit.number}</span>
                  <span className="placard-code">{crit.verdictCode}</span>
                </div>

                <h3 className="placard-title">{crit.title}</h3>
                <p className="placard-desc">{crit.subtitle}</p>

                <div className="placard-footer-line" aria-hidden="true">
                  <span className="placard-rule-tag">JURY EVALUATION STANDARD</span>
                  <span className="placard-watermark">E-CELL FCRIT • 2026</span>
                </div>
              </article>
            ))}
          </div>

          {/* Stage 8 — High Noon Climax: "ONE WINNER PER DOMAIN" */}
          <div
            className="showdown-climax-chamber"
            aria-label="Final Outcome: One Winner Per Domain"
          >
            <div className="climax-letterpress-badge">
              <span className="climax-star" aria-hidden="true">★</span>
              <span>{WINNER_OUTCOME.verdictNotice}</span>
              <span className="climax-star" aria-hidden="true">★</span>
            </div>

            <h3 className="climax-main-title">{WINNER_OUTCOME.verdictTitle}</h3>
            <p className="climax-decree-text">{WINNER_OUTCOME.verdictDecree}</p>

            {/* The Consequences: RECOGNITION • MENTORSHIP • INCUBATION */}
            <div className="climax-rewards-triumvirate">
              {WINNER_OUTCOME.rewards.map((reward) => (
                <div key={reward.id} className="reward-token">
                  <h4 className="reward-token-header">{reward.title}</h4>
                  <p className="reward-token-desc">{reward.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Egress Transition Bridge Toward Phase 6 Timeline */}
        <div className="showdown-trail-bridge" aria-hidden="true">
          <div className="trail-cue-wrapper">
            <div className="trail-cue-line" />
            <span className="trail-cue-text">
              THE VERDICT IS CAST // FOLLOW THE EXPEDITION TRAIL
            </span>
            <div className="trail-cue-line" />
          </div>
        </div>
      </div>
    </section>
  );
};

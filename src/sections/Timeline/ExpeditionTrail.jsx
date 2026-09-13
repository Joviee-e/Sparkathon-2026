import React, { useEffect, useRef } from 'react';
import {
  EXPEDITION_HEADER,
  TRAIL_MILESTONES,
  TRAIL_INTERLUDE,
  PHASE6_EGRESS
} from '../../data/timelineData.js';
import { initExpeditionTrailChoreography } from '../../modules/expedition-trail-choreography.js';

export const ExpeditionTrail = () => {
  const containerRef = useRef(null);
  const trailPathActiveRef = useRef(null);
  const surveyorBeadRef = useRef(null);
  const fieldLogRef = useRef(null);
  const interludeRef = useRef(null);
  const egressBridgeRef = useRef(null);
  const cameraTrackRef = useRef(null);

  // Panorama refs
  const panoEstRef = useRef(null);
  const panoP01Ref = useRef(null);
  const panoP02Ref = useRef(null);
  const panoP03Ref = useRef(null);
  const panoP04Ref = useRef(null);
  const panoP05Ref = useRef(null);

  // Subtle lighting exposure ref
  const lightingExposureRef = useRef(null);

  // Milestone scene refs
  const sceneRefs = useRef([]);

  useEffect(() => {
    const refs = {
      stageElem: containerRef.current,
      cameraTrack: cameraTrackRef.current,
      trailPathActive: trailPathActiveRef.current,
      surveyorBead: surveyorBeadRef.current,
      fieldLogCounter: fieldLogRef.current,
      interludeElem: interludeRef.current,
      egressBridge: egressBridgeRef.current,
      lightingExposure: lightingExposureRef.current,
      panoramas: {
        establishing: panoEstRef.current,
        p01: panoP01Ref.current,
        p02: panoP02Ref.current,
        p03: panoP03Ref.current,
        p04: panoP04Ref.current,
        p05: panoP05Ref.current,
      },
      scenes: sceneRefs.current,
    };

    const ctx = initExpeditionTrailChoreography(containerRef.current, refs);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="expedition-trail"
      className="expedition-trail-stage"
      ref={containerRef}
      aria-label="Section 06: The Expedition Trail — Event-Day Timeline"
    >
      {/* 1. Ingress Transition Bridge from Phase 5 Showdown (Continuous Red Route) */}
      <div className="expedition-ingress-bridge" aria-hidden="true">
        <div className="ingress-stem-trail" />
        <div className="ingress-editorial-cue">
          <span className="ingress-cue-line" />
          <span className="ingress-cue-text">
            SURVEYING EXPEDITION WAYPOINTS // MORNING TO DUSK
          </span>
          <span className="ingress-cue-line right" />
        </div>
      </div>

      {/* 2. Pinned 100vh Viewport Stage */}
      <div className="trail-pinned-viewport">
        {/* Continuous Panoramic Camera Environment */}
        <div className="trail-landscape-environment" aria-hidden="true">
          <div className="trail-camera-track" ref={cameraTrackRef}>
            <div
              className="landscape-vista-plane vista-establishing active"
              ref={panoEstRef}
              style={{ backgroundImage: `url(${EXPEDITION_HEADER.establishingImage})` }}
            />
            <div
              className="landscape-vista-plane vista-01"
              ref={panoP01Ref}
              style={{ backgroundImage: `url(${TRAIL_MILESTONES[0].image})` }}
            />
            <div
              className="landscape-vista-plane vista-02"
              ref={panoP02Ref}
              style={{ backgroundImage: `url(${TRAIL_MILESTONES[1].image})` }}
            />
            <div
              className="landscape-vista-plane vista-03"
              ref={panoP03Ref}
              style={{ backgroundImage: `url(${TRAIL_MILESTONES[2].image})` }}
            />
            <div
              className="landscape-vista-plane vista-04"
              ref={panoP04Ref}
              style={{ backgroundImage: `url(${TRAIL_MILESTONES[3].image})` }}
            />
            <div
              className="landscape-vista-plane vista-05"
              ref={panoP05Ref}
              style={{ backgroundImage: `url(${TRAIL_MILESTONES[4].image})` }}
            />
          </div>

          <div className="trail-camera-vignette" />
          <div className="trail-lighting-exposure" ref={lightingExposureRef} />
        </div>

        {/* Physical / Editorial Frontier Header (Zero Modern HUD) */}
        <header className="trail-frontier-header">
          <div className="trail-header-manifest">
            <span className="trail-stage-badge">{EXPEDITION_HEADER.stageBadge}</span>
            <h2 className="trail-section-title">{EXPEDITION_HEADER.title}</h2>
            <p className="trail-section-subtitle">
              {EXPEDITION_HEADER.subtitle} • 9:00 AM — 4:00 PM
            </p>
          </div>

          <div className="trail-field-log-stamp" aria-label="Field Log Status">
            <span className="log-stamp-title">EXPEDITION MANIFEST</span>
            <span className="log-stamp-counter" ref={fieldLogRef}>
              FIELD LOG // 01 OF 05
            </span>
          </div>
        </header>

        {/* Central Trail Expedition Clearing */}
        <div className="trail-expedition-clearing">
          {/* Continuous SVG Inked Route Line */}
          <svg
            className="trail-route-svg"
            viewBox="0 0 1000 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="route-base-path"
              d="M 500 0 C 440 90, 240 100, 220 180 C 200 260, 740 240, 780 320 C 820 400, 260 390, 300 470 C 340 550, 760 520, 720 600 C 680 680, 440 640, 480 720 C 520 800, 560 820, 580 870 L 580 900"
            />
            <path
              ref={trailPathActiveRef}
              className="route-drawn-path"
              d="M 500 0 C 440 90, 240 100, 220 180 C 200 260, 740 240, 780 320 C 820 400, 260 390, 300 470 C 340 550, 760 520, 720 600 C 680 680, 440 640, 480 720 C 520 800, 560 820, 580 870 L 580 900"
            />
            <circle
              ref={surveyorBeadRef}
              className="route-surveyor-marker"
              cx="500"
              cy="0"
              r="5.5"
            />
          </svg>

          {/* Landmark Waypoint Stations: 5 Physical Milestones */}
          <div className="trail-waypoints-stage" aria-label="Expedition Milestones">
            {TRAIL_MILESTONES.map((milestone, idx) => (
              <article
                key={milestone.id}
                id={milestone.id}
                ref={(el) => (sceneRefs.current[idx] = el)}
                className={`expedition-waypoint-station milestone-${milestone.ordinal}`}
                aria-label={`Milestone ${milestone.ordinal}: ${milestone.codename}`}
              >
                {/* Left: Landscape Horizon Focus */}
                <div className="waypoint-landscape-window">
                  <img
                    src={milestone.image}
                    alt={milestone.imageAlt}
                    className="landscape-window-photo"
                    loading="lazy"
                  />
                  <div className="landscape-window-frame" aria-hidden="true" />
                  <div className="landscape-caption-plate">
                    <span className="caption-period">{milestone.period}</span>
                    <span className="caption-atmosphere">{milestone.atmosphereTag}</span>
                  </div>
                </div>

                {/* Right: Physical Timber Marker Post & Pinned Placard */}
                <div className="waypoint-physical-marker">
                  {/* Iron Carriage Corner Bolts */}
                  <div className="marker-iron-bolt top-left" aria-hidden="true" />
                  <div className="marker-iron-bolt top-right" aria-hidden="true" />
                  <div className="marker-iron-bolt bottom-left" aria-hidden="true" />
                  <div className="marker-iron-bolt bottom-right" aria-hidden="true" />

                  {/* Red Stamped Ink Seal */}
                  <div className="marker-red-seal" aria-hidden="true">
                    {milestone.markerStamp}
                  </div>

                  <div className="marker-meta-header">
                    <span className="marker-ordinal-num">{milestone.ordinal}</span>
                    <span className="marker-field-tag">{milestone.fieldLog}</span>
                  </div>

                  <h3 className="marker-codename">{milestone.codename}</h3>

                  <div className="marker-time-band">
                    <span className="marker-event-name">{milestone.eventName}</span>
                    <span className="marker-exact-time">{milestone.timeRange}</span>
                  </div>

                  <p className="marker-field-note">{milestone.fieldNote}</p>

                  <div className="marker-manifest-foot" aria-hidden="true">
                    <span>{milestone.markerType}</span>
                    <span>WAYPOINT {milestone.ordinal} OF 05</span>
                  </div>
                </div>
              </article>
            ))}

            {/* The 1:00 PM – 3:30 PM Genuine Open Stretch Interlude */}
            <div
              ref={interludeRef}
              className="trail-open-stretch"
              aria-label="Expedition Open Trail Expanse"
            >
              <div className="open-stretch-marker">
                <span className="stretch-time-cue">{TRAIL_INTERLUDE.timeGap}</span>
                <h3 className="stretch-headline">{TRAIL_INTERLUDE.title}</h3>
                <p className="stretch-subtext">{TRAIL_INTERLUDE.subtitle}</p>
                <div className="stretch-ink-rule" aria-hidden="true" />
                <p className="stretch-narrative">{TRAIL_INTERLUDE.notice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Egress Transition Bridge Toward Phase 7 Claim The Bounty */}
        <div
          ref={egressBridgeRef}
          className="expedition-egress-bridge"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="egress-trail-line" />
          <div className="egress-cue-wrapper">
            <div className="egress-cue-rule" />
            <span className="egress-cue-text">{PHASE6_EGRESS.cueText}</span>
            <div className="egress-cue-rule right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionTrail;

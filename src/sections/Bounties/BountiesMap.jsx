import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOUNTIES_DATA } from '../../data/bountiesData.js';
import { setupBountiesMapChoreography } from '../../modules/bounties-map-choreography.js';

gsap.registerPlugin(ScrollTrigger);

export const BountiesMap = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      setupBountiesMapChoreography(section);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bounties-section"
      id="choose-bounty"
      ref={sectionRef}
      aria-label="Section 03 — The Five Bounties Frontier Map"
    >
      {/* Section Transition Bridge */}
      <div className="map-transition-bridge" aria-hidden="true" />

      {/* Pinned Stage for Cinematic Camera Scrub */}
      <div className="bounties-pinned-stage">
        {/* Heads-Up Editorial Overlay (HUD) */}
        <div className="bounties-hud-overlay">
          <div className="bounties-hud-left">
            <div className="bounties-marker">
              <span className="marker-num">03</span>
              <span className="marker-sep">/</span>
              <span className="marker-label">CHOOSE YOUR BOUNTY</span>
            </div>
            <h2 className="bounties-hud-title">FIVE FRONTIERS. ONE CHALLENGE.</h2>
          </div>

          <div className="bounties-hud-right">
            <span className="hud-waypoint-label">EXPEDITION WAYPOINT</span>
            <span className="hud-waypoint-val" id="active-waypoint-display">
              FRONTIER OVERVIEW
            </span>
          </div>
        </div>

        {/* Camera Window */}
        <div className="bounties-camera-window">
          {/* Large Cinematic Frontier Map World (2600 x 1600 coordinate canvas) */}
          <div className="bounties-map-world">
            {/* Map Base Layer */}
            <div className="map-base-layer" id="frontier-map-base">
              <div className="map-artwork-slot" />

              {/* Structural Map Layer (Contour lines, canyons, grid, riverbed) */}
              <div className="map-structural-layer" aria-label="Structural Frontier Map Layer">
                <div className="map-dependency-watermark" aria-hidden="true">
                  [ TEMPORARY STRUCTURAL MAP LAYER — ASSET DEPENDENCY: frontier-map-base.png ]
                </div>

                {/* SVG Vector Topographical Terrain */}
                <svg
                  className="map-terrain-svg"
                  viewBox="0 0 2600 1600"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="map-grid-pattern"
                      width="200"
                      height="200"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M 200 0 L 0 0 0 200" fill="none" className="map-grid-line" />
                    </pattern>
                  </defs>

                  {/* Coordinate Grid Lines */}
                  <rect width="2600" height="1600" fill="url(#map-grid-pattern)" />

                  {/* Northwest Mesa */}
                  <path
                    className="map-contour-line"
                    d="M 120,380 C 260,320 440,300 620,360 C 740,400 820,540 760,660 C 700,780 500,820 360,780 C 220,740 100,520 120,380 Z"
                  />
                  <path
                    className="map-contour-line"
                    d="M 200,420 C 300,380 460,360 560,420 C 660,480 680,600 620,680 C 560,760 380,750 280,700 C 180,650 160,480 200,420 Z"
                  />
                  <path
                    className="map-canyon-ridge"
                    d="M 100,580 Q 300,540 480,500 T 780,480"
                  />

                  {/* Northeast High Wind Plains */}
                  <path
                    className="map-contour-line"
                    d="M 880,240 C 1040,180 1320,180 1480,260 C 1600,320 1650,480 1560,600 C 1460,720 1200,740 1040,680 C 880,620 800,320 880,240 Z"
                  />
                  <path
                    className="map-contour-line"
                    d="M 980,290 C 1100,240 1280,240 1400,300 C 1500,360 1520,480 1440,560 C 1360,640 1160,650 1060,600 C 960,550 900,360 980,290 Z"
                  />

                  {/* Central Apex Escarpment */}
                  <path
                    className="map-contour-line"
                    d="M 1320,680 C 1460,620 1680,640 1800,760 C 1900,860 1880,1040 1760,1140 C 1620,1240 1420,1200 1340,1080 C 1260,960 1220,760 1320,680 Z"
                  />
                  <path
                    className="map-canyon-ridge"
                    d="M 1240,820 Q 1450,780 1650,920 T 1840,1060"
                  />

                  {/* Southern Telegraph Basin */}
                  <path
                    className="map-contour-line"
                    d="M 720,1080 C 880,980 1140,1000 1260,1120 C 1340,1200 1300,1380 1180,1460 C 1040,1540 820,1520 740,1420 C 660,1320 620,1180 720,1080 Z"
                  />

                  {/* Meandering Dry Riverbed / Arroyo */}
                  <path
                    className="map-riverbed"
                    d="M 280,1600 C 350,1380 520,1220 700,1100 C 920,950 1120,880 1280,720 C 1440,560 1620,380 1780,120 L 1860,0"
                  />

                  {/* Territorial Border Line */}
                  <path className="map-territory-border" d="M 1940,0 L 1940,1600" />
                  <text
                    x="1880"
                    y="800"
                    transform="rotate(-90 1880,800)"
                    className="map-terrain-label"
                  >
                    CHARTED TERRITORY BORDER
                  </text>

                  {/* Regional Names */}
                  <text x="380" y="440" className="map-terrain-label">
                    CANYON CITADEL PASS
                  </text>
                  <text x="1100" y="320" className="map-terrain-label">
                    HIGH WINDMILL PLATEAU
                  </text>
                  <text x="1460" y="760" className="map-terrain-label">
                    APEX ESCARPMENT
                  </text>
                  <text x="880" y="1150" className="map-terrain-label">
                    TELEGRAPH CROSSROADS
                  </text>
                  <text
                    x="2100"
                    y="520"
                    className="map-terrain-label"
                    style={{ fill: 'var(--color-blood-red)', fontSize: '18px' }}
                  >
                    TERRA INCOGNITA
                  </text>
                </svg>
              </div>
            </div>

            {/* Compass Rose */}
            <div className="map-compass-container" aria-hidden="true">
              <img
                src="/assets/images/compass-rose-parchment.png"
                className="map-compass-img"
                alt="Compass Rose"
              />
            </div>

            {/* Map Scale & Cartographer Legend */}
            <div className="map-scale-legend" aria-hidden="true">
              <span className="scale-legend-title">EXPEDITION SURVEY SCALE</span>
              <div className="scale-bar" />
              <span className="scale-units">1 LEAGUE = 3 NAUTICAL MILES</span>
            </div>

            {/* The Unknown Frontier Zone */}
            <div className="unknown-frontier-zone" aria-hidden="true">
              <div className="unknown-frontier-tear" />
              <div className="unknown-frontier-backdrop" />
              <div className="unknown-frontier-vignette" />
              <div className="unknown-frontier-stamp">
                <span className="unknown-stamp-label">BEYOND THE CHARTED LINE</span>
                <span className="unknown-stamp-title">THE UNKNOWN FRONTIER</span>
                <span className="unknown-stamp-sub">"Where bold pioneers forge new trails"</span>
              </div>
            </div>

            {/* The Inked Blood-Red Expedition Route SVG */}
            <svg className="map-route-layer" viewBox="0 0 2600 1600" aria-hidden="true">
              <path
                className="expedition-trail-base"
                d="M 180,750 C 280,710 380,610 500,520 C 640,430 860,390 1120,380 C 1260,380 1420,580 1500,840 C 1520,980 1280,1120 960,1220 C 1200,1250 1650,1180 1900,1050 C 1980,1010 2080,960 2180,920"
              />
              <path
                className="expedition-trail-active"
                id="active-expedition-trail"
                d="M 180,750 C 280,710 380,610 500,520 C 640,430 860,390 1120,380 C 1260,380 1420,580 1500,840 C 1520,980 1280,1120 960,1220 C 1200,1250 1650,1180 1900,1050 C 1980,1010 2080,960 2180,920"
              />
            </svg>

            {/* Five Checkpoint Destinations */}
            <div className="map-checkpoints-layer">
              {BOUNTIES_DATA.map((cp) => (
                <div
                  key={cp.id}
                  className={`map-checkpoint checkpoint-${cp.number}`}
                  id={cp.id}
                  data-waypoint={cp.waypointLabel}
                >
                  <div className="checkpoint-marker-pin" aria-label={`${cp.code} Pin`}>
                    <div className="marker-beacon" aria-hidden="true" />
                    <div className="marker-disc">
                      <span className="marker-x">X</span>
                    </div>
                  </div>
                  <div className="checkpoint-annotation">
                    <div className="annot-top-bar">
                      <span className="annot-code">{cp.code}</span>
                      <span className="annot-coords">{cp.coords}</span>
                    </div>
                    <h3 className="annot-domain-title">{cp.title}</h3>
                    <p className="annot-subtitle">{cp.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

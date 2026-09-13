import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GrainOverlay } from './components/GrainOverlay.jsx';
import { HeroToSection2Bridge } from './components/TransitionBridge.jsx';
import { Hero } from './sections/Hero/Hero.jsx';
import { WhatIsSparkathon } from './sections/About/WhatIsSparkathon.jsx';
import { BountiesMap } from './sections/Bounties/BountiesMap.jsx';
import { FieldTable } from './sections/FieldTable/FieldTable.jsx';
import { Showdown } from './sections/Showdown/Showdown.jsx';
import { ExpeditionTrail } from './sections/Timeline/ExpeditionTrail.jsx';

export function App() {
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      {/* Physical Grain & Vignette Overlays */}
      <GrainOverlay />

      {/* Main Single-Page Sequential Journey */}
      <main id="sparkathon-app">
        {/* Phase 1: Cinematic Opening */}
        <Hero />

        {/* Hero -> Section 02 Transition */}
        <HeroToSection2Bridge />

        {/* Phase 2: What is Sparkathon Field Document Spread */}
        <WhatIsSparkathon />

        {/* Phase 3: The Five Bounties Frontier Map */}
        <BountiesMap />

        {/* Phase 4: How It Works — The Bounty Hunter's Field Table */}
        <FieldTable />

        {/* Phase 5: The Showdown — High Noon Judging Criteria */}
        <Showdown />

        {/* Phase 6: The Expedition Trail — Event-Day Timeline */}
        <ExpeditionTrail />
      </main>
    </>
  );
}

export default App;

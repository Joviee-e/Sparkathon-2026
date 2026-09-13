import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('scratch/screenshots/phase6');
fs.mkdirSync(screenshotDir, { recursive: true });

const publicScreenshotDir = path.resolve('phase6_screenshots');
fs.mkdirSync(publicScreenshotDir, { recursive: true });

async function runSection6Tests() {
  console.log('=== STARTING SECTION 06 (THE EXPEDITION TRAIL) AUTOMATED TESTS ===');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.log('HTTP ERROR:', res.status(), res.url());
      consoleErrors.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Navigate to dev server
  console.log('1. Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  // 2. Verify Section 06 Mount & Structure
  console.log('2. Verifying Section 06 Mount & Structure...');
  const section6State = await page.evaluate(() => {
    const s6 = document.getElementById('expedition-trail');
    const hudTitle = document.querySelector('.trail-section-title')?.textContent;
    const hudBadge = document.querySelector('.trail-stage-badge')?.textContent;
    const stations = document.querySelectorAll('.expedition-waypoint-station');
    const interlude = document.querySelector('.trail-open-stretch');
    const milestones = Array.from(stations).map((s) => ({
      id: s.id,
      ordinal: s.querySelector('.marker-ordinal-num')?.textContent?.trim(),
      codename: s.querySelector('.marker-codename')?.textContent?.trim(),
      eventName: s.querySelector('.marker-event-name')?.textContent?.trim(),
      time: s.querySelector('.marker-exact-time')?.textContent?.trim(),
      imageSrc: s.querySelector('.landscape-window-photo')?.getAttribute('src'),
      stamp: s.querySelector('.marker-red-seal')?.textContent?.trim(),
    }));

    return {
      hasSection6: !!s6,
      offsetTop: s6 ? s6.offsetTop : -1,
      hudTitle,
      hudBadge,
      sceneCount: stations.length,
      hasInterlude: !!interlude,
      interludeGap: interlude?.querySelector('.stretch-time-cue')?.textContent?.trim(),
      milestones,
    };
  });

  console.log('Section 06 State:', JSON.stringify(section6State, null, 2));

  if (!section6State.hasSection6) {
    throw new Error('FAILED: Section 06 #expedition-trail is not mounted in DOM!');
  }
  if (section6State.sceneCount !== 5) {
    throw new Error(`FAILED: Expected exactly 5 milestone stations, got ${section6State.sceneCount}`);
  }
  if (!section6State.hasInterlude || section6State.interludeGap !== '1:00 PM – 3:30 PM') {
    throw new Error(`FAILED: Time gap interlude missing or invalid! Got: ${section6State.interludeGap}`);
  }

  // Verify Authoritative Event Details
  const expectedMilestones = [
    { ordinal: '01', codename: 'PLAYER ENTRY', eventName: 'REGISTRATION', time: '9:00 AM – 9:45 AM' },
    { ordinal: '02', codename: 'THE BEGINNING', eventName: 'INAUGURATION', time: '10:00 AM – 10:30 AM' },
    { ordinal: '03', codename: 'THE QUEST', eventName: 'EXHIBITION', time: '10:30 AM – 12:30 PM' },
    { ordinal: '04', codename: 'REFUEL PHASE', eventName: 'LUNCH BREAK', time: '12:30 PM – 1:00 PM' },
    { ordinal: '05', codename: 'FINAL BOSS', eventName: 'VALEDICTORY', time: '3:30 PM – 4:00 PM' },
  ];

  for (let i = 0; i < 5; i++) {
    const exp = expectedMilestones[i];
    const act = section6State.milestones[i];
    if (act.ordinal !== exp.ordinal || act.codename !== exp.codename || act.eventName !== exp.eventName || act.time !== exp.time) {
      throw new Error(`FAILED: Milestone ${i+1} mismatch! Expected: ${JSON.stringify(exp)}, Got: ${JSON.stringify(act)}`);
    }
  }
  console.log('✓ All 5 Authoritative Milestones and Times verified with 100% precision!');

  // Helper to save screenshot to both dirs
  const takeShot = async (name) => {
    const p1 = path.join(screenshotDir, `${name}.png`);
    const p2 = path.join(publicScreenshotDir, `${name}.png`);
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, p2);
    console.log(`Saved screenshot: ${name}.png`);
  };

  // 3. Scroll to Phase 5 -> Phase 6 Boundary
  console.log('3. Navigating to Phase 5 -> Phase 6 boundary...');
  const s5Top = await page.evaluate(() => document.getElementById('the-showdown')?.offsetTop || 0);
  const s6Top = section6State.offsetTop;
  console.log(`Section 5 top: ${s5Top}, Section 6 top: ${s6Top}`);

  // Scroll to showdown egress / trail entry
  await page.evaluate((top) => window.scrollTo({ top: top - 200, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('07_phase5_to_phase6');

  // 4. Scroll to Trail Arrival (Beginning of Phase 6)
  console.log('4. Testing Trail Arrival...');
  await page.evaluate((top) => window.scrollTo({ top: top + 100, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('01_trail_arrival');

  // 5. Scroll through Milestones
  // Milestone 01: Player Entry (~ +550px)
  console.log('5. Testing Stop 01: Player Entry...');
  await page.evaluate((top) => window.scrollTo({ top: top + 550, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('02_player_entry');

  // Milestone 02: The Beginning (~ +1250px)
  console.log('6. Testing Stop 02: The Beginning...');
  await page.evaluate((top) => window.scrollTo({ top: top + 1250, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('03_the_beginning');

  // Milestone 03: The Quest (~ +2050px)
  console.log('7. Testing Stop 03: The Quest (Exhibition)...');
  await page.evaluate((top) => window.scrollTo({ top: top + 2050, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('04_the_quest');

  // Milestone 04: Refuel Phase (~ +2850px)
  console.log('8. Testing Stop 04: Refuel Phase (Lunch Break)...');
  await page.evaluate((top) => window.scrollTo({ top: top + 2850, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('05_refuel_phase');

  // Interlude: Time gap breathing room (~ +3450px)
  console.log('9. Testing Time Gap Interlude (1:00 PM – 3:30 PM)...');
  await page.evaluate((top) => window.scrollTo({ top: top + 3450, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 700));

  // Milestone 05: Final Boss Sunset (~ +4200px)
  console.log('10. Testing Stop 05: Final Boss (Valedictory Sunset)...');
  await page.evaluate((top) => window.scrollTo({ top: top + 4200, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 800));
  await takeShot('06_final_boss_sunset');

  // Egress Handoff to Phase 7 (~ +4700px)
  console.log('11. Testing Phase 6 -> Phase 7 Handoff...');
  await page.evaluate((top) => window.scrollTo({ top: top + 4700, behavior: 'instant' }), s6Top);
  await new Promise((r) => setTimeout(r, 800));
  await takeShot('08_phase6_to_phase7');

  // 12. Test Reverse Scroll Restoration to Hero
  console.log('12. Testing Reverse Scroll Restoration to Hero...');
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  const reverseHeroTitle = await page.evaluate(() => {
    const titleEl = document.querySelector('.hero-title');
    const style = window.getComputedStyle(titleEl);
    return {
      titleText: titleEl?.textContent?.trim(),
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Reverse Scroll Hero Title Restoration:', reverseHeroTitle);
  if (reverseHeroTitle.opacity < 0.8) {
    throw new Error('FAILED: Hero title did not restore on reverse scroll!');
  }
  console.log('✓ Hero restored perfectly on reverse scroll!');

  // 13. Test Mobile Viewport
  console.log('13. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileMetrics = await page.evaluate(() => {
    const s6 = document.getElementById('expedition-trail');
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    return {
      scrollWidth,
      clientWidth,
      hasOverflow: scrollWidth > clientWidth,
      s6Height: s6?.offsetHeight,
      s6Top: s6?.offsetTop,
    };
  });
  console.log('Mobile Metrics:', mobileMetrics);

  if (mobileMetrics.hasOverflow) {
    throw new Error(`FAILED: Horizontal overflow detected on mobile! scrollWidth: ${mobileMetrics.scrollWidth} > clientWidth: ${mobileMetrics.clientWidth}`);
  }
  console.log('✓ Zero horizontal overflow on mobile (scrollWidth === clientWidth)!');

  // Scroll to mobile timeline
  await page.evaluate((top) => window.scrollTo({ top: top + 150, behavior: 'instant' }), mobileMetrics.s6Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('09_mobile');

  // 14. Test Prefers-Reduced-Motion
  console.log('14. Testing prefers-reduced-motion: reduce...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const reducedMotionState = await page.evaluate(() => {
    const s6 = document.getElementById('expedition-trail');
    const stations = document.querySelectorAll('.expedition-waypoint-station');
    const visibleStations = Array.from(stations).filter((s) => {
      const style = window.getComputedStyle(s);
      return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0.5;
    });

    return {
      s6Top: s6?.offsetTop,
      totalStations: stations.length,
      visibleStationCount: visibleStations.length,
    };
  });
  console.log('Reduced Motion State:', reducedMotionState);

  await page.evaluate((top) => window.scrollTo({ top: top + 200, behavior: 'instant' }), reducedMotionState.s6Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('10_reduced_motion');

  // 15. Check Console Errors and 404s
  console.log('15. Checking for Console Errors & 404s...');
  console.log(`Captured ${consoleErrors.length} errors.`);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
    throw new Error(`FAILED: Console or HTTP errors encountered: ${consoleErrors.join(', ')}`);
  }
  console.log('✓ Zero console errors and zero 404 network errors!');

  await browser.close();
  console.log('=== ALL PHASE 6 EXPEDITION TRAIL TESTS PASSED SUCCESSFULLY! ===');
}

runSection6Tests().catch((err) => {
  console.error('SECTION 06 TEST FAILED:', err);
  process.exit(1);
});

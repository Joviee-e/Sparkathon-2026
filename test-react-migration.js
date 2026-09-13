import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('scratch/screenshots/react_migration');
fs.mkdirSync(screenshotDir, { recursive: true });

async function runReactMigrationTests() {
  console.log('=== STARTING REACT MIGRATION AUTOMATED VERIFICATION SUITE ===');
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

  page.on('requestfailed', (req) => {
    console.log('Request Failed URL:', req.url(), req.failure()?.errorText);
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.log('HTTP ERROR:', res.status(), res.url());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Navigate to local dev server
  console.log('1. Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. Verify React Root and Section Mounts
  console.log('2. Verifying React root & modular components...');
  const appMountState = await page.evaluate(() => {
    const root = document.getElementById('root');
    const mainApp = document.getElementById('sparkathon-app');
    const hero = document.getElementById('hero-expedition');
    const section2 = document.getElementById('what-is-sparkathon');
    const section3 = document.getElementById('choose-bounty');
    const section4 = document.getElementById('section-how-it-works');
    const grain = document.querySelector('.film-grain-overlay');
    const vignette = document.querySelector('.parchment-vignette');
    const bridge = document.querySelector('.frontier-transition-bridge');

    return {
      hasRoot: !!root,
      hasMainApp: !!mainApp,
      hasHero: !!hero,
      hasSection2: !!section2,
      hasSection3: !!section3,
      hasSection4: !!section4,
      hasGrain: !!grain,
      hasVignette: !!vignette,
      hasBridge: !!bridge,
      heroOffsetTop: hero ? hero.offsetTop : -1,
      section2OffsetTop: section2 ? section2.offsetTop : -1,
      section3OffsetTop: section3 ? section3.offsetTop : -1,
      section4OffsetTop: section4 ? section4.offsetTop : -1
    };
  });
  console.log('React Mount State:', appMountState);

  if (!appMountState.hasRoot || !appMountState.hasHero || !appMountState.hasSection2 || !appMountState.hasSection3 || !appMountState.hasSection4) {
    throw new Error('FAILED: One or more React sections failed to mount!');
  }

  // 3. Verify Hero Video and Dust Canvas
  console.log('3. Verifying Hero video and Dust canvas...');
  const heroMediaState = await page.evaluate(() => {
    const vid = document.querySelector('.hero-video');
    const canvas = document.querySelector('.hero-dust-canvas');
    return {
      hasVideo: !!vid,
      videoSrc: vid?.getAttribute('src'),
      videoPaused: vid?.paused,
      hasCanvas: !!canvas,
      canvasWidth: canvas?.width,
      canvasHeight: canvas?.height
    };
  });
  console.log('Hero Media State:', heroMediaState);

  // 4. Hero Title Reveal at Y = 750 (Title hold window)
  console.log('4. Scrolling to Hero Title Hold window (Y = 750)...');
  await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));

  const heroTitleHoldState = await page.evaluate(() => {
    const titleEl = document.querySelector('.hero-title');
    const titleStyle = window.getComputedStyle(titleEl);
    const container = document.querySelector('.hero-choreo-container');
    const containerStyle = window.getComputedStyle(container);
    return {
      titleText: titleEl?.textContent,
      titleOpacity: parseFloat(titleStyle.opacity),
      containerOpacity: parseFloat(containerStyle.opacity)
    };
  });
  console.log('Hero Title Hold State:', heroTitleHoldState);
  await page.screenshot({ path: path.join(screenshotDir, '01_react_hero_title.png') });

  // 5. Section 02 Field Document Reveal
  console.log('5. Scrolling to Section 02 What is Sparkathon...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 150, behavior: 'instant' });
  }, appMountState.section2OffsetTop);
  await new Promise((r) => setTimeout(r, 600));

  const section2State = await page.evaluate(() => {
    const headline = document.querySelector('.doc-headline')?.innerText;
    const criteriaCount = document.querySelectorAll('.criteria-pill').length;
    const ledgerItemsCount = document.querySelectorAll('.ledger-item').length;
    const incubationCount = document.querySelectorAll('.docket-item').length;
    return {
      headline,
      criteriaCount,
      ledgerItemsCount,
      incubationCount
    };
  });
  console.log('Section 02 State:', section2State);
  await page.screenshot({ path: path.join(screenshotDir, '02_react_section02_doc.png') });

  // 6. Section 03 Bounties Map Camera Traversal
  console.log('6. Scrolling through Section 03 Bounties Map (5 Checkpoints)...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 400, behavior: 'instant' });
  }, appMountState.section3OffsetTop);
  await new Promise((r) => setTimeout(r, 600));

  const mapInitialState = await page.evaluate(() => {
    const hudWaypoint = document.getElementById('active-waypoint-display')?.textContent;
    const activeCheckpoints = document.querySelectorAll('.map-checkpoint.active').length;
    return { hudWaypoint, activeCheckpoints };
  });
  console.log('Map Initial State:', mapInitialState);
  await page.screenshot({ path: path.join(screenshotDir, '03_react_map_waypoint1.png') });

  // Scrub deep into Section 03 (Checkpoint 05 / Climax)
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 2600, behavior: 'instant' });
  }, appMountState.section3OffsetTop);
  await new Promise((r) => setTimeout(r, 600));

  const mapClimaxState = await page.evaluate(() => {
    const hudWaypoint = document.getElementById('active-waypoint-display')?.textContent;
    const activeCheckpoints = document.querySelectorAll('.map-checkpoint.active').length;
    return { hudWaypoint, activeCheckpoints };
  });
  console.log('Map Climax State:', mapClimaxState);
  await page.screenshot({ path: path.join(screenshotDir, '04_react_map_climax.png') });

  // 7. Section 04 Field Table Camera Traversal
  console.log('7. Scrolling into Section 04 Field Table (Arrival)...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 200, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 600));

  const fieldTableArrival = await page.evaluate(() => {
    const vid = document.getElementById('field-table-video');
    const hudTitle = document.querySelector('.hud-headline')?.textContent;
    const stationsCount = document.querySelectorAll('.table-station').length;
    return {
      hasVideo: !!vid,
      videoSrc: vid?.getAttribute('src'),
      hudTitle,
      stationsCount
    };
  });
  console.log('Field Table Arrival State:', fieldTableArrival);
  await page.screenshot({ path: path.join(screenshotDir, '05_react_field_table_arrival.png') });

  // Travel to Station 01 (Present)
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 800, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotDir, '06_react_station_present.png') });

  // Travel to Station 03 (Solution)
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 2200, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotDir, '07_react_station_solution.png') });

  // Travel to Station 04 (Pitch)
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 3100, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotDir, '08_react_station_pitch.png') });

  // 8. Test Reverse Scroll Restoration
  console.log('8. Testing Reverse Scroll Restoration...');
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  const reverseHeroState = await page.evaluate(() => {
    const titleEl = document.querySelector('.hero-title');
    const titleStyle = window.getComputedStyle(titleEl);
    const container = document.querySelector('.hero-choreo-container');
    const containerStyle = window.getComputedStyle(container);
    return {
      titleOpacity: parseFloat(titleStyle.opacity),
      containerOpacity: parseFloat(containerStyle.opacity)
    };
  });
  console.log('Reverse Scroll Hero Title Restoration:', reverseHeroState);
  await page.screenshot({ path: path.join(screenshotDir, '09_react_reverse_restored_title.png') });

  // 9. Tablet Viewport Test (820 x 1180)
  console.log('9. Testing Tablet Viewport (820 x 1180)...');
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '10_react_tablet_hero.png') });

  await page.evaluate((top) => {
    window.scrollTo({ top: top + 200, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '11_react_tablet_field_table.png') });

  // 10. Mobile Viewport Test (390 x 844)
  console.log('10. Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 600));

  const mobileOverflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const scrollW = document.documentElement.scrollWidth;
    const bodyW = document.body.scrollWidth;
    return {
      clientWidth: docW,
      scrollWidth: scrollW,
      bodyScrollWidth: bodyW,
      hasOverflow: scrollW > docW || bodyW > docW
    };
  });
  console.log('Mobile Overflow Check:', mobileOverflow);
  await page.screenshot({ path: path.join(screenshotDir, '12_react_mobile_hero.png') });

  await page.evaluate((top) => {
    window.scrollTo({ top: top + 100, behavior: 'instant' });
  }, appMountState.section4OffsetTop);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '13_react_mobile_field_table.png') });

  // 11. Reduced Motion Test
  console.log('11. Testing Reduced Motion Mode...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  const reducedMotionState = await page.evaluate(() => {
    const blackout = document.querySelector('.hero-blackout');
    const titleContainer = document.querySelector('.hero-choreo-container');
    const doc = document.querySelector('.field-document');
    return {
      blackoutDisplay: blackout ? window.getComputedStyle(blackout).display : 'none',
      titleOpacity: titleContainer ? parseFloat(window.getComputedStyle(titleContainer).opacity) : 0,
      docOpacity: doc ? parseFloat(window.getComputedStyle(doc).opacity) : 0
    };
  });
  console.log('Reduced Motion State:', reducedMotionState);
  await page.screenshot({ path: path.join(screenshotDir, '14_react_reduced_motion.png') });

  // 12. Check Console Errors
  console.log('12. Checking for console errors...');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Console Errors encountered during run:', consoleErrors);
  }

  await browser.close();
  console.log('=== REACT MIGRATION AUTOMATED TESTS COMPLETED SUCCESSFULLY ===');
}

runReactMigrationTests().catch((err) => {
  console.error('TEST SUITE RUNTIME ERROR:', err);
  process.exit(1);
});

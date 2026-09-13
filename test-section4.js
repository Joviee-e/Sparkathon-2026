import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('scratch/screenshots/phase4');
fs.mkdirSync(screenshotDir, { recursive: true });

async function runSection4Tests() {
  console.log('--- STARTING SECTION 04 (HOW IT WORKS - FIELD TABLE) AUTOMATED TESTS ---');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // 1. Navigate to local dev server
  console.log('1. Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  // 2. Test Section 03 -> Section 04 Transition Bridge
  console.log('2. Scrolling to Section 04 transition bridge...');
  const section4OffsetTop = await page.evaluate(() => {
    const el = document.getElementById('section-how-it-works');
    return el ? el.offsetTop : null;
  });
  console.log('Section 04 offsetTop:', section4OffsetTop);

  await page.evaluate((top) => {
    window.scrollTo({ top: top - 200, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '01_transition_to_field_table.png') });

  // 3. Test Field Table Establish Shot (Arrival)
  console.log('3. Testing Field Table Initial Establish Shot...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 100, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));

  const initialStatus = await page.evaluate(() => {
    const vid = document.getElementById('field-table-video');
    const surface = document.getElementById('field-table-surface');
    const hudTitle = document.querySelector('.hud-headline')?.innerText;
    return {
      hasVideo: !!vid,
      videoSrc: vid?.getAttribute('src'),
      videoPaused: vid?.paused,
      hasSurface: !!surface,
      hudTitle
    };
  });
  console.log('Initial Field Table Status:', initialStatus);
  await page.screenshot({ path: path.join(screenshotDir, '02_field_table_establish_arrival.png') });

  // 4. Test Stage 1: PRESENT (Draft Folio)
  console.log('4. Scrolling to Stage 1: PRESENT...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 750, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));

  const presentStatus = await page.evaluate(() => {
    const dialActive = document.querySelector('.dial-step[data-step="0"]')?.classList.contains('active');
    const stPresent = document.getElementById('station-present');
    const title = stPresent?.querySelector('.station-title')?.innerText;
    const tools = Array.from(stPresent?.querySelectorAll('.tool-name') || []).map(t => t.innerText);
    return { dialActive, title, tools };
  });
  console.log('PRESENT Stage Status:', presentStatus);
  await page.screenshot({ path: path.join(screenshotDir, '03_stage_01_present.png') });

  // 5. Test Stage 2: PROTOTYPE (Mechanism Workbench)
  console.log('5. Scrolling to Stage 2: PROTOTYPE...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1550, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));

  const prototypeStatus = await page.evaluate(() => {
    const dialActive = document.querySelector('.dial-step[data-step="1"]')?.classList.contains('active');
    const stPrototype = document.getElementById('station-prototype');
    const mandate = stPrototype?.querySelector('.mandate-headline')?.innerText;
    return { dialActive, mandate };
  });
  console.log('PROTOTYPE Stage Status:', prototypeStatus);
  await page.screenshot({ path: path.join(screenshotDir, '04_stage_02_prototype.png') });

  // 6. Test Stage 3: SOLUTION (4 Pillars Dossier)
  console.log('6. Scrolling to Stage 3: SOLUTION...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 2350, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));

  const solutionStatus = await page.evaluate(() => {
    const dialActive = document.querySelector('.dial-step[data-step="2"]')?.classList.contains('active');
    const quadrants = Array.from(document.querySelectorAll('.quadrant-title')).map(q => q.innerText);
    return { dialActive, quadrants };
  });
  console.log('SOLUTION Stage Status:', solutionStatus);
  await page.screenshot({ path: path.join(screenshotDir, '05_stage_03_solution.png') });

  // 7. Test Stage 4: PITCH (5-10 Minutes + Q&A, Ready for Showdown)
  console.log('7. Scrolling to Stage 4: PITCH...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 3000, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));

  const pitchStatus = await page.evaluate(() => {
    const dialActive = document.querySelector('.dial-step[data-step="3"]')?.classList.contains('active');
    const durationVal = document.querySelector('.pitch-duration-value')?.innerText;
    const durationLabel = document.querySelector('.pitch-duration-label')?.innerText;
    const readinessSeal = document.querySelector('.seal-text')?.innerText;
    return { dialActive, durationVal, durationLabel, readinessSeal };
  });
  console.log('PITCH Stage Status:', pitchStatus);
  await page.screenshot({ path: path.join(screenshotDir, '06_stage_04_pitch.png') });

  // 8. Test Whole Field Table Overview (All 4 Dockets Illuminated)
  console.log('8. Scrolling to Final Table Overview Pullback...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 3350, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '07_field_table_complete_overview.png') });

  // 9. Test Reversibility Back to Section 03 & Section 02 & Hero
  console.log('9. Reverse scrolling back to Section 03...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top - 800, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '08_reverse_scroll_to_section03.png') });

  console.log('9b. Reverse scrolling back to Hero top (Y=0)...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Move to title hold (Y=750) to verify title is 100% visible and intact
  await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 1200));

  const heroRestored = await page.evaluate(() => {
    const title = document.querySelector('.hero-title');
    const badge = document.querySelector('.hero-presents-badge');
    const video = document.querySelector('.hero-video');
    return {
      titleText: title?.innerText.replace(/\s+/g, ' ').trim(),
      badgeOpacity: badge ? window.getComputedStyle(badge).opacity : null,
      videoSrc: video?.getAttribute('src')
    };
  });
  console.log('Hero Restored Status on Full Reverse:', heroRestored);
  await page.screenshot({ path: path.join(screenshotDir, '09_reverse_scrolled_to_hero_title.png') });

  // 10. Test Tablet Layout (820px)
  console.log('10. Testing Tablet Viewport (820x1180)...');
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 1 });
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1500, behavior: 'instant' });
  }, section4OffsetTop);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '10_tablet_field_table.png') });

  // 11. Test Mobile Layout (390x844) & Overflow Check
  console.log('11. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 600));

  const mobileOffsetTop = await page.evaluate(() => {
    const el = document.getElementById('section-how-it-works');
    return el ? el.offsetTop : 0;
  });

  await page.evaluate((top) => {
    window.scrollTo({ top: top, behavior: 'instant' });
  }, mobileOffsetTop);
  await new Promise((r) => setTimeout(r, 600));

  const overflowCheck = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const bodyWidth = document.body.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    return {
      docWidth,
      bodyWidth,
      scrollWidth,
      hasOverflow: scrollWidth > docWidth
    };
  });
  console.log('Mobile Overflow Check (390px):', overflowCheck);
  await page.screenshot({ path: path.join(screenshotDir, '11_mobile_field_table_top.png') });

  // Scroll down mobile field table dockets
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 600, behavior: 'instant' });
  }, mobileOffsetTop);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '12_mobile_field_table_stations.png') });

  await browser.close();
  console.log('--- ALL SECTION 04 AUTOMATED TESTS COMPLETED SUCCESSFULLY ---');
}

runSection4Tests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve('scratch/screenshots/phase3');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runSection3Tests() {
  console.log('--- Launching Edge for Phase 3 (Section 03: Frontier Map) Testing ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // ==========================================
  // DESKTOP TESTING (1440 x 900)
  // ==========================================
  await page.setViewport({ width: 1440, height: 900 });
  console.log('[Test 1] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Full Map Establish Shot (Scroll into beginning of Section 03)
  console.log('[Test 2] Scrolling into Section 03 to capture Map Establish Shot...');
  await page.evaluate(() => {
    const el = document.getElementById('choose-bounty');
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_map_establish_shot.png') });
  console.log('✓ 01_map_establish_shot.png captured');

  // Measure Section 03 scroll bounds
  const mapBounds = await page.evaluate(() => {
    const el = document.getElementById('choose-bounty');
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: rect.height
    };
  });
  console.log('[Info] Section 03 Bounds:', mapBounds);

  // 2. Checkpoint 01 (Progress ~ 0.20 of Section 03)
  const cp1Scroll = mapBounds.top + mapBounds.height * 0.18;
  console.log(`[Test 3] Scrolling to Checkpoint 01 (Y=${Math.round(cp1Scroll)})...`);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), cp1Scroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_checkpoint_01_aiml.png') });
  console.log('✓ 02_checkpoint_01_aiml.png captured');

  // 3. Checkpoint 03 (Progress ~ 0.52 of Section 03)
  const cp3Scroll = mapBounds.top + mapBounds.height * 0.50;
  console.log(`[Test 4] Scrolling to Checkpoint 03 (Y=${Math.round(cp3Scroll)})...`);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), cp3Scroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_checkpoint_03_robotics.png') });
  console.log('✓ 03_checkpoint_03_robotics.png captured');

  // 4. Checkpoint 05 (Progress ~ 0.82 of Section 03 — Open Innovation)
  const cp5Scroll = mapBounds.top + mapBounds.height * 0.80;
  console.log(`[Test 5] Scrolling to Checkpoint 05 (Y=${Math.round(cp5Scroll)})...`);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), cp5Scroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_checkpoint_05_open_innovation.png') });
  console.log('✓ 04_checkpoint_05_open_innovation.png captured');

  // 5. Unknown Frontier Climax / Full Route Reveal (Progress ~ 0.98 of Section 03)
  const fullMapScroll = mapBounds.top + mapBounds.height * 0.95;
  console.log(`[Test 6] Scrolling to Unknown Frontier Climax / Completed Route (Y=${Math.round(fullMapScroll)})...`);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), fullMapScroll);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_unknown_frontier_climax.png') });
  console.log('✓ 05_unknown_frontier_climax.png captured');

  // Check Overflow on Desktop
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('[Check] Desktop Overflow Status:', desktopOverflow);

  // 6. CRITICAL TEST: REVERSE SCROLL BACK THROUGH MAP INTO SECTION 02 AND HERO
  console.log('[Test 7: CRITICAL] Reverse scrolling back into Section 02...');
  await page.evaluate(() => {
    const s2 = document.getElementById('what-is-sparkathon');
    s2.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_reverse_scroll_to_section02.png') });
  console.log('✓ 06_reverse_scroll_to_section02.png captured');

  console.log('[Test 8: CRITICAL] Reverse scrolling all the way back to Hero top (Y=0)...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));

  // Move forward to title hold (Y=750) to verify title is 100% visible and intact
  await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_reverse_scrolled_to_hero_title.png') });
  console.log('✓ 07_reverse_scrolled_to_hero_title.png captured');

  const titleCheck = await page.evaluate(() => {
    const t = document.querySelector('.hero-title');
    const container = document.querySelector('.hero-choreo-container');
    const cStyle = container ? window.getComputedStyle(container) : null;
    return {
      titleText: t ? t.textContent.trim() : '',
      containerOpacity: cStyle ? cStyle.opacity : '0',
      containerTransform: cStyle ? cStyle.transform : ''
    };
  });
  console.log('[Check] Hero Title Restoration after reverse scroll:', titleCheck);

  // ==========================================
  // TABLET TESTING (820 x 1180)
  // ==========================================
  console.log('[Test 9] Testing Tablet Viewport (820 x 1180)...');
  await page.setViewport({ width: 820, height: 1180 });
  await page.evaluate(() => {
    const el = document.getElementById('choose-bounty');
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_tablet_map_overview.png') });
  console.log('✓ 08_tablet_map_overview.png captured');

  // ==========================================
  // MOBILE TESTING (390 x 844)
  // ==========================================
  console.log('[Test 10] Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const el = document.getElementById('choose-bounty');
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_mobile_map_top.png') });
  console.log('✓ 09_mobile_map_top.png captured');

  await page.evaluate(() => {
    const cp = document.getElementById('cp-04');
    if (cp) cp.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_mobile_map_checkpoints.png') });
  console.log('✓ 10_mobile_map_checkpoints.png captured');

  const mobileOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('[Check] Mobile Overflow Status:', mobileOverflow);

  await browser.close();
  console.log('--- Phase 3 Testing Complete ---');
}

runSection3Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve('scratch/screenshots');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runTests() {
  console.log('--- Launching Edge for Phase 1 Browser Testing ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Initial Page Load
  console.log('[Test 1] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_initial_load.png') });
  console.log('✓ 01_initial_load.png captured');

  // 2. Video Playback & Film Grain
  const videoState = await page.evaluate(() => {
    const v = document.querySelector('.hero-video');
    return {
      exists: !!v,
      paused: v ? v.paused : true,
      currentTime: v ? v.currentTime : 0,
      readyState: v ? v.readyState : 0,
      src: v ? v.src : ''
    };
  });
  console.log('[Test 2] Video State:', videoState);

  // 3. Forward Scrolling — Reveal Title
  console.log('[Test 3] Scrolling forward to trigger title reveal...');
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_title_revealed.png') });
  console.log('✓ 02_title_revealed.png captured');

  // Check Title Visibility & Styles
  const titleInfo = await page.evaluate(() => {
    const t = document.querySelector('.hero-title');
    const container = document.querySelector('.hero-choreo-container');
    const style = t ? window.getComputedStyle(t) : null;
    const contStyle = container ? window.getComputedStyle(container) : null;
    return {
      titleText: t ? t.textContent : '',
      titleOpacity: style ? style.opacity : '0',
      containerOpacity: contStyle ? contStyle.opacity : '0',
      containerTransform: contStyle ? contStyle.transform : ''
    };
  });
  console.log('[Test 3] Title Info at scroll 700:', titleInfo);

  // 4. Forward Scrolling — Mid-Hero Hold
  console.log('[Test 4] Scrolling to mid-hero hold (1200px)...');
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_mid_hero_hold.png') });
  console.log('✓ 03_mid_hero_hold.png captured');

  // 5. Forward Scrolling — Transition to Section 02
  console.log('[Test 5] Scrolling to Section 02 (2200px)...');
  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_section2_transition.png') });
  console.log('✓ 04_section2_transition.png captured');

  // 6. CRITICAL TEST — REVERSE SCROLLING TO TOP
  console.log('[Test 6: CRITICAL] Scrolling BACKWARD to top (0px) to verify title restoration...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_reverse_scrolled_to_top.png') });
  console.log('✓ 05_reverse_scrolled_to_top.png captured');

  // Re-check after scrolling back down slightly to title focus
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_reverse_scrolled_title_returned.png') });
  console.log('✓ 06_reverse_scrolled_title_returned.png captured');

  const titleRestoredInfo = await page.evaluate(() => {
    const t = document.querySelector('.hero-title');
    const container = document.querySelector('.hero-choreo-container');
    const contStyle = container ? window.getComputedStyle(container) : null;
    return {
      titleText: t ? t.textContent : '',
      containerOpacity: contStyle ? contStyle.opacity : '0',
      containerTransform: contStyle ? contStyle.transform : ''
    };
  });
  console.log('[Test 6] Title Restored Info at scroll 800:', titleRestoredInfo);

  // 7. Mobile Viewport Test (390 x 844)
  console.log('[Test 7] Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'auto' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_mobile_hero.png') });
  console.log('✓ 07_mobile_hero.png captured');

  // Mobile Section 02
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'auto' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_mobile_section2.png') });
  console.log('✓ 08_mobile_section2.png captured');

  await browser.close();
  console.log('--- Phase 1 Browser Testing Completed Successfully ---');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

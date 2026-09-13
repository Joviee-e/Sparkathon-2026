import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve('scratch/screenshots/phase2');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runSection2Tests() {
  console.log('--- Launching Edge for Phase 2 (Section 02) Testing ---');
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

  // 1. Hero → Section 02 Transition
  console.log('[Test 2] Scrolling to Hero → Section 02 Transition Bridge (Y=2000)...');
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_hero_to_section2_transition.png') });
  console.log('✓ 01_hero_to_section2_transition.png captured');

  // 2. Section 02 Initial State
  console.log('[Test 3] Scrolling to Section 02 Initial Entry (Y=2400)...');
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_section2_initial_state.png') });
  console.log('✓ 02_section2_initial_state.png captured');

  // 3. Section 02 Mid-Scroll (Ledger & Specs)
  console.log('[Test 4] Scrolling to Section 02 Mid-Scroll (Y=2850)...');
  await page.evaluate(() => window.scrollTo({ top: 2850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_section2_mid_scroll.png') });
  console.log('✓ 03_section2_mid_scroll.png captured');

  // 4. Section 02 Complete Composition (Incubation Docket & Perk Seal)
  console.log('[Test 5] Scrolling to Section 02 Lower Spread / Complete Composition (Y=3300)...');
  await page.evaluate(() => window.scrollTo({ top: 3300, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_section2_complete_composition.png') });
  console.log('✓ 04_section2_complete_composition.png captured');

  // Check Overflow on Desktop
  const desktopOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('[Check] Desktop Overflow Status:', desktopOverflow);

  // 5. CRITICAL TEST: REVERSE SCROLL BACK TO HERO
  console.log('[Test 6: CRITICAL] Reverse scrolling all the way back to Hero top (Y=0)...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));

  // Move forward to title hold (Y=750) to verify title is 100% visible and intact
  await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_reverse_scrolled_to_hero.png') });
  console.log('✓ 05_reverse_scrolled_to_hero.png captured');

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
  console.log('[Test 7] Testing Tablet Viewport (820 x 1180)...');
  await page.setViewport({ width: 820, height: 1180 });
  await page.evaluate(() => {
    document.querySelector('.field-document').scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_section2_tablet.png') });
  console.log('✓ 06_section2_tablet.png captured');

  // ==========================================
  // MOBILE TESTING (390 x 844)
  // ==========================================
  console.log('[Test 8] Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_section2_mobile_top.png') });
  console.log('✓ 07_section2_mobile_top.png captured');

  await page.evaluate(() => window.scrollTo({ top: 2800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_section2_mobile_ledger.png') });
  console.log('✓ 08_section2_mobile_ledger.png captured');

  const mobileOverflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('[Check] Mobile Overflow Status:', mobileOverflow);

  await browser.close();
  console.log('--- Phase 2 Testing Complete ---');
}

runSection2Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

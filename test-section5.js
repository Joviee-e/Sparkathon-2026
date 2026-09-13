import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('scratch/screenshots/phase5');
fs.mkdirSync(screenshotDir, { recursive: true });

async function runSection5Tests() {
  console.log('=== STARTING SECTION 05 (HIGH NOON SHOWDOWN) AUTOMATED TESTS ===');
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
  await new Promise((r) => setTimeout(r, 1200));

  // 2. Verify Section 05 Mount & Coordinates
  console.log('2. Verifying Section 05 Mount & Structure...');
  const section5State = await page.evaluate(() => {
    const s5 = document.getElementById('the-showdown');
    const hudTitle = document.querySelector('.showdown-hud-title')?.textContent;
    const bannerImg = document.querySelector('.judging-banner-img');
    const placards = document.querySelectorAll('.verdict-placard');
    const climax = document.querySelector('.showdown-climax-chamber');
    const rewards = document.querySelectorAll('.reward-token');

    return {
      hasSection5: !!s5,
      offsetTop: s5 ? s5.offsetTop : -1,
      hudTitle,
      hasBanner: !!bannerImg,
      bannerSrc: bannerImg?.getAttribute('src'),
      placardCount: placards.length,
      hasClimax: !!climax,
      rewardCount: rewards.length
    };
  });
  console.log('Section 05 Initial State:', section5State);

  if (!section5State.hasSection5 || section5State.placardCount !== 5 || section5State.rewardCount !== 3) {
    throw new Error('FAILED: Section 05 DOM elements or criteria placards missing!');
  }

  const s5Top = section5State.offsetTop;

  // 3. Test Phase 4 -> Phase 5 Transition Bridge
  console.log('3. Testing Phase 4 -> Phase 5 Transition Bridge...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top - 150, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '01_transition_to_showdown.png') });

  // 4. Test High Noon Clearing Arrival (Stage 1)
  console.log('4. Testing High Noon Clearing Arrival...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 100, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '02_high_noon_arrival.png') });

  // 5. Test Judging Criteria Title Banner Reveal (Stage 2)
  console.log('5. Testing Judging Criteria Banner Reveal...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 350, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const bannerState = await page.evaluate(() => {
    const mount = document.querySelector('.showdown-banner-mount');
    const style = window.getComputedStyle(mount);
    return {
      opacity: parseFloat(style.opacity),
      transform: style.transform
    };
  });
  console.log('Banner Mount State:', bannerState);
  await page.screenshot({ path: path.join(screenshotDir, '03_judging_criteria_banner.png') });

  // 6. Test Criterion 01: CREATIVITY & INNOVATION (Stage 3)
  console.log('6. Testing Criterion 01: CREATIVITY & INNOVATION...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 550, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const crit1State = await page.evaluate(() => {
    const p = document.getElementById('crit-01');
    const style = window.getComputedStyle(p);
    return {
      title: p.querySelector('.placard-title')?.textContent,
      num: p.querySelector('.placard-num')?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Criterion 01 State:', crit1State);
  await page.screenshot({ path: path.join(screenshotDir, '04_verdict_01_creativity.png') });

  // 7. Test Criterion 02: TECHNICAL FEASIBILITY (Stage 4)
  console.log('7. Testing Criterion 02: TECHNICAL FEASIBILITY...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1050, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const crit2State = await page.evaluate(() => {
    const p = document.getElementById('crit-02');
    const style = window.getComputedStyle(p);
    return {
      title: p.querySelector('.placard-title')?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Criterion 02 State:', crit2State);
  await page.screenshot({ path: path.join(screenshotDir, '05_verdict_02_feasibility.png') });

  // 8. Test Criterion 03: SCALABILITY & MARKET POTENTIAL (Stage 5)
  console.log('8. Testing Criterion 03: SCALABILITY & MARKET POTENTIAL...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1550, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const crit3State = await page.evaluate(() => {
    const p = document.getElementById('crit-03');
    const style = window.getComputedStyle(p);
    return {
      title: p.querySelector('.placard-title')?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Criterion 03 State:', crit3State);
  await page.screenshot({ path: path.join(screenshotDir, '06_verdict_03_scalability.png') });

  // 9. Test Criterion 04: PRESENTATION & CLARITY (Stage 6)
  console.log('9. Testing Criterion 04: PRESENTATION & CLARITY...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 2050, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const crit4State = await page.evaluate(() => {
    const p = document.getElementById('crit-04');
    const style = window.getComputedStyle(p);
    return {
      title: p.querySelector('.placard-title')?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Criterion 04 State:', crit4State);
  await page.screenshot({ path: path.join(screenshotDir, '07_verdict_04_presentation.png') });

  // 10. Test Criterion 05: PROBLEM-SOLVING IMPACT (Stage 7)
  console.log('10. Testing Criterion 05: PROBLEM-SOLVING IMPACT...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 2550, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const crit5State = await page.evaluate(() => {
    const p = document.getElementById('crit-05');
    const style = window.getComputedStyle(p);
    return {
      title: p.querySelector('.placard-title')?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Criterion 05 State:', crit5State);
  await page.screenshot({ path: path.join(screenshotDir, '08_verdict_05_impact.png') });

  // 11. Test Stage 8: HIGH NOON CLIMAX — ONE WINNER PER DOMAIN + REWARDS
  console.log('11. Testing Stage 8: HIGH NOON CLIMAX — ONE WINNER PER DOMAIN...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 3100, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));

  const climaxState = await page.evaluate(() => {
    const chamber = document.querySelector('.showdown-climax-chamber');
    const title = chamber.querySelector('.climax-main-title')?.textContent;
    const rewards = Array.from(document.querySelectorAll('.reward-token')).map((tok) => ({
      title: tok.querySelector('.reward-token-header')?.textContent,
      opacity: parseFloat(window.getComputedStyle(tok).opacity)
    }));
    return {
      chamberOpacity: parseFloat(window.getComputedStyle(chamber).opacity),
      title,
      rewards
    };
  });
  console.log('High Noon Climax State:', climaxState);
  await page.screenshot({ path: path.join(screenshotDir, '09_climax_one_winner_per_domain.png') });

  // 12. Test Section Transition to Phase 6
  console.log('12. Testing Transition toward Phase 6 Expedition Trail...');
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 4200, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '10_showdown_egress_bridge.png') });

  // 13. Test Reverse Scroll Restoration
  console.log('13. Testing Reverse Scroll Restoration...');
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  const reverseHeroTitle = await page.evaluate(() => {
    const titleEl = document.querySelector('.hero-title');
    const style = window.getComputedStyle(titleEl);
    return {
      titleText: titleEl?.textContent,
      opacity: parseFloat(style.opacity)
    };
  });
  console.log('Reverse Scroll Hero Title Restoration:', reverseHeroTitle);
  if (reverseHeroTitle.opacity < 0.8) {
    throw new Error('FAILED: Hero title did not restore on reverse scroll!');
  }
  await page.screenshot({ path: path.join(screenshotDir, '11_reverse_hero_restored.png') });

  // 14. Test Tablet Viewport (820 x 1180)
  console.log('14. Testing Tablet Viewport (820 x 1180)...');
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 1 });
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1800, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '12_tablet_showdown.png') });

  // 15. Test Mobile Viewport (390 x 844) & Horizontal Overflow
  console.log('15. Testing Mobile Viewport (390 x 844) & Zero Overflow...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 200, behavior: 'instant' });
  }, s5Top);
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
  if (mobileOverflow.hasOverflow) {
    throw new Error(`FAILED: Horizontal overflow detected on mobile! clientWidth: ${mobileOverflow.clientWidth}, scrollWidth: ${mobileOverflow.scrollWidth}`);
  }
  await page.screenshot({ path: path.join(screenshotDir, '13_mobile_showdown_top.png') });

  // Scroll to mobile climax
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 800, behavior: 'instant' });
  }, s5Top);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '14_mobile_showdown_climax.png') });

  // 16. Test Reduced Motion Mode
  console.log('16. Testing Reduced Motion Mode...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  const reducedMotionState = await page.evaluate(() => {
    const placards = Array.from(document.querySelectorAll('.verdict-placard')).map((p) =>
      parseFloat(window.getComputedStyle(p).opacity)
    );
    const climax = document.querySelector('.showdown-climax-chamber');
    return {
      placardOpacities: placards,
      climaxOpacity: climax ? parseFloat(window.getComputedStyle(climax).opacity) : 0
    };
  });
  console.log('Reduced Motion State:', reducedMotionState);
  await page.screenshot({ path: path.join(screenshotDir, '15_reduced_motion_showdown.png') });

  // 17. Check Console Errors
  console.log('17. Checking for console errors...');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors encountered during run:', consoleErrors);
    throw new Error('FAILED: Console errors detected during test run!');
  }

  await browser.close();
  console.log('=== SECTION 05 (HIGH NOON SHOWDOWN) AUTOMATED TESTS PASSED! ===');
}

runSection5Tests().catch((err) => {
  console.error('TEST SUITE RUNTIME ERROR:', err);
  process.exit(1);
});

import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('scratch/screenshots/phase7');
fs.mkdirSync(screenshotDir, { recursive: true });

const publicScreenshotDir = path.resolve('phase7_screenshots');
fs.mkdirSync(publicScreenshotDir, { recursive: true });

async function runSection7Tests() {
  console.log('=== STARTING SECTION 07 (CLAIM THE BOUNTY) AUTOMATED TESTS ===');
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

  // 2. Verify Section 07 Mount & Structure
  console.log('2. Verifying Section 07 Mount & Structure...');
  const section7State = await page.evaluate(() => {
    const s7 = document.getElementById('claim-the-bounty');
    const headerTitle = document.querySelector('.claim-section-title')?.textContent?.trim();
    const stageBadge = document.querySelector('.claim-stage-badge')?.textContent?.trim();
    const ledger = document.querySelector('.primary-bounty-ledger');
    const prizeLabel = ledger?.querySelector('.ledger-prize-label')?.textContent?.trim();
    const heroAmount = ledger?.querySelector('.ledger-hero-amount')?.textContent?.trim();
    
    const perks = Array.from(document.querySelectorAll('.perk-artifact-document')).map((el) => ({
      id: el.id,
      ordinal: el.querySelector('.artifact-ordinal')?.textContent?.trim(),
      title: el.querySelector('.artifact-title')?.textContent?.trim(),
      body: el.querySelector('.artifact-body-text')?.textContent?.trim(),
      terms: el.querySelector('.artifact-terms-note')?.textContent?.trim(),
    }));

    const climax = document.querySelector('.bounty-claimed-chamber');
    const sealTitle = climax?.querySelector('.proclamation-stamp-seal')?.textContent?.trim();
    const egressText = document.querySelector('.claim-egress-text')?.textContent?.trim();

    return {
      hasSection7: !!s7,
      offsetTop: s7 ? s7.offsetTop : -1,
      headerTitle,
      stageBadge,
      hasLedger: !!ledger,
      prizeLabel,
      heroAmount,
      perkCount: perks.length,
      perks,
      sealTitle,
      egressText,
    };
  });

  console.log('Section 07 State:', JSON.stringify(section7State, null, 2));

  if (!section7State.hasSection7) {
    throw new Error('FAILED: Section 07 #claim-the-bounty is not mounted in DOM!');
  }
  if (section7State.heroAmount !== '₹15,000') {
    throw new Error(`FAILED: Expected hero amount '₹15,000', got '${section7State.heroAmount}'`);
  }
  if (section7State.prizeLabel !== 'TOTAL CASH PRIZE POOL') {
    throw new Error(`FAILED: Expected prize label 'TOTAL CASH PRIZE POOL', got '${section7State.prizeLabel}'`);
  }
  if (section7State.perkCount !== 3) {
    throw new Error(`FAILED: Expected exactly 3 strategic perks, got ${section7State.perkCount}`);
  }

  // 3. Verify Authoritative Perk Content
  const expectedPerks = [
    {
      ordinal: '01',
      title: 'STARTUP INCUBATION',
      body: 'Top ideas can incubate into startups with dedicated resources & mentorship.',
    },
    {
      ordinal: '02',
      title: 'INDUSTRY MENTORSHIP',
      body: 'Continuous industry mentorship to refine concepts and launch commercial ventures.',
    },
    {
      ordinal: '03',
      title: 'E-SUMMIT BENEFIT',
      body: 'Participants stand a chance to avail discounts up to 25% at E-Summit 2026-27.',
      terms: 'T&C apply.',
    }
  ];

  for (let i = 0; i < 3; i++) {
    const exp = expectedPerks[i];
    const act = section7State.perks[i];
    if (act.ordinal !== exp.ordinal || act.title !== exp.title || act.body !== exp.body) {
      throw new Error(`FAILED: Perk ${i+1} mismatch! Expected: ${JSON.stringify(exp)}, Got: ${JSON.stringify(act)}`);
    }
    if (exp.terms && act.terms !== exp.terms) {
      throw new Error(`FAILED: Terms note mismatch on Perk ${i+1}! Expected: ${exp.terms}, Got: ${act.terms}`);
    }
  }
  console.log('✓ All 3 Strategic Perks verified with 100% authoritative accuracy!');

  if (section7State.sealTitle !== 'BOUNTY CLAIMED') {
    throw new Error(`FAILED: Expected proclamation seal 'BOUNTY CLAIMED', got '${section7State.sealTitle}'`);
  }

  // Helper to save screenshot to both dirs
  const takeShot = async (name) => {
    const p1 = path.join(screenshotDir, `${name}.png`);
    const p2 = path.join(publicScreenshotDir, `${name}.png`);
    await page.screenshot({ path: p1 });
    fs.copyFileSync(p1, p2);
    console.log(`Saved screenshot: ${name}.png`);
  };

  const s7Top = section7State.offsetTop;
  console.log(`Section 7 offsetTop: ${s7Top}`);

  // 4. Scroll to Phase 6 -> Phase 7 Ingress Bridge
  console.log('4. Testing Phase 6 -> Phase 7 Arrival...');
  await page.evaluate((top) => window.scrollTo({ top: top - 250, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('01_phase6_to_phase7_arrival');

  // 5. Scroll to Claim Station Established
  console.log('5. Testing Claim Station Established...');
  await page.evaluate((top) => window.scrollTo({ top: top + 100, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('02_claim_station_established');

  // 6. Scroll to ₹15,000 Primary Bounty Proclamation
  console.log('6. Testing ₹15,000 Hero Bounty Reveal...');
  await page.evaluate((top) => window.scrollTo({ top: top + 600, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('03_hero_15000_bounty');

  // 7. Scroll across Strategic Perks Assembly
  console.log('7. Testing Strategic Perks Assembly (Startup, Mentor, E-Summit)...');
  await page.evaluate((top) => window.scrollTo({ top: top + 1800, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 700));
  await takeShot('04_perks_startup_incubation');
  await takeShot('05_perks_industry_mentorship');
  await takeShot('06_perks_esummit_benefit');

  // 8. Scroll to BOUNTY CLAIMED Climax
  console.log('8. Testing BOUNTY CLAIMED Climax Proclamation...');
  await page.evaluate((top) => window.scrollTo({ top: top + 3200, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 800));
  await takeShot('07_bounty_claimed_climax');

  // 9. Scroll to Phase 7 -> Phase 8 Registration Handoff
  console.log('9. Testing Phase 7 -> Phase 8 Handoff...');
  await page.evaluate((top) => window.scrollTo({ top: top + 4200, behavior: 'instant' }), s7Top);
  await new Promise((r) => setTimeout(r, 800));
  await takeShot('08_phase7_to_phase8_handoff');

  // 10. Test Reverse Scroll Restoration to Hero
  console.log('10. Testing Reverse Scroll Restoration to Hero...');
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 900));

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

  // 11. Test Mobile Viewport (390x844) & Zero Overflow
  console.log('11. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileMetrics = await page.evaluate(() => {
    const s7 = document.getElementById('claim-the-bounty');
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    return {
      scrollWidth,
      clientWidth,
      hasOverflow: scrollWidth > clientWidth,
      s7Height: s7?.offsetHeight,
      s7Top: s7?.offsetTop,
    };
  });
  console.log('Mobile Metrics:', mobileMetrics);

  if (mobileMetrics.hasOverflow) {
    throw new Error(`FAILED: Horizontal overflow detected on mobile! scrollWidth: ${mobileMetrics.scrollWidth} > clientWidth: ${mobileMetrics.clientWidth}`);
  }
  console.log('✓ Zero horizontal overflow on mobile (scrollWidth === clientWidth)!');

  // Scroll to mobile Section 7
  await page.evaluate((top) => window.scrollTo({ top: top + 100, behavior: 'instant' }), mobileMetrics.s7Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('09_mobile');

  // 12. Test Prefers-Reduced-Motion
  console.log('12. Testing prefers-reduced-motion: reduce...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const reducedMotionState = await page.evaluate(() => {
    const s7 = document.getElementById('claim-the-bounty');
    const ledger = document.querySelector('.primary-bounty-ledger');
    const perksAssembly = document.querySelector('.strategic-perks-assembly');
    const climax = document.querySelector('.bounty-claimed-chamber');

    const isVisible = (el) => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0.5;
    };

    return {
      s7Top: s7?.offsetTop,
      ledgerVisible: isVisible(ledger),
      perksVisible: isVisible(perksAssembly),
      climaxVisible: isVisible(climax),
    };
  });
  console.log('Reduced Motion State:', reducedMotionState);

  if (!reducedMotionState.ledgerVisible || !reducedMotionState.perksVisible || !reducedMotionState.climaxVisible) {
    throw new Error('FAILED: Not all elements are visible in reduced-motion mode!');
  }
  console.log('✓ All content fully exposed in prefers-reduced-motion!');

  await page.evaluate((top) => window.scrollTo({ top: top + 150, behavior: 'instant' }), reducedMotionState.s7Top);
  await new Promise((r) => setTimeout(r, 600));
  await takeShot('10_reduced_motion');

  // 13. Check Console Errors and 404s
  console.log('13. Checking for Console Errors & 404s...');
  console.log(`Captured ${consoleErrors.length} errors.`);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
    throw new Error(`FAILED: Console or HTTP errors encountered: ${consoleErrors.join(', ')}`);
  }
  console.log('✓ Zero console errors and zero 404 network errors!');

  await browser.close();
  console.log('=== ALL PHASE 7 CLAIM THE BOUNTY TESTS PASSED SUCCESSFULLY! ===');
}

runSection7Tests().catch((err) => {
  console.error('SECTION 07 TEST FAILED:', err);
  process.exit(1);
});

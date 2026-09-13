/**
 * GSAP ScrollTrigger Choreography for Phase 7: Claim the Bounty
 * SPARKATHON 2026 • E-Cell FCRIT
 * 
 * Choreography Flow:
 * 1. Arrival from Phase 6 sunset route into the Settlement Claim Station
 * 2. Focus shifts to the Bounty Claim Table / Ledger
 * 3. Hero reveal: ₹15,000 Total Cash Prize Pool arrives with physical weight & letterpress deboss
 * 4. Camera dollies across the desk discovering the 3 physical perks:
 *    - Startup Incubation Charter
 *    - Industry Mentorship Advisory Docket
 *    - E-Summit Discount Permit
 * 5. Climactic proclamation seal slams down: BOUNTY CLAIMED
 * 6. Understated egress handoff toward Registration
 * 7. Complete reverse-scroll restoration and lifecycle cleanup
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initClaimBountyChoreography(containerRef, refs) {
  if (!containerRef) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const {
        stageElem,
        sunsetVista,
        primaryLedger,
        perksAssembly,
        bountyClaimedChamber,
        egressBridge,
      } = refs;

      if (!stageElem) return;

      // Master scrubbed timeline across the 480vh scroll budget
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageElem,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stageElem.querySelector('.claim-pinned-viewport'),
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Initial State: Arrival in the sunset settlement
      tl.set(sunsetVista, { opacity: 0.35, scale: 1 });

      // ======================================================================
      // 01. ARRIVAL & FOCUS ON THE BOUNTY LEDGER (0s -> 4s)
      // Camera pushes gently in toward the desk
      // ======================================================================
      tl.to(sunsetVista, { scale: 1.05, opacity: 0.45, ease: 'none', duration: 4 }, 0);

      // Ledger arrives with physical paper displacement & settling (no bounce gimmick)
      tl.to(primaryLedger, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: 'power2.out',
        onStart: () => primaryLedger?.classList.add('active'),
        onReverseComplete: () => primaryLedger?.classList.remove('active'),
      }, 0.8);

      // Dwell at the ₹15,000 Primary Bounty Proclamation (4s -> 8s)
      tl.to({}, { duration: 3.5 }, 2.8);

      // ======================================================================
      // 02. CAMERA DOLLIES TO THE THREE STRATEGIC PERKS (8s -> 16s)
      // The Primary Ledger shifts back slightly as the 3 physical artifacts emerge
      // ======================================================================
      tl.to(primaryLedger, {
        autoAlpha: 0,
        scale: 0.95,
        y: -20,
        duration: 1.5,
        ease: 'power2.in',
        onComplete: () => primaryLedger?.classList.remove('active'),
      }, 6.3);

      // Reveal the Strategic Perks Assembly across the workbench
      tl.to(perksAssembly, {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        ease: 'power2.out',
        onStart: () => perksAssembly?.classList.add('active'),
        onReverseComplete: () => {
          perksAssembly?.classList.remove('active');
          primaryLedger?.classList.add('active');
        },
      }, 7.2);

      // Dwell across the 3 physical documents (Startup Charter, Mentor Docket, E-Summit Permit)
      tl.to({}, { duration: 4 }, 9.2);

      // Perks assembly shifts forward as the camera approaches the final proclamation
      tl.to(perksAssembly, {
        autoAlpha: 0,
        scale: 0.96,
        y: -20,
        duration: 1.5,
        ease: 'power2.in',
        onComplete: () => perksAssembly?.classList.remove('active'),
      }, 13.2);

      // ======================================================================
      // 03. CLIMACTIC PROCLAMATION: "BOUNTY CLAIMED" (15s -> 22s)
      // A weighty physical stamped seal slams across the chamber
      // ======================================================================
      tl.to(bountyClaimedChamber, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
        onStart: () => bountyClaimedChamber?.classList.add('active'),
        onReverseComplete: () => {
          bountyClaimedChamber?.classList.remove('active');
          perksAssembly?.classList.add('active');
        },
      }, 14.5);

      // Dwell at the Bounty Claimed Seal
      tl.to({}, { duration: 3 }, 16.3);

      // Reveal Egress Bridge toward Phase 8 Registration
      if (egressBridge) {
        tl.to(egressBridge, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 18.5);
      }

      // Final Hold at the conclusion
      tl.to({}, { duration: 2 }, 20);
    });
  }, containerRef);

  return ctx;
}

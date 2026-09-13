import React, { useEffect, useRef } from 'react';
import {
  REWARDS_HEADER,
  PRIMARY_BOUNTY,
  STRATEGIC_PERKS,
  BOUNTY_CLAIM_SEAL,
  PHASE7_EGRESS
} from '../../data/rewardsData.js';
import { initClaimBountyChoreography } from '../../modules/claim-bounty-choreography.js';

export const ClaimTheBounty = () => {
  const containerRef = useRef(null);
  const sunsetVistaRef = useRef(null);
  const primaryLedgerRef = useRef(null);
  const perksAssemblyRef = useRef(null);
  const bountyClaimedChamberRef = useRef(null);
  const egressBridgeRef = useRef(null);

  useEffect(() => {
    const refs = {
      stageElem: containerRef.current,
      sunsetVista: sunsetVistaRef.current,
      primaryLedger: primaryLedgerRef.current,
      perksAssembly: perksAssemblyRef.current,
      bountyClaimedChamber: bountyClaimedChamberRef.current,
      egressBridge: egressBridgeRef.current,
    };

    const ctx = initClaimBountyChoreography(containerRef.current, refs);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="claim-the-bounty"
      className="claim-bounty-stage"
      ref={containerRef}
      aria-label="Section 07: Claim the Bounty — Rewards and Strategic Perks"
    >
      {/* 1. Ingress Transition Bridge from Phase 6 Expedition Trail */}
      <div className="claim-ingress-bridge" aria-hidden="true">
        <div className="claim-ingress-trail" />
        <div className="claim-ingress-cue">
          <span className="claim-cue-line" />
          <span className="claim-cue-text">
            ENTERING SETTLEMENT CLAIM OFFICE // FINAL PAYOFF
          </span>
          <span className="claim-cue-line right" />
        </div>
      </div>

      {/* 2. Pinned 100vh Viewport Desk Stage */}
      <div className="claim-pinned-viewport">
        {/* Ambient Sunset Aftermath Backdrop */}
        <div className="claim-ambient-backdrop" aria-hidden="true">
          <div
            className="claim-sunset-vista"
            ref={sunsetVistaRef}
            style={{ backgroundImage: `url('/assets/images/sunset-cowboy-fence.png')` }}
          />
          <div className="claim-vignette-overlay" />
        </div>

        {/* Physical / Editorial Frontier Header */}
        <header className="claim-office-header">
          <div className="claim-header-manifest">
            <span className="claim-stage-badge">{REWARDS_HEADER.stageBadge}</span>
            <h2 className="claim-section-title">{REWARDS_HEADER.title}</h2>
            <p className="claim-section-subtitle">{REWARDS_HEADER.subtitle}</p>
          </div>

          <div className="claim-office-stamp" aria-label="Settlement Location Stamp">
            <span className="office-stamp-tag">{REWARDS_HEADER.dateStamp}</span>
            <span className="office-stamp-loc">{REWARDS_HEADER.locationStamp}</span>
          </div>
        </header>

        {/* Central Claim Workbench Canvas */}
        <div className="claim-workbench-canvas">
          {/* Stage A: The ₹15,000 Primary Bounty Ledger Proclamation */}
          <article
            ref={primaryLedgerRef}
            className="primary-bounty-ledger active"
            aria-label="Primary Reward: Total Cash Prize Pool"
          >
            {/* Iron Carriage Corner Bolts */}
            <div className="ledger-iron-stud top-left" aria-hidden="true" />
            <div className="ledger-iron-stud top-right" aria-hidden="true" />
            <div className="ledger-iron-stud bottom-left" aria-hidden="true" />
            <div className="ledger-iron-stud bottom-right" aria-hidden="true" />

            <span className="ledger-category-badge">{PRIMARY_BOUNTY.category}</span>
            <h3 className="ledger-prize-label">{PRIMARY_BOUNTY.prizeLabel}</h3>
            <div className="ledger-proclamation-divider" aria-hidden="true" />

            {/* Hero Numeral: ₹15,000 (Massive, Letterpress Pressed) */}
            <div className="ledger-hero-amount" aria-label={PRIMARY_BOUNTY.amount}>
              {PRIMARY_BOUNTY.amount}
            </div>

            <p className="ledger-proclamation-text">{PRIMARY_BOUNTY.proclamation}</p>

            <div className="ledger-manifest-foot" aria-hidden="true">
              <span>{PRIMARY_BOUNTY.ledgerTag}</span>
              <span>E-CELL FCRIT • 2026</span>
            </div>
          </article>

          {/* Stage B: The Three Strategic Perks (Physical Artifacts across Desk) */}
          <div
            ref={perksAssemblyRef}
            className="strategic-perks-assembly"
            aria-label="Three Strategic Perks"
          >
            {STRATEGIC_PERKS.map((perk) => (
              <article
                key={perk.id}
                id={perk.id}
                className={`perk-artifact-document artifact-${perk.id.replace('perk-', '')}`}
                aria-label={`${perk.title}: ${perk.description}`}
              >
                {/* Document Top Iron Clip */}
                <div className="artifact-top-clip" aria-hidden="true" />

                {/* Stamped Red Ink Seal */}
                <div className="artifact-stamped-seal" aria-hidden="true">
                  {perk.sealText}
                </div>

                <div>
                  <div className="artifact-meta-header">
                    <span className="artifact-ordinal">{perk.ordinal}</span>
                    <span className="artifact-type-tag">{perk.artifactType}</span>
                  </div>

                  <h4 className="artifact-title">{perk.title}</h4>
                  <p className="artifact-body-text">{perk.description}</p>
                  
                  {perk.termsNote && (
                    <p className="artifact-terms-note">{perk.termsNote}</p>
                  )}
                </div>

                <div className="artifact-footer-plate" aria-hidden="true">
                  <span>{perk.artifactStamp}</span>
                  <span>{perk.note}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Stage C: The "BOUNTY CLAIMED" Climax Proclamation Seal */}
          <div
            ref={bountyClaimedChamberRef}
            className="bounty-claimed-chamber"
            aria-label="Bounty Claimed Climax Proclamation"
          >
            <div className="proclamation-parchment-plaque">
              <div className="proclamation-stamp-seal" aria-label={BOUNTY_CLAIM_SEAL.stampTitle}>
                {BOUNTY_CLAIM_SEAL.stampTitle}
              </div>
              <p className="proclamation-decree-text">{BOUNTY_CLAIM_SEAL.decreeText}</p>
              <div className="proclamation-ink-divider" aria-hidden="true" />
              <p className="proclamation-audit-text">{BOUNTY_CLAIM_SEAL.auditNote}</p>
            </div>
          </div>
        </div>

        {/* Egress Transition Bridge Toward Phase 8 Registration */}
        <div
          ref={egressBridgeRef}
          className="claim-egress-bridge"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="egress-trail-stem" />
          <div className="claim-egress-cue-wrapper">
            <div className="claim-egress-rule" />
            <span className="claim-egress-text">{PHASE7_EGRESS.cueText}</span>
            <div className="claim-egress-rule right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimTheBounty;

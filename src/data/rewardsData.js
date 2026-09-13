/**
 * Authoritative Event Data for Phase 7: Claim the Bounty
 * SPARKATHON 2026 • E-Cell FCRIT
 * 
 * Strict Content Rule: Zero invented prizes or claims.
 * ₹15,000 is the TOTAL CASH PRIZE POOL.
 * Three strategic perks: Startup Incubation, Industry Mentorship, E-Summit Benefit.
 */

export const REWARDS_HEADER = {
  stageBadge: 'SETTLEMENT VAULT • STAGE 07',
  title: 'CLAIM THE BOUNTY',
  subtitle: 'THE REWARD LEDGER // WHAT WINNING THIS EXPEDITION GIVES YOU',
  locationStamp: 'FRONTIER SETTLEMENT CLAIM OFFICE',
  dateStamp: 'OCTOBER 8, 2026',
};

export const PRIMARY_BOUNTY = {
  category: 'BOUNTY CLAIM',
  prizeLabel: 'TOTAL CASH PRIZE POOL',
  amount: '₹15,000',
  proclamation: 'THE REWARD POOL FOR TOP INVENTORS ACROSS THE 5 CHALLENGE DOMAINS',
  ledgerTag: 'OFFICIAL CASH DISBURSEMENT POOL',
};

export const STRATEGIC_PERKS = [
  {
    id: 'perk-incubation',
    ordinal: '01',
    codename: 'STARTUP INCUBATION',
    title: 'STARTUP INCUBATION',
    description: 'Top ideas can incubate into startups with dedicated resources & mentorship.',
    artifactType: 'VENTURE CHARTER',
    artifactStamp: 'OFFICIAL INCUBATION SEAL',
    note: 'PROTOTYPE TRANSFORMATION PROGRAM',
    sealText: 'INCUBATE',
  },
  {
    id: 'perk-mentorship',
    ordinal: '02',
    codename: 'INDUSTRY MENTORSHIP',
    title: 'INDUSTRY MENTORSHIP',
    description: 'Continuous industry mentorship to refine concepts and launch commercial ventures.',
    artifactType: 'FIELD ADVISORY DOCKET',
    artifactStamp: 'EXPERT ADVISORY STAMP',
    note: 'COMMERCIAL VENTURE GUIDANCE',
    sealText: 'ADVISORY',
  },
  {
    id: 'perk-esummit',
    ordinal: '03',
    codename: 'E-SUMMIT BENEFIT',
    title: 'E-SUMMIT BENEFIT',
    description: 'Participants stand a chance to avail discounts up to 25% at E-Summit 2026-27.',
    termsNote: 'T&C apply.',
    artifactType: 'CONCLAVE ADMISSION VOUCHER',
    artifactStamp: 'DELEGATE PASS DISCOUNT',
    note: 'ENTREPRENEURSHIP SUMMIT ACCESS',
    sealText: 'UP TO 25%',
  }
];

export const BOUNTY_CLAIM_SEAL = {
  stampTitle: 'BOUNTY CLAIMED',
  decreeText: 'THE REWARD HAS BEEN PROCLAIMED • THE ARENA CALLS',
  auditNote: 'E-CELL FCRIT • SPARKATHON 2026 OFFICIAL DECREE',
};

export const PHASE7_EGRESS = {
  cueText: 'THE BOUNTY IS POSTED // ENTER THE FRONTIER ARENA',
  subtext: 'PROCEED TO REGISTRATION • COHORT CAPPED AT 40 TEAMS',
  buttonLabel: 'PROCEED TO REGISTRATION',
};

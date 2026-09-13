export const FIELD_STATIONS = [
  {
    id: 'station-present',
    stepNumber: '01',
    stepName: 'PRESENT',
    phaseTag: 'PHASE 01 // FORMAT BRIEF',
    badgeText: 'OFFICIAL MANIFEST',
    cardClass: 'station-present',
    paperClass: 'folio-paper',
    title: 'PRESENT',
    statement: 'Projects are formally presented to the frontier jury using:',
    tools: [
      { name: 'PowerPoint', icon: '▤', className: 'pill-powerpoint' },
      { name: 'Canva', icon: '◈', className: 'pill-canva' }
    ],
    note: 'Structured slides, crisp visual architecture, and clean typographic evidence.',
    hasClip: true,
    hasFold: true
  },
  {
    id: 'station-prototype',
    stepNumber: '02',
    stepName: 'PROTOTYPE',
    phaseTag: 'PHASE 02 // TANGIBLE PROOF',
    badgeText: 'STRONGLY ENCOURAGED',
    badgeClass: 'station-stamp-red',
    cardClass: 'station-prototype',
    paperClass: 'blueprint-paper',
    title: 'PROTOTYPE',
    mandateHeadline: 'PROTOTYPES / POCS ARE ENCOURAGED',
    mandateBody: 'Bring your concept to life. Whether a functional software deploy, hardware assembly, or physical mechanism — proof of concept validates the frontier claim.'
  },
  {
    id: 'station-solution',
    stepNumber: '03',
    stepName: 'SOLUTION',
    phaseTag: 'PHASE 03 // TECHNICAL DOSSIER',
    badgeText: 'FOUR PILLARS',
    cardClass: 'station-solution',
    paperClass: 'ledger-paper',
    title: 'SOLUTION',
    intro: 'Participants must thoroughly cover four core criteria:',
    pillars: [
      {
        num: 'I',
        title: 'PROBLEM',
        desc: 'The critical frontier challenge, friction point, or unaddressed market gap.'
      },
      {
        num: 'II',
        title: 'SOLUTION',
        desc: 'The breakthrough innovation, value proposition, and functional mechanism.'
      },
      {
        num: 'III',
        title: 'TECHNICAL DETAILS',
        desc: 'System architecture, algorithms, embedded hardware, schemas, and implementation.'
      },
      {
        num: 'IV',
        title: 'MARKET IMPACT',
        desc: 'Commercial viability, user scalability, adoption economics, and expansion potential.'
      }
    ]
  },
  {
    id: 'station-pitch',
    stepNumber: '04',
    stepName: 'PITCH',
    phaseTag: 'PHASE 04 // FINAL DEFENSE',
    badgeText: 'OFFLINE JURY PITCH',
    badgeClass: 'station-stamp-gold',
    cardClass: 'station-pitch',
    paperClass: 'verdict-paper',
    title: 'PITCH',
    durationValue: '5–10 MINUTES',
    durationLabel: '+ JURY Q&A DEFENSE',
    instructions: 'Step before the industry panel. Deliver the presentation, demonstrate the prototype, and defend your technical architecture under cross-examination.',
    sealText: 'THE WORK IS READY. PROCEED TO SHOWDOWN.'
  }
];

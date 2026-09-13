/**
 * Authoritative Event Data for Phase 6: The Expedition Trail
 * SPARKATHON 2026 • E-Cell FCRIT
 * 
 * Strict Content Rule: No invented events. Only the 5 authoritative milestones
 * and the 2.5-hour open-trail breathing room interlude (1:00 PM – 3:30 PM).
 */

export const EXPEDITION_HEADER = {
  stageBadge: 'ROUTE ITINERARY • STAGE 06',
  title: 'THE EXPEDITION TRAIL',
  subtitle: 'FOLLOW THE LIVING TRAIL ACROSS THE SPARKATHON EVENT DAY',
  statusTag: 'EN ROUTE // 9:00 AM — 4:00 PM',
  establishingImage: '/assets/images/cowboy-wagon-horizon.png',
  establishingCaption: 'THE EXPEDITION CARAVAN SETS OUT INTO THE FRONTIER BASIN'
};

export const TRAIL_MILESTONES = [
  {
    id: 'trail-stop-01',
    ordinal: '01',
    fieldLog: 'FIELD LOG // 01 OF 05',
    codename: 'PLAYER ENTRY',
    eventName: 'REGISTRATION',
    timeRange: '9:00 AM – 9:45 AM',
    period: 'MORNING',
    atmosphereTag: 'PALE AMBER MIST • CABIN OUTPOST',
    image: '/assets/images/cabin-outpost.png',
    imageAlt: 'Weathered frontier cabin outpost with rocking chair and lantern at morning light',
    markerType: 'CHISELED TIMBER POST',
    markerStamp: 'FRONTIER ENTRY PERMIT',
    fieldNote: 'Arrival at the frontier outpost. Teams register credentials, receive survey maps, and ready their equipment for the expedition.',
    waypointPercent: 12,
  },
  {
    id: 'trail-stop-02',
    ordinal: '02',
    fieldLog: 'FIELD LOG // 02 OF 05',
    codename: 'THE BEGINNING',
    eventName: 'INAUGURATION',
    timeRange: '10:00 AM – 10:30 AM',
    period: 'EARLY MORNING',
    atmosphereTag: 'RISING SUN GOLD • RANCH WINDPUMP',
    image: '/assets/images/windmill-fence.png',
    imageAlt: 'Steel windpump and split-rail fence with coiled lasso in rising sunlight',
    markerType: 'IRON-STRAPPED RANCH BOARD',
    markerStamp: 'OFFICIAL INAUGURAL DECREE',
    fieldNote: 'The ceremonial opening bugle sounds across the ranch grounds. The challenge commences as teams embark into open territory.',
    waypointPercent: 32,
  },
  {
    id: 'trail-stop-03',
    ordinal: '03',
    fieldLog: 'FIELD LOG // 03 OF 05',
    codename: 'THE QUEST',
    eventName: 'EXHIBITION',
    timeRange: '10:30 AM – 12:30 PM',
    period: 'MIDDAY',
    atmosphereTag: 'BLAZING CANYON SUN • MONUMENT VALLEY',
    image: '/assets/images/monument-valley-cactus.png',
    imageAlt: 'Monument Valley red sandstone buttes with weathered wagon wheel and desert cactus',
    markerType: 'RED-ROCK MILESTONE PLACARD',
    markerStamp: 'ACTIVE EXHIBITION GROUNDS',
    fieldNote: 'The core two-hour campaign across the canyon basin. Inventors display working prototypes, defend technical architectures, and prove market feasibility.',
    waypointPercent: 54,
    isMajorStage: true,
  },
  {
    id: 'trail-stop-04',
    ordinal: '04',
    fieldLog: 'FIELD LOG // 04 OF 05',
    codename: 'REFUEL PHASE',
    eventName: 'LUNCH BREAK',
    timeRange: '12:30 PM – 1:00 PM',
    period: 'MIDDAY REST',
    atmosphereTag: 'CAMPFIRE EMBERS • COMMUNAL BREATHING ROOM',
    image: '/assets/images/campfire-refuel.png',
    imageAlt: 'Frontier campfire with bubbling cast-iron cauldron, wooden barrels, and stump',
    markerType: 'CAMP MESS TIMBER SIGN',
    markerStamp: 'MESS-HALL RATION PERMIT',
    fieldNote: 'The expedition pauses at the sheltered camp. Teams gather around the cauldron, replenish energy, and confer over tactical adjustments.',
    waypointPercent: 72,
  },
  {
    id: 'trail-stop-05',
    ordinal: '05',
    fieldLog: 'FIELD LOG // 05 OF 05',
    codename: 'FINAL BOSS',
    eventName: 'VALEDICTORY',
    timeRange: '3:30 PM – 4:00 PM',
    period: 'DUSK',
    atmosphereTag: 'DEEP SUNSET CRIMSON • CANYON OVERLOOK',
    image: '/assets/images/sunset-cowboy-fence.png',
    imageAlt: 'Cowboy leaning on split-rail corral fence gazing at a deep red canyon sunset',
    markerType: 'EMBOSSED BRASS CANYON PLAQUE',
    markerStamp: 'SUPREME EXPEDITION VERDICT',
    fieldNote: 'The sunset horizon at the trail end. Final verdicts are proclaimed, domain champions recognized, and the expedition draws to its triumphant close.',
    waypointPercent: 95,
  }
];

export const TRAIL_INTERLUDE = {
  timeGap: '1:00 PM – 3:30 PM',
  title: 'THE EXPEDITION CONTINUES',
  subtitle: 'THE TRAIL WINDS DEEP INTO THE CANYON PASSES',
  notice: 'A 2.5-HOUR PASSAGE OF FORGING, REFINEMENT & EXPEDITION MARCH TOWARD THE FINAL STAGE',
  markerCue: 'THE LONG DESERT STRETCH • OPEN HORIZON'
};

export const PHASE6_EGRESS = {
  cueText: 'THE EXPEDITION REACHES ITS DESTINATION // THE DAY IS WON • CLAIM THE BOUNTY',
  subtext: 'CROSS THE CANYON RIDGE TOWARD THE VICTORS\' BOUNTY VAULT'
};

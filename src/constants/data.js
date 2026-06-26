// ── Color Tokens ──────────────────────────────────────────────────────────────
export const COLORS = {
  bgBase:          '#0F1115',
  bgDim:           '#0B0D10',
  bgSecondary:     '#171A21',
  surface:         '#1F242C',
  surfaceElevated: '#272D36',

  textPrimary:   '#F5F7FA',
  textSecondary: '#B6BEC8',
  textMuted:     '#7D8793',

  accent:    '#E63946',
  accentDim: '#B82D38',
  blue:      '#4F7CAC',
  blueDim:   '#3D6088',

  border:        '#2D3440',
  borderSubtle:  '#1F2530',

  success: '#22C55E',
  warning: '#F59E0B',
  error:   '#EF4444',
};

// ── Font Families ─────────────────────────────────────────────────────────────
export const FONTS = {
  display: '"Clash Display", "General Sans", sans-serif',
  sans:    '"General Sans", "Satoshi", sans-serif',
  mono:    '"Inter", monospace',
};

// ── Navigation Items ──────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Teams',    path: '/teams' },
  { label: 'Brackets', path: '/brackets' },
  { label: 'Rules',    path: '/rules' },
  { label: 'Gallery',  path: '/gallery' },
  { label: 'Contact',  path: '/contact' },
];

// ── Tournament Data ───────────────────────────────────────────────────────────
export const TOURNAMENT = {
  name:     'Spike Showdown',
  season:   '1',
  edition:  'Season 1',
  tagline:  'Compete. Dominate. Conquer.',
  subtitle: 'The premier collegiate Valorant championship. 16 teams. One champion.',
  date:     'August 2025',
  location: 'Online / LAN Finals',
  prizePool: '₹50,000',

  // Countdown target — set your actual event date here
  startDate: new Date('2025-08-15T10:00:00'),

  stats: [
    { value: '16',      label: 'Teams',        suffix: '' },
    { value: '80',      label: 'Players',       suffix: '+' },
    { value: '50K',     label: 'Prize Pool',    suffix: '₹' },
    { value: '3',       label: 'Phases',        suffix: '' },
  ],

  phases: [
    {
      id:     1,
      label:  'Phase I',
      title:  'Registration Opens',
      date:   'July 1, 2025',
      desc:   'Teams register and submit rosters through the official portal.',
      status: 'completed',
    },
    {
      id:     2,
      label:  'Phase II',
      title:  'Group Stage',
      date:   'July 20 – August 5, 2025',
      desc:   'Swiss format group stage. Top 8 teams advance to playoffs.',
      status: 'upcoming',
    },
    {
      id:     3,
      label:  'Phase III',
      title:  'Playoff Bracket',
      date:   'August 10 – 12, 2025',
      desc:   'Single elimination bracket. Top 4 qualify for LAN finals.',
      status: 'upcoming',
    },
    {
      id:     4,
      label:  'Finals',
      title:  'LAN Championship',
      date:   'August 15, 2025',
      desc:   'Grand final event. Best of 5. The champion is crowned.',
      status: 'upcoming',
    },
  ],
};

// ── Teams ─────────────────────────────────────────────────────────────────────
export const TEAMS = [
  {
    id: 1,
    name:    'PHANTOM UNIT',
    tag:     'PHU',
    captain: 'Arjun Mehta',
    college: 'IIT Bombay',
    players: ['Arjun Mehta', 'Priya Sharma', 'Dev Kapoor', 'Ananya Roy', 'Kiran Patel'],
    rank:    1,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#E63946',
  },
  {
    id: 2,
    name:    'VOID STRIKE',
    tag:     'VSK',
    captain: 'Rohan Das',
    college: 'NIT Trichy',
    players: ['Rohan Das', 'Meera Iyer', 'Aditya Kumar', 'Sneha Gupta', 'Raj Singh'],
    rank:    2,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#4F7CAC',
  },
  {
    id: 3,
    name:    'ECHO FORCE',
    tag:     'ECF',
    captain: 'Vikram Reddy',
    college: 'BITS Pilani',
    players: ['Vikram Reddy', 'Tanvi Nair', 'Shiva Kumar', 'Riya Joshi', 'Aryan Malhotra'],
    rank:    3,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#22C55E',
  },
  {
    id: 4,
    name:    'STEEL SENTINELS',
    tag:     'SSN',
    captain: 'Pooja Verma',
    college: 'VIT Vellore',
    players: ['Pooja Verma', 'Harsh Tiwari', 'Nikhil Rao', 'Divya Menon', 'Sanjay Pillai'],
    rank:    4,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#F59E0B',
  },
  {
    id: 5,
    name:    'NOVA GUARD',
    tag:     'NVG',
    captain: 'Ishaan Chatterjee',
    college: 'SRM University',
    players: ['Ishaan Chatterjee', 'Kavya Pillai', 'Abhishek Singh', 'Ria Banerjee', 'Vivek Nair'],
    rank:    5,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#8B5CF6',
  },
  {
    id: 6,
    name:    'IRON VEIL',
    tag:     'IRV',
    captain: 'Chirag Bhatia',
    college: 'Manipal University',
    players: ['Chirag Bhatia', 'Swati Menon', 'Rohit Aggarwal', 'Nisha Pillai', 'Suresh Kumar'],
    rank:    6,
    wins:    0,
    losses:  0,
    status:  'Confirmed',
    color:   '#06B6D4',
  },
];

// ── Schedule ──────────────────────────────────────────────────────────────────
export const SCHEDULE = [
  {
    date:  'July 1, 2025',
    time:  '12:00 IST',
    event: 'Registration Opens',
    type:  'milestone',
    desc:  'Team registration portal goes live. Submit your roster now.',
  },
  {
    date:  'July 15, 2025',
    time:  '23:59 IST',
    event: 'Registration Deadline',
    type:  'deadline',
    desc:  'Last date to register your team. No late entries accepted.',
  },
  {
    date:  'July 18, 2025',
    time:  '18:00 IST',
    event: 'Team Draw & Seeding',
    type:  'milestone',
    desc:  'Official bracket draw and group seeding announcement on Discord.',
  },
  {
    date:  'July 20, 2025',
    time:  '10:00 IST',
    event: 'Group Stage Begins',
    type:  'match',
    desc:  'Round-robin matches start. All teams play across 3 rounds.',
  },
  {
    date:  'August 5, 2025',
    time:  '20:00 IST',
    event: 'Group Stage Ends',
    type:  'match',
    desc:  'Final group stage matches. Top 8 teams advance to playoffs.',
  },
  {
    date:  'August 10, 2025',
    time:  '10:00 IST',
    event: 'Playoff Stage',
    type:  'match',
    desc:  'Single-elimination bracket begins. Quarter-finals day.',
  },
  {
    date:  'August 12, 2025',
    time:  '14:00 IST',
    event: 'Semi-Finals',
    type:  'match',
    desc:  'Top 4 battle for a spot in the grand final.',
  },
  {
    date:  'August 15, 2025',
    time:  '12:00 IST',
    event: 'Grand Final — LAN',
    type:  'final',
    desc:  'Best of 5. One team will be crowned SPIKE SHOWDOWN Season 1 Champions.',
  },
];

// ── Prize Pool ────────────────────────────────────────────────────────────────
export const PRIZES = [
  {
    place:    1,
    label:    'Champions',
    amount:   '₹25,000',
    perks:    ['Trophy + Medals', 'Official Certificate', 'Social Feature', 'Merchandise'],
    tier:     'gold',
  },
  {
    place:    2,
    label:    'Runner Up',
    amount:   '₹15,000',
    perks:    ['Medals', 'Official Certificate', 'Social Feature'],
    tier:     'silver',
  },
  {
    place:    3,
    label:    'Third Place',
    amount:   '₹10,000',
    perks:    ['Medals', 'Official Certificate'],
    tier:     'bronze',
  },
];

// ── Rules ─────────────────────────────────────────────────────────────────────
export const RULES = [
  {
    id:       'eligibility',
    category: 'Eligibility',
    items: [
      { q: 'Who can participate?',           a: 'Any currently enrolled college student in India is eligible to register and compete in SPIKE SHOWDOWN Season 1.' },
      { q: 'How many players per team?',     a: 'Each team must have exactly 5 active players. You may register up to 2 substitute players for a total of 7 per roster.' },
      { q: 'Can I play on multiple teams?',  a: 'No. Each player may be registered on only one team. Duplicate registrations will result in disqualification.' },
      { q: 'Is there an entry fee?',         a: 'No. Participation is completely free of charge for all registered teams.' },
    ],
  },
  {
    id:       'format',
    category: 'Format & Maps',
    items: [
      { q: 'What is the match format?',      a: 'Group stage uses Best of 1. Quarterfinals are Best of 3. Semifinals are Best of 3. Grand Final is Best of 5.' },
      { q: 'How are maps selected?',         a: 'Standard competitive map veto: higher seed bans first. Maps are chosen from the current Valorant competitive pool.' },
      { q: 'What server/region is used?',    a: 'All matches are played on the Mumbai server (South Asia region). Server selection will be confirmed before each match.' },
      { q: 'Can teams request a map replay?', a: 'No replays. All results are final once the match is completed and scores are verified by a referee.' },
    ],
  },
  {
    id:       'conduct',
    category: 'Conduct & Integrity',
    items: [
      { q: 'What counts as cheating?',       a: 'Use of third-party software, exploits, smurfing, or account sharing are all strictly prohibited and result in immediate disqualification.' },
      { q: 'Toxicity & sportsmanship',       a: 'All participants must uphold professional conduct. Harassment, hate speech, or unsportsmanlike behavior will result in penalties or bans.' },
      { q: 'Streaming & content policy',     a: 'Teams are permitted to stream their own matches. We request a minimum 5-minute delay to avoid stream sniping.' },
    ],
  },
  {
    id:       'scheduling',
    category: 'Match Scheduling',
    items: [
      { q: 'How are match times set?',       a: 'Match times are announced at least 48 hours in advance via Discord. Both teams must confirm availability.' },
      { q: 'What if we can\'t make our time?', a: 'Contact your match referee at least 24 hours prior. Reschedules are possible but not guaranteed. No-shows result in a forfeit.' },
      { q: 'Disconnections during a match',   a: 'If a player disconnects mid-round, the match pauses for up to 10 minutes. Persistent technical issues may result in a walkover.' },
    ],
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
export const FAQS = [
  { q: 'When does registration open?',  a: 'Registration opens July 1, 2025 at 12:00 PM IST.' },
  { q: 'Is there an age restriction?',  a: 'Participants must be 18+ and currently enrolled in a college or university.' },
  { q: 'What rank do I need to be?',    a: 'There is no minimum rank requirement for Season 1. All skill levels are welcome.' },
  { q: 'Where are matches played?',     a: 'Matches are played online through the official Valorant client, Mumbai server.' },
  { q: 'How will I be contacted?',      a: 'Through Discord and the email you register with. Join the official Discord server.' },
];

// ── Bracket Placeholder ───────────────────────────────────────────────────────
export const BRACKET_MATCHES = [
  // Quarter Finals
  { id: 'qf1', round: 'QF', team1: 'PHANTOM UNIT', team2: 'VOID STRIKE',      score1: null, score2: null, winner: null },
  { id: 'qf2', round: 'QF', team1: 'ECHO FORCE',   team2: 'STEEL SENTINELS', score1: null, score2: null, winner: null },
  { id: 'qf3', round: 'QF', team1: 'NOVA GUARD',   team2: 'IRON VEIL',       score1: null, score2: null, winner: null },
  { id: 'qf4', round: 'QF', team1: 'TBD',          team2: 'TBD',             score1: null, score2: null, winner: null },
  // Semi Finals
  { id: 'sf1', round: 'SF', team1: 'TBD',          team2: 'TBD',             score1: null, score2: null, winner: null },
  { id: 'sf2', round: 'SF', team1: 'TBD',          team2: 'TBD',             score1: null, score2: null, winner: null },
  // Grand Final
  { id: 'gf',  round: 'GF', team1: 'TBD',          team2: 'TBD',             score1: null, score2: null, winner: null },
];

export const BRACKET_ROUNDS = [
  { id: 'QF', label: 'Quarter-Finals', matchCount: 4 },
  { id: 'SF', label: 'Semi-Finals',    matchCount: 2 },
  { id: 'GF', label: 'Grand Final',    matchCount: 1 },
];

// ── Image Gallery Items ───────────────────────────────────────────────────────
export const GALLERY_IMAGES = [
  {
    src: '/hero_key_visual.png',
    alt: 'Spike Showdown Hero Showcase'
  },
  {
    src: '/roster_key_visual.png',
    alt: 'Roster Registration Showcase'
  },
  {
    src: '/trophy_key_visual.png',
    alt: 'Championship Trophy Showcase'
  },
  {
    src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Tournament Arena'
  },
  {
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    alt: 'Pro Gaming Controller'
  },
  {
    src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    alt: 'Gaming Screen Closeup'
  },
  {
    src: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop',
    alt: 'Mechanical Keyboard RGB'
  },
  {
    src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    alt: 'Ultimate Gaming Rig'
  },
  {
    src: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Gaming Room'
  },
  {
    src: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop',
    alt: 'Esports Headset & Audio'
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    alt: 'Pro Team Brainstorming'
  }
];


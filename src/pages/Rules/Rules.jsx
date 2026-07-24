import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Scale, Award } from 'lucide-react';
import { PageHeader } from '../About/About';
import Accordion from '../../components/ui/Accordion/Accordion';
import { pageTransition, containerVariants, itemVariants } from '../../animations/variants';
import './Rules.css';

const RULES = [
  {
    id: 'eligibility',
    section: '1',
    category: 'Eligibility',
    items: [
      { q: 'Who can participate?', a: 'Spike Showdown - Season 1 is open to players residing in Kerala. Mixed-college teams and independent teams are welcome to participate.' },
      { q: 'How many players per team?', a: 'Each team must have 5 main players and may register up to 2 substitute players, for a maximum roster of 7 players.' },
      { q: 'Can I play on multiple teams?', a: 'No. A player may only represent one registered team throughout the tournament.' },
      { q: 'Is there an entry fee?', a: 'Yes. IEEE Teams: ₹100. Non-IEEE Teams: ₹150. Registration is confirmed only after payment verification.' },
    ],
  },
  {
    id: 'tournament-format',
    section: '2',
    category: 'Tournament Format',
    items: [
      { q: 'What is the overall tournament format?', a: 'The tournament features 19 teams competing across 4 stages: Round 1 (1 BYE team + 18 teams in 9 knockout matches), Round 2 (10 teams -> 5 winners), Round 3 (5-team Single Round-Robin League Stage), and the Playoff System (Qualifier 1, Eliminator, Qualifier 2, and Grand Final).' },
      { q: 'How do Round 1 & Round 2 work?', a: 'In Round 1, 18 teams play 9 Single Elimination knockout matches while 1 team receives an automatic BYE. In Round 2, the 10 remaining teams play 5 knockout matches, with the 5 winners advancing to the League Stage.' },
      { q: 'How does the Round 3 League Stage work?', a: 'The 5 remaining teams play each other once in a Single Round-Robin format (5 matches total). Each win awards 3 points. The team in 5th place is eliminated, while the top 4 teams advance to the Playoffs.' },
      { q: 'What is the Playoff format?', a: 'Top 2 teams from Round 3 play Qualifier 1 (winner advances directly to Grand Final, loser gets a second chance in Qualifier 2). Seeds 3 & 4 play the Eliminator (loser is eliminated in 4th place). The Qualifier 1 loser faces the Eliminator winner in Qualifier 2 to determine the second Grand Finalist.' },
      { q: 'How are standings ties decided in Round 3?', a: 'If teams finish with equal points, tie-breakers are applied in this order: 1. Head-to-Head Result, 2. Round Difference (RD), 3. Total Rounds Won, 4. Tournament Committee Decision.' },
      { q: 'How is 3rd place determined?', a: 'The loser of Qualifier 2 earns 3rd Place in the tournament.' },
      { q: 'What is the Grand Final format?', a: 'The winner of Qualifier 1 faces the winner of Qualifier 2 in a Best of 3 (BO3) Grand Final to determine the SPIKE SHOWDOWN Season 1 Champion.' },
    ],
  },
  {
    id: 'maps-match-rules',
    section: '3',
    category: 'Maps & Match Rules',
    items: [
      { q: 'Which maps are used in the competitive map pool?', a: 'The official competitive map pool includes: Abyss, Ascent, Bind, Haven, Lotus, Pearl, Sunset, and Split. (Map pool follows official Riot Games competitive rotations).' },
      { q: 'How are maps selected for matches?', a: 'Maps are selected through an official map veto process (Ban/Pick/Decider) supervised by Tournament Administrators on Discord.' },
      { q: 'Which server will be used?', a: 'All matches will be hosted on the Mumbai Server unless otherwise announced by Tournament Administrators.' },
      { q: 'How long before matches should teams report?', a: 'Teams must check in 15 minutes before their scheduled match time in the official Discord server.' },
      { q: "What happens if a team doesn't join on time?", a: 'Teams have a 10-minute grace period after the scheduled start time to join the lobby. Failure to appear within the grace period results in an automatic 13-0 forfeit.' },
    ],
  },
  {
    id: 'fair-play',
    section: '4',
    category: 'Fair Play',
    items: [
      { q: 'Is cheating allowed?', a: 'Absolutely not. The use of cheats, hacks, scripts, exploits, macros, or unauthorized third-party software will result in immediate disqualification.' },
      { q: 'Is smurfing allowed?', a: 'No. Players must compete using their registered Riot account.' },
      { q: 'Can someone else play using my account?', a: 'No. Account sharing is strictly prohibited and results in immediate disqualification.' },
      { q: 'Is toxic behaviour allowed?', a: 'No. Harassment, hate speech, racism, abusive language, and unsportsmanlike conduct will not be tolerated.' },
    ],
  },
  {
    id: 'match-policies',
    section: '5',
    category: 'Match Policies',
    items: [
      { q: 'Are tactical timeouts allowed?', a: 'Yes. Each team receives 2 tactical timeouts, with a maximum of 1 timeout per half.' },
      { q: 'What happens if someone disconnects?', a: 'If a player disconnects before Round 3 due to technical issues, Tournament Administrators may approve a remake. After Round 3, the match will generally continue unless organizers determine competitive integrity has been compromised.' },
      { q: 'How is overtime played?', a: 'Official Valorant Competitive Overtime rules apply. Teams must win by 2 rounds.' },
      { q: 'Can matches be remade?', a: 'Rematches are only approved for Riot server issues, tournament administrative errors, or major technical issues affecting competitive integrity.' },
    ],
  },
  {
    id: 'communication-administration',
    section: '6',
    category: 'Communication & Administration',
    items: [
      { q: 'Where will announcements be made?', a: 'Official announcements will be posted on the Tournament Website, Official Discord Server, and Instagram (@ieeesbsbce).' },
      { q: 'How can I raise a dispute?', a: 'Only the Team Captain may report disputes. Evidence such as screenshots, videos, or match history should be submitted immediately after the match.' },
      { q: 'Can organizers change the rules?', a: 'Yes. The Tournament Committee reserves the right to modify schedules, update rules, resolve disputes, and make decisions in situations not explicitly covered by the rulebook. All organizer decisions are final.' },
    ],
  },
];

const CATEGORY_ICONS = {
  eligibility: BookOpen,
  'tournament-format': Scale,
  'maps-match-rules': ShieldAlert,
  'fair-play': ShieldAlert,
  'match-policies': Award,
  'communication-administration': BookOpen,
};

export default function Rules() {
  return (
    <motion.div
      key="rules"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Rules & Regulations"
        title="Official Rulebook"
        subtitle="Please review the eligibility, format, map, fair play, match policy, and administration rules for SPIKE SHOWDOWN Season 1."
      />

      <section className="section-pad">
        <div className="container-xl">
          <div className="rules-layout">
            {/* Left sidebar info panel */}
            <div className="rules-layout-sidebar">
              <div className="rules-sidebar">
                <div className="rules-notice-box">
                  <span className="rules-notice-eyebrow">Notice</span>
                  <h3 className="rules-notice-title">Eligibility & Registration</h3>
                  <p className="rules-notice-desc">
                    By registering for SPIKE SHOWDOWN Season 1, all players agree to comply with the ruleset outlined herein. Registration is confirmed only after payment verification, and violations may result in penalties, forfeits, or disqualification.
                  </p>
                  <hr style={{ margin: '1rem 0' }} />
                  <div className="rules-bullet-list">
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Players must be residents of Kerala</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Mixed-college and independent teams are allowed</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Registration is confirmed only after payment verification</span>
                    </div>
                  </div>
                </div>

                <div className="rules-notice-box">
                  <span className="rules-notice-eyebrow">Policy</span>
                  <h3 className="rules-notice-title">Organizer Rights</h3>
                  <p className="rules-notice-desc">
                    The Tournament Committee reserves the right to modify schedules, update tournament rules, adjust tournament format, resolve disputes, replace maps if Riot updates the competitive pool, and disqualify teams violating tournament policies.
                  </p>
                  <div className="rules-bullet-list">
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Modify schedules and tournament rules</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Adjust format or map pool when needed</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">All committee decisions are final</span>
                    </div>
                  </div>
                </div>

                <div className="rules-notice-box">
                  <span className="rules-notice-eyebrow">Policy</span>
                  <h3 className="rules-notice-title">Acceptance of Rules</h3>
                  <p className="rules-notice-desc">
                    By registering for Spike Showdown - Season 1, every participant confirms that they have read this rulebook, understand all tournament rules, and agree to comply with all decisions made by the Tournament Committee.
                  </p>
                  <div className="rules-bullet-list">
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Have read this rulebook</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Understand all tournament rules</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Agree to all committee decisions</span>
                    </div>
                  </div>
                  <hr style={{ margin: '1rem 0' }} />
                  <p className="rules-notice-desc" style={{ marginBottom: 0 }}>
                    Failure to comply with these rules may result in warnings, forfeits, disqualification, or bans from future IEEE Student Branch SBCE tournaments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right content: Accordions for rules */}
            <div className="rules-layout-content">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-8"
              >
                {RULES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id] || BookOpen;
                  return (
                    <motion.div
                      key={cat.id}
                      variants={itemVariants}
                      className="rules-category-box"
                    >
                      <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
                        <div className="rules-category-icon">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h2 className="rules-category-title">
                            {cat.category}
                          </h2>
                          <p className="rules-category-section">
                            Section {cat.section || cat.id.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <Accordion items={cat.items} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}

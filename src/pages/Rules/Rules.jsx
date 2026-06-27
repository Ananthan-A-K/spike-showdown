import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Scale, Award } from 'lucide-react';
import { PageHeader } from '../About/About';
import Accordion from '../../components/ui/Accordion/Accordion';
import { RULES } from '../../constants/data';
import { pageTransition, containerVariants, itemVariants } from '../../animations/variants';
import './Rules.css';

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

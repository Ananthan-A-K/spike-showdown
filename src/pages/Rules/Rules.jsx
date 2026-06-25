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
  format: Scale,
  conduct: ShieldAlert,
  scheduling: Award,
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
        subtitle="Please review the rules, format guidelines, and player code of conduct for SPIKE SHOWDOWN Season 1."
      />

      <section className="section-pad">
        <div className="container-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" style={{ gap: '4rem' }}>
            {/* Left sidebar info panel */}
            <div className="lg:col-span-1">
              <div className="rules-sidebar">
                <div className="rules-notice-box">
                  <span className="rules-notice-eyebrow">Notice</span>
                  <h3 className="rules-notice-title">Competitive Integrity</h3>
                  <p className="rules-notice-desc">
                    By registering for SPIKE SHOWDOWN Season 1, all players agree to comply with the ruleset outlined herein. Violations will result in penalties, including match forfeits or tournament disqualification.
                  </p>
                  <hr style={{ margin: '1rem 0' }} />
                  <div className="rules-bullet-list">
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Active anti-cheat required</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Valid college identity required</span>
                    </div>
                    <div className="rules-bullet-item">
                      <div className="rules-bullet-dot" />
                      <span className="rules-bullet-text">Official Discord presence mandatory</span>
                    </div>
                  </div>
                </div>

                <div className="rules-help-box">
                  <h3 className="rules-notice-title" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>Need Clarification?</h3>
                  <p className="rules-notice-desc">
                    If you have questions regarding map vetoes, player substitutions, or scheduling conflicts, reach out to support.
                  </p>
                  <a
                    href="/contact"
                    className="btn btn-outline w-full text-center"
                  >
                    Contact Tournament Admin
                  </a>
                </div>
              </div>
            </div>

            {/* Right content: Accordions for rules */}
            <div className="lg:col-span-2">
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
                            Section {cat.id.toUpperCase()}
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

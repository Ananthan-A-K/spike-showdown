import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Target, Eye, Users, Shield, Zap } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading/SectionHeading';
import { pageTransition, containerVariants, itemVariants, fadeLeft, fadeRight } from '../../animations/variants';
import './About.css';

const TIMELINE_ITEMS = [
  { year: 'June 2026', title: 'The Idea', desc: 'The vision for SPIKE SHOWDOWN was born—to create a professionally organized collegiate Valorant tournament by IEEE Student Branch SBCE.' },
  { year: 'June 2026', title: 'Committee Formation', desc: 'The organizing committee was assembled, with dedicated teams for tournament operations, technical management, media, finance, and participant support.' },
  { year: 'Late June 2026', title: 'Planning & Development', desc: 'Tournament rules, branding, website development, Discord server, registration system, and event structure were finalized.' },
  { year: 'July 1, 2026', title: 'Official Announcement', desc: 'SPIKE SHOWDOWN – Season 1 was officially unveiled, introducing the tournament to the community.' },
  { year: 'July 3, 2026', title: 'Registration Opens', desc: 'Team registrations officially begin through the online registration portal.' },
  { year: 'July 2026', title: 'Building the Competition', desc: 'Tournament details, rulebook, prizes, team verification, and bracket announcements are released throughout the month.' },
  { year: 'After the Valorant World Cup', title: 'Tournament Begins', desc: 'Knockout rounds 1 & 2 begin, leading into the 5-team Round-Robin League Stage.' },
  { year: 'Season Finale', title: 'Grand Final', desc: 'The top teams compete in Best of 3 Semifinals and Grand Final to crown the SPIKE SHOWDOWN Season 1 Champion.' },
  { year: 'Legacy Begins', title: 'A New Tradition', desc: 'Season 1 marks the beginning of SPIKE SHOWDOWN, laying the foundation for future collegiate Valorant tournaments organized by IEEE Student Branch SBCE.' },
];

const VALUES = [
  { icon: Target, title: 'Competitive Integrity', desc: 'Every match is conducted with transparency, fairness, and strict rule enforcement to ensure a balanced competitive environment.' },
  { icon: Shield, title: 'Fair Play', desc: 'Respect, sportsmanship, and zero tolerance for cheating create an equal opportunity for every team to compete.' },
  { icon: Users, title: 'Community', desc: 'Spike Showdown brings together students and Valorant enthusiasts to build a stronger and more connected esports community.' },
  { icon: Zap, title: 'Professional Experience', desc: 'From registrations to the Grand Final, every aspect of the tournament is organized to deliver a smooth and memorable competitive experience.' },
];

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="page-header">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="page-header-glow-top" />
      <div className="container-xl relative z-10">
        <div className="flex items-center gap-3 mb-7">
          <span className="accent-line" />
          <span className="page-header-eyebrow">{eyebrow}</span>
        </div>
        <h1 className="heading-display page-header-title">
          {title}
        </h1>
        {subtitle && (
          <p className="page-header-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export { PageHeader };

export default function About() {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const visibleTimelineItems = isTimelineExpanded ? TIMELINE_ITEMS : TIMELINE_ITEMS.slice(0, 4);

  return (
    <motion.div
      key="about"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="About"
        title="The Story Behind Season 1"
        subtitle="What started as a vision has become the premier 19-team collegiate Valorant championship."
      />

      {/* ── Mission & Vision ── */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Big editorial quote */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
            >
              <p className="mission-eyebrow">Our Mission</p>
              <blockquote className="mission-quote">
                "Elevate collegiate esports. Create champions. Build community."
              </blockquote>
              <div className="mt-8 flex items-start gap-4">
                <div className="mission-accent-bar" />
                <p className="mission-desc">
                  SPIKE SHOWDOWN was born from a simple belief: collegiate gamers deserve a professional,
                  high-production competitive platform that matches their talent and ambition.
                </p>
              </div>
            </motion.div>

            {/* Right: Vision cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="flex flex-col gap-4"
            >
              <div className="about-card">
                <div className="flex items-center gap-3 mb-3">
                  <Eye size={18} className="text-gradient-accent" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--color-blue)' }} />
                  <span className="about-card-title">Our Vision</span>
                </div>
                <p className="about-card-text">
                  To become the most respected collegiate Valorant championship in South Asia,
                  recognized by players, fans, and the broader esports ecosystem.
                </p>
              </div>

              <div className="about-card">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={18} className="text-gradient-accent" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--color-accent)' }} />
                  <span className="about-card-title">Our Goal</span>
                </div>
                <p className="about-card-text">
                  Season 1 sets the foundation. We host 19 elite teams, deliver
                  professional match coverage, and award ₹5000 to the best performers.
                </p>
              </div>

              <div className="about-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={18} className="text-gradient-accent" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'var(--color-success)' }} />
                  <span className="about-card-title">The Community</span>
                </div>
                <p className="about-card-text">
                  Every player, spectator, and fan is part of the SPIKE SHOWDOWN community.
                  We build this together — season by season.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tournament Info ── */}
      <section className="section-pad bg-[#0B0D10]" style={{ borderTop: '1px solid rgba(45, 52, 64, 0.4)', borderBottom: '1px solid rgba(45, 52, 64, 0.4)' }}>
        <div className="container-xl">
          <SectionHeading
            eyebrow="The Tournament"
            title={<>Everything you<br />need to know</>}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Format', value: 'Single Elimination → League Stage', sub: 'Knockout rounds, 5-team League Stage, and BO3 Playoffs.' },
              { label: 'Teams', value: '19 Teams', sub: '1 BYE + 18 Teams in Round 1' },
              { label: 'Platform', value: 'Valorant PC', sub: 'Mumbai server region' },
              { label: 'Season 1 Finals', value: 'Online Event' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="about-card-lg">
                <p className="info-card-label">{label}</p>
                <p className="info-card-value">{value}</p>
                <p className="info-card-sub">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-pad">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            className="mb-12"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={itemVariants} className="value-card">
                <div className="value-icon-box">
                  <Icon size={20} className="text-[#E63946]" />
                </div>
                <h3 className="value-card-title">{title}</h3>
                <p className="value-card-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-pad bg-[#0B0D10]" style={{ borderTop: '1px solid rgba(45, 52, 64, 0.4)' }}>
        <div className="container-xl">
          <SectionHeading
            eyebrow="Timeline"
            title="How we got here"
            className="mb-12"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col gap-0"
          >
            {visibleTimelineItems.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="timeline-item"
              >
                {/* Vertical line marker */}
                <div className="timeline-marker">
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner" />
                  </div>
                  {i < visibleTimelineItems.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: '0.5rem', paddingTop: '0.25rem' }}>
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="timeline-expand-wrap">
            <button
              type="button"
              className="timeline-expand-btn"
              onClick={() => setIsTimelineExpanded((current) => !current)}
              aria-expanded={isTimelineExpanded}
              aria-label={isTimelineExpanded ? 'Collapse timeline' : 'Expand timeline'}
            >
              <ChevronDown
                size={18}
                className={`timeline-expand-icon ${isTimelineExpanded ? 'timeline-expand-icon-open' : ''}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="about-cta-box">
            <div>
              <h2 className="about-cta-title">
                Ready to be part of history?
              </h2>
              <p className="about-cta-sub">Register your team for Season 1 today.</p>
            </div>
            <Link to="/register" className="btn btn-primary flex items-center gap-2 px-8 flex-shrink-0">
              Register Now
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
}

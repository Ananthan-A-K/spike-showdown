import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { PRIZES } from '../../../../constants/data';
import { containerVariants, itemVariants } from '../../../../animations/variants';
import './PrizePool.css';

const TIER_CONFIG = {
  gold:   { icon: Trophy, color: '#F59E0B', glow: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  silver: { icon: Medal,  color: '#B6BEC8', glow: 'rgba(182,190,200,0.08)', border: 'rgba(182,190,200,0.20)' },
  bronze: { icon: Award,  color: '#CD7F32', glow: 'rgba(205,127,50,0.10)', border: 'rgba(205,127,50,0.20)' },
};

export default function PrizePool() {
  return (
    <section className="section-pad prize-section">

      {/* BG decoration */}
      <div className="prize-bg-glow" />

      <div className="container-xl">
        <div className="text-center mb-20">
          <SectionHeading
            eyebrow="Prize Pool"
            title={<>Compete for<br /><em className="not-italic" style={{ color: 'var(--color-accent)' }}>₹50,000</em></>}
            subtitle="The top teams walk away with prizes, recognition, and the title of SPIKE SHOWDOWN Champions."
            align="center"
          />
        </div>

        {/* Total pool callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="prize-pool-callout">
            <div className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
            <span className="prize-pool-label">Total Prize Pool</span>
            <span className="prize-pool-value">₹50,000</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {PRIZES.map((prize, i) => {
            const cfg = TIER_CONFIG[prize.tier];
            const Icon = cfg.icon;
            const isFirst = i === 0;

            return (
              <motion.div
                key={prize.place}
                variants={itemVariants}
                className={`prize-card ${isFirst ? 'prize-featured' : ''}`}
                style={{
                  borderColor: cfg.border,
                  background: isFirst
                    ? `radial-gradient(circle at 50% 0%, ${cfg.glow} 0%, #1F242C 60%)`
                    : 'var(--color-surface)',
                }}
              >
                {/* Top accent */}
                <div className="prize-card-accent-top" style={{ background: cfg.color }} />

                {isFirst && (
                  <div className="absolute top-3 right-3">
                    <span className="badge badge-accent" style={{ fontSize: '0.5rem' }}>Top Prize</span>
                  </div>
                )}

                <div className="prize-card-body">
                  {/* Icon & place */}
                  <div className="flex items-center gap-3">
                    <div className="prize-icon-box" style={{ background: `${cfg.color}15` }}>
                      <Icon size={22} style={{ color: cfg.color }} />
                    </div>
                    <div>
                      <span className="prize-amount" style={{ color: cfg.color }}>
                        {prize.amount}
                      </span>
                      <p className="prize-tier-label">
                        {prize.label}
                      </p>
                    </div>
                  </div>

                  {/* Place label */}
                  <div className="flex items-center gap-2">
                    <div className="prize-place-badge">
                      <span className="prize-place-number">{prize.place}</span>
                    </div>
                    <span className="prize-place-name">{prize.label}</span>
                  </div>

                  {/* Perks */}
                  <ul className="prize-perks-list">
                    {prize.perks.map((perk) => (
                      <li key={perk} className="prize-perk-item">
                        <div className="prize-perk-icon" style={{ background: `${cfg.color}18` }}>
                          <Check size={9} style={{ color: cfg.color }} />
                        </div>
                        <span className="prize-perk-text">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-20"
        >
          <Link to="/register" className="btn btn-primary flex items-center gap-2" style={{ display: 'inline-flex', padding: '0 2.5rem' }}>
            Register For Free
            <ArrowRight size={15} />
          </Link>
          <p className="prize-cta-note">No entry fee. Open to all college students.</p>
        </motion.div>

      </div>
    </section>
  );
}

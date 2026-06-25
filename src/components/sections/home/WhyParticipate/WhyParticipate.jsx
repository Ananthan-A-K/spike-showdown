import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Globe, Star, Shield, TrendingUp } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { containerVariants, itemVariants } from '../../../../animations/variants';
import './WhyParticipate.css';

const WHY_ITEMS = [
  {
    icon: Zap,
    title: 'Elite Competition',
    desc: 'Face the top collegiate Valorant players in India. Sharpen your skills against the best.',
  },
  {
    icon: Users,
    title: 'Build Your Team',
    desc: 'Compete with your squad. Build chemistry, coordination, and championship-level synergy.',
  },
  {
    icon: Globe,
    title: 'National Recognition',
    desc: 'Winners receive social spotlights, certificates, and documented recognition in the community.',
  },
  {
    icon: TrendingUp,
    title: 'Grow as a Player',
    desc: 'Experience competitive tournament play and grow under high-pressure match conditions.',
  },
  {
    icon: Shield,
    title: 'Fair Play Guarantee',
    desc: 'Anti-cheat verification, dedicated referees, and professional match oversight for every game.',
  },
  {
    icon: Star,
    title: 'Prize & Prestige',
    desc: '₹50,000 in prizes and the honor of being named SPIKE SHOWDOWN Season 1 Champions.',
  },
];

export default function WhyParticipate() {
  return (
    <section className="section-pad why-section">

      {/* Decorative top line */}
      <div className="why-top-line" />

      <div className="container-xl">

        <div className="text-center mb-20">
          <SectionHeading
            eyebrow="Why Participate"
            title={<>More than a<br />tournament</>}
            subtitle="SPIKE SHOWDOWN is a platform for growth, recognition, and competitive excellence."
            align="center"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="why-card"
            >
              <div className="why-card-hover-glow" />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="why-icon-box">
                  <Icon size={22} />
                </div>
                <h3 className="why-card-title">
                  {title}
                </h3>
                <p className="why-card-desc">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

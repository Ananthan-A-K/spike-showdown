import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, ShieldCheck, TrendingUp, Trophy, Users } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { containerVariants, itemVariants } from '../../../../animations/variants';
import './WhyParticipate.css';

const WHY_ITEMS = [
  {
    icon: Trophy,
    title: 'Elite Competition',
    desc: 'Challenge skilled collegiate Valorant teams from across Kerala in a professionally organized tournament.',
  },
  {
    icon: Users,
    title: 'Teamwork & Strategy',
    desc: 'Coordinate with your squad, adapt under pressure, and showcase teamwork in every match.',
  },
  {
    icon: Award,
    title: 'Recognition',
    desc: 'Compete for championship glory, certificates, MVP recognition, and tournament honors.',
  },
  {
    icon: TrendingUp,
    title: 'Skill Development',
    desc: 'Strengthen your communication, game sense, teamwork, and competitive decision-making.',
  },
  {
    icon: ShieldCheck,
    title: 'Fair Competition',
    desc: 'Verified teams, dedicated tournament admins, clear rules, and strict fair play standards ensure a balanced competitive experience.',
  },
  {
    icon: Globe,
    title: 'Esports Community',
    desc: "Connect with fellow Valorant players, represent your college, and become part of Kerala's growing esports community.",
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
            subtitle="SPIKE SHOWDOWN is a competitive collegiate Valorant tournament organized by IEEE Student Branch SBCE, bringing together players across Kerala to compete, improve, and earn recognition."
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

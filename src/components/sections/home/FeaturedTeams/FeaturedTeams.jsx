import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import TeamCard from '../../../ui/TeamCard/TeamCard';
import { TEAMS } from '../../../../constants/data';
import { containerVariants } from '../../../../animations/variants';
import './FeaturedTeams.css';

const FEATURED = TEAMS.slice(0, 3);

export default function FeaturedTeams() {
  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-base)' }}>
      <div className="container-xl">

        <div className="featured-teams-header">
          <SectionHeading
            eyebrow="Featured Teams"
            title={<>Meet the<br />competitors</>}
            subtitle="Top collegiate teams from across India battle for the ultimate championship title."
          />
          <Link
            to="/teams"
            className="btn btn-outline featured-teams-link w-fit"
          >
            All Teams
            <ArrowRight size={13} />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {FEATURED.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, ArrowRight } from 'lucide-react';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import StatCard from '../../../ui/StatCard/StatCard';
import { TOURNAMENT } from '../../../../constants/data';
import { containerVariants, itemVariants, fadeRight } from '../../../../animations/variants';
import './Statistics.css';


export default function Statistics() {
  return (
    <section className="section-pad stats-section">

      {/* Background accent */}
      <div className="stats-bg-glow" />

      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">

          {/* Left: Heading */}
          <div>
            <SectionHeading
              eyebrow="By The Numbers"
              title={<>The scale of<br />Season{' '}<em className="not-italic" style={{ color: 'var(--color-accent)' }}>One</em></>}
              subtitle="A competitive arena where the best collegiate talent in India battle for supremacy, recognition, and a share of the prize pool."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeRight}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <div className="flex items-center gap-4">
                <div className="stats-date-divider" />
                <div className="flex flex-col gap-1">
                  <span className="stats-date-value">August 2025</span>
                  <span className="stats-date-sub">Grand Final Date</span>
                </div>
              </div>

              <Link to="/gallery" className="btn btn-outline flex items-center gap-2">
                <Image size={16} />
                View Event Gallery
                <ArrowRight size={14} className="opacity-70" />
              </Link>
            </motion.div>

          </div>

          {/* Right: Stats Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {TOURNAMENT.stats.map(({ value, label, suffix }, i) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className={`stat-grid-card ${i === 0 ? 'stat-grid-card-featured' : ''}`}
              >
                {/* Subtle background number */}
                <div className="stat-grid-card-bg-num">
                  {i + 1}
                </div>

                <StatCard
                  value={value}
                  label={label}
                  suffix={suffix}
                  size={i === 0 ? 'lg' : 'md'}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

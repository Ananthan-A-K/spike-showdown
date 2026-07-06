import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../ui/SectionHeading/SectionHeading';
import { containerVariants, itemVariants } from '../../../../animations/variants';
import './Partnerships.css';
import tpaLogo from '../../../../assets/tpa logo.jpeg';

const partners = [
  {
    name: 'TPA Esports',
    description: 'Official collaboration partner powering this season.',
    image: tpaLogo,
    alt: 'TPA Esports logo',
    className: 'partnership-logo partnership-logo-square',
  },
];

export default function Partnerships() {
  return (
    <section className="section-pad partnership-section">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Official Collaboration"
          title={<>Proudly partnered with<br /><em className="not-italic" style={{ color: 'var(--color-accent)' }}>TPA Esports</em></>}
          subtitle="SPIKE SHOWDOWN is strengthened by a shared vision for competitive gaming, community growth, and unforgettable esports experiences."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="partnership-grid"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="partnership-card"
            >
              <div className="partnership-logo-wrap">
                <img src={partner.image} alt={partner.alt} className={partner.className} />
              </div>
              <div className="partnership-card-body">
                <h3 className="partnership-title">{partner.name}</h3>
                <p className="partnership-text">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

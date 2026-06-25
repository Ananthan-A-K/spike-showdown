import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, lineGrow } from '../../../animations/variants';
import './SectionHeading.css';

/**
 * SectionHeading — premium editorial section header
 *
 * Props:
 *   eyebrow  — small label above the title
 *   title    — main heading (can contain <br /> or <em> for accented word)
 *   subtitle — optional body paragraph
 *   align    — 'left' | 'center'
 *   accent   — accent line visible (default true)
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align    = 'left',
  accent   = true,
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <motion.div
      className={`section-heading ${isCenter ? 'section-heading-center' : 'section-heading-left'} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          className="section-heading-eyebrow-container"
        >
          {accent && (
            <motion.span
              variants={lineGrow}
              className="section-heading-line"
              style={{ transformOrigin: 'left' }}
            />
          )}
          <span className="section-heading-eyebrow">
            {eyebrow}
          </span>
          {accent && isCenter && (
            <motion.span
              variants={lineGrow}
              className="section-heading-line"
              style={{ transformOrigin: 'right', scaleX: 1 }}
            />
          )}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        className={`section-heading-title ${
          isCenter ? 'section-heading-title-center' : 'section-heading-title-left'
        }`}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`section-heading-subtitle ${
            isCenter ? 'section-heading-subtitle-center' : 'section-heading-subtitle-left'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

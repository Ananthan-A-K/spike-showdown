import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../../hooks';
import './StatCard.css';

/**
 * StatCard — animated statistics display
 * Props: value (number), label, suffix, prefix, description
 */
export default function StatCard({ value, label, suffix = '', prefix = '', description, size = 'md', className = '' }) {
  const numericValue = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const [count, ref] = useAnimatedCounter(numericValue, 1800);

  const isNonNumeric = isNaN(numericValue) || value === '—';
  const displayValue = isNonNumeric ? value : `${prefix}${count}${suffix}`;

  const sizeConfig = {
    sm: { number: 'stat-num-sm', label: 'stat-lbl-sm' },
    md: { number: 'stat-num-md', label: 'stat-lbl-md' },
    lg: { number: 'stat-num-lg', label: 'stat-lbl-lg' },
  };

  const cfg = sizeConfig[size] || sizeConfig.md;

  return (
    <div ref={ref} className={`${className}`}>
      <motion.span
        className={`stat-number ${cfg.number}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {displayValue}
      </motion.span>
      <span className={`stat-label ${cfg.label}`}>
        {label}
      </span>
      {description && (
        <p className="stat-desc">
          {description}
        </p>
      )}
    </div>
  );
}

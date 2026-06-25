import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './Button.css';

/**
 * Button component
 * variant: 'primary' | 'outline' | 'ghost' | 'white'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size    = 'md',
  icon    = false,
  iconType = 'arrow',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  href,
  target,
  ...props
}) {
  const baseClass = `btn btn-${variant} btn-${size}`;

  const IconComponent = iconType === 'external' ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      {icon && <IconComponent size={size === 'lg' ? 16 : 14} strokeWidth={2} />}
    </>
  );

  const cls = `${baseClass} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        className={cls}
        whileHover={!disabled ? { scale: 1.015, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.975 } : {}}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={cls}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      {...props}
    >
      {content}
    </motion.button>
  );
}

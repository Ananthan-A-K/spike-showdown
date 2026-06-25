// Framer Motion animation variants — reuse across the site

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.1,
    },
  },
};

export const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pageTransition = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -16, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const navVariants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const lineGrow = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 0px 0px rgba(0,0,0,0)' },
  hover: {
    y: -6,
    boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer = (staggerTime = 0.08, delayTime = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren:   delayTime,
    },
  },
});

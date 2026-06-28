import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const hoverVariant = {
  scale: 1.04,
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const tapVariant = {
  scale: 0.98,
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
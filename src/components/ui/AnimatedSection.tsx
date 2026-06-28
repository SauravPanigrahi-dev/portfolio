'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { fadeInUp } from '@/lib/motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const { shouldAnimate } = useMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: '0px 0px -20px 0px' });

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
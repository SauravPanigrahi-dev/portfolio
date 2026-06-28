'use client';

import { motion } from 'framer-motion';
import { hoverVariant, tapVariant } from '@/lib/motion';
import { useMotion } from '@/hooks/useMotion';
import { ButtonHTMLAttributes } from 'react';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export default function CTAButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: CTAButtonProps) {
  const { shouldAnimate } = useMotion();

  const base = `
    px-6 py-3 rounded-lg font-display font-medium text-sm
    transition-colors duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-pulsar-cyan focus:ring-offset-2
    focus:ring-offset-void
  `;

  const variants = {
    primary: 'bg-pulsar-cyan text-void hover:bg-opacity-90',
    ghost: 'border border-pulsar-cyan text-pulsar-cyan hover:bg-pulsar-cyan hover:text-void',
  };

  if (!shouldAnimate) {
    return (
      <button className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={hoverVariant}
      whileTap={tapVariant}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
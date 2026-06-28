import { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accent?: 'cyan' | 'violet' | 'amber';
}

const accentStyles = {
  cyan: {
    border: '1px solid rgba(0, 212, 255, 0.4)',
  },
  violet: {
    border: '1px solid rgba(124, 58, 237, 0.5)',
  },
  amber: {
    border: '1px solid rgba(245, 158, 11, 0.4)',
  },
};

const accentClasses = {
  cyan: 'glass-card-cyan',
  violet: 'glass-card-violet',
  amber: 'glass-card-amber',
};

export default function GlassCard({
  children,
  className = '',
  accent = 'cyan',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-xl bg-deep-space
        backdrop-blur-sm p-6
        transition-all duration-200
        ${accentClasses[accent]}
        ${className}
      `}
      style={accentStyles[accent] as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
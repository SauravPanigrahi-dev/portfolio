interface SkillBadgeProps {
  label: string;
  accent?: 'cyan' | 'violet' | 'amber';
}

const accentStyles = {
  cyan: 'border-pulsar-cyan text-pulsar-cyan',
  violet: 'border-purple-400 text-purple-400',
  amber: 'border-solar-amber text-solar-amber',
};

export default function SkillBadge({
  label,
  accent = 'cyan',
}: SkillBadgeProps) {
  return (
    <span
      className={`
        inline-block px-3 py-1
        rounded-full border
        font-mono text-xs
        bg-deep-space
        ${accentStyles[accent]}
      `}
    >
      {label}
    </span>
  );
}
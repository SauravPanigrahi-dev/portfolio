interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  accent = true,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-star-white tracking-tight">
        {accent && (
          <span className="text-pulsar-cyan mr-2">//</span>
        )}
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
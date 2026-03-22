interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
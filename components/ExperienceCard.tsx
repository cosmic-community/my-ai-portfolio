import type { WorkExperience } from '@/types';

interface ExperienceCardProps {
  experience: WorkExperience;
  isLast?: boolean;
}

export default function ExperienceCard({ experience, isLast = false }: ExperienceCardProps) {
  const company = experience.metadata?.company || '';
  const role = experience.metadata?.role || '';
  const description = experience.metadata?.description || '';
  const startDate = experience.metadata?.start_date;
  const endDate = experience.metadata?.end_date;
  const isCurrent = experience.metadata?.current === true || experience.metadata?.current === 'true' || experience.metadata?.current === 'True';

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const dateRange = startDate
    ? `${formatDate(startDate)} — ${isCurrent ? 'Present' : formatDate(endDate)}`
    : '';

  return (
    <div className="relative flex gap-6">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-slate-900 z-10 flex-shrink-0 mt-1" />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500/30 to-purple-500/10 mt-2" />
        )}
      </div>

      {/* Card */}
      <div className="glass-card hover-glow p-6 mb-8 flex-1 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{experience.title || role}</h3>
            {company && (
              <p className="text-blue-400 font-medium text-sm">{company}</p>
            )}
          </div>
          {dateRange && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300 font-medium flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dateRange}
            </span>
          )}
        </div>

        {isCurrent && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Current Position
          </span>
        )}

        {description && (
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
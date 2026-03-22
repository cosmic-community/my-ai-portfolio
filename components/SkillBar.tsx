'use client';

import { getMetafieldValue } from '@/lib/cosmic';
import type { Skill } from '@/types';

interface SkillBarProps {
  skill: Skill;
}

const proficiencyColors: Record<string, string> = {
  expert: 'from-green-400 to-emerald-500',
  advanced: 'from-blue-400 to-blue-500',
  intermediate: 'from-purple-400 to-purple-500',
  beginner: 'from-amber-400 to-orange-500',
};

export default function SkillBar({ skill }: SkillBarProps) {
  const name = getMetafieldValue(skill.metadata?.name) || skill.title;
  const proficiency = getMetafieldValue(skill.metadata?.proficiency);
  const proficiencyLower = proficiency.toLowerCase();

  const getPercent = (): number => {
    switch (proficiencyLower) {
      case 'expert':
        return 95;
      case 'advanced':
        return 80;
      case 'intermediate':
        return 60;
      case 'beginner':
        return 35;
      default:
        return 50;
    }
  };

  const percent = getPercent();
  const gradientClass = proficiencyColors[proficiencyLower] || 'from-slate-400 to-slate-500';

  return (
    <div className="glass-card p-4 hover-glow transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs font-medium text-slate-400 capitalize">
          {proficiency || 'N/A'}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
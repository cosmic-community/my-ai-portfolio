import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import SkillBar from '@/components/SkillBar';
import { getSkills, getMetafieldValue } from '@/lib/cosmic';
import type { Skill } from '@/types';

export const metadata: Metadata = {
  title: 'Skills | My AI Portfolio',
  description: 'My technical skills and proficiency levels across various technologies.',
};

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory: Record<string, Skill[]> = {};
  for (const skill of skills) {
    const category = getMetafieldValue(skill.metadata?.category) || 'Other';
    if (!skillsByCategory[category]) {
      skillsByCategory[category] = [];
    }
    skillsByCategory[category].push(skill);
  }

  const categoryKeys = Object.keys(skillsByCategory);

  // Category emoji map
  const categoryEmojis: Record<string, string> = {
    'Programming Languages': '💻',
    'Frameworks': '⚙️',
    'AI/ML': '🧠',
    'Tools': '🔧',
    'Databases': '🗄️',
    'Cloud': '☁️',
    'DevOps': '🚀',
    'Design': '🎨',
    'Other': '📌',
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="A comprehensive overview of my technical expertise and proficiency levels"
      />

      {skills.length > 0 ? (
        <div className="space-y-12">
          {categoryKeys.map((category) => {
            const categorySkills = skillsByCategory[category];
            if (!categorySkills || categorySkills.length === 0) {
              return null;
            }

            const emoji = categoryEmojis[category] || '📌';

            return (
              <div key={category}>
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <span>{emoji}</span>
                  {category}
                  <span className="text-sm font-normal text-slate-500 ml-2">
                    ({categorySkills.length})
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No Skills Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Skills will appear here once you add them to your Cosmic CMS bucket.
          </p>
        </div>
      )}
    </div>
  );
}
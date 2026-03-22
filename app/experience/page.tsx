import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import ExperienceCard from '@/components/ExperienceCard';
import { getWorkExperience } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Experience | My AI Portfolio',
  description: 'My professional work experience and career journey.',
};

export default async function ExperiencePage() {
  const experiences = await getWorkExperience();

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="Work Experience"
        subtitle="My professional journey and career milestones"
      />

      {experiences.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No Experience Entries Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Work experience entries will appear here once you add them to your Cosmic CMS bucket.
          </p>
        </div>
      )}
    </div>
  );
}
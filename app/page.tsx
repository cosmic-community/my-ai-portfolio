import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import SkillBar from '@/components/SkillBar';
import ExperienceCard from '@/components/ExperienceCard';
import { getFeaturedProjects, getSkills, getWorkExperience, getMetafieldValue } from '@/lib/cosmic';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My AI Portfolio | AI Engineer & Full Stack Developer',
  description:
    'Explore my AI development portfolio featuring projects in machine learning, full stack development, and cutting-edge AI technologies.',
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'My AI Portfolio',
      url: 'https://my-ai-portfolio.cosmic.site',
      description:
        'A creative portfolio showcasing AI development projects, skills, and work experience.',
    },
    {
      '@type': 'Person',
      name: 'AI Developer',
      url: 'https://my-ai-portfolio.cosmic.site',
      jobTitle: 'AI Engineer & Full Stack Developer',
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'TensorFlow',
        'React',
        'Next.js',
        'TypeScript',
        'Python',
        'Node.js',
      ],
    },
  ],
};

export default async function HomePage() {
  const [projects, skills, experiences] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getWorkExperience(),
  ]);

  const displayedSkills = skills.slice(0, 8);
  const displayedExperiences = experiences.slice(0, 3);

  // Group skills by category for display
  const skillCategories: Record<string, typeof skills> = {};
  for (const skill of displayedSkills) {
    const category = getMetafieldValue(skill.metadata?.category) || 'Other';
    if (!skillCategories[category]) {
      skillCategories[category] = [];
    }
    skillCategories[category].push(skill);
  }

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of my latest AI and development projects"
        />
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No projects found yet. Add some in Cosmic!</p>
          </div>
        )}
        {projects.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with"
        />
        {displayedSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedSkills.map((skill) => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No skills found yet. Add some in Cosmic!</p>
          </div>
        )}
        {skills.length > 8 && (
          <div className="text-center mt-10">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
            >
              View All Skills
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Experience Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey"
        />
        {displayedExperiences.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            {displayedExperiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isLast={index === displayedExperiences.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No experience entries found yet. Add some in Cosmic!</p>
          </div>
        )}
        {experiences.length > 3 && (
          <div className="text-center mt-10">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
            >
              View Full Experience
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

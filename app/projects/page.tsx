import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Projects | My AI Portfolio',
  description: 'Browse my AI and development projects with live demos and source code.',
  openGraph: {
    title: 'Projects | My AI Portfolio',
    description: 'Browse my AI and development projects with live demos and source code.',
    url: '/projects',
  },
  alternates: {
    canonical: '/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="All Projects"
        subtitle="A comprehensive showcase of my development work, including live demos, source code, and tech stacks."
      />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No Projects Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Projects will appear here once you add them to your Cosmic CMS bucket.
          </p>
        </div>
      )}
    </div>
  );
}

// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects, getMetafieldValue } from '@/lib/cosmic';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | My AI Portfolio' };
  }

  return {
    title: `${project.title} | My AI Portfolio`,
    description: project.metadata?.description || `Details about the ${project.title} project.`,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const screenshot = project.metadata?.screenshot;
  const description = project.metadata?.description || '';
  const techStack = getMetafieldValue(project.metadata?.tech_stack);
  const liveUrl = project.metadata?.live_url;
  const githubUrl = project.metadata?.github_url;

  const techTags = techStack
    ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-6">
        {project.title}
      </h1>

      {/* Screenshot */}
      {screenshot?.imgix_url && (
        <div className="glass-card overflow-hidden mb-8">
          <img
            src={`${screenshot.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-4 mb-8">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Live Demo
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View Source Code
          </a>
        )}
      </div>

      {/* Tech Stack */}
      {techTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
            About This Project
          </h2>
          <div className="text-slate-300 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
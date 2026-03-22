import Link from 'next/link';
import type { Project } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const screenshot = project.metadata?.screenshot;
  const techStack = getMetafieldValue(project.metadata?.tech_stack);
  const liveUrl = project.metadata?.live_url;
  const githubUrl = project.metadata?.github_url;
  const description = project.metadata?.description || '';

  const techTags = techStack
    ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div
      className={`glass-card hover-glow group overflow-hidden transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {/* Screenshot */}
      <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden">
        <div className="aspect-video bg-slate-800 relative">
          {screenshot?.imgix_url ? (
            <img
              src={`${screenshot.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={project.title}
              width={400}
              height={225}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 mb-2">
            {project.title}
          </h3>
        </Link>

        {description && (
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tech Tags */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techTags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
            {techTags.length > 5 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-700/50 text-slate-400">
                +{techTags.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-700/50">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-400 transition-colors"
          >
            Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
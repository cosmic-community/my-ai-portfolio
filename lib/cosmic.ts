import { createBucketClient } from '@cosmicjs/sdk';
import type { Project, Skill, WorkExperience } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.objects as Project[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => {
    const val = p.metadata?.featured;
    return val === true || val === 'true' || val === 'True';
  });
  return featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'projects',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.object as Project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.objects as Skill[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    const experiences = response.objects as WorkExperience[];
    return experiences.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '1970-01-01').getTime();
      const dateB = new Date(b.metadata?.start_date || '1970-01-01').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching work experience:', error);
    return [];
  }
}

export function getProficiencyPercent(proficiency: string): number {
  const lower = proficiency.toLowerCase();
  switch (lower) {
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
}
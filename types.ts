export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface SelectDropdownField {
  key: string;
  value: string;
}

export interface CosmicMedia {
  url: string;
  imgix_url: string;
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    description?: string;
    screenshot?: CosmicMedia;
    tech_stack?: string;
    live_url?: string;
    github_url?: string;
    featured?: boolean | string;
  };
}

export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    category?: string | SelectDropdownField;
    proficiency?: string | SelectDropdownField;
  };
}

export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    company?: string;
    role?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean | string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}
export interface ProjectLink {
    url: string;
    title: string;
}

export interface ProjectArtifact {
    url: string;
    alt: string;
    type: "image" | "pdf" | "iframe";
}

export interface Project {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    links?: ProjectLink[];
    artifacts?: ProjectArtifact[];
    tags: string[];
}

export interface Post {
    id: string;
    title: string;
    description?: string;
    body?: string;
    createdAt: Date;
    updatedAt?: Date;
    tags: string[];
}

export interface Experience {
    period: string;
    company: string;
    role: string;
    description: string[];
}

/**
 * Frontmatter shape for blog post markdown files under content/blog/*.md
 */
export interface PostFrontmatter {
    title: string;
    description?: string;
    created_at: string;
    updated_at?: string;
    tags?: string[];
}

/**
 * Frontmatter shape for project markdown files under content/projects/*.md
 */
export interface ProjectFrontmatter {
    title: string;
    description?: string;
    created_at: string;
    updated_at: string;
    thumbnail: string;
    tags?: string[];
    links?: ProjectLink[];
    artifacts?: ProjectArtifact[];
}

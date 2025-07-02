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
    id: number;
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
    id: number;
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

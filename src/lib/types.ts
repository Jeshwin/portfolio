export interface Project {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

export interface Post {
    id: number;
    title: string;
    description?: string;
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

export interface Project {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

export interface Post {
    id: string;
    title: string;
    description?: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

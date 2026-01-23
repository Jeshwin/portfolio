import Papa from "papaparse";
import yaml from "yaml";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {
    Project,
    Post,
    ProjectCSVRow,
    PostCSVRow,
    ProjectYAML,
} from "./types";

// Base URL for S3 bucket
const S3_BASE_URL = "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com";
const CONTENT_BASE = `${S3_BASE_URL}/content`;

// Revalidation time for ISR (in seconds)
const REVALIDATE_TIME = 3600; // 1 hour

// ==================== Projects ====================

/**
 * Fetch all projects metadata from projects.csv
 */
export async function getProjects(): Promise<Project[]> {
    const csvUrl = `${CONTENT_BASE}/projects/projects.csv`;

    const response = await fetch(csvUrl, {
        next: {revalidate: REVALIDATE_TIME},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch projects CSV: ${response.status}`);
    }

    const csvText = await response.text();
    const {data} = Papa.parse<ProjectCSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
    });

    // Transform CSV rows to Project objects
    const projects: Project[] = data.map((row) => ({
        id: row.id,
        title: row.title,
        thumbnail: row.thumbnail,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        description: row.description,
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
    }));

    // Sort by created date descending
    return projects.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
}

/**
 * Fetch single project by ID (filename without extension)
 */
export async function getProject(id: string): Promise<Project> {
    const yamlUrl = `${CONTENT_BASE}/projects/${id}.yaml`;

    const response = await fetch(yamlUrl, {
        next: {revalidate: REVALIDATE_TIME},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch project ${id}: ${response.status}`);
    }

    const yamlText = await response.text();
    const data = yaml.parse(yamlText) as ProjectYAML;

    return {
        id,
        title: data.title,
        thumbnail: data.thumbnail,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        description: data.description,
        links: data.links,
        artifacts: data.artifacts,
        tags: data.tags || [],
    };
}

// ==================== Blog Posts ====================

/**
 * Fetch all posts metadata from posts.csv
 */
export async function getPosts(): Promise<Post[]> {
    const csvUrl = `${CONTENT_BASE}/blog/posts.csv`;

    const response = await fetch(csvUrl, {
        next: {revalidate: REVALIDATE_TIME},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch posts CSV: ${response.status}`);
    }

    const csvText = await response.text();
    const {data} = Papa.parse<PostCSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
    });

    const posts: Post[] = data.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        createdAt: new Date(row.created_at),
        updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()) : [],
    }));

    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/**
 * Fetch single post by ID with full body content
 */
export async function getPost(id: string): Promise<Post> {
    const mdUrl = `${CONTENT_BASE}/blog/${id}.md`;

    const response = await fetch(mdUrl, {
        next: {revalidate: REVALIDATE_TIME},
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch post ${id}: ${response.status}`);
    }

    const mdText = await response.text();
    const {data: frontmatter, content} = matter(mdText);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const bodyHtml = processedContent.toString();

    return {
        id,
        title: frontmatter.title,
        description: frontmatter.description,
        body: bodyHtml,
        createdAt: new Date(frontmatter.created_at),
        updatedAt: frontmatter.updated_at
            ? new Date(frontmatter.updated_at)
            : undefined,
        tags: frontmatter.tags || [],
    };
}

// ==================== Static Generation Helpers ====================

/**
 * Get all project IDs for static generation
 */
export async function getAllProjectIds(): Promise<string[]> {
    const projects = await getProjects();
    return projects.map((p) => p.id);
}

/**
 * Get all post IDs for static generation
 */
export async function getAllPostIds(): Promise<string[]> {
    const posts = await getPosts();
    return posts.map((p) => p.id);
}

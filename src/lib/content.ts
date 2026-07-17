import type {
    Post,
    Project,
    PostFrontmatter,
    ProjectFrontmatter,
} from "./types";

// ============================================================================
// The `markdown()` Vite plugin (see vite-plugin-markdown.ts) transforms every
// `.md` file into a plain JS module exporting `{ frontmatter, html }` at
// transform time - gray-matter/remark/js-yaml run inside the Vite process
// (Node) only. This module just assembles those pre-processed results into
// the Post/Project shapes the rest of the app expects. No markdown parsing,
// no Buffer-dependent code, and nothing Node-specific ships to the browser.
// ============================================================================

interface MarkdownModule<T> {
    frontmatter: T;
    html: string;
}

const blogModules = import.meta.glob<MarkdownModule<PostFrontmatter>>(
    "/content/blog/*.md",
    {import: "default", eager: true}
);

const projectModules = import.meta.glob<MarkdownModule<ProjectFrontmatter>>(
    "/content/projects/*.md",
    {import: "default", eager: true}
);

/** Extract "making-my-website" from "/content/blog/making-my-website.md". */
function pathToId(filepath: string): string {
    const name = filepath.split("/").pop() ?? "";
    return name.replace(/\.md$/, "");
}

// ==================== Blog Posts ====================

const posts: Post[] = Object.entries(blogModules)
    .map(([filepath, mod]) => {
        const id = pathToId(filepath);
        const fm = mod.frontmatter;
        const post: Post = {
            id,
            title: fm.title,
            description: fm.description,
            body: mod.html,
            createdAt: new Date(fm.created_at),
            updatedAt: fm.updated_at ? new Date(fm.updated_at) : undefined,
            tags: fm.tags ?? [],
        };
        return post;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

const postsById = new Map(posts.map((p) => [p.id, p]));

export function getPosts(): Post[] {
    return posts;
}

export function getPost(id: string): Post {
    const post = postsById.get(id);
    if (!post) throw new Error(`Blog post not found: ${id}`);
    return post;
}

export function getAllPostIds(): string[] {
    return posts.map((p) => p.id);
}

// ==================== Projects ====================

const projects: Project[] = Object.entries(projectModules)
    .map(([filepath, mod]) => {
        const id = pathToId(filepath);
        const fm = mod.frontmatter;
        const project: Project = {
            id,
            title: fm.title,
            thumbnail: fm.thumbnail,
            createdAt: new Date(fm.created_at),
            updatedAt: new Date(fm.updated_at),
            description: mod.html,
            links: fm.links,
            artifacts: fm.artifacts,
            tags: fm.tags ?? [],
        };
        return project;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

const projectsById = new Map(projects.map((p) => [p.id, p]));

export function getProjects(): Project[] {
    return projects;
}

export function getProject(id: string): Project {
    const project = projectsById.get(id);
    if (!project) throw new Error(`Project not found: ${id}`);
    return project;
}

export function getAllProjectIds(): string[] {
    return projects.map((p) => p.id);
}

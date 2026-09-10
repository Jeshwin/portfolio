import {
    Home,
    User,
    Mail,
    Notebook,
    Bookmark,
    FileText,
    Box,
    FilePlus2,
    FileQuestion,
    type LucideIcon,
} from "lucide-react";
import {Home as HomePage} from "@/pages/Home";
import {About} from "@/pages/About";
import {Contact} from "@/pages/Contact";
import {ProjectList} from "@/pages/ProjectList";
import {BlogList} from "@/pages/BlogList";
import {BlogPost} from "@/pages/BlogPost";
import {Project} from "@/pages/Project";
import {NewTab} from "@/pages/NewTab";
import {NotFound} from "@/pages/NotFound";
import {getPost, getProject, hasPost, hasProject} from "./content";

/**
 * Every "page" is identified by a `PageId`. This module is the single source
 * of truth tying each id to its URL, its tab presentation, and the component
 * that renders it - replacing the three parallel switch statements that used
 * to live in tabs.tsx (`renderPane`, `tabIcon`, `tabIconColor`).
 *
 * Consumers: <RouteShell>, <StaticDocument>, <Seo>, the URL-sync hook, the
 * sidebar, and tabs.tsx itself.
 */
export type PageId =
    | "home"
    | "about"
    | "contact"
    | "projects"
    | "blog"
    | "blog-post"
    | "project"
    | "blank"
    | "not-found";

export interface PageDef {
    /** Default tab label / nav label. */
    label: string;
    icon: LucideIcon;
    /** Tab + explorer icon color. `undefined` inherits the text color. */
    color?: string;
    /**
     * URL for this page. Dynamic pages use a `:param` placeholder; pages with
     * no URL of their own (the blank new-tab page) omit it entirely.
     */
    path?: string;
    /** Name of the react-router param in `path`, for dynamic pages. */
    param?: string;
    render: (slug?: string) => JSX.Element;
    /** Whether a slug resolves to real content. Dynamic pages only. */
    exists?: (slug: string) => boolean;
    /** Human label for a given slug, used for tab titles and nav links. */
    labelFor?: (slug: string) => string;
}

export const PAGES: Record<PageId, PageDef> = {
    home: {
        label: "Home",
        icon: Home,
        color: "#EF5B5B",
        path: "/",
        render: () => <HomePage />,
    },
    about: {
        label: "About",
        icon: User,
        color: "#cdcddc",
        path: "/about",
        render: () => <About />,
    },
    contact: {
        label: "Contact",
        icon: Mail,
        color: "#fafeff",
        path: "/contact",
        render: () => <Contact />,
    },
    blog: {
        label: "Blog",
        icon: Bookmark,
        color: "#FF6719",
        path: "/blog",
        render: () => <BlogList />,
    },
    "blog-post": {
        label: "Blog Post",
        icon: FileText,
        color: "#C0FFEE",
        path: "/blog/:postId",
        param: "postId",
        render: (slug) => <BlogPost postId={slug ?? ""} />,
        exists: hasPost,
        labelFor: (slug) => (hasPost(slug) ? getPost(slug).title : slug),
    },
    projects: {
        label: "Projects",
        icon: Notebook,
        color: "#4D5D9A",
        path: "/projects",
        render: () => <ProjectList />,
    },
    project: {
        label: "Project",
        icon: Box,
        color: "#B07E34",
        path: "/projects/:projectId",
        param: "projectId",
        render: (slug) => <Project projectId={slug ?? ""} />,
        exists: hasProject,
        labelFor: (slug) => (hasProject(slug) ? getProject(slug).title : slug),
    },
    blank: {
        label: "New Tab",
        icon: FilePlus2,
        render: () => <NewTab />,
    },
    "not-found": {
        label: "Not Found",
        icon: FileQuestion,
        path: "/404",
        render: () => <NotFound />,
    },
};

/** The param name a dynamic page reads its slug from, if any. */
export function slugParamFor(page: PageId): string | undefined {
    return PAGES[page].param;
}

/**
 * The URL for a page, with the slug substituted for dynamic pages. Returns
 * `undefined` for pages that have no URL, or when a dynamic page is missing
 * its slug.
 */
export function pathFor(page: PageId, slug?: string): string | undefined {
    const {path, param} = PAGES[page];
    if (!path) return undefined;
    if (!param) return path;
    if (!slug) return undefined;
    return path.replace(`:${param}`, encodeURIComponent(slug));
}

/**
 * Inverse of `pathFor`: resolve a pathname to its page and slug. Unknown
 * paths - and dynamic paths whose slug has no content - resolve to
 * `not-found`, so a typed URL degrades gracefully instead of throwing.
 */
export function pageForPath(pathname: string): {page: PageId; slug?: string} {
    // Normalize: strip a trailing slash (but keep the root) and any query or
    // hash a caller may have passed along.
    const clean =
        pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

    for (const [id, def] of Object.entries(PAGES) as [PageId, PageDef][]) {
        if (!def.path || def.param) continue;
        if (def.path === clean) return {page: id};
    }

    for (const [id, def] of Object.entries(PAGES) as [PageId, PageDef][]) {
        if (!def.path || !def.param) continue;
        const prefix = def.path.slice(0, def.path.indexOf(`:${def.param}`));
        if (!clean.startsWith(prefix)) continue;
        const rest = clean.slice(prefix.length);
        // A dynamic segment matches exactly one path segment.
        if (!rest || rest.includes("/")) continue;
        const slug = decodeURIComponent(rest);
        if (def.exists?.(slug) === false) return {page: "not-found"};
        return {page: id, slug};
    }

    return {page: "not-found"};
}

/** Label to show for a page + slug: the content title where there is one. */
export function labelFor(page: PageId, slug?: string): string {
    const def = PAGES[page];
    return slug && def.labelFor ? def.labelFor(slug) : def.label;
}

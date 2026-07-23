import type {RouteRecord} from "vite-react-ssg";
import App from "@/App";
import {getAllPostIds, getAllProjectIds} from "@/lib/content";

/**
 * Route tree used by both dev (react-router-dom) and the SSG prerenderer
 * (vite-react-ssg iterates these plus each dynamic route's getStaticPaths).
 *
 * Lazy imports let vite-react-ssg code-split each page so the initial JS
 * payload only contains the currently-rendered route.
 */
export const routes: RouteRecord[] = [
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                lazy: () => import("@/pages/LayoutPage"),
            },
            {
                path: "about",
                lazy: () => import("@/pages/AboutPage"),
            },
            {
                path: "contact",
                lazy: () => import("@/pages/ContactPage"),
            },
            {
                path: "blog",
                lazy: () => import("@/pages/BlogListPage"),
            },
            {
                path: "layout",
                lazy: () => import("@/pages/LayoutPage"),
            },
            {
                path: "blog/:postId",
                lazy: () => import("@/pages/BlogPostPage"),
                entry: "src/pages/BlogPostPage.tsx",
                getStaticPaths: () =>
                    getAllPostIds().map((id) => `/blog/${id}`),
            },
            {
                path: "projects",
                lazy: () => import("@/pages/ProjectListPage"),
            },
            {
                path: "projects/:projectId",
                lazy: () => import("@/pages/ProjectPage"),
                entry: "src/pages/ProjectPage.tsx",
                getStaticPaths: () =>
                    getAllProjectIds().map((id) => `/projects/${id}`),
            },
            {
                path: "*",
                lazy: () => import("@/pages/NotFoundPage"),
            },
        ],
    },
];

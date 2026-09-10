import type {RouteRecord} from "vite-react-ssg";
import App from "@/App";
import RouteShell from "@/components/route-shell";
import {getAllPostIds, getAllProjectIds} from "@/lib/content";

/**
 * Every page has a real, crawlable URL again. Each route pre-renders a styled
 * document and then hands over to the react-layman workspace on hydration -
 * see src/components/route-shell.tsx.
 *
 * No `lazy` here on purpose: the PAGES registry statically imports all nine
 * page components anyway, so a route-level chunk boundary would buy nothing.
 * `entry` stays on the dynamic routes as a preload hint.
 */
export const routes: RouteRecord[] = [
    {
        path: "/",
        Component: App,
        entry: "src/App.tsx",
        children: [
            {index: true, element: <RouteShell page="home" />},
            {path: "about", element: <RouteShell page="about" />},
            {path: "contact", element: <RouteShell page="contact" />},
            {path: "blog", element: <RouteShell page="blog" />},
            {
                path: "blog/:postId",
                element: <RouteShell page="blog-post" />,
                entry: "src/pages/BlogPost.tsx",
                getStaticPaths: () =>
                    getAllPostIds().map((id) => `/blog/${id}`),
            },
            {path: "projects", element: <RouteShell page="projects" />},
            {
                path: "projects/:projectId",
                element: <RouteShell page="project" />,
                entry: "src/pages/Project.tsx",
                getStaticPaths: () =>
                    getAllProjectIds().map((id) => `/projects/${id}`),
            },
            // An explicit /404 route: vite-react-ssg filters "*" out of the
            // prerender list, so the catch-all alone would never be written to
            // disk and nginx would have nothing to serve as its error page.
            {path: "404", element: <RouteShell page="not-found" />},
            {path: "*", element: <RouteShell page="not-found" />},
        ],
    },
];

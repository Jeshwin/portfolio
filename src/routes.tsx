import type {RouteRecord} from "vite-react-ssg";
import App from "@/App";

/**
 * The site is a single page now - the entire experience lives inside the
 * react-layman workspace rendered by <App/>. We keep one route so
 * vite-react-ssg can still prerender the shell HTML.
 */
export const routes: RouteRecord[] = [
    {
        path: "/",
        Component: App,
    },
];

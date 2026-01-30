import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/layout";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import ProjectsPage from "./pages/projects";
import ProjectPage from "./pages/projects/project";
import BlogPage from "./pages/blog";
import PostPage from "./pages/blog/post";
import NotFoundPage from "./pages/not-found";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "projects",
                element: <ProjectsPage />,
            },
            {
                path: "projects/:projectId",
                element: <ProjectPage />,
            },
            {
                path: "blog",
                element: <BlogPage />,
            },
            {
                path: "blog/:postId",
                element: <PostPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

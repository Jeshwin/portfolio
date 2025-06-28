import AllProjects from "@/components/allProjects";
import {Suspense} from "react";
import {Post} from "src/lib/types";

function getPosts() {
    // fetch("/api/get/projects");
    console.log("Getting projects...");
    const projects = [
        {
            id: "1",
            title: "Project #1",
            thumbnail:
                "https://images.pexels.com/photos/13589781/pexels-photo-13589781.jpeg",
            createdAt: new Date("2023-05-15T10:30:00Z"),
            updatedAt: new Date("2023-11-20T15:45:00Z"),
            tags: ["dev", "tmp"],
        },
        {
            id: "2",
            title: "Project Dos",
            thumbnail:
                "https://images.pexels.com/photos/32696235/pexels-photo-32696235.jpeg",
            createdAt: new Date("2024-02-14T18:22:00Z"),
            updatedAt: new Date("2023-09-03T11:47:00Z"),
            tags: ["tmp", "spanish"],
        },
    ];

    return Promise.resolve(projects);
}

export default function ProjectsPage() {
    const posts = getPosts();

    return (
        <div className="p-5 mx-auto mt-16 lg:w-3/4">
            <div className="mb-12 flex">
                <div className="font-bold text-5xl flex-grow">Projects</div>
            </div>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <AllProjects posts={posts} />
                </Suspense>
            </ul>
        </div>
    );
}

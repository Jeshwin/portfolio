import AllPosts from "@/components/allPosts";
import {Suspense} from "react";

function getPosts() {
    console.log("Getting posts...");
    const posts = [
        {
            id: "1",
            title: "Blog Post #1",
            thumbnail:
                "https://images.pexels.com/photos/13589781/pexels-photo-13589781.jpeg",
            createdAt: new Date("2001-09-11T10:30:00Z"),
            updatedAt: new Date("2020-03-21T15:45:00Z"),
            tags: ["dev", "tmp"],
        },
        {
            id: "2",
            title: "Entrada de blog número dos",
            description: "Por favor, no se encuentra las manos!",
            thumbnail:
                "https://images.pexels.com/photos/32696235/pexels-photo-32696235.jpeg",
            createdAt: new Date("2000-02-22T18:22:00Z"),
            updatedAt: new Date("2013-12-28T11:47:00Z"),
            tags: ["tmp", "spanish"],
        },
    ];

    return Promise.resolve(posts);
}

export default function PostsPage() {
    const posts = getPosts();

    return (
        <div className="container mx-auto my-16">
            <div className="mb-12 flex font-bold text-7xl flex-grow">
                Blog Posts
            </div>
            <ul className="flex flex-col space-y-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <AllPosts posts={posts} />
                </Suspense>
            </ul>
        </div>
    );
}

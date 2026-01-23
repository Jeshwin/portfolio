import AllPosts from "@/components/all-posts";
import {getPosts} from "src/lib/s3";

export default async function PostsPage() {
    const posts = await getPosts();
    return (
        <div className="container mx-auto my-16">
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Blog Posts
            </div>
            <ul className="flex flex-col space-y-4">
                <AllPosts posts={posts} />
            </ul>
        </div>
    );
}

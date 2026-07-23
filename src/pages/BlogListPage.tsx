import AllPosts from "@/components/all-posts";
import {getPosts} from "@/lib/content";

export function Component() {
    const posts = getPosts();
    return (
        <div className="w-full h-full overflow-auto">
            <div className="container mx-auto p-8">
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Blog Posts
                </div>
                <ul className="flex flex-col space-y-4">
                    <AllPosts posts={posts} />
                </ul>
            </div>
        </div>
    );
}

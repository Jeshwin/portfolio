import AllPosts from "@/components/all-posts";
import {getPosts} from "@/lib/content";

export function BlogList() {
    const posts = getPosts();
    return (
        <div className="w-full h-full overflow-auto">
            <div className="container mx-auto p-8">
                <h1 className="mb-8 flex font-bold text-4xl flex-grow">
                    Blog Posts
                </h1>
                <ul className="flex flex-col space-y-4 border-primary *:border-b">
                    <AllPosts posts={posts} />
                </ul>
            </div>
        </div>
    );
}

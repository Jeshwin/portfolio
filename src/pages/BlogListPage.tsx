import {Head} from "vite-react-ssg";
import AllPosts from "@/components/all-posts";
import {getPosts} from "@/lib/content";

export function Component() {
    const posts = getPosts();
    return (
        <div className="container mx-auto my-16">
            <Head>
                <title>Blog - Jeshwin&apos;s Portfolio</title>
            </Head>
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Blog Posts
            </div>
            <ul className="flex flex-col space-y-4">
                <AllPosts posts={posts} />
            </ul>
        </div>
    );
}

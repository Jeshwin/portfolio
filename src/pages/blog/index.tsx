import {useState, useEffect} from "react";
import {Helmet} from "react-helmet-async";
import AllPosts from "@/components/all-posts";
import {getPosts} from "src/lib/s3";
import {Post} from "src/lib/types";

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <>
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Blog Posts
                </div>
                <div className="text-xl text-muted-foreground">Loading posts...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Blog Posts
                </div>
                <div className="text-xl text-destructive">Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Blog | Jeshwin's Portfolio</title>
                <meta name="description" content="Read Jeshwin Prince's blog posts" />
            </Helmet>
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Blog Posts
            </div>
            <ul className="flex flex-col space-y-4">
                <AllPosts posts={posts} />
            </ul>
        </>
    );
}

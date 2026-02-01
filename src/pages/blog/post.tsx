import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Badge} from "@/components/ui/badge";
import DOMPurify from "isomorphic-dompurify";
import {getPost} from "src/lib/s3";
import {Post} from "src/lib/types";

export default function PostPage() {
    const {postId} = useParams<{postId: string}>();
    const [blogPost, setBlogPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postId) return;

        getPost(postId)
            .then(setBlogPost)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) {
        return (
            <div className="text-xl text-muted-foreground">Loading post...</div>
        );
    }

    if (error || !blogPost) {
        return (
            <div className="text-xl text-destructive">Error: {error || "Post not found"}</div>
        );
    }

    const createdDate = new Date(blogPost.createdAt);
    const updatedDate = blogPost.updatedAt
        ? new Date(blogPost.updatedAt)
        : createdDate;
    const isDifferentDay = createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <>
            <Helmet>
                <title>{blogPost.title} | Jeshwin's Portfolio</title>
                <meta name="description" content={blogPost.description} />
            </Helmet>
            <div className="mb-4 flex font-bold text-6xl flex-grow">
                    {blogPost.title}
                </div>
                <ul className="w-full flex flex-wrap gap-2 my-4 *:text-base *:font-normal *:px-3 -ml-1">
                    {blogPost.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </ul>
                <div className="text-base flex space-x-4">
                    <div>
                        {createdDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </div>
                    {isDifferentDay && (
                        <div>
                            Updated:{" "}
                            {updatedDate.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                    )}
                </div>
                <div className="mb-6"></div>
                <div
                    className="prose dark:prose-invert prose-primary mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blogPost.body || ""),
                    }}
                />
        </>
    );
}

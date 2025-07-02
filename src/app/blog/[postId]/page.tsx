import {Badge} from "@/components/ui/badge";
import DOMPurify from "isomorphic-dompurify";
import {PoolClient} from "pg";
import {pool} from "src/lib/db";
import {Post} from "src/lib/types";

interface BlogPostRow {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    tags: string | null;
}

async function getPost(id: string): Promise<Post> {
    let client: PoolClient;

    try {
        // Get database client from pool
        client = await pool.connect();

        // Execute query
        const result = await client.query<BlogPostRow>(`
            SELECT bp.id,
                bp.title,
                bp.description,
                bp.body,
                bp.created_at,
                bp.updated_at,
                STRING_AGG(
                    t.name,
                    ', '
                    ORDER BY t.name
                ) as tags
            FROM blog_posts bp
                LEFT JOIN blog_post_tags bpt ON bp.id = bpt.blog_post_id
                LEFT JOIN tags t ON bpt.tag_id = t.id
            WHERE bp.id=${id}
            GROUP BY bp.id,
                bp.title,
                bp.description,
                bp.created_at
            ORDER BY bp.created_at DESC;
        `);

        // Transform database rows to API response format
        const blogPost: Post = {
            ...result.rows[0],
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
            tags: result.rows[0].tags
                ? result.rows[0].tags
                      .split(", ")
                      .filter((tag) => tag.trim() !== "")
                : [],
        };

        console.dir(blogPost);

        return blogPost;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to fetch blog post :(");
    } finally {
        // Always release the client back to the pool
        if (client) {
            client.release();
        }
    }
}

export default async function PostPage({
    params,
}: {
    params: Promise<{postId: string}>;
}) {
    const {postId} = await params;
    const blogPost = await getPost(postId);
    const createdDate = new Date(blogPost.createdAt);
    const updatedDate = new Date(blogPost.updatedAt);

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <div className="container mx-auto my-16">
            <div className="mb-4 flex font-bold text-7xl flex-grow">
                {blogPost.title}
            </div>
            <ul className="w-full flex flex-wrap gap-1 my-2 *:text-xl *:font-normal *:px-3 -ml-2">
                {blogPost.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                ))}
            </ul>
            <div className="text-xl text-muted-foreground flex space-x-4">
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
            <div className="mb-16"></div>
            <div
                className="prose min-w-full prose-xl dark:prose-invert prose-primary mx-auto"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blogPost.body),
                }}
            />
        </div>
    );
}

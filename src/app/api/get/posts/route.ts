import {NextRequest, NextResponse} from "next/server";
import {PoolClient} from "pg";
import {pool} from "src/lib/db";
import {Post} from "src/lib/types";

interface BlogPostRow {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    tags: string | null;
}

// SQL query
const GET_BLOG_POSTS_QUERY = `
  SELECT bp.id,
      bp.title,
      bp.description,
      bp.created_at,
      STRING_AGG(
          t.name,
          ', '
          ORDER BY t.name
      ) as tags
  FROM blog_posts bp
      LEFT JOIN blog_post_tags bpt ON bp.id = bpt.blog_post_id
      LEFT JOIN tags t ON bpt.tag_id = t.id
  GROUP BY bp.id,
      bp.title,
      bp.description,
      bp.created_at
  ORDER BY bp.created_at DESC;
`;

export async function GET(request: NextRequest): Promise<NextResponse> {
    let client: PoolClient;

    try {
        // Get database client from pool
        client = await pool.connect();

        // Execute query
        const result = await client.query<BlogPostRow>(GET_BLOG_POSTS_QUERY);

        // Transform database rows to API response format
        const blogPosts: Post[] = result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            createdAt: row.created_at,
            tags: row.tags
                ? row.tags.split(", ").filter((tag) => tag.trim() !== "")
                : [],
        }));

        return NextResponse.json({
            success: true,
            data: blogPosts,
            count: blogPosts.length,
        });
    } catch (error) {
        console.error("Database query error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch blog posts",
                details:
                    process.env.NODE_ENV === "development" ? error : undefined,
            },
            {status: 500}
        );
    } finally {
        // Always release the client back to the pool
        if (client) {
            client.release();
        }
    }
}

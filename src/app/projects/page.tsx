import AllProjects from "@/components/all-projects";
import {PoolClient} from "pg";
import {pool} from "src/lib/db";
import {Project} from "src/lib/types";

interface ProjectRow {
    id: number;
    title: string;
    thumbnail: string;
    created_at: Date;
    updated_at: Date;
    tags: string | null;
}

// SQL query
const GET_PROJECTS_QUERY = `
SELECT 
    p.id,
    p.title,
    p.thumbnail,
    p.created_at,
    p.updated_at,
    STRING_AGG(t.name, ', ' ORDER BY t.name) as tags
FROM projects p
LEFT JOIN project_tags pt ON p.id = pt.project_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id, p.title, p.created_at
ORDER BY p.created_at DESC;
`;

async function getProjects(): Promise<Project[]> {
    let client: PoolClient;

    try {
        // Get database client from pool
        client = await pool.connect();

        // Execute query
        const result = await client.query<ProjectRow>(GET_PROJECTS_QUERY);

        // Transform database rows to API response format
        const projects: Project[] = result.rows.map((row) => ({
            ...row,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            tags: row.tags
                ? row.tags.split(", ").filter((tag) => tag.trim() !== "")
                : [],
        }));

        return projects;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to fetch blog posts :(");
    } finally {
        // Always release the client back to the pool
        if (client) {
            client.release();
        }
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <div className="container mx-auto my-16">
            <div className="mb-12 flex font-bold text-7xl flex-grow">
                Projects
            </div>
            <ul className="grid grid-cols-3 gap-4">
                <AllProjects projects={projects} />
            </ul>
        </div>
    );
}

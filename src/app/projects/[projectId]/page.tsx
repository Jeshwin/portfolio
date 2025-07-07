import AllProjects from "@/components/all-projects";
import ProjectGallery from "@/components/project-gallery";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import {PoolClient} from "pg";
import {pool} from "src/lib/db";
import {ProjectArtifact, ProjectLink, Project} from "src/lib/types";

interface ProjectRow {
    id: number;
    title: string;
    thumbnail: string;
    created_at: Date;
    updated_at: Date;
    description: string;
    links: ProjectLink[];
    artifacts: ProjectArtifact[];
    tags: string | null;
}

async function getProject(id: string): Promise<Project> {
    let client: PoolClient;

    try {
        // Get database client from pool
        client = await pool.connect();

        // Execute query
        const result = await client.query<ProjectRow>(`
            SELECT 
                p.id,
                p.title,
                p.thumbnail,
                p.created_at,
                p.updated_at,
                p.description,
                p.links,
                p.artifacts,
                STRING_AGG(t.name, ', ' ORDER BY t.name) as tags
            FROM projects p
                LEFT JOIN project_tags pt ON p.id = pt.project_id
                LEFT JOIN tags t ON pt.tag_id = t.id
            WHERE p.id=${id}
            GROUP BY p.id, p.title, p.created_at
            ORDER BY p.created_at DESC;
        `);

        // Transform database rows to API response format
        const row = result.rows[0];
        const project: Project = {
            ...row,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            tags: row.tags
                ? row.tags.split(", ").filter((tag) => tag.trim() !== "")
                : [],
        };

        return project;
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

export default async function ProjectPage({
    params,
}: {
    params: Promise<{projectId: string}>;
}) {
    const {projectId} = await params;
    const project = await getProject(projectId);
    const createdDate = new Date(project.createdAt);
    const updatedDate = new Date(project.updatedAt);

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <div className="container mx-auto my-16">
            <div className="mb-12 flex gap-8 items-center">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={256}
                    height={256}
                    className="size-40 object-cover rounded-full"
                />
                <div>
                    <div className="flex flex-grow items-center gap-4 font-bold text-7xl">
                        <div>{project.title}</div>
                    </div>
                    <ul className="w-full flex flex-wrap gap-1 my-2 *:text-xl *:font-normal *:px-3 -ml-2">
                        {project.tags.map((tag, index) => (
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
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="text-5xl font-medium">Gallery</div>
                <ProjectGallery artifacts={project.artifacts} />
                <div className="text-5xl font-medium">Description</div>
                <p
                    className="text-xl"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(project.description),
                    }}
                />
                <div className="text-5xl font-medium">Links</div>
                <ul>
                    {project.links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.url}>
                                <Button
                                    variant="link"
                                    size="lg"
                                    className="text-xl"
                                >
                                    {link.title}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import ProjectGallery from "@/components/project-gallery";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import {getProject} from "src/lib/s3";
import {Project} from "src/lib/types";

export default function ProjectPage() {
    const {projectId} = useParams<{projectId: string}>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) return;

        getProject(projectId)
            .then(setProject)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [projectId]);

    if (loading) {
        return (
            <div className="container mx-auto my-16">
                <div className="text-xl text-muted-foreground">Loading project...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="container mx-auto my-16">
                <div className="text-xl text-destructive">Error: {error || "Project not found"}</div>
            </div>
        );
    }

    const createdDate = new Date(project.createdAt);
    const updatedDate = new Date(project.updatedAt);
    const isDifferentDay = createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <>
            <Helmet>
                <title>{project.title} | Jeshwin's Portfolio</title>
                <meta name="description" content={project.description} />
            </Helmet>
            <div className="container mx-auto my-16">
                <div className="mb-12 flex gap-8 items-center">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="size-40 object-cover rounded-full"
                    />
                    <div>
                        <div className="flex flex-grow items-center gap-4 font-bold text-6xl">
                            <div>{project.title}</div>
                        </div>
                        <ul className="w-full flex flex-wrap gap-2 my-2 *:text-base *:font-normal *:px-3 -ml-1">
                            {project.tags.map((tag, index) => (
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
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="text-4xl font-medium">Gallery</div>
                    {project.artifacts && <ProjectGallery artifacts={project.artifacts} />}
                    <div className="text-4xl font-medium">Description</div>
                    <p
                        className="text-base"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(project.description || ""),
                        }}
                    />
                    <div className="text-4xl font-medium">Links</div>
                    <ul>
                        {project.links?.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="link"
                                        size="lg"
                                        className="text-base"
                                    >
                                        {link.title}
                                    </Button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

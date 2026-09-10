import ProjectGallery from "@/components/project-gallery";
import {Button} from "@/components/ui/button";
import {getProject} from "@/lib/content";
import {formatDate, isDifferentDay, isoDate} from "@/lib/utils";

export function Project({projectId}: {projectId: string}) {
    const project = getProject(projectId);
    const wasUpdated = isDifferentDay(project.createdAt, project.updatedAt);

    return (
        <div className="h-full w-full overflow-auto">
            <article className="container mx-auto p-8">
                <header className="mb-8 flex gap-8 items-center">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        width={256}
                        height={256}
                        className="size-20 object-cover rounded-full"
                    />
                    <div>
                        <div className="flex flex-grow items-center gap-4 font-bold text-4xl mb-2">
                            <h1>{project.title}</h1>
                        </div>
                        <div className="text-base flex space-x-4">
                            <time dateTime={isoDate(project.createdAt)}>
                                {formatDate(project.createdAt)}
                            </time>
                            {wasUpdated && (
                                <time dateTime={isoDate(project.updatedAt)}>
                                    Updated: {formatDate(project.updatedAt)}
                                </time>
                            )}
                        </div>
                    </div>
                </header>
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-bold">Gallery</h2>
                    {project.artifacts && project.artifacts.length > 0 && (
                        <ProjectGallery artifacts={project.artifacts} />
                    )}
                    <h2 className="text-3xl font-bold">Description</h2>
                    <div
                        className="prose dark:prose-invert prose-primary max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: project.description || "",
                        }}
                    />
                    <h2 className="text-3xl font-bold">Links</h2>
                    <ul>
                        {project.links?.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="link"
                                        size="lg"
                                        className="text-base p-0"
                                    >
                                        {link.title}
                                    </Button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </div>
    );
}

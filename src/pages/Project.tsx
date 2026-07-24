import ProjectGallery from "@/components/project-gallery";
import {Button} from "@/components/ui/button";
import {getProject} from "@/lib/content";

export function Project({projectId}: {projectId: string}) {
    const project = getProject(projectId);
    const createdDate = new Date(project.createdAt);
    const updatedDate = new Date(project.updatedAt);

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <div className="h-full w-full overflow-auto">
            <div className="container mx-auto p-8">
                <div className="mb-8 flex gap-8 items-center">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        width={256}
                        height={256}
                        className="size-20 object-cover rounded-full"
                    />
                    <div>
                        <div className="flex flex-grow items-center gap-4 font-bold text-4xl mb-2">
                            <div>{project.title}</div>
                        </div>
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
                    <div className="text-3xl font-bold">Gallery</div>
                    {project.artifacts && project.artifacts.length > 0 && (
                        <ProjectGallery artifacts={project.artifacts} />
                    )}
                    <div className="text-3xl font-bold">Description</div>
                    <div
                        className="prose dark:prose-invert prose-primary max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: project.description || "",
                        }}
                    />
                    <div className="text-3xl font-bold">Links</div>
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
            </div>
        </div>
    );
}

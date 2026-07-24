import {Badge} from "./ui/badge";
import type {Project} from "@/lib/types";
import {makeTab, useOpenTab, useTabDrag} from "@/lib/tabs";

export default function ProjectCard({project}: {project: Project}) {
    const openTab = useOpenTab();
    const dragRef = useTabDrag(() => makeTab(project.title, "project", project.id));
    return (
        <div className="rounded-2xl bg-muted shadow-lg hover:opacity-70 active:scale-90 duration-75">
            <button
                ref={dragRef}
                onClick={() => openTab(makeTab(project.title, "project", project.id))}
                className="w-full text-left cursor-grab active:cursor-grabbing"
            >
                <figure>
                    <img
                        src={project.thumbnail}
                        width={1024}
                        height={1024}
                        alt={project.title}
                        className="w-full aspect-video object-cover rounded-t-2xl"
                    />
                </figure>
                <div className="p-4 flex flex-col items-start space-y-2">
                    <div className="break-words text-xl font-medium">
                        {project.title}
                        <div className="text-sm text-muted-foreground">
                            Last Updated:{" "}
                            {new Date(project.updatedAt).toLocaleDateString(
                                undefined,
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        </div>
                    </div>
                    <ul className="w-full flex flex-wrap gap-1 justify-end">
                        {project.tags.map((tag, index) => (
                            <Badge key={index}>{tag}</Badge>
                        ))}
                    </ul>
                </div>
            </button>
        </div>
    );
}

import type {Project} from "@/lib/types";
import {makeTab, useOpenTab, useTabDrag} from "@/lib/tabs";
import {pathFor} from "@/lib/routes-map";
import {useInteractive} from "@/lib/interactive";
import {formatDate, isoDate} from "@/lib/utils";

const CARD_CLASS =
    "rounded bg-muted shadow hover:opacity-70 active:scale-90 duration-75";
const INNER_CLASS = "block w-full text-left cursor-grab active:cursor-grabbing";

/**
 * Shared card content. Note "Last Updated" is a sibling of the <h3>, not a
 * child of it: a <div> nested inside a heading is invalid HTML, and the title
 * needs to be a heading for the document outline.
 */
function ProjectCardContent({project}: {project: Project}) {
    return (
        <>
            <figure>
                <img
                    src={project.thumbnail}
                    width={1024}
                    height={1024}
                    alt={project.title}
                    className="w-full aspect-square object-cover rounded-t"
                />
            </figure>
            <div className="p-4 flex flex-col items-start space-y-2">
                <div className="break-words text-xl font-medium">
                    <h3>{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        Last Updated:{" "}
                        <time dateTime={isoDate(project.updatedAt)}>
                            {formatDate(project.updatedAt)}
                        </time>
                    </p>
                </div>
            </div>
        </>
    );
}

/** Workspace variant: a drag source that opens the project as a tab. */
function ProjectCardTab({project}: {project: Project}) {
    const openTab = useOpenTab();
    const dragRef = useTabDrag(() =>
        makeTab(project.title, "project", project.id)
    );

    return (
        <div className={CARD_CLASS}>
            <button
                ref={dragRef}
                onClick={() =>
                    openTab(makeTab(project.title, "project", project.id))
                }
                className={INNER_CLASS}
            >
                <ProjectCardContent project={project} />
            </button>
        </div>
    );
}

/** Static variant: a real link, so crawlers and no-JS visitors can navigate. */
function ProjectCardLink({project}: {project: Project}) {
    return (
        <div className={CARD_CLASS}>
            <a href={pathFor("project", project.id)} className={INNER_CLASS}>
                <ProjectCardContent project={project} />
            </a>
        </div>
    );
}

/** See `useInteractive` - the hooks above can't run outside the workspace. */
export default function ProjectCard({project}: {project: Project}) {
    return useInteractive() ? (
        <ProjectCardTab project={project} />
    ) : (
        <ProjectCardLink project={project} />
    );
}

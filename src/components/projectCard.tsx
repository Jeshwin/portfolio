import Link from "next/link";
import Image from "next/image";
import {Badge} from "./ui/badge";
import {Project} from "src/lib/types";

export default function ProjectCard({project}: {project: Project}) {
    return (
        <div className="rounded-2xl bg-base-200 shadow-lg hover:opacity-70 active:scale-90 duration-75">
            <Link href={`/projects/${project.id}`}>
                <figure>
                    <Image
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
                        <div className="text-sm text-gray-500">
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
            </Link>
        </div>
    );
}

import ProjectGallery from "@/components/project-gallery";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import {getProject, getAllProjectIds} from "src/lib/s3";

export async function generateStaticParams() {
    const projectIds = await getAllProjectIds();
    return projectIds.map((projectId) => ({projectId}));
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
                <ProjectGallery artifacts={project.artifacts} />
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
                            <Link href={link.url}>
                                <Button
                                    variant="link"
                                    size="lg"
                                    className="text-base"
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

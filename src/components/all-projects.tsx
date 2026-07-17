import ProjectCard from "./project-card";
import type {Project} from "@/lib/types";

export default function AllProjects({projects}: {projects: Project[]}) {
    return (
        <>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </>
    );
}

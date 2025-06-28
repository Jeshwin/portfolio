"use client";
import {use} from "react";
import ProjectCard from "./projectCard";
import {Project} from "src/lib/types";

export default function AllProjects({
    projects,
}: {
    projects: Promise<Project[]>;
}) {
    const data = use(projects);
    return (
        <>
            {data.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </>
    );
}

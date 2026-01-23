import AllProjects from "@/components/all-projects";
import {getProjects} from "src/lib/s3";

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <div className="container mx-auto my-16">
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Projects
            </div>
            <ul className="grid grid-cols-3 gap-4">
                <AllProjects projects={projects} />
            </ul>
        </div>
    );
}

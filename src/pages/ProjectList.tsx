import AllProjects from "@/components/all-projects";
import {getProjects} from "@/lib/content";

export function ProjectList() {
    const projects = getProjects();
    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="container mx-auto p-8">
                <div className="mb-8 flex font-bold text-4xl flex-grow">
                    Projects
                </div>
                <ul className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
                    <AllProjects projects={projects} />
                </ul>
            </div>
        </div>
    );
}

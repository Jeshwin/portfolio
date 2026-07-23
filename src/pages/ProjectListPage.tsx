import AllProjects from "@/components/all-projects";
import {getProjects} from "@/lib/content";

export function Component() {
    const projects = getProjects();
    return (
        <div className="w-full h-full overflow-auto">
            <div className="container mx-auto p-8">
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Projects
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AllProjects projects={projects} />
                </ul>
            </div>
        </div>
    );
}

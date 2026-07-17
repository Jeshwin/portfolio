import {Head} from "vite-react-ssg";
import AllProjects from "@/components/all-projects";
import {getProjects} from "@/lib/content";

export function Component() {
    const projects = getProjects();
    return (
        <div className="container mx-auto my-16">
            <Head>
                <title>Projects - Jeshwin&apos;s Portfolio</title>
            </Head>
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Projects
            </div>
            <ul className="grid grid-cols-3 gap-4">
                <AllProjects projects={projects} />
            </ul>
        </div>
    );
}

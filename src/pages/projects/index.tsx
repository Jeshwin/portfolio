import {useState, useEffect} from "react";
import {Helmet} from "react-helmet-async";
import AllProjects from "@/components/all-projects";
import {getProjects} from "src/lib/s3";
import {Project} from "src/lib/types";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <>
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Projects
                </div>
                <div className="text-xl text-muted-foreground">
                    Loading projects...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="mb-12 flex font-bold text-6xl flex-grow">
                    Projects
                </div>
                <div className="text-xl text-destructive">Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Projects | Jeshwin's Portfolio</title>
                <meta
                    name="description"
                    content="Explore Jeshwin Prince's projects"
                />
            </Helmet>
            <div className="mb-12 flex font-bold text-6xl flex-grow">
                Projects
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AllProjects projects={projects} />
            </ul>
        </>
    );
}

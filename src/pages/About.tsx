import {Download} from "lucide-react";
import type {Experience} from "@/lib/types";
import ExperienceTimeline from "@/components/experience-timeline";
import {Button} from "@/components/ui/button";

const coursework = [
    "Advanced Data Structures",
    "Theory of Algorithms",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Architecture",
    "Introduction to Compilers",
    "Foundations of Computational Data Science",
];

const experiences: Experience[] = [
    {
        period: "June 2024 - June 2026",
        company: "Human-Computer Interaction Lab at SCU",
        role: "Fullstack Developer",
        description: [
            "Develop a comprehensive mobile app review tool capable of scraping up to 100,000 reviews per app, enabling large-scale data analysis for non-technical researchers.",
            "Collaborate with a cross-functional development team to define and refine requirements, implement feature updates, and enhance user experience, reducing feedback turnaround time by 50%",
            "Implement mobile device detection system, reducing front-end development workload by 33%",
        ],
    },
    {
        period: "March 2024 - Present",
        company: "Santa Clara University",
        role: "Student Grader and Tutor",
        description: [
            "Devise consistent grading rubric for over 125 students in advanced physics and cryptography courses",
            "Evaluate over one hundred submissions monthly; Assist students with detailed annotations",
            "Provide one-on-one tutoring to ten students on a weekly basis, adapting explanations of complex physics and mathematics concepts to individual learning styles, improving comprehension and academic outcomes",
        ],
    },
    {
        period: "August 2023 - November 2023",
        company: "EinNel Technologies",
        role: "Fullstack Mobile App Developer Intern",
        description: [
            "Partnered with international team on cross-platform mobile app development across time zones",
            "Delivered weekly research presentations to team through virtual meetings and live demonstrations",
            "Produced comprehensive eight page internal documentation on each new technology presented, improving future onboarding and developer training effectiveness",
            "Re-engineered company's attendance software in Flutter with enhanced user interface within 1 month",
        ],
    },
    {
        period: "December 2022 - April 2023",
        company: "The Spectrum Church",
        role: "Volunteer App Developer",
        description: [
            "Collaborated with international team on app design reviews through weekly video conferences",
            "Initiated and streamlined Gitlab version control with daily commits to frontend development codebase",
            "Communicated and led app demos for several prospective customers, utilizing their feedback to iterate upon user interface each week and improve user experience",
        ],
    },
];

const skillCategories = [
    {
        category: "Languages",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "C",
            "C++",
            "Rust",
            "Kotlin",
            "Dart",
            "LaTeX",
        ],
    },
    {
        category: "Frameworks",
        skills: ["React", "Tailwind", "Flutter"],
    },
    {
        category: "Machine Learning",
        skills: ["Tensorflow", "Pytorch", "scikit-learn", "numpy", "pandas"],
    },
    {
        category: "Databases",
        skills: ["PostgreSQL", "SQLite", "MongoDB", "NoSQL"],
    },
    {
        category: "Cloud & DevOps",
        skills: [
            "Docker",
            "Kubernetes",
            "AWS",
            "Azure",
            "Firebase",
            "Git",
            "GitHub",
            "Bash",
            "Linux",
        ],
    },
    {
        category: "Systems & Hardware",
        skills: ["WASM", "ARM", "RISC-V"],
    },
    {
        category: "Design",
        skills: ["Figma", "InDesign", "Canva", "Fusion", "Onshape"],
    },
];

export function About() {
    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="container mx-auto p-8">
                <h1 className="mb-4 flex font-bold text-4xl flex-grow">
                    About Me
                </h1>
                <div className="mb-8">
                    {/*
                     * `download` asks the browser to save the file rather than
                     * navigate to it. `asChild` puts the button styles on the
                     * anchor, so this stays a real link - it works in the
                     * prerendered document and for middle-click.
                     */}
                    <Button asChild size="lg">
                        <a
                            href="/Jeshwin_Prince_Resume.pdf"
                            download="Jeshwin_Prince_Resume.pdf"
                        >
                            <Download />
                            Download Resume
                        </a>
                    </Button>
                </div>
                <h2 className="text-3xl font-semibold">Education</h2>
                <div className="flex space-x-6 py-6">
                    <img
                        src="/images/site/cmu.png"
                        width={512}
                        height={512}
                        alt="CMU Logo"
                        className="size-32"
                    />
                    <div>
                        <h3 className="font-semibold text-xl mb-2">
                            Carnegie Mellon University
                        </h3>
                        <div className="space-y-1 *:leading-5">
                            <div>Master of Computational Data Science</div>
                            <div>August 2026 - Present</div>
                            {/* <div>GPA: 3.9/4.0</div> */}
                            {/* <div>
                                Academic honors: Dean&apos;s List Scholarship,
                                University Honors Program, Tau Beta Pi
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 py-6">
                    <img
                        src="/images/site/scu.png"
                        width={512}
                        height={512}
                        alt="SCU Logo"
                        className="size-32"
                    />
                    <div>
                        <h3 className="font-semibold text-xl mb-2">
                            Santa Clara University
                        </h3>
                        <div className="space-y-1 *:leading-5">
                            <div>
                                Bachelor of Science in Computer Science and
                                Engineering, Minor in Mathematics
                            </div>
                            <div>September 2022 - June 2026</div>
                            <div>GPA: 3.9/4.0</div>
                            <div>
                                Academic honors: Dean&apos;s List Scholarship,
                                University Honors Program, Tau Beta Pi
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-semibold mb-6">
                    Relevant Coursework
                </h2>
                <ul className="mb-6 columns-2 gap-x-8">
                    {coursework.map((course, index) => (
                        <li
                            key={index}
                            className="py-1 flex items-start break-inside-avoid"
                        >
                            <span className="mr-4 mt-2 text-sm">•</span>
                            <span className="leading-relaxed">{course}</span>
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl font-semibold mb-6">Experience</h2>
                <div className="mb-6">
                    <ExperienceTimeline experiences={experiences} />
                </div>
                <h2 className="mb-6 text-3xl font-semibold">Skills</h2>
                <div className="space-y-6">
                    {skillCategories.map((group) => (
                        <div key={group.category}>
                            <h3 className="mb-2 text-lg font-bold">
                                {group.category}
                            </h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-2">
                                {group.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="py-1 px-3 rounded bg-secondary"
                                    >
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

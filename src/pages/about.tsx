import {Helmet} from "react-helmet-async";
import {Experience} from "src/lib/types";
import ExperienceTimeline from "@/components/experience-timeline";
import {Badge} from "@/components/ui/badge";

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
];

const experiences: Experience[] = [
    {
        period: "June 2024 - Present",
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

const skills = {
    "Programming Languages": [
        "Python",
        "JavaScript",
        "TypeScript",
        "C",
        "C++",
        "Rust",
        "Kotlin",
        "SQL",
    ],
    "Web & Mobile Development": [
        "React",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Flutter",
        "Node.js",
    ],
    "Infrastructure & Tools": [
        "Docker",
        "Kubernetes",
        "AWS",
        "Firebase",
        "Git",
        "GitHub",
        "Linux",
        "Bash",
    ],
    "Design & Documentation": [
        "Figma",
        "Canva",
        "InDesign",
        "Fusion 360",
        "Onshape",
        "LaTeX",
    ],
};

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About | Jeshwin's Portfolio</title>
                <meta
                    name="description"
                    content="Learn about Jeshwin Prince's education, experience, and skills"
                />
            </Helmet>
            <div className="mb-8 flex font-bold text-7xl flex-grow">
                About Me
            </div>
            <div className="text-5xl font-semibold">Education</div>
            <div className="flex gap-4 py-6">
                <img
                    src="scu.png"
                    alt="SCU Logo"
                    className="size-20 sm:size-32 object-contain"
                />
                <div>
                    <div className="font-semibold text-xl mb-2">
                        Santa Clara University
                    </div>
                    <div className="space-y-1 *:leading-5">
                        <div>
                            Bachelor of Science in Computer Science and
                            Engineering, Minor in Mathematics
                        </div>
                        <div>Graduating June 2026</div>
                        <div>GPA: 3.9/4.0</div>
                        <div>
                            Academic honors: Dean's List Scholarship, University
                            Honors Program, Tau Beta Pi, Putnam Competition
                            Participant
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-4xl font-semibold">Relevant Coursework</div>
            <div className="flex flex-wrap gap-x-1 gap-y-2 py-4">
                {coursework.map((course, index) => (
                    <Badge key={index}>{course}</Badge>
                ))}
            </div>
            <div className="text-5xl font-semibold">Experience</div>
            <div className="py-6">
                <ExperienceTimeline experiences={experiences} />
            </div>
            <div className="mb-6 text-5xl font-semibold">Skills</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <div className="text-2xl font-semibold mb-3">
                            {category}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-sm"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

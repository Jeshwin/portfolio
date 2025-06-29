import Image from "next/image";
import SCULogo from "../../../public/scu.png";
import {Experience} from "src/lib/types";
import ExperienceTimeline from "@/components/experienceTimeline";
import {
    SiCss,
    SiCssHex,
    SiHtml5,
    SiHtml5Hex,
} from "@icons-pack/react-simple-icons";

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

const skills = [
    {
        label: "HTML",
        icon: SiHtml5,
        color: SiHtml5Hex,
    },
    {
        label: "CSS",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "JavaScript",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "React",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "SQL",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "NoSQL",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Tailwind",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Flutter",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Docker",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Kubernetes",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "AWS",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Firebase",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Git",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Bash",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Linux",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Python",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "C",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "C++",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Kotlin",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Rust",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "WASM",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "ARM",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "GitHub",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Trello",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Figma",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "InDesign",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Canva",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Fusion",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "Onshape",
        icon: SiCss,
        color: SiCssHex,
    },
    {
        label: "LaTeX",
        icon: SiCss,
        color: SiCssHex,
    },
];

export default function AboutPage() {
    return (
        <div className="container mx-auto my-16">
            <div className="mb-8 flex font-bold text-7xl flex-grow">
                About Me
            </div>
            <div className="text-5xl font-semibold">Education</div>
            <div className="flex space-x-6 py-6">
                <Image
                    src={SCULogo}
                    width={512}
                    height={512}
                    alt="SCU Logo"
                    className="size-32"
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
                            Academic honors: Dean’s List Scholarship, University
                            Honors Program, Tau Beta Pi
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-4xl font-semibold">Relevant Coursework</div>
            <div className="flex flex-wrap gap-x-1 gap-y-2 py-4">
                {coursework.map((course, index) => (
                    <div
                        key={index}
                        className="px-6 py-2 rounded-full bg-sky-100 text-sky-600"
                    >
                        {course}
                    </div>
                ))}
            </div>
            <div className="text-5xl font-semibold">Experience</div>
            <div className="py-6">
                <ExperienceTimeline experiences={experiences} />
            </div>
            <div className="mb-6 text-5xl font-semibold">Skills</div>
            <div className="grid grid-cols-6 gap-4 *:rounded-2xl *:p-4 *:bg-sky-200 *:flex *:flex-col *:space-y-4 *:items-center *:justify-center">
                {skills.map((skill, index) => (
                    <div key={index}>
                        <skill.icon
                            color={skill.color}
                            className="size-32 max-w-full"
                        />
                        <div>{skill.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

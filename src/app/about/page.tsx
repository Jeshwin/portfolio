import Image from "next/image";
import SCULogo from "../../../public/scu.png";
import {Experience} from "src/lib/types";
import ExperienceTimeline from "@/components/experience-timeline";
import {
    SiArm,
    SiArmHex,
    SiC,
    SiCanva,
    SiCanvaHex,
    SiCHex,
    SiCplusplus,
    SiCplusplusHex,
    SiCss,
    SiCssHex,
    SiDocker,
    SiDockerHex,
    SiFigma,
    SiFigmaHex,
    SiFirebase,
    SiFirebaseHex,
    SiFlutter,
    SiFlutterHex,
    SiGit,
    SiGitHex,
    SiGithub,
    SiGithubHex,
    SiGnubash,
    SiGnubashHex,
    SiHtml5,
    SiHtml5Hex,
    SiJavascript,
    SiJavascriptHex,
    SiKotlin,
    SiKotlinHex,
    SiKubernetes,
    SiKubernetesHex,
    SiLatex,
    SiLatexHex,
    SiLinux,
    SiLinuxHex,
    SiMongodb,
    SiMongodbHex,
    SiPostgresql,
    SiPostgresqlHex,
    SiPython,
    SiPythonHex,
    SiReact,
    SiReactHex,
    SiRust,
    SiRustHex,
    SiTailwindcss,
    SiTailwindcssHex,
    SiTrello,
    SiTrelloHex,
    SiWebassembly,
    SiWebassemblyHex,
} from "@icons-pack/react-simple-icons";
import {Cloud} from "lucide-react";
import {
    AWSLogo,
    FusionLogo,
    InDesignLogo,
    OnshapeLogo,
} from "@/components/logos";
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
        icon: SiJavascript,
        color: SiJavascriptHex,
    },
    {
        label: "React",
        icon: SiReact,
        color: SiReactHex,
    },
    {
        label: "SQL",
        icon: SiPostgresql,
        color: SiPostgresqlHex,
    },
    {
        label: "NoSQL",
        icon: SiMongodb,
        color: SiMongodbHex,
    },
    {
        label: "Tailwind",
        icon: SiTailwindcss,
        color: SiTailwindcssHex,
    },
    {
        label: "Flutter",
        icon: SiFlutter,
        color: SiFlutterHex,
    },
    {
        label: "Docker",
        icon: SiDocker,
        color: SiDockerHex,
    },
    {
        label: "Kubernetes",
        icon: SiKubernetes,
        color: SiKubernetesHex,
    },
    {
        label: "AWS",
        icon: AWSLogo,
        color: "#FF9900",
    },
    {
        label: "Firebase",
        icon: SiFirebase,
        color: SiFirebaseHex,
    },
    {
        label: "Git",
        icon: SiGit,
        color: SiGitHex,
    },
    {
        label: "Bash",
        icon: SiGnubash,
        color: SiGnubashHex,
    },
    {
        label: "Linux",
        icon: SiLinux,
        color: SiLinuxHex,
    },
    {
        label: "Python",
        icon: SiPython,
        color: SiPythonHex,
    },
    {
        label: "C",
        icon: SiC,
        color: SiCHex,
    },
    {
        label: "C++",
        icon: SiCplusplus,
        color: SiCplusplusHex,
    },
    {
        label: "Kotlin",
        icon: SiKotlin,
        color: SiKotlinHex,
    },
    {
        label: "Rust",
        icon: SiRust,
        color: SiRustHex,
    },
    {
        label: "WASM",
        icon: SiWebassembly,
        color: SiWebassemblyHex,
    },
    {
        label: "ARM",
        icon: SiArm,
        color: SiArmHex,
    },
    {
        label: "GitHub",
        icon: SiGithub,
        color: SiGithubHex,
    },
    {
        label: "Trello",
        icon: SiTrello,
        color: SiTrelloHex,
    },
    {
        label: "Figma",
        icon: SiFigma,
        color: SiFigmaHex,
    },
    {
        label: "InDesign",
        icon: InDesignLogo,
        color: SiCssHex,
    },
    {
        label: "Canva",
        icon: SiCanva,
        color: SiCanvaHex,
    },
    {
        label: "Fusion",
        icon: FusionLogo,
        color: SiCssHex,
    },
    {
        label: "Onshape",
        icon: OnshapeLogo,
        color: SiCssHex,
    },
    {
        label: "LaTeX",
        icon: SiLatex,
        color: SiLatexHex,
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
                    <Badge key={index}>{course}</Badge>
                ))}
            </div>
            <div className="text-5xl font-semibold">Experience</div>
            <div className="py-6">
                <ExperienceTimeline experiences={experiences} />
            </div>
            <div className="mb-6 text-5xl font-semibold">Skills</div>
            <div className="grid grid-cols-6 gap-4 *:p-4 *:flex *:flex-col *:space-y-4 *:items-center *:justify-center">
                {skills.map((skill, index) => (
                    <div key={index}>
                        <skill.icon
                            color={skill.color}
                            className="w-32 h-auto max-w-full"
                        />
                        <div className="font-semibold">{skill.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import {Github, Linkedin, Youtube} from "lucide-react";
import {Button} from "./ui/button";

const contactLinks = [
    {
        link: "https://github.com/Jeshwin",
        icon: <Github />,
    },
    {
        link: "https://www.youtube.com/@math-a-magic9820",
        icon: <Youtube />,
    },
    {
        link: "https://www.linkedin.com/in/jeshwinprince/",
        icon: <Linkedin />,
    },
];

export default function Footer() {
    const d = new Date();

    return (
        <footer className="fixed bottom-0 w-screen h-16 px-6 z-10 flex items-center">
            <div className="flex space-x-4">
                {contactLinks.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            size="icon"
                            variant="mantle"
                            className="rounded-full size-10 bg-mantle"
                        >
                            {contact.icon}
                        </Button>
                    </a>
                ))}
            </div>
        </footer>
    );
}

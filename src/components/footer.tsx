import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import {Github, Linkedin, Rss, Youtube} from "lucide-react";
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
    {
        link: "/rss",
        icon: <Rss />,
    },
];

export default function Footer() {
    const d = new Date();
    const currentYear = d.getFullYear();

    return (
        <footer className="fixed bottom-0 w-screen h-16 px-6 z-10 flex justify-between items-center">
            <div className="px-3 py-2 rounded-full bg-mantle text-mantle-foreground text-center">
                © {currentYear} Jeshwin Prince. All rights reserved.
            </div>
            <div className="flex space-x-1">
                {contactLinks.map((contact, index) => (
                    <Link key={index} href={contact.link}>
                        <Button
                            size="icon"
                            variant="mantle"
                            className="rounded-full size-10"
                        >
                            {contact.icon}
                        </Button>
                    </Link>
                ))}
            </div>
        </footer>
    );
}

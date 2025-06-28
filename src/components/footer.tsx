import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import {Github, Linkedin, Rss, Youtube} from "lucide-react";

export default function Footer() {
    const d = new Date();
    const currentYear = d.getFullYear();

    return (
        <footer className="footer footer-center p-10 pb-24 bg-base-200 text-base-content">
            <div>
                <div className="relative w-36 aspect-square">
                    <Image fill src={Logo} alt="Astronaut Logo" />
                </div>
                <p className="font-bold">Jeshwin Prince</p>
                <p>Copyright © {currentYear} - All right reserved</p>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a
                        href="https://github.com/Jeshwin"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <Github />
                    </a>
                    <a
                        href="https://www.youtube.com/@math-a-magic9820"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <Youtube />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jeshwinprince/"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <Linkedin />
                    </a>
                    <Link
                        href="/rss"
                        className="btn btn-square btn-ghost rounded-full shadow"
                    >
                        <Rss className="aspect-square w-6" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./themetoggle";
import Logo from "../../public/logo.png";
import {Github, Menu, Youtube} from "lucide-react";

export default function Navbar() {
    return (
        <nav className="navbar lg:px-2 bg-base-200 sticky z-10 top-0">
            <div className="flex-none">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-ghost btn-circle drawer-button"
                >
                    <Menu />
                </label>
            </div>
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    <div className="relative w-10 aspect-square">
                        <Image fill src={Logo} alt="Astronaut Logo" />
                    </div>
                    <span className="ml-3 h-6 hidden md:inline-block md:text-base-content">
                        Jeshwin Prince
                    </span>
                </Link>
            </div>
            <div className="flex-2">
                <a
                    href="https://www.youtube.com/@math-a-magic9820"
                    className="btn btn-ghost btn-circle fill-current"
                >
                    <Youtube />
                </a>
            </div>
            <div className="flex-2">
                <a
                    href="https://github.com/Jeshwin/portfolio"
                    className="btn btn-ghost btn-circle fill-current"
                >
                    <Github />
                </a>
            </div>
            <div className="flex-2 mr-2 lg:mr-0">
                <ThemeToggle />
            </div>
        </nav>
    );
}

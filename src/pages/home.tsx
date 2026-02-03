import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Github, Linkedin, Mail, Youtube} from "lucide-react";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Jeshwin's Portfolio</title>
                <meta
                    name="description"
                    content="Jeshwin Prince's portfolio website"
                />
            </Helmet>
            <div className="h-screen place-content-center flex flex-col gap-4 items-center container mx-auto px-4 mt-24 sm:mt-0 mb-24">
                <img
                    src="profile.jpg"
                    alt="Profile Photo"
                    className="rounded-full size-40 drop-shadow-xl object-cover"
                />

                <div className="text-xl">👋 Hello, I&apos;m</div>
                <span className="text-center font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-secondary-foreground drop-shadow-xl">
                    Jeshwin Prince
                </span>
                <div className="text-xl text-center">
                    I am a fourth-year Computer Engineering student at Santa
                    Clara University. I love programming, playing guitar, and
                    art!
                </div>
                <div className="flex flex-col sm:flex-row items-center place-content-center gap-2 mx-8">
                    <Link to="/projects" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full">
                            Explore Projects
                        </Button>
                    </Link>
                    <Link to="/blog" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full"
                        >
                            Read Blog
                        </Button>
                    </Link>
                </div>
                <div className="text-xl text-center">
                    I&apos;d love to hear from you! Shoot me an email or send a
                    message on LinkedIn!
                </div>
                <div className="flex flex-col sm:flex-row items-center place-content-center gap-2 mx-8">
                    <a
                        href="mailto:jeshwinjprince@gmail.com"
                        className="w-full sm:w-auto"
                    >
                        <Button size="lg" variant="outline" className="w-full">
                            <Mail />
                            jeshwinjprince@gmail.com
                        </Button>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jeshwinprince/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button size="lg" variant="outline" className="w-full">
                            <Linkedin />
                            jeshwinprince
                        </Button>
                    </a>
                    <a
                        href="https://github.com/Jeshwin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button size="lg" variant="outline" className="w-full">
                            <Github />
                            Jeshwin
                        </Button>
                    </a>
                    <a
                        href="https://www.youtube.com/@math-a-magic9820"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button size="lg" variant="outline" className="w-full">
                            <Youtube />
                            Math-a-Magic!
                        </Button>
                    </a>
                </div>
            </div>
        </>
    );
}

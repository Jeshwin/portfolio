import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

import {
    Briefcase,
    GraduationCap,
    SlidersHorizontal,
    SquarePen,
} from "lucide-react";

export default function HomePage() {
    return (
        <>
            <main className="flex flex-col lg:flex-row justify-items-center">
                <div className="hero h-screen mx-auto py-12 lg:py-24 bg-gradient-to-t from-base-100 to-base-200">
                    <div className="hero-content gap-6 p-0 lg:p-1 px-auto mx-10 flex-col">
                        <div className="relative w-48 lg:w-96 aspect-square">
                            <Image fill src={Logo} alt="Astronaut Logo" />
                        </div>
                        <div className="mx-auto max-x-5xl text-center text-base-content">
                            <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">
                                Hello, I&apos;m{" "}
                                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
                                    Jeshwin Prince
                                </span>
                            </h1>
                            <p className="mb-5 md:lext-xl lg:text-3xl">
                                I am a second-year Computer Engineering student
                                at Santa Clara University. I love programming,
                                3d printing, playing the guitar, and making art
                                in Blender! Check out my resume, portfolio,
                                project demos, and blog posts right here!
                            </p>
                            <Link
                                href="/posts/16"
                                className="btn btn-primary lg:btn-lg lg:text-xl border-0 bg-gradient-to-br from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus"
                            >
                                Let&apos;s Go!
                            </Link>
                        </div>
                        <div className="h-16 w-1 bg-transparent"></div>
                    </div>
                </div>
            </main>
            <div className="container mx-auto mb-10 grid lg:grid-cols-2 gap-4">
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <GraduationCap className="mx-16 w-60 fill-primary" />
                    </figure>
                    <div className="card-body">
                        <h1 className="card-title">Resume</h1>
                        <p>
                            Don&apos;t you think that regular paper resumes are
                            too boring? I sure do! Why not check out my resume
                            on my website! As a digital version of my resume, it
                            is not only more readable but also adds more details
                            that would be restricted by a paper format. Even
                            still, you can download a PDF version of my resume
                            here, too.
                        </p>
                        <div className="card-actions justify-end">
                            <Link href="/posts/16" className="btn btn-primary">
                                See Resume
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <Briefcase className="mx-16 w-60 fill-secondary" />
                    </figure>
                    <div className="card-body">
                        <h1 className="card-title">Portfolio</h1>
                        <p>
                            I work on a lot of projects. In my free time, I like
                            to start new personal projects that teach me new
                            skills, such as web design, computer programming,
                            embedded software and 3d modeling. You can find a
                            portfolio of all my previous and current personal
                            projects here.
                        </p>
                        <div className="card-actions justify-end">
                            <Link
                                href="/projects"
                                className="btn btn-secondary"
                            >
                                See Entries
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <SlidersHorizontal className="mx-16 w-60 fill-accent" />
                    </figure>
                    <div className="card-body">
                        <h1 className="card-title">Demos</h1>
                        <p>
                            Welcome to the demo section of my personal website!
                            Here, you can interact with my projects in real
                            time! I can demo not only web applications, but
                            desktop apps and games, too. These demos allow you
                            to experience my creative work firsthand. I hope
                            that by exploring my demos here you can gain a
                            better understanding of my projects. If you prefer a
                            downloadable version, you can also find links to
                            standalone executables or code repositories for each
                            demo.
                        </p>
                        <div className="card-actions justify-end">
                            <Link href="/demo" className="btn btn-accent">
                                See Demos
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <SquarePen className="mx-16 w-60 fill-neutral" />
                    </figure>
                    <div className="card-body">
                        <h1 className="card-title">Blog</h1>
                        <p>
                            Some of my projects can get very large and
                            can&apos;t be contained in just a portfolio entry.
                            For those types of projects, I write blog posts
                            about them! I love to write blogs about new projects
                            I am working on, the status of previous projects, or
                            just anything that I&apos;ve found interesting. I
                            hope to post here regularly.
                        </p>
                        <div className="card-actions justify-end">
                            <Link href="/posts" className="btn btn-neutral">
                                See Posts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

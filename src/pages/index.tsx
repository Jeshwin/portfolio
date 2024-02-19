import Link from "next/link";

import MyHead from "@/components/head";
import Greeting from "@/components/greeting";
import {
    AcademicCapIcon,
    AdjustmentsHorizontalIcon,
    BriefcaseIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
    return (
        <>
            <MyHead title="Jeshwin's Website" />
            <Greeting />
            <div className="container mx-auto mb-10 grid lg:grid-cols-2 gap-4">
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <AcademicCapIcon className="mx-16 w-60 fill-primary" />
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
                            <Link
                                href="/posts/16#top"
                                className="btn btn-primary"
                            >
                                See Resume
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <BriefcaseIcon className="mx-16 w-60 fill-secondary" />
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
                                href="/projects#top"
                                className="btn btn-secondary"
                            >
                                See Entries
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <AdjustmentsHorizontalIcon className="mx-16 w-60 fill-accent" />
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
                            <Link href="/demo#top" className="btn btn-accent">
                                See Demos
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-full shadow-lg bg-base-200">
                    <figure>
                        <PencilSquareIcon className="mx-16 w-60 fill-neutral" />
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
                            <Link href="/posts#top" className="btn btn-neutral">
                                See Posts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

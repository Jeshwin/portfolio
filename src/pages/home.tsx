import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import ProfilePhoto from "/profile.jpg";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Jeshwin's Portfolio</title>
                <meta name="description" content="Jeshwin Prince's portfolio website" />
            </Helmet>
            <div className="w-screen h-screen">
                <div className="w-full h-full cgrid place-content-center">
                    <div className="flex flex-col items-center container mx-auto">
                        <img
                            src={ProfilePhoto}
                            alt="Profile Photo"
                            className="rounded-full size-40 drop-shadow-xl mb-4 object-cover"
                        />

                        <div className="text-2xl">👋 Hello, I&apos;m</div>
                        <span className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#04a5e5] via-[#8839ef] to-[#dd7878] drop-shadow-xl">
                            Jeshwin Prince
                        </span>
                        <div className="text-xl mb-4 text-center">
                            I am a fourth-year Computer Engineering student at Santa
                            Clara University. I love programming, playing the
                            guitar, and making art!
                        </div>
                        <div className="flex space-x-2">
                            <Link to="/projects">
                                <Button size="lg">Explore Projects</Button>
                            </Link>
                            <Link to="/blog">
                                <Button size="lg" variant="secondary">
                                    Read Blog
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="accent" size="lg">
                                    Contact
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import {Link} from "react-router-dom";
import {Head} from "vite-react-ssg";
import {Button} from "@/components/ui/button";

export function Component() {
    return (
        <div className="w-screen h-screen">
            <Head>
                <title>Jeshwin&apos;s Portfolio</title>
            </Head>
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <img
                        src="/images/site/profile.jpg"
                        alt="Profile Photo"
                        width={256}
                        height={256}
                        className="rounded-full size-40 drop-shadow-xl mb-4"
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
    );
}

import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="text-2xl">👋 Hello, I’m</div>
                    <span className="font-bold text-9xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-xl">
                        Jeshwin Prince
                    </span>
                    <div className="text-2xl mb-4 text-center">
                        I am a third-year Computer Engineering student at Santa
                        Clara University. I love programming, playing the
                        guitar, and making art!
                    </div>
                    <div className="flex space-x-2">
                        <Link href="/projects">
                            <Button size="lg">Explore Projects</Button>
                        </Link>
                        <Link href="/blog">
                            <Button size="lg">Read Blog</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Contact
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

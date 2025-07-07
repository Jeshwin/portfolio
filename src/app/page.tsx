import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ProfilePhoto from "../../public/profile.jpg";
import LiquidGlass from "@/components/liquid-glass";

export default function HomePage() {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <Image
                        src={ProfilePhoto}
                        alt="Profile Photo"
                        width={256}
                        height={256}
                        className="rounded-full size-40 drop-shadow-xl mb-4"
                    />

                    <div className="text-2xl">👋 Hello, I&apos;m</div>
                    <span className="font-bold text-9xl bg-clip-text text-transparent bg-gradient-to-r from-[#04a5e5] via-[#8839ef] to-[#dd7878] drop-shadow-xl">
                        Jeshwin Prince
                    </span>
                    <div className="text-2xl mb-4 text-center">
                        I am a third-year Computer Engineering student at Santa
                        Clara University. I love programming, playing the
                        guitar, and making art!
                    </div>
                    <div className="flex space-x-2">
                        <LiquidGlass color="hsl(var(--primary))">
                            <Link href="/projects">
                                <Button
                                    size="lg"
                                    className="bg-transparent shadow-none"
                                >
                                    Explore Projects
                                </Button>
                            </Link>
                        </LiquidGlass>
                        <LiquidGlass color="hsl(var(--secondary))">
                            <Link href="/blog">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-transparent shadow-none"
                                >
                                    Read Blog
                                </Button>
                            </Link>
                        </LiquidGlass>

                        <LiquidGlass color="hsl(var(--accent))">
                            <Link href="/contact">
                                <Button
                                    variant="accent"
                                    size="lg"
                                    className="bg-transparent shadow-none"
                                >
                                    Contact
                                </Button>
                            </Link>
                        </LiquidGlass>
                    </div>
                </div>
            </div>
        </div>
    );
}

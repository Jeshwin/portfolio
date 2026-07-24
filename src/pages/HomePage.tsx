import {Button} from "@/components/ui/button";
import {makeTab, useOpenTab} from "@/lib/tabs";

export function Component() {
    const openTab = useOpenTab();
    return (
        <div className="w-full h-full overflow-auto">
            <div className="w-full min-h-full grid place-content-center p-8">
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
                        <Button
                            size="lg"
                            onClick={() =>
                                openTab(makeTab("Projects", "projects"))
                            }
                        >
                            Explore Projects
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => openTab(makeTab("Blog", "blog"))}
                        >
                            Read Blog
                        </Button>
                        <Button
                            variant="accent"
                            size="lg"
                            onClick={() =>
                                openTab(makeTab("Contact", "contact"))
                            }
                        >
                            Contact
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import {Button} from "@/components/ui/button";
import {makeTab, useOpenTab} from "@/lib/tabs";

export function NotFound() {
    const openTab = useOpenTab();
    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="relative -mt-24 w-[14rem] @lg:w-[24rem] aspect-square">
                        <img
                            src="/images/site/404.png"
                            alt="404 Astronaut"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="text-2xl mb-4 text-center">
                        Oops! Looks like this page doesn&apos;t exist! Sorry
                        about that, you should go home. The button below should
                        help you!
                    </div>
                    <Button
                        size="lg"
                        variant="destructive"
                        onClick={() => openTab(makeTab("Home", "home"))}
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

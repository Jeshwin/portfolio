import Link from "next/link";
import Image from "next/image";
import FourOFour from "../../public/404.png";
import {Button} from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="relative -mt-24 w-[14rem] lg:w-[24rem] aspect-square">
                        <Image fill src={FourOFour} alt="404 Astronaut" />
                    </div>
                    <div className="text-2xl mb-4 text-center">
                        Oops! Looks like this pages doesn&apos;t exist! Sorry
                        about that, you should go home. The button below should
                        help you!
                    </div>
                    <Link href="/">
                        <Button size="lg" variant="destructive">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

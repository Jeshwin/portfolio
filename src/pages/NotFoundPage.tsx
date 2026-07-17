import {Link} from "react-router-dom";
import {Head} from "vite-react-ssg";
import {Button} from "@/components/ui/button";

export function Component() {
    return (
        <div className="w-screen h-screen">
            <Head>
                <title>Not Found - Jeshwin&apos;s Portfolio</title>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="relative -mt-24 w-[14rem] lg:w-[24rem] aspect-square">
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
                    <Link to="/">
                        <Button size="lg" variant="destructive">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

import PageLinkButton from "@/components/page-link-button";

export function NotFound() {
    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    {/*
                     * The page's <h1> - visually hidden because the design
                     * carries the message in the illustration and the
                     * paragraph below, but the document still needs a heading.
                     */}
                    <h1 className="sr-only">Page not found</h1>
                    <div className="relative -mt-24 w-[14rem] @lg:w-[24rem] aspect-square">
                        <img
                            src="/images/site/404.png"
                            alt="404 Astronaut"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-2xl mb-4 text-center">
                        Oops! Looks like this page doesn&apos;t exist! Sorry
                        about that, you should go home. The button below should
                        help you!
                    </p>
                    <PageLinkButton page="home" size="lg" variant="destructive">
                        Go Home
                    </PageLinkButton>
                </div>
            </div>
        </div>
    );
}

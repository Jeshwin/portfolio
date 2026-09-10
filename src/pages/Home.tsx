import PageLinkButton from "@/components/page-link-button";

export function Home() {
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

                    <div className="text-lg">👋 Hello, I&apos;m</div>
                    <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-xl">
                        Jeshwin Prince
                    </h1>
                    <div className="text-lg mb-4 text-center">
                        I am pursuing my Masters of Computational Data Science
                        at Carnegie Mellon University. I have a Bachelors of
                        Science in Computer Science and Engineering with a Minor
                        in Mathematics from Santa Clara University. I also love
                        playing the guitar, making art, and cooking!
                    </div>
                    <div className="flex space-x-2">
                        <PageLinkButton page="projects" size="lg">
                            Explore Projects
                        </PageLinkButton>
                        <PageLinkButton
                            page="blog"
                            size="lg"
                            variant="secondary"
                        >
                            Read Blog
                        </PageLinkButton>
                        <PageLinkButton
                            page="contact"
                            variant="accent"
                            size="lg"
                        >
                            Contact
                        </PageLinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

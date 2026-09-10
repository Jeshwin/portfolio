import PageLinkButton from "@/components/page-link-button";

/**
 * Rendered for tabs created via react-layman's "new tab" toolbar button.
 * That button always creates a `TabData("blank")`, so the PAGES registry maps
 * the `"blank"` page id to this component.
 */
export function NewTab() {
    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="flex flex-col w-60 gap-4">
                        <PageLinkButton page="projects">Projects</PageLinkButton>
                        <PageLinkButton page="blog" variant="secondary">
                            Blog
                        </PageLinkButton>
                        <PageLinkButton page="about" variant="accent">
                            About
                        </PageLinkButton>
                        <PageLinkButton page="contact" variant="ghost">
                            Contact
                        </PageLinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

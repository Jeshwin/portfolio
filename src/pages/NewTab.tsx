import {Button} from "@/components/ui/button";
import {makeTab, useOpenTab} from "@/lib/tabs";

/**
 * Rendered for tabs created via react-layman's "new tab" toolbar button.
 * That button always creates a `TabData("blank")`, so `renderPane` in
 * `LayoutPage.tsx` maps the `"blank"` tab name to this page.
 */
export function NewTab() {
    const openTab = useOpenTab();

    return (
        <div className="w-full h-full overflow-auto @container">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    <div className="flex flex-col w-60 gap-4">
                        <Button
                            onClick={() =>
                                openTab(makeTab("Projects", "projects"))
                            }
                        >
                            Projects
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => openTab(makeTab("Blog", "blog"))}
                        >
                            Blog
                        </Button>
                        <Button
                            variant="accent"
                            onClick={() => openTab(makeTab("About", "about"))}
                        >
                            About
                        </Button>
                        <Button
                            variant="ghost"
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

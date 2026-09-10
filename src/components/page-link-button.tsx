import {Button, type ButtonProps} from "@/components/ui/button";
import {makeTabFor, useOpenTab} from "@/lib/tabs";
import {pathFor, type PageId} from "@/lib/routes-map";
import {useInteractive} from "@/lib/interactive";

interface PageLinkButtonProps extends Omit<ButtonProps, "onClick" | "asChild"> {
    page: PageId;
    slug?: string;
    children: React.ReactNode;
}

/**
 * A button that navigates to another page - as a layman tab inside the
 * workspace, and as a plain anchor in the static document. The anchor form is
 * what gives the pre-rendered Home page outbound links to /projects, /blog and
 * /contact, which is how a crawler discovers the rest of the site.
 *
 * `asChild` renders the Button's styles onto the <a>, so both branches carry
 * identical classNames and the swap is invisible.
 */
export default function PageLinkButton({
    page,
    slug,
    children,
    ...buttonProps
}: PageLinkButtonProps) {
    const interactive = useInteractive();
    const openTab = useOpenTab();

    if (!interactive) {
        return (
            <Button {...buttonProps} asChild>
                <a href={pathFor(page, slug)}>{children}</a>
            </Button>
        );
    }

    return (
        <Button {...buttonProps} onClick={() => openTab(makeTabFor(page, slug))}>
            {children}
        </Button>
    );
}

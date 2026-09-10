import type {Post} from "@/lib/types";
import {makeTab, useOpenTab, useTabDrag} from "@/lib/tabs";
import {pathFor} from "@/lib/routes-map";
import {useInteractive} from "@/lib/interactive";
import {formatDate, isDifferentDay, isoDate} from "@/lib/utils";

const ROW_CLASS =
    "w-full flex space-x-4 pb-4 text-left cursor-pointer last:border-none";

/**
 * The visible content of a post entry, shared verbatim by both branches below
 * so the static HTML and the hydrated tree render identical markup.
 */
function PostEntryContent({post}: {post: Post}) {
    const updatedAt = post.updatedAt ?? post.createdAt;
    const wasUpdated = isDifferentDay(post.createdAt, updatedAt);

    return (
        <div className="flex flex-col items-start justify-center">
            <h3 className="font-semibold text-2xl">{post.title}</h3>
            {post.description && <p>{post.description}</p>}
            <div className="text-xs text-muted-foreground flex space-x-4">
                <time dateTime={isoDate(post.createdAt)}>
                    {formatDate(post.createdAt)}
                </time>
                {wasUpdated && (
                    <time dateTime={isoDate(updatedAt)}>
                        Updated: {formatDate(updatedAt)}
                    </time>
                )}
            </div>
        </div>
    );
}

/** Workspace variant: a drag source that opens the post as a tab. */
function PostEntryTab({post}: {post: Post}) {
    const openTab = useOpenTab();
    const dragRef = useTabDrag(() => makeTab(post.title, "blog-post", post.id));

    return (
        <div
            ref={dragRef}
            onClick={() => openTab(makeTab(post.title, "blog-post", post.id))}
            className={ROW_CLASS}
        >
            <PostEntryContent post={post} />
        </div>
    );
}

/** Static variant: a real link, so crawlers and no-JS visitors can navigate. */
function PostEntryLink({post}: {post: Post}) {
    return (
        <a href={pathFor("blog-post", post.id)} className={ROW_CLASS}>
            <PostEntryContent post={post} />
        </a>
    );
}

/**
 * Rendered in two very different contexts - see `useInteractive`. The branch
 * has to happen here, at the call site, because `PostEntryTab` calls hooks
 * (`useTabDrag` -> react-dnd) that throw outside the layman workspace.
 */
export default function PostEntry({post}: {post: Post}) {
    return useInteractive() ? (
        <PostEntryTab post={post} />
    ) : (
        <PostEntryLink post={post} />
    );
}

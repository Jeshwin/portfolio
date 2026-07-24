import {Badge} from "./ui/badge";
import type {Post} from "@/lib/types";
import {makeTab, useOpenTab, useTabDrag} from "@/lib/tabs";

export default function PostEntry({post}: {post: Post}) {
    const openTab = useOpenTab();
    const dragRef = useTabDrag(() => makeTab(post.title, "blog-post", post.id));
    const createdDate = new Date(post.createdAt);
    const updatedDate = post.updatedAt
        ? new Date(post.updatedAt)
        : createdDate;

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <button
            ref={dragRef}
            onClick={() => openTab(makeTab(post.title, "blog-post", post.id))}
            className="w-full flex space-x-4 pb-4 border-b border-muted last:border-0 text-left cursor-grab active:cursor-grabbing"
        >
            <div className="flex flex-col items-start justify-center">
                <div className="font-semibold text-2xl">{post.title}</div>
                {post.description && <div>{post.description}</div>}
                <ul className="w-full flex flex-wrap gap-1 my-2 -ml-2">
                    {post.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </ul>
                <div className="text-xs text-muted-foreground flex space-x-4">
                    <div>
                        {createdDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </div>
                    {isDifferentDay && (
                        <div>
                            Updated:{" "}
                            {updatedDate.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
}

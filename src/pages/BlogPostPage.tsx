import {Badge} from "@/components/ui/badge";
import {getPost} from "@/lib/content";

export function Component({postId}: {postId: string}) {
    const blogPost = getPost(postId);
    const createdDate = new Date(blogPost.createdAt);
    const updatedDate = blogPost.updatedAt
        ? new Date(blogPost.updatedAt)
        : createdDate;

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <div className="h-full w-full overflow-auto">
            <div className="container mx-auto p-8">
                <div className="mb-4 flex font-bold text-6xl flex-grow">
                    {blogPost.title}
                </div>
                <ul className="w-full flex flex-wrap gap-2 my-4 *:text-base *:font-normal *:px-3 -ml-1">
                    {blogPost.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </ul>
                <div className="text-base flex space-x-4">
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
                <div className="mb-6"></div>
                <div
                    className="prose dark:prose-invert prose-primary mx-auto"
                    dangerouslySetInnerHTML={{__html: blogPost.body || ""}}
                />
            </div>
        </div>
    );
}

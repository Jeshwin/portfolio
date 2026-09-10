import {getPost} from "@/lib/content";
import {formatDate, isDifferentDay, isoDate} from "@/lib/utils";

export function BlogPost({postId}: {postId: string}) {
    const blogPost = getPost(postId);
    const updatedAt = blogPost.updatedAt ?? blogPost.createdAt;
    const wasUpdated = isDifferentDay(blogPost.createdAt, updatedAt);

    return (
        <div className="h-full w-full overflow-auto">
            <article className="container mx-auto p-8">
                <h1 className="mb-2 flex font-bold text-4xl flex-grow">
                    {blogPost.title}
                </h1>
                <div className="mb-6 text-base flex space-x-4">
                    <time dateTime={isoDate(blogPost.createdAt)}>
                        {formatDate(blogPost.createdAt)}
                    </time>
                    {wasUpdated && (
                        <time dateTime={isoDate(updatedAt)}>
                            Updated: {formatDate(updatedAt)}
                        </time>
                    )}
                </div>
                <div
                    className="prose dark:prose-invert prose-a:text-primary mx-auto"
                    dangerouslySetInnerHTML={{__html: blogPost.body || ""}}
                />
            </article>
        </div>
    );
}

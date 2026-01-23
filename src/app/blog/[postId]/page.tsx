import {Badge} from "@/components/ui/badge";
import DOMPurify from "isomorphic-dompurify";
import {getPost, getAllPostIds} from "src/lib/s3";

export async function generateStaticParams() {
    const postIds = await getAllPostIds();
    return postIds.map((postId) => ({postId}));
}

export default async function PostPage({
    params,
}: {
    params: Promise<{postId: string}>;
}) {
    const {postId} = await params;
    const blogPost = await getPost(postId);
    const createdDate = new Date(blogPost.createdAt);
    const updatedDate = blogPost.updatedAt
        ? new Date(blogPost.updatedAt)
        : createdDate;

    // Check if the dates are different days
    const isDifferentDay =
        createdDate.toDateString() !== updatedDate.toDateString();

    return (
        <div className="container mx-auto my-16">
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
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blogPost.body || ""),
                }}
            />
        </div>
    );
}

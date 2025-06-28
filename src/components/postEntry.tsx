import Link from "next/link";
import Image from "next/image";
import {Badge} from "./ui/badge";
import {Post} from "src/lib/types";

export default function PostEntry({post}: {post: Post}) {
    return (
        <Link href={`/projects/${post.id}`} className="w-full flex space-x-4">
            <figure>
                <Image
                    src={post.thumbnail}
                    width={1024}
                    height={1024}
                    alt={post.title}
                    className="size-32 aspect-square object-cover rounded-xl"
                />
            </figure>
            <div className="flex flex-col items-start justify-center">
                <div className="font-semibold text-2xl">{post.title}</div>
                {post.description && <div>{post.description}</div>}
                <ul className="w-full flex flex-wrap gap-1 my-2">
                    {post.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </ul>
                <div className="text-xs text-gray-500">
                    Last Updated:{" "}
                    {new Date(post.updatedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </div>
            </div>
        </Link>
    );
}

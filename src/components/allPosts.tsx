"use client";
import {use} from "react";
import {Post} from "src/lib/types";
import PostEntry from "./postEntry";

export default function AllPosts({posts}: {posts: Promise<Post[]>}) {
    const data = use(posts);
    return (
        <>
            {data.map((post, index) => (
                <PostEntry key={index} post={post} />
            ))}
        </>
    );
}

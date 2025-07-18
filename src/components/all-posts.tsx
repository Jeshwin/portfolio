import {Post} from "src/lib/types";
import PostEntry from "./post-entry";

export default function AllPosts({posts}: {posts: Post[]}) {
    return (
        <>
            {posts.map((post, index) => (
                <PostEntry key={index} post={post} />
            ))}
        </>
    );
}

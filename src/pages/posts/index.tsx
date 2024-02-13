import MyHead from "@/components/head";
import SWRLoading from "@/components/swrloading";
import Badge from "@/components/badge";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function AllPosts() {
    const {data, error} = useSWR(`/api/get/posts`, fetcher);

    if (error)
        return <SWRLoading head="Error" size={200} fillColor="fill-error" />;

    if (!data)
        return (
            <SWRLoading head="Loading..." size={200} fillColor="fill-primary" />
        );

    return (
        <>
            <MyHead title="Blog" />
            <div id="top" />
            <div className="p-5 mx-auto lg:w-3/4">
                <div className="font-bold text-5xl mb-12">Blog</div>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
                    {data.map((post) => (
                        <li
                            key={post.id}
                            className="card bg-base-200 shadow-xl hover:opacity-70 active:scale-90 duration-75"
                        >
                            <Link
                                href={`/posts/${post.id}`}
                                className="card-body"
                            >
                                <div className="card-title break-words text-3xl mb-3">
                                    {post.title}
                                </div>
                                <div>
                                    Created:{" "}
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="mb-3">
                                    Last Updated:{" "}
                                    {new Date(
                                        post.updatedAt
                                    ).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="text-lg mb-3">
                                    {post.description}
                                </div>
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    {post.tags.map((tag) => (
                                        <Badge
                                            key={tag.title}
                                            text={tag.title}
                                        />
                                    ))}
                                </ul>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

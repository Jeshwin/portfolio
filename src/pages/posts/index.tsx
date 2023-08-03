import MyHead from "@/components/head"
import { sanitize } from "isomorphic-dompurify"
import axios from "axios"
import useSWR from "swr"
import Link from "next/link"

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function AllPosts() {
    const { data, error } = useSWR(`/api/get/posts`, fetcher)

    if (error)
        return (
            <>
                <MyHead title="Error" />
                <div id="top" />
                <div className="animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                    <div className="h-20 bg-error rounded-lg max-w-sm mb-12" />
                    <ul className="grid grid-cols-3 gap-6 items-start mb-8">
                        <li className="card bg-error-content shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-error rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-error rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-error rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-error rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-error-content shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-error rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-error rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-error rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-error rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-error-content shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-error rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-error rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-error rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-error rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-error-content shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-error rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-error rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-error rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-error rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-error-content shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-error rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-error rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-error rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-error rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-error py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )

    if (!data)
        return (
            <>
                <MyHead title="Loading" />
                <div id="top" />
                <div className="animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                    <div className="h-20 bg-base-300 rounded-lg max-w-sm mb-12" />
                    <ul className="grid grid-cols-3 gap-6 items-start mb-8">
                        <li className="card bg-base-200 shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-base-300 rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-base-300 rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-base-200 shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-base-300 rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-base-300 rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-base-200 shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-base-300 rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-base-300 rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-base-200 shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-base-300 rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-base-300 rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                        <li className="card bg-base-200 shadow-xl">
                            <div className="w-full aspect-square rounded-t-2xl bg-base-300 rounded-lg" />
                            <div className="card-body">
                                <div className="card-title h-12 bg-base-300 rounded-lg max-w-md mb-4" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 ml-20" />
                                <div className="h-5 bg-base-300 rounded-lg mb-4 mr-20" />
                                <ul className="flex flex-wrap gap-3 justify-end">
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-10" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-9" />
                                    <li className="badge badge-lg badge-ghost bg-base-300 py-4 px-12" />
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )

    return (
        <>
            <MyHead title="Blog" />
            <div id="top" />
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="font-bold text-5xl mb-12">Blog</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start mb-8">
                    {data.map((post) => (
                        <li
                            key={post.id}
                            className="card bg-base-200 shadow-xl hover:opacity-70 active:scale-90 duration-75"
                        >
                            <Link
                                href={`/posts/${post.id}`}
                                className="card-body"
                            >
                                <div className="card-title truncate text-3xl mb-3">
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
                                        <li
                                            key={tag.title}
                                            className="badge badge-lg badge-primary p-4"
                                        >
                                            {tag.title}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

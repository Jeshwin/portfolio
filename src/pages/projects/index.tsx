import MyHead from "@/components/head"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import useSWR from "swr"

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function AllProjects() {
    const { data, error } = useSWR(`/api/get/projects`, fetcher)

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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                                <ul className="flex gap-3 justify-end">
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
                <div className="font-bold text-7xl mb-12">Portfolio</div>
                <ul className="grid grid-cols-3 gap-6 items-start mb-8">
                    {data.map((project) => (
                        <li
                            key={project.id}
                            className="card bg-base-200 shadow-xl hover:opacity-70 active:scale-90 duration-75"
                        >
                            <Link href={`/projects/${project.id}`}>
                                <figure>
                                    <Image
                                        src={project.thumbnail.image}
                                        width={1024}
                                        height={1024}
                                        alt={project.title}
                                        className="w-full aspect-square rounded-t-2xl"
                                    />
                                </figure>
                                <div className="card-body">
                                    <div className="card-title truncate text-5xl mb-4">
                                        {project.title}
                                    </div>
                                    <div className="text-xl mb-4">
                                        {project.description}
                                    </div>
                                    <ul className="flex flex-wrap gap-3 justify-end">
                                        {project.tags.map((tag) => (
                                            <li
                                                key={tag.title}
                                                className="badge badge-lg badge-primary p-4"
                                            >
                                                {tag.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

import MyHead from "@/components/head"
import Image from "next/image"
import axios from "axios"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function Project() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        async function validateToken(token) {
            try {
                const response = await axios.post("/api/validateJWT", { token })
                setIsLoggedIn(response.data.isValid)
            } catch (error) {
                console.error("JWT validation failed: ", error)
                setIsLoggedIn(false)
            }
        }
        validateToken(token)
    })

    const router = useRouter()
    const { projectId } = router.query

    const { data, error } = useSWR(`/api/get/projects/${projectId}`, fetcher)

    if (error)
        return (
            <>
                <MyHead title="Error" />
                <div id="top" />
                <div className="animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                    <div className="text-xl leading-loose">
                        <div className="flex flex-row items-center gap-4 pb-12">
                            <div className="w-32 aspect-square rounded-full bg-base-error" />
                            <div className="h-32 bg-base-error rounded-lg w-96" />
                        </div>
                        <ul className="flex gap-3 mb-8">
                            <li className="badge badge-lg badge-error py-4 px-10" />
                            <li className="badge badge-lg badge-error py-4 px-12" />
                            <li className="badge badge-lg badge-error py-4 px-9" />
                            <li className="badge badge-lg badge-error py-4 px-10" />
                            <li className="badge badge-lg badge-error py-4 px-8" />
                        </ul>
                        <div className="h-9 bg-base-error rounded-lg max-w-lg mb-8" />
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="h-5 bg-base-error rounded-lg ml-40" />
                            <div className="h-5 bg-base-error rounded-lg" />
                            <div className="h-5 bg-base-error rounded-lg" />
                            <div className="h-5 bg-base-error rounded-lg" />
                            <div className="h-5 bg-base-error rounded-lg" />
                            <div className="h-5 bg-base-error rounded-lg max-w-4xl" />
                        </div>
                        <div className="h-9 bg-base-error rounded-lg max-w-lg mb-8" />
                        <ul className="flex flex-col gap-4 ml-12 mb-12 max-w-xl">
                            <li className="h-5 bg-base-error rounded-lg" />
                            <li className="h-5 bg-base-error rounded-lg" />
                            <li className="h-5 bg-base-error rounded-lg" />
                            <li className="h-5 bg-base-error rounded-lg" />
                            <li className="h-5 bg-base-error rounded-lg" />
                            <li className="h-5 bg-base-error rounded-lg" />
                        </ul>
                        <div className="h-9 bg-base-error rounded-lg max-w-lg mb-8" />
                        <ul className="grid grid-cols-3 gap-6 mb-8">
                            <li className="card card-compact w-full bg-base-error rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-error rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-error rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-error rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-error rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )

    if (!data)
        return (
            <>
                <MyHead title="Loading" />
                <div id="top" />
                <div className="animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                    <div className="text-xl leading-loose">
                        <div className="flex flex-row items-center gap-4 pb-12">
                            <div className="w-32 aspect-square rounded-full bg-base-300" />
                            <div className="h-32 bg-base-300 rounded-lg w-96" />
                        </div>
                        <ul className="flex gap-3 mb-8">
                            <li className="badge badge-lg badge-ghost py-4 px-10" />
                            <li className="badge badge-lg badge-ghost py-4 px-12" />
                            <li className="badge badge-lg badge-ghost py-4 px-9" />
                            <li className="badge badge-lg badge-ghost py-4 px-10" />
                            <li className="badge badge-lg badge-ghost py-4 px-8" />
                        </ul>
                        <div className="h-9 bg-base-300 rounded-lg max-w-lg mb-8" />
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="h-5 bg-base-300 rounded-lg ml-40" />
                            <div className="h-5 bg-base-300 rounded-lg" />
                            <div className="h-5 bg-base-300 rounded-lg" />
                            <div className="h-5 bg-base-300 rounded-lg" />
                            <div className="h-5 bg-base-300 rounded-lg" />
                            <div className="h-5 bg-base-300 rounded-lg max-w-4xl" />
                        </div>
                        <div className="h-9 bg-base-300 rounded-lg max-w-lg mb-8" />
                        <ul className="flex flex-col gap-4 ml-12 mb-12 max-w-xl">
                            <li className="h-5 bg-base-300 rounded-lg" />
                            <li className="h-5 bg-base-300 rounded-lg" />
                            <li className="h-5 bg-base-300 rounded-lg" />
                            <li className="h-5 bg-base-300 rounded-lg" />
                            <li className="h-5 bg-base-300 rounded-lg" />
                            <li className="h-5 bg-base-300 rounded-lg" />
                        </ul>
                        <div className="h-9 bg-base-300 rounded-lg max-w-lg mb-8" />
                        <ul className="grid grid-cols-3 gap-6 mb-8">
                            <li className="card card-compact w-full bg-base-300 rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-300 rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-300 rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-300 rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                            <li className="card card-compact w-full bg-base-300 rounded-lg shadow-xl">
                                <div className="w-full aspect-square rounded-2xl" />
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )

    return (
        <>
            <MyHead title="Portfolio" />
            <div id="top"></div>
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="text-xl leading-loose">
                    <div className="flex flex-row items-center gap-4 pb-6">
                        <Image
                            src={data.thumbnail.image}
                            width={256}
                            height={256}
                            alt={data.title}
                            className="w-24 aspect-square rounded-full border-2 border-base-300"
                        />
                        <div className="text-5xl font-bold mt-4">
                            {data.title}
                        </div>
                        {isLoggedIn && (
                            <>
                                <div className="grow h-24" />
                                <Link
                                    href={`/projects/${projectId}/edit`}
                                    className="btn btn-warning h-12 w-20 text-xl shadow-lg"
                                >
                                    Edit
                                </Link>
                            </>
                        )}
                    </div>
                    <div>
                        Created:{" "}
                        {new Date(data.createdAt).toLocaleDateString(
                            undefined,
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </div>
                    <div className="mb-3">
                        Last Updated:{" "}
                        {new Date(data.updatedAt).toLocaleDateString(
                            undefined,
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </div>
                    <ul className="flex gap-3 mb-8">
                        {data.tags.map((tag) => (
                            <li
                                key={tag.title}
                                className="badge badge-lg badge-primary p-4"
                            >
                                {tag.title}
                            </li>
                        ))}
                    </ul>
                    <div className="text-2xl font-semibold pb-8">
                        Description
                    </div>
                    <div className="text-xl pb-8">{data.description}</div>
                    <div className="text-2xl font-semibold pb-8">
                        Relevant Links
                    </div>
                    <ul className="list-disc flex flex-col gap-4 ml-12 mb-12">
                        {data.links.map((link) => (
                            <li key={link.id}>
                                <a className="link link-info" href={link.url}>
                                    {link.icon}
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="text-2xl font-semibold pb-8">Gallery</div>
                    <ul className="grid grid-cols-3 gap-6 mb-8">
                        {data.gallery.map((gal) => (
                            <li
                                key={gal.id}
                                className="card card-compact w-full bg-base-200 shadow-xl hover:opacity-70 active:scale-90 duration-75"
                            >
                                <a href={gal.image}>
                                    <figure>
                                        <Image
                                            src={gal.image}
                                            width={500}
                                            height={500}
                                            alt={gal.description}
                                            className="w-full aspect-square rounded-t-2xl"
                                        />
                                    </figure>
                                    <div className="card-body text-center">
                                        <p className="text-xl">
                                            {gal.description}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
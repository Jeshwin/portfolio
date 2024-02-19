import MyHead from "@/components/head";
import SWRLoading from "@/components/swrloading";
import Badge from "@/components/badge";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function AllProjects() {
    const {data, error} = useSWR(`/api/get/projects`, fetcher);

    if (error)
        return <SWRLoading head="Error" size={200} fillColor="fill-error" />;

    if (!data)
        return (
            <SWRLoading head="Loading..." size={200} fillColor="fill-primary" />
        );

    return (
        <>
            <MyHead title="Blog" />
            <div className="p-5 mx-auto lg:w-3/4">
                <div className="font-bold text-5xl mb-12">Portfolio</div>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
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
                                    <div className="card-title break-words text-3xl mb-3">
                                        {project.title}
                                    </div>
                                    <div>
                                        Created:{" "}
                                        {new Date(
                                            project.createdAt
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
                                            project.updatedAt
                                        ).toLocaleDateString(undefined, {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className="mb-3 h-36 overflow-scroll">
                                        {project.description}
                                    </div>
                                    <ul className="flex flex-wrap gap-3 justify-end">
                                        {project.tags.map((tag) => (
                                            <Badge
                                                key={tag.title}
                                                text={tag.title}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

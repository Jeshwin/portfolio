import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import {useRouter} from "next/router";
import CustomLinkIcon from "@/components/linkicon";
import SWRLoading from "@/components/swrloading";
import Badge from "@/components/badge";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Project() {
    const router = useRouter();
    const {projectId} = router.query;

    const {data, error} = useSWR(`/api/get/projects/${projectId}`, fetcher);

    if (error) return <SWRLoading size={200} fillColor="fill-error" />;

    if (!data) return <SWRLoading size={200} fillColor="fill-primary" />;

    return (
        <>
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
                            <Badge key={tag.title} text={tag.title} />
                        ))}
                    </ul>
                    <div className="text-2xl font-semibold pb-8">
                        Description
                    </div>
                    <div className="text-xl pb-8">{data.description}</div>
                    <div className="text-2xl font-semibold pb-8">
                        Relevant Links
                    </div>
                    <ul className="flex flex-col gap-4 ml-12 mb-12">
                        {data.links.map((link) => (
                            <li key={link.id}>
                                <a
                                    className="link link-info flex gap-2"
                                    href={link.url}
                                >
                                    <CustomLinkIcon icon={link.icon} />
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="text-2xl font-semibold pb-8">Gallery</div>
                    <ul className="grid grid-cols-3 gap-6 items-start mb-8">
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
                                            className="w-full aspect-auto rounded-t-2xl"
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
    );
}

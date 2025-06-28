import Badge from "@/components/badge";
import {sanitize} from "isomorphic-dompurify";
import SWRLoading from "@/components/swrloading";
import useSWR from "swr";
import axios from "axios";
import {useRouter} from "next/router";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Post() {
    const router = useRouter();
    const {postId} = router.query;

    const {data, error} = useSWR(`/api/get/posts/${postId}`, fetcher);

    if (error) return <SWRLoading size={200} fillColor="fill-error" />;

    if (!data) return <SWRLoading size={200} fillColor="fill-primary" />;

    return (
        <>
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="flex w-full text-5xl font-bold mb-6">
                    {data.title}
                </div>
                <div className="text-xl mb-4">{data.description}</div>
                <div>
                    Created:{" "}
                    {new Date(data.createdAt).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <div className="mb-3">
                    Last Updated:{" "}
                    {new Date(data.updatedAt).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <ul className="flex gap-3 mb-20">
                    {data.tags.map((tag) => (
                        <Badge key={tag.title} text={tag.title} />
                    ))}
                </ul>
                <div className="grid justify-center">
                    <div
                        className="prose lg:prose-lg xl:prose-xl max-w-5xl pb-12 mx-auto"
                        dangerouslySetInnerHTML={{__html: sanitize(data.body)}}
                    />
                </div>
            </div>
        </>
    );
}

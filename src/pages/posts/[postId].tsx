import MyHead from "@/components/head";
import Badge from "@/components/badge";
import {sanitize} from "isomorphic-dompurify";
import SWRLoading from "@/components/swrloading";
import useSWR from "swr";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Post() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        async function validateToken(token) {
            try {
                const response = await axios.post("/api/validateJWT", {token});
                setIsLoggedIn(response.data.isValid);
            } catch (error) {
                console.error("JWT validation failed: ", error);
                setIsLoggedIn(false);
            }
        }
        validateToken(token);
    });

    const router = useRouter();
    const {postId} = router.query;

    const {data, error} = useSWR(`/api/get/posts/${postId}`, fetcher);

    if (error)
        return <SWRLoading head="Error" size={200} fillColor="fill-error" />;

    if (!data)
        return (
            <SWRLoading head="Loading..." size={200} fillColor="fill-primary" />
        );

    return (
        <>
            <MyHead title="Blog" />
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="flex w-full text-5xl font-bold mb-6">
                    {data.title}
                    {isLoggedIn && (
                        <>
                            <div className="grow h-12" />
                            <Link
                                href={`/posts/${postId}/edit`}
                                className="btn btn-warning h-12 w-20 text-xl shadow-lg"
                            >
                                Edit
                            </Link>
                        </>
                    )}
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

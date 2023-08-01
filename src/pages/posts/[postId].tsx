import MyHead from "@/components/head"
import { sanitize } from 'isomorphic-dompurify'
import useSWR from 'swr'
import axios from "axios"
import { useRouter } from "next/router"

const fetcher = url => axios.get(url).then(res => res.data)

export default function Post() {
    const router = useRouter()
    const { postId } = router.query

    const { data, error } = useSWR(`/api/get/posts/${postId}`, fetcher)

    if (error) return (
        <>
            <MyHead title="Error" />
            <div className=" animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="h-24 bg-error rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8">
                    <div className="h-9 bg-error rounded-lg"/>
                    <div className="h-9 bg-error rounded-lg max-w-4xl"/>
                </div>
                <div className="flex gap-3 mb-20">
                    <div className="badge badge-error badge-lg py-4 px-10"/>
                    <div className="badge badge-error badge-lg py-4 px-12"/>
                    <div className="badge badge-error badge-lg py-4 px-10"/>
                    <div className="badge badge-error badge-lg py-4 px-8"/>
                    <div className="badge badge-error badge-lg py-4 px-9"/>
                </div>
                <div className="h-12 bg-error rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-error rounded-lg ml-40"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg max-w-4xl"/>
                </div>                
                <div className="h-10 bg-error rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-error rounded-lg ml-40"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg max-w-4xl"/>
                </div> 
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-error rounded-lg ml-40"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg"/>
                    <div className="h-6 bg-error rounded-lg max-w-4xl"/>
                </div> 
            </div>
        </>
    )
    if (!data) return (
        <>
            <MyHead title="Loading" />
            <div id="top" />
            <div className=" animate-pulse p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="h-24 bg-base-300 rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8">
                    <div className="h-9 bg-base-300 rounded-lg"/>
                    <div className="h-9 bg-base-300 rounded-lg max-w-4xl"/>
                </div>
                <div className="flex gap-3 mb-20">
                    <div className="badge badge-ghost badge-lg py-4 px-10"/>
                    <div className="badge badge-ghost badge-lg py-4 px-12"/>
                    <div className="badge badge-ghost badge-lg py-4 px-10"/>
                    <div className="badge badge-ghost badge-lg py-4 px-8"/>
                    <div className="badge badge-ghost badge-lg py-4 px-9"/>
                </div>
                <div className="h-12 bg-base-300 rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-base-300 rounded-lg ml-40"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg max-w-4xl"/>
                </div>                
                <div className="h-10 bg-base-300 rounded-lg max-w-2xl mb-12"/>
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-base-300 rounded-lg ml-40"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg max-w-4xl"/>
                </div> 
                <div className="flex flex-col gap-2 mb-8 w-2/3">
                    <div className="h-6 bg-base-300 rounded-lg ml-40"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg"/>
                    <div className="h-6 bg-base-300 rounded-lg max-w-4xl"/>
                </div> 
            </div>
        </>
    )

    return (
        <>
            <MyHead title="Blog" />
            <div id="top" />
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="text-8xl font-bold font-serif mb-12">{data.title}</div>
                <div className="text-4xl mb-8">{data.description}</div>
                <ul className="flex gap-3 mb-20">
                    {data.tags.map((tag) => <li key={tag.title} className="badge badge-lg badge-primary p-4">
                        {tag.title}
                    </li>)}
                </ul>
                <div className="prose lg:prose-xl pb-12" dangerouslySetInnerHTML={{ __html: sanitize(data.body) }} />
            </div>
        </>
    )
}
import MyHead from "@/components/head"
import { sanitize } from 'isomorphic-dompurify'
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"

const prisma = new PrismaClient

export const getStaticProps: GetStaticProps = async () => {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            tags: {
                select: {
                    title: true
                }
            },
            body: true
        },
    })

    return {
        props: { posts },
        revalidate: 10
    }
}

export default function AllPosts({ posts }) {
    return (
        <>
            <MyHead title="Blog" />
            <div id="top" />
            <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
                <div className="font-bold text-7xl mb-12">Blog</div>
                <div>
                    {posts.map((post) => <div key={post.id}>
                        <div className="text-5xl font-bold mb-12">{post.title}</div>
                        <div className="text-4xl font-semibold mb-8">{post.description}</div>
                        <ul className="mb-8">
                            {post.tags.map((tag) => <li key={tag.title} className="badge badge-lg badge-secondary m-2">
                                {tag.title}
                            </li>)}
                        </ul>
                        <div className="prose lg:prose-xl pb-12" dangerouslySetInnerHTML={{ __html: sanitize(post.body) }} />
                    </div>)}
                </div>
            </div>
        </>
    )
}
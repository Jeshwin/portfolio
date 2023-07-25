import MyHead from "@/components/head";
import MarkdownRenderer from "@/components/markdownrenderer";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

const prisma = new PrismaClient


export const getStaticProps: GetStaticProps = async () => {
    const projects = await prisma.project.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            links: true,
            tags: {
                select: {
                    title: true
                }
            },
            thumbnail: {
                select: {
                    image: true
                }
            },
            gallery: {
                select: {
                    image: true,
                    description: true
                }
            }
        },
    })
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

    console.log('PROJECTS: ')
    console.dir(projects)
    console.log('POSTS: ')
    console.dir(posts)

    return {
        props: { projects, posts },
        revalidate: 10
    }
}

export default function Dummy({ projects, posts }) {
    return (
        <>
          <MyHead title="Dummy" />
          <div id='top'></div>
          <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
            <div className="font-bold text-7xl mb-12">Does the Database Work?</div>
            <div>
                {projects.map((project) => <div className="text-xl leading-loose" key={project.id}>
                    <div className="text-5xl font-bold py-12">{project.title}</div>
                    {project.thumbnail.image}
                    <div className="text-4xl font-semibold py-8">{project.description}</div>
                    <ul className="mb-8">
                        {project.tags.map((tag) => <li key={tag.title} className="badge badge-lg badge-primary m-2">
                            {tag.title}
                        </li>)}
                    </ul>
                    <ul>
                        {project.links.map((link) => <li key={link}>
                            <a className="btn btn-xl btn-info mb-6" href={link}>{link}</a>
                        </li>)}
                    </ul>
                    <ul className="mb-8">
                        {project.gallery.map((gal) => <li key={gal.image}>
                            {gal.image}<br/>
                            {gal.description}
                        </li>)}
                    </ul>
                </div>)}
            </div>
            <div>
                {posts.map((post) => <div key={post.id}>
                    <div className="text-5xl font-bold mb-12">{post.title}</div>
                    <div className="text-4xl font-semibold mb-8">{post.description}</div>
                    <ul className="mb-8">
                        {post.tags.map((tag) => <li key={tag.title} className="badge badge-lg badge-secondary m-2">
                            {tag.title}
                        </li>)}
                    </ul>
                    <MarkdownRenderer markdownText={post.body} />
                </div>)}
            </div>
          </div>
        </>
    )
}
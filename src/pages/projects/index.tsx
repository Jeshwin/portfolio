import MyHead from "@/components/head"
import { PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import Image from "next/image"

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

    return {
        props: { projects },
        revalidate: 10
    }
}

export default function AllProjects({ projects }) {
    return (
        <>
          <MyHead title="Portfolio" />
          <div id='top'></div>
          <div className="p-5 lg:px-48 2xl:px-96 lg:py-10 2xl:py-20">
            <div className="font-bold text-7xl mb-12">Portfolio</div>
            <div>
                {projects.map((project) => <div className="text-xl leading-loose" key={project.id}>
                    <div className="text-5xl font-bold py-12">{project.title}</div>
                    <Image 
                        src={project.thumbnail.image}
                        width={500} height={500}
                        alt={project.title}
                        className="mask mask-hexagon"
                    />
                    <div className="text-4xl font-semibold py-8">{project.description}</div>
                    <ul className="mb-8">
                        {project.tags.map((tag) => <li key={tag.title} className="badge badge-lg badge-primary m-2">
                            {tag.title}
                        </li>)}
                    </ul>
                    <ul>
                        {project.links.map((link) => <li key={link}>
                            <a className="link link-info mb-6" href={link}>{link}</a>
                        </li>)}
                    </ul>
                    <ul className="grid grid-cols-3 gap-6 mb-8">
                        {project.gallery.map((gal) => <li key={gal.image}>
                            <Image 
                                src={gal.image}
                                width={500} height={500}
                                alt={gal.description}
                                className=" w-full rounded-xl"
                            />
                            {gal.description}
                        </li>)}
                    </ul>
                </div>)}
            </div>
          </div>
        </>
    )
}
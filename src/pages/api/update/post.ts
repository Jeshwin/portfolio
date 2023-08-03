import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { id, title, tags, description, body } = req.body

    try {
        const deleteTags = prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                tags: {
                    set: [],
                },
            },
        })

        const updatePost = prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: tag,
                        create: tag,
                    })),
                },
                body,
            },
        })

        const updatedPost = await prisma.$transaction([deleteTags, updatePost])
        return res.status(200).json(updatedPost)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
    }
}
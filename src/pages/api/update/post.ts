import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { id, title, tags, description, body } = req.body

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { title: tag },
                        create: { title: tag },
                    })),
                },
                body,
            },
        })
        return res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({ error })
    }
}

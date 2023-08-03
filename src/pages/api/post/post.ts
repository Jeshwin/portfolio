import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { title, tags, description, body } = req.body

    try {
        const newPost = await prisma.post.create({
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
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(500).json({ error })
    }
}

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const id = parseInt(req.query.id);

    if (req.method !== "GET") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // Find the tag with the given title
        const post = await prisma.post.findUnique({
            where: {id},
            include: {
                tags: true,
            },
        });

        if (!post) {
            return res.status(404).json({error: "Post not found"});
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({error});
    }
}

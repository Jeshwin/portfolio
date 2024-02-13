import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {title} = req.query;

    if (req.method !== "GET") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // Find the tag with the given title
        const tag = await prisma.tag.findUnique({
            where: {title},
            include: {
                posts: true, // Include the posts associated with the tag
            },
        });

        if (!tag) {
            return res.status(404).json({error: "Tag not found"});
        }

        return res.status(200).json(tag.posts);
    } catch (error) {
        return res.status(500).json({error: "Something went wrong"});
    }
}

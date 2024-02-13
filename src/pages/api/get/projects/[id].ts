import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const id = parseInt(req.query.id);

    if (req.method !== "GET") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // Find the tag with the given title
        const project = await prisma.project.findUnique({
            where: {id},
            include: {
                thumbnail: true,
                tags: true,
                links: true,
                gallery: true,
            },
        });

        if (!project) {
            return res.status(404).json({error: "Project not found"});
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({error: "Something went wrong"});
    }
}

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    const {id, title, tags, description, thumbnail, links, gallery} = req.body;

    console.log("RECEIVED NEW PROJECT DATA: \n");
    console.dir(req.body);

    try {
        const deleteRelations = prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: {
                thumbnail: {
                    delete: thumbnail ? true : false,
                },
                tags: {
                    set: [],
                },
                links: {
                    deleteMany: {},
                },
                gallery: {
                    deleteMany: {},
                },
            },
        });

        let updateQuery: any = {
            title,
            description,
            tags: {
                connectOrCreate: tags.map((tag) => ({
                    where: {title: tag},
                    create: {title: tag},
                })),
            },
            links: {
                create: links.map((link) => ({
                    url: link.url,
                    title: link.title,
                    icon: link.icon,
                })),
            },
            gallery: {
                create: gallery.map((item) => ({
                    image: item.image,
                    description: item.description,
                })),
            },
        };

        if (thumbnail) {
            updateQuery.thumbnail = {
                create: {
                    image: thumbnail,
                },
            };
        }

        const updateProject = prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: updateQuery,
        });

        const updatedProject = await prisma.$transaction([
            deleteRelations,
            updateProject,
        ]);
        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
}

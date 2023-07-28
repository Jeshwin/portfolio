import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, tags, description, links, thumbnail, gallery } = req.body

  try {
    const newProject = await prisma.project.create({
        data: {
            title,
            description,
            tags: {
                connectOrCreate: tags.map((tag) => ({
                    where: { title: tag },
                    create: { title: tag }
                }))
            },
            links,
            thumbnail: {
              create: {
                image: thumbnail
              }
            },
            gallery: {
                create: gallery.map((item) => ({ image: item.image, description: item.description }))
            }
        }
    })
    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
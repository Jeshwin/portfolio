import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const projects = await prisma.project.findMany({
      include: {
        tags: true,
        thumbnail: true
      }
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

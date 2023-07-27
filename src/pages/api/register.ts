// Assuming you have already set up Prisma in your file
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body
  console.dir({ email, password })
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

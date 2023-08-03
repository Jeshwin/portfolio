import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body

  const user = await prisma.admin.findUnique({ where: { email } })

  if (!user) {
    return res.status(500).json(new Error('Invalid credentials'))
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(500).json(new Error('Invalid credentials'))
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })

  return res.status(200).json({ token })
}

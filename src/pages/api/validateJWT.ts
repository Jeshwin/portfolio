import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.body
    console.log("Attempting to validate token " + token)

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        return res.status(200).json({ isValid: true })
    } catch(error) {
        console.log(error)
        return res.status(401).json({ isValid: false })
    }
}
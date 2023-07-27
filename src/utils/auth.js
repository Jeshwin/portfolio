import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function isTokenValid(token) {
  try {
    console.log("JWT_SECRET_KEY: " + process.env.JWT_SECRET_KEY)
    console.log("Attempting to validate token " + token)
    jwt.verify(token, process.env.JWT_SECRET_KEY)
    return true
  } catch (error) {
    return false
  }
}

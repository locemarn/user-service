import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export async function encryptHash(password: string) {
  return await bcrypt.hashSync(password, 10)
}

export async function comparePasswords(
  password: string,
  hasehdPassword: string
): Promise<boolean> {
  return await bcrypt.compareSync(password, hasehdPassword)
}

export async function generateToken(params: string) {
  const token = await jwt.sign({ params }, process.env.JWT_PASS ?? '', {
    expiresIn: '8h',
  })
  return { token, message: 'User Logged in Successfully' }
}

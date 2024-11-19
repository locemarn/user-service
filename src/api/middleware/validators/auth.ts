import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../../configs'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Error('Unauthorized')
    }
    const token = authorization.split(' ')[1]
    jwt.verify(token, config.jwt.secret, (err) => {
      if (err) {
        throw new Error('Unauthorized')
      }
    })
    next()
  } catch (error) {
    console.error('authMiddleware errror', error)
    res.status(401).json({
      error: true,
      message: 'Unauthorized',
    })
  }
}

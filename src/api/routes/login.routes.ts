import express, { Request, Response } from 'express'
import { UserService } from '../../service/user.service'
import { UserRepository } from '../../repository/user.repository'
import { User, UserResponse } from '../../models/user.model'
import { createUserSchema } from '../middleware/validators/create-user.validator'
import { validateRequest } from '../middleware/validators/validator'
import { comparePasswords, encryptHash, generateToken } from '../auth'

const router = express.Router()

export const userService = new UserService(new UserRepository())

router.post('/', async (req: Request, res: Response) => {
  const { password, email } = req.body
  const user = await userService.findUserByEmail(email)
  if (!user) throw new Error('User not found.')

  userService
    .login(password, user)
    .then((token) =>
      res.status(200).json({
        user,
        error: false,
        token,
      })
    )
    .catch((error) => {
      const err = error as Error
      return res
        .status(400)
        .json({ message: err.message, stack: err.stack, name: err.name })
    })

  // console.log('token', token)
  // res.status(200).json({
  //   user,
  //   error: false,
  //   token,
  // })
})

export default router

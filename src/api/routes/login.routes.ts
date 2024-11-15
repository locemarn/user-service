import express, { Request, Response } from 'express'
import { UserRepository } from '../../@core/infra/db/prisma/repository/user.repository'
import { UserService } from '../../@core/service/user.service'

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
})

export default router

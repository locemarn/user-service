import express, { Request, Response } from 'express'
import { UserService } from '../../service/user.service'
import { UserRepository } from '../../repository/user.repository'
import { User } from '../../models/user.model'
import { createUserSchema } from '../middleware/validators/create-user.validator'
import { validateRequest } from '../middleware/validators/validator'
import { encryptHash } from '../auth'
import { authMiddleware } from '../middleware/validators/auth'

const router = express.Router()

export const userService = new UserService(new UserRepository())

router.post(
  '/',
  validateRequest(createUserSchema),
  async (req: Request, res: Response) => {
    const hashedPassword = await encryptHash(req.body.password)
    const input: User = {
      ...req.body,
      password: hashedPassword,
    }
    userService
      .createUser(input)
      .then((data) => res.status(201).json(data))
      .catch((error) => {
        const err = error as Error
        return res
          .status(400)
          .json({ message: err.message, stack: err.stack, name: err.name })
      })
  }
)

router.patch('/:id', (req: Request, res: Response) => {
  const reqBody = req.body as User
  const id = parseInt(req.params.id)
  userService
    .updateUser(id, reqBody)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      // console.log('route error', error)
      const err = error as Error
      return res
        .status(500)
        .json({ message: err.message, stack: err.stack, name: err.name })
    })
})

router.get('/', (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10
  const offset = Number(req.query.offset)
  userService
    .findAllUser(limit, offset)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      // console.log('route error', error)
      const err = error as Error
      return res
        .status(500)
        .json({ message: err.message, stack: err.stack, name: err.name })
    })
})

router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id) || 0
  userService
    .deleteUser(id)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      // console.log('route error', error)
      const err = error as Error
      return res
        .status(500)
        .json({ message: err.message, stack: err.stack, name: err.name })
    })
})

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id) || 0
  userService
    .findUser(id)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      // console.log('route error', error)
      const err = error as Error
      return res
        .status(500)
        .json({ message: err.message, stack: err.stack, name: err.name })
    })
})

export default router

import express, { Request, Response } from 'express'
import { User } from '../../@core/domain/user.entity'
import { createUserSchema } from '../middleware/validators/create-user.validator'
import { validateRequest } from '../middleware/validators/validator'
import { encryptHash } from '../auth'
import { authMiddleware } from '../middleware/validators/auth'
import { UserRepository } from '../../@core/infra/db/prisma/repository/user.repository'
import { UserService } from '../../@core/service/user.service'
import { logger } from '../../libs/logger'

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
        logger.error({
          service: 'User ROUTE POST',
          message: error.message,
        })
        return res.status(500).json({
          message: err.message,
          name: err.name,
          statusCode: error.statusCode,
        })
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
      logger.error({
        service: 'User ROUTE PATCH',
        message: error.message,
      })
      const err = error as Error
      return res.status(500).json({ message: err.message, name: err.name })
    })
})

router.get('/', (req: Request, res: Response) => {
  const limit = Number(req.query.limit)
  const offset = Number(req.query.offset)
  userService
    .findAllUser(limit, offset)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
      // console.log('route error', error)
      const err = error as Error
      logger.error({
        service: 'User ROUTE GET ALL',
        message: error.message,
      })
      return res.status(500).json({
        message: err.message,
        name: err.name,
        statusCode: error.statusCode,
      })
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
      logger.error({
        service: 'User ROUTE DELETE BY ID',
        message: error.message,
      })
      return res.status(500).json({ message: err.message, name: err.name })
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
      logger.error({
        service: 'User ROUTE GET BY ID',
        message: error.message,
      })
      return res.status(500).json({ message: err.message, name: err.name })
    })
})

export default router

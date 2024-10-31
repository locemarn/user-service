import express, { NextFunction, Request, Response } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { UserResponse } from '../../../models/user.model'
import { UserFactory } from '../../../utils/fixtures'
import { authMiddleware } from '../../middleware/validators/auth'
import userRoutes, { userService } from '../user.routes'

const app = express()
app.use(express.json())
app.use(userRoutes)

const mockRequest = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 10, memorable: true }),
  role: 'tester',
})

// /^[a-zA-Z0-9]{3,30}$/

jest.mock('../../middleware/validators/auth')
const authMock = jest.mocked(authMiddleware)

beforeEach(() => {
  authMock.mockRestore()
})

describe('User routes', () => {
  describe('POST /users', () => {
    test('should create a new user', async () => {
      const requestBody = mockRequest()
      const user = UserFactory.build()

      jest
        .spyOn(userService, 'createUser')
        .mockImplementationOnce(() => Promise.resolve(user))

      const sut = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.body)
      expect(sut.status).toBe(201)
      expect(sut.body.id).toBeGreaterThan(0)
    })

    test('should return an internal error when create an user', async () => {
      const requestBody = mockRequest()
      const user = UserFactory.build()

      jest
        .spyOn(userService, 'createUser')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('unable to create an user.'))
        )

      const sut = await request(app)
        .post('/')
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.body)
      expect(sut.status).toBe(400)
      expect(sut.body.message).toEqual('unable to create an user.')
    })
  })

  describe('PATCH /users/:id', () => {
    test('should update a new user', async () => {
      const requestBody = mockRequest()
      const user = UserFactory.build()

      jest
        .spyOn(userService, 'updateUser')
        .mockImplementationOnce(() => Promise.resolve(user))

      const sut = await request(app)
        .patch(`/${user.id}`)
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.body, requestBody)
      expect(sut.status).toBe(200)
      expect(sut.body.username).toEqual(user.username)
      expect(sut.body.email).toEqual(user.email)
      expect(sut.body.role).toEqual(user.role)
    })

    test('should return an internal error when create an user', async () => {
      const requestBody = mockRequest()
      const user = UserFactory.build()
      // console.log('user.id', user.id)
      const userId: number = user.id

      jest
        .spyOn(userService, 'updateUser')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('unable to update an user.'))
        )

      const sut = await request(app)
        .patch(`/${userId}`)
        .send(requestBody)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(500)
      expect(sut.body.message).toEqual('unable to update an user.')
    })
  })

  describe('DELETE /users/:id', () => {
    test('should delete an user', async () => {
      const user = UserFactory.build()
      authMock.mockImplementation(
        async (req: Request, res: Response, next: NextFunction) => next()
      )

      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementationOnce(() => Promise.resolve(user))

      const sut = await request(app)
        .delete(`/${user.id}`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(200)
    })

    test('should return an internal error when delete an user', async () => {
      const user = UserFactory.build()
      authMock.mockImplementation(
        async (req: Request, res: Response, next: NextFunction) => next()
      )
      const userId: number = user.id
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementationOnce(async () =>
          Promise.reject(new Error('unable to delete an user.'))
        )

      const sut = await request(app)
        .delete(`/${userId}`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(500)
      expect(sut.body.message).toEqual('unable to delete an user.')
    })
  })

  describe('GET /users/:id', () => {
    test('should get an user by id', async () => {
      const user = UserFactory.build()

      jest
        .spyOn(userService, 'findUser')
        .mockImplementationOnce(() => Promise.resolve(user))

      const sut = await request(app)
        .get(`/${user.id}`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(200)
    })

    test('should return an internal error when find an user', async () => {
      const user = UserFactory.build()
      const userId: number = user.id
      jest
        .spyOn(userService, 'findUser')
        .mockImplementationOnce(async () =>
          Promise.reject(new Error('unable to find an user.'))
        )

      const sut = await request(app)
        .get(`/${userId}`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(500)
      expect(sut.body.message).toEqual('unable to find an user.')
    })
  })

  describe('GET /users', () => {
    test('should get all users', async () => {
      const usersList: UserResponse[] = []
      const limit = 3
      for (let i = 0; i < limit; i++) {
        usersList.push(UserFactory.build())
      }
      jest
        .spyOn(userService, 'findAllUser')
        .mockImplementationOnce(() => Promise.resolve(usersList))

      const sut = await request(app)
        .get(`?limit=${limit}&offset=0`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(200)
      expect(sut.body.length).toBeLessThanOrEqual(limit)
    })

    test('should return an internal error when find all users', async () => {
      const limit = 10
      jest
        .spyOn(userService, 'findAllUser')
        .mockImplementationOnce(async () =>
          Promise.reject(new Error('unable to find all users.'))
        )

      const sut = await request(app)
        .get(`?limit=${limit}&offset=0`)
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(500)
      expect(sut.body.message).toEqual('unable to find all users.')
    })
  })
})

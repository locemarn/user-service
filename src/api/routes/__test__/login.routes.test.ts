import express, { NextFunction, Request, Response } from 'express'
import request from 'supertest'
import loginRouter, { userService } from '../login.routes'
import { faker } from '@faker-js/faker/.'
import { UserFactory, UserLoginFactory } from '../../../utils/fixtures'

import { comparePasswords, encryptHash, generateToken } from '../../auth/index'

import * as dotenv from 'dotenv'
import { UserWPassword } from '../../../types/user.types'
dotenv.config()

const app = express()
app.use(express.json())
app.use(loginRouter)

beforeEach(() => {
  jest.resetAllMocks()
})

describe('Login routes', () => {
  describe('POST /login', () => {
    test('should login an user', async () => {
      const user = UserFactory.build()
      const password = faker.internet.password()
      const email = faker.internet.email()
      const token = '123madhash456'

      jest
        .spyOn(userService, 'findUserByEmail')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...user, password: '123456' })
        )

      jest.spyOn(userService, 'login').mockImplementationOnce(() =>
        Promise.resolve({
          token,
          message: 'User Logged in Successfully',
        })
      )

      const sut = await request(app)
        .post('/')
        .send({
          email,
          password,
        })
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(200)
      expect(sut.body.token.token).toEqual(token)
      expect(sut.body.user.email).toEqual(user.email)
      expect(sut.error).toBeFalsy()
    })

    test('should fail login if password is incorrect', async () => {
      const user = UserFactory.build()
      const password = faker.internet.password()
      const email = faker.internet.email()
      const token = '123madhash456'

      jest
        .spyOn(userService, 'findUserByEmail')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...user, password: '123456' })
        )

      jest
        .spyOn(userService, 'login')
        .mockImplementationOnce(() =>
          Promise.reject(new Error('invalid password'))
        )

      const sut = await request(app)
        .post('/')
        .send({
          email,
          password,
        })
        .set('Accept', 'application/json')

      // console.log('sut', sut.status, sut.body)
      expect(sut.status).toBe(400)
      expect(sut.body.message).toEqual('invalid password')
    })
  })
})

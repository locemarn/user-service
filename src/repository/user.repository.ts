import { UserRepositoryInterface } from '../interface/UserRepository.interface'
import { User, UserResponse } from '../models/user.model'
import { Prisma, PrismaClient } from '@prisma/client'
import { UserWPassword } from '../types/user.types'
import prisma from '../libs/prisma/mock/client'

export class UserRepository implements UserRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async create(data: User): Promise<UserResponse> {
    try {
      return await this._prisma.user.create({
        data,
        select: {
          username: true,
          email: true,
          id: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        },
      })
    } catch (e) {
      // console.error('Error when create an user')
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (e.code === 'P2002') {
      //     console.error(
      //       'There is a unique constraint violation, a new user cannot be created with this email'
      //     )
      //   }
      // }
      throw e
    }
  }
  async update(id: number, data: User): Promise<UserResponse> {
    try {
      return await this._prisma.user.update({
        omit: { password: true },
        where: { id },
        data,
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (e.code === 'P2002') {
      //     console.error(
      //       'There is a unique constraint violation, a new user cannot be created with this email'
      //     )
      //   }
      // }
      throw e
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const user = await this._prisma.user.delete({
        where: { id },
      })
      return user
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (e.code === 'P2025') {
      //     console.error('user not found.')
      //   }
      // }
      throw e
    }
  }
  async find(limit: number, offset: number): Promise<UserResponse[]> {
    return []
    // return await this._prisma.user.findMany({
    //   skip: offset,
    //   take: limit,
    //   orderBy: {
    //     id: 'desc',
    //   },
    // })
  }
  async findOne(id: number): Promise<UserResponse> {
    try {
      return await this._prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          username: true,
          email: true,
          id: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        },
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (e.code === 'P2025') {
      //     console.error('user not found.')
      //   }
      // }
      throw e
    }
  }

  async findByEmail(email: string): Promise<UserWPassword> {
    try {
      return await this._prisma.user.findUniqueOrThrow({
        where: { email },
        select: {
          username: true,
          email: true,
          id: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: true,
        },
      })
    } catch (e) {
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (e.code === 'P2025') {
      //     console.error('user not found.')
      //   }
      // }
      throw e
    }
  }
}

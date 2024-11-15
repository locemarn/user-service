import { PrismaClient } from '@prisma/client'
import { UserWPassword } from '../../../../../types/user.types'
import { userRepositoryErrorFilter } from '../../../../../utils/fixtures/errors/repository.errors'
import { UserRepositoryInterface } from '../../../../domain/repository/UserRepository.interface'
import { User, UserResponse } from '../../../../domain/user.entity'
import prisma from '../client'

export class UserRepository implements UserRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async create(data: User): Promise<UserResponse | void> {
    try {
      return await this._prisma.user.create({ data })
    } catch (error) {
      userRepositoryErrorFilter(error)
      throw error
    }
  }
  async update(id: number, data: User): Promise<UserResponse | void> {
    try {
      return await this._prisma.user.update({
        omit: { password: true },
        where: { id },
        data,
      })
    } catch (error) {
      userRepositoryErrorFilter(error)
    }
  }

  async delete(id: number): Promise<UserResponse | void> {
    try {
      const user = await this._prisma.user.delete({
        where: { id },
      })
      return user
    } catch (error) {
      userRepositoryErrorFilter(error)
    }
  }
  async find(limit: number, offset: number): Promise<UserResponse[] | void> {
    try {
      return await this._prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      })
    } catch (error) {
      userRepositoryErrorFilter(error)
    }
  }
  async findOne(id: number): Promise<UserResponse | void> {
    try {
      return await this._prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          username: true,
          email: true,
          id: true,
          role: true,
          created_at: true,
          updated_at: true,
          password: false,
        },
      })
    } catch (error) {
      userRepositoryErrorFilter(error)
    }
  }

  async findByEmail(email: string): Promise<UserWPassword | void> {
    try {
      return await this._prisma.user.findUniqueOrThrow({
        where: { email },
        select: {
          username: true,
          email: true,
          id: true,
          role: true,
          created_at: true,
          updated_at: true,
          password: true,
        },
      })
    } catch (error) {
      userRepositoryErrorFilter(error)
    }
  }
}

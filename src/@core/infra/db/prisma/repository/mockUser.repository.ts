import { faker } from '@faker-js/faker'
import { User, UserResponse } from '../../../../domain/user.entity'
import { USERROLES, UserWPassword } from '../../../../../types/user.types'
import { UserRepositoryInterface } from '../../../../domain/repository/UserRepository.interface'

export const mockUser: User = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: USERROLES.TESTER,
}

export class MockUserRepository implements UserRepositoryInterface {
  async create(data: User): Promise<UserResponse> {
    if (!data.username || !data.email || !data.password || !data.role) {
      throw new Error('incorrect value.')
    }
    const mockUser: UserResponse = {
      id: 1,
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    } as UserResponse
    return Promise.resolve(mockUser)
  }

  async update(id: number, data: User): Promise<UserResponse> {
    try {
      const user = Object.freeze({
        id,
        username: data.username,
        email: data.email,
        role: data.role,
        created_at: new Date(),
        updated_at: new Date(),
      })
      return Promise.resolve(user as unknown as UserResponse)
    } catch (error: any) {
      console.error('error ->', error)
      return Promise.reject(new Error(error.message))
    }
  }

  async delete(id: number): Promise<UserResponse | void> {
    return Promise.resolve({
      id,
      ...mockUser,
      created_at: new Date(),
      updated_at: new Date(),
    })
  }

  async find(limit: number, offset: number): Promise<UserResponse[]> {
    if (!limit) limit = 0
    if (!offset) offset = 0
    const userList = []
    for (let i = 0; i < limit; i++) {
      userList.push({
        ...mockUser,
        id: i + 1,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    return Promise.resolve(userList)
  }

  async findOne(id: number): Promise<UserResponse> {
    const data = (await Promise.resolve({ id })) as unknown as UserResponse
    return data
  }

  async findByEmail(email: string): Promise<UserWPassword> {
    const data = (await Promise.resolve({ email })) as unknown as UserWPassword
    return data
  }
}

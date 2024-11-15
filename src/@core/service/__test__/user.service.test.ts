import { USERROLES } from '../../../types/user.types'
import { UserRepositoryInterface } from '../../domain/repository/UserRepository.interface'
import { User } from '../../domain/user.entity'
import {
  mockUser,
  MockUserRepository,
} from '../../infra/db/prisma/repository/mockUser.repository'
import { UserService } from '../user.service'

describe('User Service', () => {
  let repository: UserRepositoryInterface

  beforeEach(() => {
    repository = new MockUserRepository()
  })

  afterEach(() => {
    repository = {} as MockUserRepository
    jest.clearAllMocks()
  })

  describe('Create User', () => {
    test('should create an user', async () => {
      const service = new UserService(repository)
      const result = await service.createUser(mockUser)

      expect(result).toHaveProperty('id', expect.any(Number))
      expect(result).toHaveProperty('username', mockUser.username)
      expect(result).toHaveProperty('email', mockUser.email)
      expect(result).toHaveProperty('password', mockUser.password)
      expect(result).toHaveProperty('role', mockUser.role)
    })

    test('should return an error if miss email property', async () => {
      const service = new UserService(repository)
      const user: User = {
        ...mockUser,
        email: '',
      }
      await expect(service.createUser(user)).rejects.toThrow('incorrect value.')
    })

    test('should return an error if miss username property', async () => {
      const service = new UserService(repository)
      const user: User = {
        ...mockUser,
        username: '',
      }
      await expect(service.createUser(user)).rejects.toThrow('incorrect value')
    })

    test('should return an error if miss password property', async () => {
      const service = new UserService(repository)
      const user: User = {
        ...mockUser,
        password: '',
      }
      await expect(service.createUser(user)).rejects.toThrow('incorrect value')
    })

    test('should return an error if miss role property', async () => {
      const service = new UserService(repository)
      const user: User = {
        ...mockUser,
        role: '' as USERROLES,
      }
      await expect(service.createUser(user)).rejects.toThrow('incorrect value.')
    })
  })

  describe('Update user', () => {
    test('should update an email user', async () => {
      const service = new UserService(repository)
      const user = await service.createUser(mockUser)
      const id = user?.id || 0
      const updateUser: User = {
        ...mockUser,
        email: 'updateduser@email.com',
      }
      const sut: any = await service.updateUser(id, updateUser)
      expect(sut.email).toEqual(updateUser.email)
    })

    test('should update an username user', async () => {
      const service = new UserService(repository)
      const user = await service.createUser(mockUser)
      const id = user?.id || 0
      const updateUser: User = {
        ...mockUser,
        username: 'updateduser',
      }
      const sut: any = await service.updateUser(id, updateUser)
      expect(sut.username).toEqual(updateUser.username)
    })
  })

  describe('Delete user', () => {
    test('should delete an user', async () => {
      const service = new UserService(repository)
      const user = await service.createUser(mockUser)
      const userId = user?.id ?? 1

      const sut = await service.deleteUser(userId)
      expect(sut).toHaveProperty('id', userId)
    })
  })

  describe('FindOne user', () => {
    test('should find user by id', async () => {
      const service = new UserService(repository)
      const user = await service.createUser(mockUser)
      const userId = user?.id ?? 1

      const sut = await service.findUser(userId)
      expect(sut).toHaveProperty('id', userId)
    })
  })

  describe('Find all user', () => {
    test('should find all users', async () => {
      const service = new UserService(repository)
      const sut = await service.findAllUser(10, 0)
      expect(sut).toHaveLength(10)
    })
  })
})

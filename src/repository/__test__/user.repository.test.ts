import { UserRepositoryInterface } from '../../interface/UserRepository.interface'
import { prismaMock } from '../../libs/prisma/mock/singleton'
import { UserRepository } from '../user.repository'
import { USERROLES } from '../../types/user.types'

describe('Users repository', () => {
  let repository: UserRepositoryInterface
  const MOCK_DATE = '2022-01-01T00:00:00Z'
  const USER_ID = 1
  const REQUEST_BODY = {
    username: 'username',
    email: 'test@email.com',
    password: '123456',
    role: USERROLES.TESTER,
  }

  const RESPONSE_BODY = {
    ...REQUEST_BODY,
    id: 1,
    created_at: new Date(MOCK_DATE),
    updated_at: new Date(MOCK_DATE),
  }

  beforeEach(() => {
    repository = new UserRepository()
  })

  afterEach(() => {
    repository = {} as UserRepository
  })
  describe('CREATE', () => {
    test('should create a new user', async () => {
      prismaMock.user.create.mockResolvedValue(RESPONSE_BODY)

      const sut = await repository.create(REQUEST_BODY)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when create a new user', async () => {
      prismaMock.user.create.mockImplementation(() => {
        throw new Error('Error to create an user.')
      })
      await expect(repository.create({} as unknown as any)).rejects.toThrow(
        'Error to create an user.'
      )
    })
  })

  describe('UPDATE', () => {
    test('should update a new user', async () => {
      prismaMock.user.update.mockResolvedValue(RESPONSE_BODY)

      const sut = await repository.update(USER_ID, REQUEST_BODY)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when update a new user', async () => {
      prismaMock.user.update.mockImplementation(() => {
        throw new Error('Error to update an user.')
      })
      await expect(
        repository.update(USER_ID, {} as unknown as any)
      ).rejects.toThrow('Error to update an user.')
    })
  })

  describe('DELETE', () => {
    test('should delete a new user', async () => {
      prismaMock.user.delete.mockResolvedValue(RESPONSE_BODY)

      const sut = await repository.delete(USER_ID)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when delete a new user', async () => {
      prismaMock.user.delete.mockImplementation(() => {
        throw new Error('Error to delete an user.')
      })
      await expect(repository.delete(USER_ID)).rejects.toThrow(
        'Error to delete an user.'
      )
    })
  })

  describe('FIND', () => {
    test('should find a list of user', async () => {
      prismaMock.user.findMany.mockResolvedValue([RESPONSE_BODY])

      const sut = await repository.find(10, 0)

      expect(sut).toHaveLength(1)
      expect(sut[0]).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when find a list of user', async () => {
      prismaMock.user.findMany.mockImplementation(() => {
        throw new Error('Error to find a list of user.')
      })

      // const sut = await repository.find(10, 0)

      // console.log('sut', sut)
      await expect(repository.find(10, 0)).rejects.toThrow(
        'Error to find a list of user.'
      )
    })
  })

  describe('FIND ONE', () => {
    test('should find one a new user', async () => {
      prismaMock.user.findUniqueOrThrow.mockResolvedValue(RESPONSE_BODY)

      const sut = await repository.findOne(USER_ID)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when findOne a new user', async () => {
      prismaMock.user.findUniqueOrThrow.mockImplementation(() => {
        throw new Error('Error to find one an user.')
      })
      await expect(repository.findOne(USER_ID)).rejects.toThrow(
        'Error to find one an user.'
      )
    })
  })

  describe('FIND EMAIL', () => {
    test('should find email an user', async () => {
      prismaMock.user.findUniqueOrThrow.mockResolvedValue(RESPONSE_BODY)

      const sut = await repository.findByEmail(REQUEST_BODY.email)

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })

      // console.log('sut', sut)
    })

    test('should throw an error when find an user by email', async () => {
      prismaMock.user.findUniqueOrThrow.mockImplementation(() => {
        throw new Error('Error to find an user by email.')
      })
      await expect(repository.findByEmail(REQUEST_BODY.email)).rejects.toThrow(
        'Error to find an user by email.'
      )
    })
  })
})

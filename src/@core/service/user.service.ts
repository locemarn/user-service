import { comparePasswords, generateToken } from '../../api/auth'
import { UserRepositoryInterface } from '../domain/repository/UserRepository.interface'
import { User } from '../domain/user.entity'
import { UserWPassword } from '../../types/user.types'
import { logger } from '../../libs/logger'

export class UserService {
  private _repository: UserRepositoryInterface

  constructor(repository: UserRepositoryInterface) {
    this._repository = repository
  }

  async createUser(input: User) {
    const data = await this._repository.create(input)
    return data
  }

  async updateUser(id: number | string, input: User) {
    return await this._repository.update(id, {
      ...input,
      updated_at: new Date(),
    })
  }

  async deleteUser(id: number | string) {
    const data = await this._repository.delete(id)
    return data
  }

  async findUser(id: number | string) {
    const data = await this._repository.findOne(id)
    return data
  }

  async findAllUser(limit: number, offset: number) {
    const data = await this._repository.find(limit, offset)
    return data
  }

  async findUserByEmail(email: string) {
    try {
      const data = await this._repository.findByEmail(email)
      return data
    } catch (error: any) {
      logger.error({
        service: 'UserService findUserByEmail',
        message: error?.message,
      })
      // console.error('error', error)
      // throw new Error('user not found.')
    }
  }

  async login(password: string, user: UserWPassword) {
    const isValidPassword = await comparePasswords(password, user.password)
    if (!isValidPassword) throw new Error('invalid password')

    const token = await generateToken(user.email)

    return token
  }
}

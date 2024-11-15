import { User, UserResponse } from '../user.entity'
import { UserWPassword } from '../../../types/user.types'

export interface UserRepositoryInterface {
  create(data: User): Promise<UserResponse | void>
  update(id: number | string, data: User): Promise<UserResponse | void>
  delete(id: number | string): Promise<UserResponse | void>
  find(limit: number, offset: number): Promise<UserResponse[] | void>
  findOne(id: number | string): Promise<UserResponse | void>
  findByEmail(email: string): Promise<UserWPassword | void>
}

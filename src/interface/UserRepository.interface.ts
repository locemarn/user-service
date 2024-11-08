import { User, UserResponse } from '../models/user.model'
import { UserWPassword } from '../types/user.types'

export interface UserRepositoryInterface {
  create(data: User): Promise<UserResponse | void>
  update(id: number, data: User): Promise<UserResponse | void>
  delete(id: number): Promise<UserResponse | void>
  find(limit: number, offset: number): Promise<UserResponse[] | void>
  findOne(id: number): Promise<UserResponse | void>
  findByEmail(email: string): Promise<UserWPassword | void>
}

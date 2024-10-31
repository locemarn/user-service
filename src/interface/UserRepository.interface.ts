import { User, UserResponse } from '../models/user.model'
import { UserWPassword } from '../types/user.types'

export interface UserRepositoryInterface {
  create(data: User): Promise<UserResponse>
  update(id: number, data: User): Promise<UserResponse>
  delete(id: number): Promise<object>
  find(limit: number, offset: number): Promise<UserResponse[]>
  findOne(id: number): Promise<UserResponse>
  findByEmail(email: string): Promise<UserWPassword>
}

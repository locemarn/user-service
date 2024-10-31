import { USERROLES } from '../types/user.types'

export class User {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: USERROLES,
    public readonly id?: number
  ) {}
}

export class UserResponse {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly role: string,
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

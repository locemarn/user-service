import { UserResponse } from '../models/user.model'

export enum USERROLES {
  SUPERUSER = 'superuser',
  ADMIN = 'admin',
  READER = 'reader',
  EDITOR = 'editor',
  TESTER = 'tester',
}

export interface UserWPassword extends UserResponse {
  password: string
}

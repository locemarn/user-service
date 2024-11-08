import { PrismaCustomError } from './prisma.errors'

export function userRepositoryErrorFilter(error: any): string {
  // console.log('error.code', error)
  switch (error.code) {
    case 'P2000':
      throw new PrismaCustomError('Invalid input provided.', 500)
    case 'P2002':
      throw new PrismaCustomError(`${error.meta.target[0]} already exist.`, 500)
    default:
      throw new PrismaCustomError('An unexpected error occurred:', 500)
  }
}

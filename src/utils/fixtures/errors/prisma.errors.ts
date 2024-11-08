export class PrismaCustomError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

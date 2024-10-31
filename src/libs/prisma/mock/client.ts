import { PrismaClient } from '@prisma/client'

const prisma: any = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
})
export default prisma

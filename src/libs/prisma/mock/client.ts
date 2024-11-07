import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  adapter,
  omit: {
    user: {
      password: true,
    },
  },
} as any)

// const prisma: any = new PrismaClient({
//   omit: {
//     user: {
//       password: true,
//     },
//   },
// })
export default prisma

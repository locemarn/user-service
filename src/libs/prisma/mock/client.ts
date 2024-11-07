import { Pool } from 'pg'
// import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString =
  'postgresql://admin:user-service1234@localhost:5432/user-service?schema=public&connection_limit=5&socket_timeout=3'

const pool = new Pool({ connectionString })

// const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  // adapter,
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

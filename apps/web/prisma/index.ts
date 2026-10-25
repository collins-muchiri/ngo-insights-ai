import { PrismaClient } from '@prisma/client'

// Standard dev-hot-reload singleton without `any`:
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Named export added: seven call sites use `import { prisma }` (the default-only
// export made every one of them a TS2614 error - builds were never green).
export { prisma }
export default prisma

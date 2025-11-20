// prisma/client.mjs
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const options = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
};

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options);
} else {
  // reuse during development to avoid multiple clients on hot reload
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient(options);
  }
  prisma = globalThis.__prisma;
}

export default prisma;

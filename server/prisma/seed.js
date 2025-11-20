// prisma/seed.js
import 'dotenv/config';
import prisma from '../src/lib/prisma';
import { hashPassword } from '../src/lib/hash';

async function main() {
  const adminPass = await hashPassword('admin');

  const admin = await prisma.user.upsert({
    where: { userEmail: 'admin@gmail.com' },
    update: {},
    create: {
      userLogin: 'admin',
      userEmail: 'admin@gmail.com',
      userPass: adminPass,
      displayName: 'Administrator'
    }
  });
  

  console.log({ admin: { id: admin.id, email: admin.userEmail }, role: role.name });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

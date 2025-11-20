// services/userService.mjs
import prisma from '../lib/prisma.js';
import { hashPassword, verifyPassword } from '../lib/hash.js';
import crypto from 'crypto';
import logger from '../lib/logger.js';
import { z } from 'zod';

const CreateUserSchema = z.object({
  userLogin: z.string().min(3),
  userEmail: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().optional()
});

export async function createUser({ userLogin, userEmail, password, displayName }) {
  const validated = CreateUserSchema.parse({ userLogin, userEmail, password, displayName });

  const hashed = await hashPassword(validated.password);

  try {
    const user = await prisma.user.create({
      data: {
        userLogin: validated.userLogin,
        userEmail: validated.userEmail,
        userPass: hashed,
        displayName: validated.displayName || null
      },
      select: {
        id: true,
        userLogin: true,
        userEmail: true,
        displayName: true,
        createdAt: true
      }
    });
    return user;
  } catch (err) {
    logger.error({ err, userEmail, userLogin }, 'createUser failed');
    // convert Prisma unique constraint errors into friendly error
    if (err?.code === 'P2002') {
      const meta = err?.meta || {};
      throw new Error(`Duplicate field: ${meta.target ?? 'unknown'}`);
    }
    throw err;
  }
}

export async function authenticate({ userLoginOrEmail, password }) {
  if (!userLoginOrEmail || !password) throw new Error('credentials required');

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { userLogin: userLoginOrEmail },
        { userEmail: userLoginOrEmail }
      ]
    }
  });

  if (!user) return null;
  const ok = await verifyPassword(password, user.userPass);
  if (!ok) return null;

  // return safe projection
  return {
    id: user.id,
    userLogin: user.userLogin,
    userEmail: user.userEmail,
    displayName: user.displayName
  };
}

export async function getUserById(id, { withMeta = false } = {}) {
  if (!Number.isInteger(id)) throw new Error('id must be integer');
  const user = await prisma.user.findUnique({
    where: { id },
    select: withMeta ? {
      id: true, userLogin: true, userEmail: true, displayName: true, meta: true, roles: { include: { role: true } }
    } : {
      id: true, userLogin: true, userEmail: true, displayName: true
    }
  });
  return user;
}

export async function updateUser(id, data = {}) {
  // allow only certain fields
  const allowed = {};
  if (data.displayName !== undefined) allowed.displayName = data.displayName;
  if (data.userEmail !== undefined) allowed.userEmail = data.userEmail;
  if (data.password !== undefined) {
    allowed.userPass = await hashPassword(data.password);
  }

  if (Object.keys(allowed).length === 0) throw new Error('nothing to update');

  return prisma.user.update({
    where: { id },
    data: allowed,
    select: { id: true, userLogin: true, userEmail: true, displayName: true }
  });
}

export async function setUserMeta(userId, key, value) {
  if (!key) throw new Error('meta key required');
  const val = typeof value === 'string' ? value : JSON.stringify(value);

  // upsert by userId + metaKey
  const existing = await prisma.userMeta.findFirst({ where: { userId, metaKey: key } });
  if (existing) {
    return prisma.userMeta.update({
      where: { id: existing.id },
      data: { metaValue: val }
    });
  }
  return prisma.userMeta.create({ data: { userId, metaKey: key, metaValue: val } });
}

export async function getUserMeta(userId, key) {
  if (!key) return prisma.userMeta.findMany({ where: { userId } });
  const rec = await prisma.userMeta.findFirst({ where: { userId, metaKey: key } });
  if (!rec) return null;
  try {
    return JSON.parse(rec.metaValue);
  } catch {
    return rec.metaValue;
  }
}

export async function createRefreshToken(userId, ttlDays = Number(process.env.REFRESH_TOKEN_EXPIRE_DAYS || 30)) {
  // create random token, store with expiry
  const token = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
  const rec = await prisma.userToken.create({
    data: { userId, token, type: 'refresh', expiresAt }
  });
  return { token: rec.token, expiresAt: rec.expiresAt };
}

export async function revokeRefreshToken(token) {
  return prisma.userToken.deleteMany({ where: { token } });
}

export async function assignRoleToUser(userId, roleName) {
  return prisma.$transaction(async (tx) => {
    let role = await tx.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await tx.role.create({ data: { name: roleName, capabilities: {} } });
    }
    await tx.userRole.upsert({
      where: { userId_roleId: { userId, roleId: role.id } },
      update: {},
      create: { userId, roleId: role.id }
    });
    return role;
  });
}

export async function userHasCapability(userId, capability) {
  // check normalized roles
  const roles = await prisma.userRole.findMany({ where: { userId }, include: { role: true } });
  for (const ur of roles) {
    const caps = ur.role.capabilities || {};
    if (caps[capability]) return true;
  }
  // fallback: check usermeta wp_capabilities
  const meta = await prisma.userMeta.findFirst({ where: { userId, metaKey: 'wp_capabilities' } });
  if (meta) {
    try {
      const caps = JSON.parse(meta.metaValue || '{}');
      if (caps[capability]) return true;
    } catch { /* ignore parse error */ }
  }
  return false;
}

export async function listUsers({ page = 1, perPage = 20, q } = {}) {
  const take = Math.min(100, perPage);
  const skip = (Math.max(1, page) - 1) * take;
  const where = q ? {
    OR: [
      { userLogin: { contains: q, mode: 'insensitive' } },
      { userEmail: { contains: q, mode: 'insensitive' } },
      { displayName: { contains: q, mode: 'insensitive' } }
    ]
  } : {};

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, userLogin: true, userEmail: true, displayName: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    }),
    prisma.user.count({ where })
  ]);

  return { items, total, page, perPage: take };
}

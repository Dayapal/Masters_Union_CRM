import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

export const hashPassword = async (plain) => {
  if (!plain) throw new Error('Password required');
  return bcrypt.hash(plain, SALT_ROUNDS);
};

export const verifyPassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

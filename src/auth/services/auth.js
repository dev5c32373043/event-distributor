import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '#db';
import { JWT_SECRET, SALT_ROUNDS } from '#conf';

export async function logIn({ email, password }) {
  const user = await db.User.findOne({ email }).select('email passwordHash').lean();
  if (!user) {
    throw new Error("It seems you don't have an account, yet", { cause: { status: 400 } });
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    throw new Error('Invalid email or password', { cause: { status: 400 } });
  }

  return signToken(user);
}

export async function register({ email, password }) {
  const storedUser = await db.User.exists({ email });
  if (storedUser) {
    throw new Error('Email already occupied', { cause: { status: 400 } });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await db.User.create({ email, passwordHash });

  return signToken(user);
}

export function signToken(user) {
  const jwtPayload = { sub: user._id, email: user.email };
  const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '30d' });

  return { token };
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

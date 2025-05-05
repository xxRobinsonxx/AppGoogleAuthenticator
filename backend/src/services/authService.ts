import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const BCRYPT_ROUNDS = 10;

export async function registerUser(email: string, password: string): Promise<{ user: User; qrCodeUrl: string }> {
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const totpSecret = speakeasy.generateSecret({ name: `MyApp (${email})` }).base32;

  const user = await prisma.user.create({
    data: { email, passwordHash, totpSecret },
  });

  const otpauth = speakeasy.otpauthURL({
    secret: totpSecret,
    label: email,
    issuer: 'MyApp',
    encoding: 'base32',
  });

  const qrCodeUrl = await qrcode.toDataURL(otpauth);
  return { user, qrCodeUrl };
}

export function verifySetupToken(user: User, token: string): boolean {
  return speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token,
    window: 1,
  });
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export function generateJWT(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

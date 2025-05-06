import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const { user, qrCodeUrl } = await authService.registerUser(email, password);
    return res.status(201).json({ userId: user.id, qrCodeUrl });
  } catch (err: any) {
    console.error('🚨 Error en /register:', err);
    // Devuelve también el mensaje de error real (sólo para debug)
    return res
      .status(400)
      .json({ error: err.message || 'Registration failed' });
  }
}

export async function verify2FASetup(req: Request, res: Response) {
  const { userId, token } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    console.log('📥 verify-2fa-setup', { userId, token, secret: user?.totpSecret });

    const valid = authService.verifySetupToken(user, token);

    console.log('✅ valid?', valid);

    if (!valid) return res.status(400).json({ error: 'Invalid token' });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await authService.authenticateUser(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function verify2FALogin(req: Request, res: Response) {
  const { userId, token } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valid = authService.verifySetupToken(user, token);
    if (!valid) return res.status(400).json({ error: 'Invalid token' });

    const jwt = authService.generateJWT(user.id);
    res.json({ token: jwt });
  } catch (err) {
    res.status(500).json({ error: '2FA login failed' });
  }
}
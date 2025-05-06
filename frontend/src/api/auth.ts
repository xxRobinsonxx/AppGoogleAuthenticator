import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000/api/auth' });

export type RegisterResponse = { userId: string; qrCodeUrl: string };

export const register = (email: string, password: string) =>
  api.post('/register', { email, password });

// Ahora usa el cliente `api` con baseURL ya configurado
export const verifySetup = (userId: string, token: string) =>
  api.post('/verify-2fa-setup', { userId, token });

export const login = (email: string, password: string) =>
  api.post<{ userId: string }>('/login', { email, password });

export const verifyLogin = (userId: string, token: string) =>
  api.post('/verify-2fa-login', { userId, token });

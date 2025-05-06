# Backend – Autenticación MFA con TypeScript, Express y Prisma

## Descripción
Este servicio proporciona la lógica de **autenticación multifactor (MFA)** usando Google Authenticator (TOTP).  
- Registro de usuario con hash de contraseña (`bcrypt`)  
- Generación de secreto TOTP y QR (`speakeasy` + `qrcode`)  
- Verificación de token durante setup y login  
- Emisión de JWT para sesiones seguras

## Tecnologías
- Node.js + Express  
- TypeScript  
- Prisma ORM + PostgreSQL  
- bcrypt  
- speakeasy  
- qrcode  
- jsonwebtoken  
- dotenv  
- cors

## Requisitos Previos
- Node.js ≥ 14  
- PostgreSQL  
- Git

## Instalación

```bash
# Clona el repositorio y entra al directorio
git clone <tu-repo> && cd backend

# Instala dependencias
npm install

# Copia y edita el .env
cp .env.example .env
# Ajusta en .env:
# DATABASE_URL="postgresql://user:pass@localhost:5432/mi_bd?schema=public"
# JWT_SECRET="clave_secreta_para_jwt"
# PORT=4000

# Genera la base de datos y tablas
npx prisma migrate dev --name init
```

## Scripts
- npm run dev — Arranca en modo desarrollo (ts-node-dev).
- npm run build — Compila TS a JS en dist/
- npm start — Ejecuta el build en dist/.

## Endpoints Principales

| Método | Ruta                         | Descripción                                       |
| ------ | ---------------------------- | ------------------------------------------------- |
| POST   | `/api/auth/register`         | Registra usuario, devuelve `{ userId, qrCodeUrl}` |
| POST   | `/api/auth/verify-2fa-setup` | Verifica código TOTP inicial                      |
| POST   | `/api/auth/login`            | Autentica email+password, devuelve `{ userId }`   |
| POST   | `/api/auth/verify-2fa-login` | Verifica TOTP en login, devuelve `{ token: JWT }` |

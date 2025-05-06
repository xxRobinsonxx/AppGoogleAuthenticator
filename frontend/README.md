# Frontend – Portal MFA con React, TypeScript y Material UI

## Descripción
Aplicación React que ofrece la interfaz de usuario para el flujo de MFA:
1. Registro de usuario (email + contraseña)  
2. Escaneo de QR y primer código TOTP  
3. Login (email + contraseña)  
4. Verificación de TOTP y almacenamiento de JWT

## Tecnologías
- React + TypeScript (Create React App)  
- Material UI  
- React Router  
- Axios  
- dotenv (variables de entorno prefijo `REACT_APP_`)  

## Requisitos Previos
- Node.js ≥ 14  
- El backend en ejecución en `http://localhost:4000`

## Instalación

```bash
# En la carpeta frontend/
npm install

# Opcional: configura la URL de tu API en .env
# REACT_APP_AUTH_API=http://localhost:4000/api/auth

npm start
```

## Scripts
- npm start — Arranca el dev‐server en http://localhost:3000.
- npm run build — Genera la versión para producción en build/.

## Flujo de Usuario
1. /register → email, contraseña → recibe QR → guarda userId + qrCodeUrl.

2. /setup-2fa → escanea QR, introduce token → validación TOTP inicial.

3. /login → email, contraseña → recibe userId.

4. /verify-2fa → introduce token → recibe JWT → redirige a zona protegida.
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { verifySetup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Setup2FA() {
  const [token, setToken] = useState('');
  const [qr, setQr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('mfaUserId');

  useEffect(() => {
    const qrStored = localStorage.getItem('mfaQr');
    if (!qrStored || !userId) {
      navigate('/register');
    } else {
      setQr(qrStored);
    }
  }, [navigate, userId]);

  const handleVerify = async () => {
    try {
      await verifySetup(userId!, token);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Token inválido');
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Configurar MFA</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {qr && <img src={qr} alt="MFA QR Code" style={{ width: '100%', maxWidth: 300 }} />}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Escanea este código con Google Authenticator y luego ingresa el token.
      </Typography>
      <TextField
        label="Token"
        fullWidth
        margin="normal"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleVerify} sx={{ mt: 2 }}>
        Verificar
      </Button>
    </>
  );
}
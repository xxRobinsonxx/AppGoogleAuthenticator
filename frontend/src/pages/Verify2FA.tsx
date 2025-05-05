import React, { useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { verifyLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Verify2FA() {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('mfaUserId');

  const handleVerify = async () => {
    try {
      const { data } = await verifyLogin(userId!, token);
      localStorage.setItem('jwt', data.token);
      navigate('/'); // o ruta protegida
    } catch (err: any) {
      setError(err.response?.data?.error || 'Token inválido');
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Verificación 2FA</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Token"
        fullWidth
        margin="normal"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleVerify} sx={{ mt: 2 }}>
        Verificar y Entrar
      </Button>
    </>
  );
}
import React, { useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await register(email, password);
      localStorage.setItem('mfaUserId', data.userId);
      localStorage.setItem('mfaQr', data.qrCodeUrl);
      navigate('/setup-2fa');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Registro</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
        Registrar
      </Button>
    </>
  );
}
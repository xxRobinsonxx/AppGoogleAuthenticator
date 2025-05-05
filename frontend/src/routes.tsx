import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Setup2FA from './pages/Setup2FA';
import Login from './pages/Login';
import Verify2FA from './pages/Verify2FA';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setup-2fa" element={<Setup2FA />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-2fa" element={<Verify2FA />} />
    </Routes>
  );
}
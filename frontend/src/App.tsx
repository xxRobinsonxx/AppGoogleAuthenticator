import React from 'react';
import Container from '@mui/material/Container';
import Router from './routes';

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Router />
    </Container>
  );
}
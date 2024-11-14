import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setToken(response.data.access_token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" gap={2} mt={5}>
        <Typography variant="h3" >Task Manager</Typography>
        <Typography variant="h5">Login</Typography>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: '#E8E8E8', borderRadius: '8px', typography: { fontFamily: 'Plus Jakart Sans'}}}
        />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          sx={{ backgroundColor: '#E8E8E8', borderRadius: '8px'}}
        />
        <Button variant="contained" onClick={handleLogin}  
            sx={{ 
              backgroundColor: '#FFF', color: '#449C47',
              typography: { fontFamily: 'Plus Jakart Sans'},
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#449C47', color: '#FFF' } 
            }}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;

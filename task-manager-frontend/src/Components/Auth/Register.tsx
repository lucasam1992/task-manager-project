import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { username, password });
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" gap={2} mt={5}>
        <Typography variant="h3" >Task Manager</Typography>
        <Typography variant="h5">Register</Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} 
          sx={{ backgroundColor: '#E8E8E8', borderRadius: '8px', typography: { fontFamily: 'Plus Jakart Sans'}}}
        />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
          sx={{ backgroundColor: '#E8E8E8', borderRadius: '8px', typography: { fontFamily: 'Plus Jakart Sans'}}}
        />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          sx={{ backgroundColor: '#E8E8E8', borderRadius: '8px', typography: { fontFamily: 'Plus Jakart Sans'}}}  
        />
        <Button variant="contained" onClick={handleRegister}
            sx={{ 
              backgroundColor: '#FFF', color: '#449C47',
              typography: { fontFamily: 'Plus Jakart Sans'},
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#449C47', color: '#FFF' } 
            }}>Register</Button>
      </Box>
    </Container>
  );
};

export default Register;

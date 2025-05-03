import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '',email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();


  const handleChange = e => setCredentials({...credentials, [e.target.name] : e.target.value})

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(credentials);
      navigate('/login'); 
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Username"
          name='username'
          margin="normal"
          required
          value={credentials.username}
          onChange={handleChange}
        />
          <TextField
          label="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name='password'
          margin="normal"
          required
          value={credentials.password}
          onChange={handleChange}
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Account
        </Button>
        <Typography>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

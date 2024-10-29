import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      if (response.data.success) {
        // If credentials are correct, navigate to dashboard
        navigate('/Dashbord');
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <center>
      <Paper elevation={5} sx={{ width: 450, height: 420, marginTop: 8 }}>
        <Typography variant='h3' sx={{ display: 'flex', justifyContent: "center", fontFamily: 'cursive' }}>
          Login
        </Typography>

        <TextField
          sx={{ width: 400, marginTop: 5 }}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          sx={{ width: 400, marginTop: 5 }}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant='contained'
          sx={{ width: 400, marginTop: 4, fontSize: 20, fontFamily: "cursive" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography sx={{ display: "flex", justifyContent: "center", marginTop: 3, fontSize: 20 }}>
          Create New <NavLink to="/signup">Account</NavLink>?
        </Typography>
      </Paper>
    </center>
  );
};

export default Login;

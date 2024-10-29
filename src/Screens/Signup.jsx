import { Button, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setSnackbarMessage('User registered successfully!'); // Set success message
        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
      } else {
        setSnackbarMessage(response.data.message); // Show error message from server
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setSnackbarMessage('An error occurred. Please try again.'); // Show general error message
      setOpenSnackbar(true);
    }
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <center>
      <Paper elevation={5} sx={{ height: 550, width: 500, marginTop: 5 }}>
        <Typography
          variant='h3'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'cursive',
          }}
        >
          Signup
        </Typography>

        <TextField
          sx={{ width: 400, marginTop: 7 }}
          type='text'
          label='Full Name'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: 400, marginTop: 4 }}
          type='text'
          label='User Name'
          name='userName'
          value={formData.userName}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: 400, marginTop: 4 }}
          type='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          sx={{ width: 400, marginTop: 4 }}
          type='password'
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          variant='contained'
          sx={{ width: 400, marginTop: 5, fontSize: 20, fontFamily: 'cursive' }}
          onClick={handleSubmit}
        >
          SignUp
        </Button>
      </Paper>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('success') ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </center>
  );
};

export default Signup;

import React from 'react';
import {
  Container, CssBaseline, Box, Typography, TextField,  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../model/userCRUD';

const Login: React.FC = () => {

  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async() => {
    const credentials = { emailId, password };
    // console.log(credentials);

    try {
      
      const response = await loginUser(credentials);
       console.log(response);
       
      if (response.status === 200) {
        // If login is successful it stores the JWT token
        localStorage.setItem('token', response.token); 
        localStorage.setItem('userId', response.userId); 
        console.log("Login successful!", response.message);
        navigate('/dashboard');
      } else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }

  };
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>

          </Box>
        </Box>
      </Container>
    </>

  )
}

export default Login;

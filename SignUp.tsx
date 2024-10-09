import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Users } from "../../classes/Users";
import { addUser } from "../../model/userCRUD";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";

const SignUp : React.FC = () => {

  const [username, setUsername] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contactNum, setContactNum] = useState<string>("");
  const navigate = useNavigate();


  const handleRegister = async () => {
    const newUser: Users ={
      username,
      emailId,
      password,
      contactNum
    };

    try {
      const response = await addUser(newUser);
       // Call addUser function
       console.log(response);
      console.log("Registration Response:", response);
      if (response.message === "User registered successfully.") {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('userId', response.userID); 
        navigate('/dashboard'); // Navigate to login page upon success
      }
    } catch (error) {
      console.error("Registration Error:", error);
      // Optionally, you can show an error message to the user
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
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                    fullWidth
                    id="contactNum"
                    label="Contact Number"
                    name="contactNum"
                    value={contactNum}
                    onChange={(e) => setContactNum(e.target.value)}
                       />
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>

  )
}

export default SignUp

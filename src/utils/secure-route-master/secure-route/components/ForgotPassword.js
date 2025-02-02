import React, { useState } from "react";
import { Container, TextField, Typography, Paper, Button } from "@mui/material";
import logo from "../logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../../config/Global.json";
import { validateEmail } from "../../api-manager/Helper/helper";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); 

  // Use base URL from configuration
  const apiBaseUrl = config.api.host;
  const passwordResetEndpoint = config.passwordReset;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return; // Stop form submission
    }
    setEmailError("");
    try {
      const response = await axios.post(
        `${apiBaseUrl}${passwordResetEndpoint}`,
        {
          email,
        }
      );
      // Handle success response
      toast.success("Password reset request sent successfully.");
      setEmail(""); // Clear email field after successful request
    } catch (error) {
      // Handle error response
      toast.error("Failed to send password reset request. Please try again.");
    }
  
   
    if (validateEmail(email)) {
      setEmailError("");
    }
    
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          style={{ height: 100, width: 150, marginBottom: 20 }} // Adjust size and margin as needed
        />
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            error={!!emailError} // Display error if emailError is not empty
            helperText={emailError}  // Show validation error message
          />
          <br />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Forgot Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default ForgotPassword;

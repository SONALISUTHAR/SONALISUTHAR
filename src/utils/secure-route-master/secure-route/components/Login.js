import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

import {
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../logo.png"

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  let { authToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  let checkLogedIn = () => {
    if (authToken) {
      navigate("/");
    } else {
      console.error("Unable to check authToken");
      return false;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    checkLogedIn();
  }, [authToken]);

  return (
    <div>
      <form onSubmit={loginUser}>
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
              src={`${logo}`}
              alt="Logo"
              style={{ height: 100, width: 150, marginBottom: 20 }} // Adjust size and margin as needed
            />

            <h1 style={{ fontFamily: "consolas" }}>

            </h1>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="User Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="Submit"
              name="submit"
            >
              Login
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  );
};

export default Login;

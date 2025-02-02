import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import logo from "../logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config/Global.json";
import { validatePassword } from "../../api-manager/Helper/helper";
function ConfirmPassword() {
  const { temp_token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    // Reset errors when temp_token changes
    setErrors({});
  }, [temp_token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(newPassword);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }
    const apiBaseUrl = config.api.host;
    const confirmPasswordEndpoint = config.confirmPassword;
    try {
      const url = `${apiBaseUrl}${confirmPasswordEndpoint}${temp_token}/`;
      console.log("Request URL:", url);
      await axios.post(url, { new_password: newPassword });
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const getPasswordErrors = () => {
    if (touched.newPassword) {
      return validatePassword(newPassword);
    }
    return {};
  };
  const passwordErrors = getPasswordErrors();
  const isPasswordMatchError =
    touched.confirmPassword && newPassword !== confirmPassword;
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
        <img
          src={logo}
          alt="Logo"
          style={{ height: 100, width: 150, marginBottom: 20 }}
        />
        <Typography component="h1" variant="h5">
          Confirm Password
        </Typography>
        <form style={{ width: "100%",marginTop:"20px" }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={() => handleBlur("newPassword")}
            required
            style={{ marginBottom: "5px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(Object.keys(passwordErrors).length)}
            helperText={
              Object.keys(passwordErrors).length > 0 && touched.newPassword
                ? Object.values(passwordErrors).map((error, index) => (
                    <FormHelperText key={index} error>
                      {error}
                    </FormHelperText>
                  ))
                : null
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            error={Boolean(isPasswordMatchError)}
            helperText={isPasswordMatchError ? "Passwords do not match" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Confirm Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default ConfirmPassword;

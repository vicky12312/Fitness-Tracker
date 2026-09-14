import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      const user = response.data;

      // Store user data in localStorage
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);
      if(user.userlog)
      {
        localStorage.setItem('userlogId', user.userlog.id);
      }
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
    }}>
      <Card sx={{
        width: 350,
        padding: 4,
        borderRadius: 4,
        backdropFilter: "blur(10px)",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
      }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Welcome Back
        </Typography>
        <Typography variant="body2" textAlign="center" mb={3} color="gray">
          Login to continue
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Username"
          type="text"
          variant="outlined"
          sx={{ mb: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.2,
            borderRadius: 2,
            background: "#6C5CE7",
            "&:hover": { background: "#5846d7" },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Typography mt={2} textAlign="center" color="gray">
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#6C5CE7" }}>
            Sign Up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
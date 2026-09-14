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
import { register } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await register(email, password);
      const user = response.data;

      // Store user data
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
       const errorMsg = err.response?.data || "Signup failed";
  
  if (errorMsg.includes("Username already exists")) {
    setError("This username is already taken. Please choose another.");
  } else {
    setError(errorMsg);
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: "linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%)",
    }}>
      <Card sx={{
        width: 350,
        borderRadius: 4,
        padding: 2,
        backdropFilter: "blur(10px)",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
      }}>
        <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
          Sign up
        </Typography>
        <Typography variant="body1" mb={2} textAlign="center">
          Already have an account <Link to="/" style={{ textDecoration: "none", color: "#6C5CE7" }}>Login here</Link>
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          type="text"
          variant="outlined"
          sx={{ mb: 2 }}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          sx={{ mb: 2 }}
          label="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          variant="outlined"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            borderRadius: 2,
            background: "#6C5CE7",
            "&:hover": { background: "#5846d7" },
            py: 1.2,
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </Card>
    </Box>
  );
};

export default Signup;
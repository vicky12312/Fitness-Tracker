import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const goToSettings = () => {
    closeMenu();
    navigate("/settings");
  };

  const handleLogout = () => {
  closeMenu();

  // Clear ALL session data
  localStorage.removeItem("userId");
  localStorage.removeItem("userlogId");
  localStorage.removeItem("username");

  // Redirect and REPLACE history (can't go back)
  navigate("/", { replace: true });
};

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "white",
        padding: "10px 20px",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Search */}
      <Box sx={{ width: 250 }}>
        <TextField
          placeholder="Search..."
          size="small"
          sx={{
            width: "100%",
            background: "#f3f4f6",
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Center Title */}
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: 700,
        }}
      >
        Dashboard
      </Typography>

      {/* Right Avatar */}
      <Box sx={{ marginLeft: "auto" }}>
        <Avatar sx={{ cursor: "pointer" }} onClick={openMenu}>
          U
        </Avatar>
      </Box>

      {/* MENU — settings + logout */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem onClick={goToSettings}>
          <SettingsIcon sx={{ mr: 1 }} />
          Settings
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

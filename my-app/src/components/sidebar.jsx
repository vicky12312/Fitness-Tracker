import React from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { title: "Add Workout", icon: <FitnessCenterIcon />, path: "/workoutlog" },
    { title: "Log Calories", icon: <LocalDiningIcon />, path: "/calories" },
    { title: "Activity", icon: <DirectionsWalkIcon />, path: "/activity" },
   
  ];

  return (
    <Box
      sx={{
        width: "220px",
        height: "100vh",
        background: "#1b1b2f",
        color: "white",
      p:2,
        boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo Block */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 4,
          mt: 1,
          ml: -6,
          py: 1,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Circular Icon */}
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6C5CE7,#A66CFF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(108,92,231,0.4)",
          }}
        >
          <FitnessCenterIcon sx={{ color: "white" }} />
        </Box>

        {/* Brand Text */}
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            letterSpacing: 1,
            whiteSpace: "nowrap",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          FitTrack
        </Typography>
      </Box>

      {/* Menu Items */}
      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <Link
            key={item.title}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: "12px 16px",
                borderRadius: "8px",
                mb: 1,
                transition: "0.2s",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                color: active ? "#ffffff" : "#b9b9c9",
                "&:hover": {
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                },
              }}
            >
              {item.icon}
              <Typography fontSize="15px">{item.title}</Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}

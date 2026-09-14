import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import StatCard from "../components/statcard";
import ChartCard from "../components/chatcard";
import Bmi from "../components/Bmi";

import OpacityIcon from "@mui/icons-material/Opacity";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import {
  getProfile,
  getCaloriesByDate,
  getActivities
} from "../services/api";

export default function Dashboard() {

  const userId = localStorage.getItem("userId");
  const userlogId = localStorage.getItem("userlogId");

  const [bmi, setBmi] = useState(0);
  const [caloriesToday, setCaloriesToday] = useState(0);
  const [stepsToday, setStepsToday] = useState(0);
  const [waterToday, setWaterToday] = useState(0);

  // 🔑 SINGLE SOURCE OF DATE
   const calo = new Date().toLocaleDateString("en-CA");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!userId || !userlogId) {
      resetAll();
      return;
    }

    loadBmi();
    loadCalories();
    loadActivity();

  }, [userId, userlogId]);

  // ---------------- RESET ----------------
  const resetAll = () => {
    setBmi(0);
    setCaloriesToday(0);
    setStepsToday(0);
    setWaterToday(0);
  };

  // ---------------- BMI ----------------
  const loadBmi = async () => {
    try {
      const res = await getProfile(userId);
      setBmi(res.data?.bmi ?? 0);
    } catch {
      setBmi(0);
    }
  };

  // ---------------- CALORIES (BACKEND FILTERED) ----------------
  const loadCalories = async () => {
    try {
      const res = await getCaloriesByDate(userlogId, calo);

      const totalCalories = res.data.reduce(
        (sum, log) => sum + Number(log.calories || 0),
        0
      );

      setCaloriesToday(totalCalories);
    } catch {
      setCaloriesToday(0);
    }
  };

  // ---------------- ACTIVITY (FRONTEND FILTERED) ----------------
  const loadActivity = async () => {
    try {
      const res = await getActivities(userlogId);

      // 🔥 IMPORTANT: date comparison must be STRING === STRING
      const todayLogs = res.data.filter(
        (log) => log.date === today
      );

      const totalSteps = todayLogs.reduce(
        (sum, log) => sum + Number(log.steps || 0),
        0
      );

      const totalWater = todayLogs.reduce(
        (sum, log) => sum + Number(log.waterIntake || 0),
        0
      );

      setStepsToday(totalSteps);
      setWaterToday(totalWater);
    } catch {
      setStepsToday(0);
      setWaterToday(0);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <Box sx={{ width: 220, background: "#1e1e2f", color: "white" }}>
        <Sidebar />
      </Box>

      {/* Main */}
      <Box
        sx={{
          flex: 1,
          background: "#f5f6fa",
          p: 3,
          minWidth: "1050px",
        }}
      >
        <Topbar />

        {/* ---- STAT CARDS ---- */}
        <Box sx={{ display: "flex", gap: 3, mt: 3 }}>

          <Box sx={{ flex: "0 0 260px" }}>
            <StatCard
              title="Calories Today"
              value={`${caloriesToday} kcal`}
              icon={<LocalDiningIcon sx={{ fontSize: 30 }} />}
              color="#FF7A00"
            />
          </Box>

          <Box sx={{ flex: "0 0 260px" }}>
            <StatCard
              title="BMI"
              value={bmi}
              icon={<AccessibilityNewIcon sx={{ fontSize: 30 }} />}
              color="#6C5CE7"
            />
          </Box>

          <Box sx={{ flex: "0 0 260px" }}>
            <StatCard
              title="Water Today"
              value={`${waterToday} ml`}
              icon={<OpacityIcon sx={{ fontSize: 30 }} />}
              color="#00C2FF"
            />
          </Box>

          <Box sx={{ flex: "0 0 260px" }}>
            <StatCard
              title="Steps Today"
              value={stepsToday}
              icon={<DirectionsRunIcon sx={{ fontSize: 30 }} />}
              color="#00D26A"
            />
          </Box>

        </Box>

        {/* ---- BMI + CHART ---- */}
        <Box sx={{ display: "flex", gap: 12, mt: 3 }}>
          <Box sx={{ flex: 1, maxWidth: "600px" }}>
            <Bmi />
          </Box>
          <Box sx={{ flex: 1, maxWidth: "600px" }}>
            <ChartCard />
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

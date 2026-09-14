import React, { useState, useEffect } from "react";
import { Box, Card, TextField, Typography, Button, Alert } from "@mui/material";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

import OpacityIcon from "@mui/icons-material/Opacity";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

import { addActivity, getActivities } from "../services/api";

export default function Activity() {
  const [water, setWater] = useState(0);
  const [steps, setSteps] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userlogId = localStorage.getItem("userlogId");

  // Load activity history on mount
  useEffect(() => {
    if (userlogId) {
      loadActivities();
    }
  }, [userlogId]);

  const loadActivities = async () => {
    try {
      const response = await getActivities(userlogId);
      setHistory(response.data);
    } catch (err) {
      console.log("Error loading activities:", err);
    }
  };

  const addWater = (amount) => {
    setWater((prev) => prev + amount);
  };

  const handleSave = async () => {
    if (!steps && water === 0) {
      setError("Please log steps or water intake");
      return;
    }

    if (!userlogId) {
      setError("Please create your profile in Settings first");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const activityData = {
        userlogId: parseInt(userlogId),
        steps: steps ? parseInt(steps) : 0,
        waterIntake: water?parseInt(water):0,
        date: new Date().toISOString().split("T")[0],
      };

      await addActivity(activityData);

      // Reload history
      await loadActivities();

      // Reset inputs
      setSteps("");
      setWater(0);
    } catch (err) {
      setError("Failed to save activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Box sx={{ width: 220, background: "#1e1e2f", color: "white" }}>
        <Sidebar />
      </Box>

      {/* Main Section */}
      <Box sx={{ flex: 1, background: "#f5f6fa", p: 3 }}>
        <Topbar />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Water + Steps row */}
        <Box sx={{ display: "flex", gap: 3, mt: 3 }}>

          {/* Water Tracker */}
          <Card sx={{ flex: 1, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              <OpacityIcon sx={{ mr: 1 }} />
              Water Intake
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {water} ml
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" onClick={() => addWater(250)}>
                +250 ml
              </Button>
              <Button variant="contained" onClick={() => addWater(500)}>
                +500 ml
              </Button>
            </Box>
          </Card>

          {/* Steps Logger */}
          <Card sx={{ flex: 1, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              <DirectionsWalkIcon sx={{ mr: 1 }} />
              Log Steps
            </Typography>

            <TextField
              label="Steps Count"
              type="number"
              fullWidth
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Today’s Activity"}
            </Button>
          </Card>
        </Box>

        {/* Activity History */}
        {history.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Activity
            </Typography>

            {history.map((h) => (
              <Card
                key={h.id}
                sx={{ p: 2, mb: 1, borderLeft: "5px solid #6C5CE7" }}
              >
                <Typography fontWeight={600}>{h.date}</Typography>
                <Typography>Steps: {h.steps}</Typography>
                <Typography>Water: {h.waterIntake} ml</Typography>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

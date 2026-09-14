import React, { useState, useEffect } from "react";
import { Box, Card, TextField, Typography, Button, Alert } from "@mui/material";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { addCalorie, getCalories } from "../services/api";

export default function Calories() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userlogId = localStorage.getItem('userlogId');

  // Load existing calorie logs on mount
  useEffect(() => {
    if (userlogId) {
      loadCalories();
    }
  }, [userlogId]);

  const loadCalories = async () => {
    try {
      const response = await getCalories(userlogId);
      setLogList(response.data);
    } catch (err) {
      console.log("Error loading calories:", err);
    }
  };

  const handleAdd = async () => {
    if (!food || !calories || !date) {
      setError("Please fill all fields");
      return;
    }

    if (!userlogId) {
      setError("Please create your profile in Settings first");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const calorieData = {
        userlogId: parseInt(userlogId),
        food,
        calories: parseInt(calories),
        date,
      };

      await addCalorie(calorieData);

      // Reload the list
      await loadCalories();

      // Clear form
      setFood("");
      setCalories("");
      setDate("");
    } catch (err) {
      setError("Failed to add calorie log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* ---- SIDEBAR ---- */}
      <Box sx={{ width: 220, background: "#1e1e2f", color: "white" }}>
        <Sidebar />
      </Box>

      {/* ---- MAIN CONTENT ---- */}
      <Box sx={{ flex: 1, background: "#f5f6fa", p: 3 }}>
        <Topbar />

        <Box sx={{ width: "100%", mt: 3 }}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            
            <Typography variant="h5" fontWeight={600} mb={2}>
              Log Calories
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Food Item"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                fullWidth
              />

              <TextField
                label="Calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                fullWidth
              />

              <TextField
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{ background: "#6C5CE7", "&:hover": { background: "#5846d7" } }}
                onClick={handleAdd}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Log"}
              </Button>
            </Box>

            {/* ---- HISTORY ---- */}
            {logList.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" mb={1}>History</Typography>

                {logList.map((item) => (
                  <Card 
                    key={item.id} 
                    sx={{ p: 2, mb: 1, borderLeft: "5px solid #6C5CE7" }}
                  >
                    <Typography>
                      <b>{item.food}</b> — {item.calories} kcal
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                      {item.date}
                    </Typography>
                  </Card>
                ))}
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
import React, { useState, useEffect } from "react";
import { Box, Card, TextField, Typography, Button, Alert } from "@mui/material";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { addWorkout, getWorkouts } from "../services/api";

export default function WorkoutLog() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userlogId = localStorage.getItem("userlogId");

  // Load workouts on mount
  useEffect(() => {
    if (userlogId) {
      loadWorkouts();
    }
  }, [userlogId]);

  const loadWorkouts = async () => {
    try {
      const response = await getWorkouts(userlogId);
      setLogList(response.data);
    } catch (err) {
      console.log("Error loading workouts:", err);
    }
  };

  const handleSave = async () => {
    if (!date || !title) {
      setError("Date and Title are required");
      return;
    }

    if (!userlogId) {
      setError("Please create your profile in Settings first");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const workoutData = {
        userlogId: parseInt(userlogId),
        date,
        title,
        notes,
      };

      await addWorkout(workoutData);

      // Reload list
      await loadWorkouts();

      // Clear form
      setDate("");
      setTitle("");
      setNotes("");
    } catch (err) {
      setError("Failed to save workout");
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

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, background: "#f5f6fa" }}>
        <Topbar />

        <Box sx={{ maxWidth: 700, mt: 4 }}>
          <Card sx={{ p: 3, borderRadius: 2 }}>

            <Typography variant="h5" fontWeight={600} mb={2}>
              Add Workout
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Date */}
            <TextField
              label="Date"
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Title */}
            <TextField
              label="Workout Title"
              placeholder="Chest Day / Push Day / Back Day"
              fullWidth
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Notes */}
            <TextField
              label="Workout Notes"
              multiline
              rows={5}
              fullWidth
              sx={{ mb: 3 }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Save */}
            <Button
              fullWidth
              variant="contained"
              sx={{ background: "#6C5CE7", "&:hover": { background: "#5846d7" } }}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Workout"}
            </Button>

            {/* ---- HISTORY ---- */}
            {logList.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" mb={1}>
                  Workout History
                </Typography>

                {logList.map((item) => (
                  <Card
                    key={item.id}
                    sx={{ p: 2, mb: 1, borderLeft: "5px solid #6C5CE7" }}
                  >
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: "gray" }}>
                      {item.date}
                    </Typography>
                    {item.notes && (
                      <Typography sx={{ mt: 1 }}>{item.notes}</Typography>
                    )}
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

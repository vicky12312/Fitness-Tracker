import React, { useState, useEffect } from "react";
import { Box, Card, TextField, Typography, Button, Switch, FormControlLabel, Alert } from "@mui/material";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { getProfile, createProfile, updateProfile } from "../services/api";

export default function Settings() {
  const [notify, setNotify] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = localStorage.getItem('userId');

  // Load profile on mount
  useEffect(() => {
      if (!userId) {
    console.log("⛔ userId not found, skipping profile load");
    return;
  }
  const loadProfile = async () => {
    console.log("🔍 Loading profile for userId:", userId); // ADD THIS
    
    try {
      const response = await getProfile(userId);
      console.log("✅ Profile response:", response.data); // ADD THIS
      
      const profile = response.data;
      
      // Profile exists - load data
      setProfileId(profile.id);
      setName(profile.name);
      setAge(profile.age);
      setHeight(profile.height);
      setWeight(profile.weight);
      console.log("✅ Profile loaded:", profile);
    } catch (err) {
      console.log("❌ Error loading profile:", err.response?.data || err.message); // CHANGE THIS
    }
  };
  
  loadProfile();
}, [userId]);

  

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const profileData = {
        name,
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
      };

      if (profileId) {
        // UPDATE existing profile
        profileData.id = profileId;
        await updateProfile(profileData);
        setSuccess("Profile updated successfully!");
      } else {
        // CREATE new profile
        const response = await createProfile(userId, profileData);
        setProfileId(response.data.id);
        
        // Save userlogId for other pages
        localStorage.setItem('userlogId', response.data.id);
        
        setSuccess("Profile created successfully!");
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Box sx={{ width: 220, background: "#1e1e2f", color: "white"}}>
        <Sidebar />
      </Box>

      {/* Main Section */}
      <Box sx={{ flex: 1, background: "#f5f6fa", p: 3 }}>
        <Topbar />

        <Card sx={{ p: 3, borderRadius: 2, mt: 3 }}>
          
          <Typography variant="h5" fontWeight={600} mb={2}>
            Profile Settings
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Profile Fields */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            <TextField 
              label="Name" 
              fullWidth 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <TextField 
              label="Age" 
              type="number" 
              fullWidth 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
            <TextField 
              label="Height (cm)" 
              type="number" 
              fullWidth 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
            />
            <TextField 
              label="Weight (kg)" 
              type="number" 
              fullWidth 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
          </Box>

          <Typography variant="h5" fontWeight={600} mb={2}>
            Preferences
          </Typography>

          {/* Notification Toggle */}
          <FormControlLabel
            control={<Switch checked={notify} onChange={() => setNotify(!notify)} />}
            label="Enable Notifications"
          />

          {/* Save Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, background: "#6C5CE7", "&:hover": { background: "#5846d7" } }}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : profileId ? "Update Settings" : "Create Profile"}
          </Button>

        </Card>
      </Box>
    </Box>
  );
}
import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Bmi() {
  const [metric, setMetric] = useState("standard");

  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const [resultBMI, setResultBMI] = useState(null);

  // -------------------------------------------------------------------
  // BMI CALCULATION
  // -------------------------------------------------------------------

  const calculateBMI = () => {
    let bmi = 0;

    if (metric === "metric") {
      if (!weight || !heightCm) return;
      const meters = heightCm / 100;
      bmi = weight / (meters * meters);
    } else {
      if (!weight || !heightFt || heightIn === "") return;
      const totalInches = heightFt * 12 + parseInt(heightIn);
      bmi = (weight / (totalInches * totalInches)) * 703;
    }

    setResultBMI(bmi.toFixed(1));
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          background: "white",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            background: "linear-gradient(135deg,#6C5CE7,#8E79FF)",
            color: "white",
            boxShadow: "0 4px 10px rgba(108,92,231,0.3)",
          }}
        >
          BMI Calculator
        </Typography>

        {/* Toggle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            exclusive
            value={metric}
            onChange={(e, val) => val && setMetric(val)}
            sx={{
              
              overflow: "hidden",
              "& .MuiToggleButtonGroup-grouped": {
                border: "1px solid #6C5CE7",
                color: "#6C5CE7",
                px: 3,
                fontWeight: 600,
                "&.Mui-selected": {
                  backgroundColor: "#6C5CE7 !important",
                  color: "white !important",
                },
                "&:hover": {
                  backgroundColor: "rgba(108,92,231,0.08)",
                },
              },
            }}
          >
            <ToggleButton value="standard">STANDARD</ToggleButton>
            <ToggleButton value="metric">METRIC</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Inputs */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {metric === "metric" ? (
            <>
              <TextField
                label="Weight (kg)"
                fullWidth
                size="small"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                label="Height (cm)"
                fullWidth
                size="small"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
              />
            </>
          ) : (
            <>
              <TextField
                label="Weight (lbs)"
                fullWidth
                size="small"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Feet</InputLabel>
                <Select
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                >
                  {[...Array(8)].map((_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Inches</InputLabel>
                <Select
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                >
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>

        {/* Button */}
        <Button
          fullWidth
          sx={{
            mt: 3,
            background: "#6C5CE7",
            fontWeight: 600,
            py: 1.2,
            "&:hover": { background: "#5846d7" },
          }}
          variant="contained"
          onClick={calculateBMI}
        >
          CALCULATE BMI
        </Button>

        {/* BMI RESULT BOX */}
        {resultBMI && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              background: "#f5f5ff",
              border: "1px solid #dcd6ff",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600} color="#6C5CE7">
              Your BMI: {resultBMI}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}

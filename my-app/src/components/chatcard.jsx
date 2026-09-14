import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getCalories } from "../services/api";

export default function ChartCard() {
  const userlogId = localStorage.getItem("userlogId");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!userlogId) return;
    loadWeeklyCalories();
  }, [userlogId]);

  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  };

  const loadWeeklyCalories = async () => {
    try {
      const res = await getCalories(userlogId);
      const logs = res.data;

      const weekDates = getWeekDates();

      const chartData = weekDates.map((dateStr) => {
        const dayName = new Date(dateStr).toLocaleDateString("en-US", {
          weekday: "short",
        });

        const totalCalories = logs
          .filter((l) => l.date === dateStr)
          .reduce((sum, l) => sum + l.calories, 0);

        return { day: dayName, calories: totalCalories };
      });

      setData(chartData);
    } catch (err) {
      console.log("Error loading weekly calories", err);
    }
  };

  return (
    <Card sx={{ p: 2, width: "100%", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Weekly Calories
      </Typography>

      <Box sx={{ width: "100%", height: 333 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#6C5CE7"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

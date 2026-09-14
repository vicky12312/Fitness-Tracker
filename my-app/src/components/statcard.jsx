import { Box, Typography } from "@mui/material";

export default function StatCard({ title, value, icon, color = "#6C5CE7" }) {
  return (
    <Box
      sx={{
        width: "280px",
        p: 2.5,
        borderRadius: 3,
        background: "white",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Icon + Title row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}, ${color}AA)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            boxShadow: `0 4px 10px ${color}55`,
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#333" }}>
          {title}
        </Typography>
      </Box>

      {/* Value */}
      <Typography
        sx={{ fontSize: "30px", fontWeight: 700, mt: 1.5, color: "#111" }}
      >
        {value}
      </Typography>
    </Box>
  );
}

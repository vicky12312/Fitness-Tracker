import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  // If not logged in, redirect to login
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  // If logged in, show the page
  return children;
}
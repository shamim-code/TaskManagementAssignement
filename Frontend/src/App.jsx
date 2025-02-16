import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes (Accessible without authentication) */}
        {!token && <Route path="/login" element={<Login />} />}
        {!token && <Route path="/registration" element={<Registration />} />}

        {/* Protected Routes (Require authentication) */}
        {token && <Route path="/dashboard" element={<Dashboard />} />}
        {token && <Route path="/task" element={<Task />} />}
        {token && <Route path="/profile" element={<Profile />} />}

        {/* Redirect Unauthenticated Users */}
        {!token && <Route path="*" element={<Navigate to="/login" />} />}
        
        {/* Redirect Authenticated Users from Login/Register */}
        {token && <Route path="*" element={<Navigate to="/dashboard" />} />}
      </Routes>
    </Router>
  );
}

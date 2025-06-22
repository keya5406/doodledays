import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/register";
import LoginForm from "./pages/login";
import DailyDataForm from "./pages/dailyEntry";
import SummaryPage from "./pages/summary"; 
import  DashboardPage  from "./pages/AnalyticsDashboard";
import { registerServiceWorker } from "./utils/serviceWorker";

const isLoggedIn = !!localStorage.getItem("token");

export default function App() {
   useEffect(() => {
    registerServiceWorker(); 
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/entry" : "/login"} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/entry" element={isLoggedIn ? <DailyDataForm /> : <Navigate to="/login" />} />
        <Route path="/summary" element={isLoggedIn ? <SummaryPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


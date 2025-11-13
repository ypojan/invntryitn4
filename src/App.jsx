// src/App.jsx

import React, { useState } from "react";
import LandingPage from "./Page/LandingPage.jsx";
import Login from "./Page/Login.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import Swal from "sweetalert2";

// Import "WADAH" react-toastify (untuk notifikasi Login)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // 'lobby' = Tampilan LandingPage
  // 'login' = Tampilan Login
  // 'dashboard' = Tampilan Dashboard (setelah login)
  const [currentStage, setCurrentStage] = useState("lobby");

  const handleSelectIT = () => {
    setCurrentStage("login");
  };

  const handleLoginSuccess = () => {
    setCurrentStage("dashboard");
  };

  const handleLogout = () => {
    // Notifikasi toast
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Berhasil logout!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    // KEMBALI KE TAHAP PALING AWAL ('lobby')
    setCurrentStage("lobby");
  };

  // INI LOGIKA "SATPAM" KITA
  const renderCurrentStage = () => {
    switch (currentStage) {
      case "login":
        return <Login onLoginSuccess={handleLoginSuccess} />;
      
      case "dashboard":
        return <Dashboard onLogout={handleLogout} />;
      
      case "lobby":
      default:
        return <LandingPage onSelectIT={handleSelectIT} />;
    }
  };

  return (
    <>
      {/* Panggung utama (Lobby/Login/Dashboard) */}
      {renderCurrentStage()}

      {/* "Wadah" Notifikasi Toast (hanya untuk Login) */}
      <ToastContainer />
    </>
  );
}

export default App;
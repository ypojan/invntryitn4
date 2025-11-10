import React, { useState } from "react";
import Login from "./Page/Login.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {/* Toast Container - Wajib ada untuk menampilkan notifikasi */}
      <ToastContainer />

      {/* Logika si Satpam! */}
      {isAuthenticated ? (
        // JIKA SUDAH LOGIN: "Makan" <Dashboard />
        <Dashboard onLogout={handleLogout} />
      ) : (
        // JIKA BELUM LOGIN: "Makan" <Login />
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
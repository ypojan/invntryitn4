import React, { useState } from "react";
import Login from "./Page/Login.jsx";
import Dashboard from "./Page/Dashboard.jsx";

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
      {/* 5. Logika si Satpam! */}
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
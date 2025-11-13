// src/Context/AppContext.jsx

import React, { createContext, useState, useContext } from "react";

const ApplicationContext = createContext();

export default function AppContextProvider({ children }) {
  // State untuk "Naskah" (halaman aktif)
  const [route, setRoute] = useState("dashboard"); 

  // Panel Kontrol yang akan dibagikan
  const contextValue = {
    route,
    setRoute,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const AppContext = ApplicationContext;
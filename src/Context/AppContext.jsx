// src/Context/AppContext.jsx

import React, { createContext, useState, useContext } from "react";

// 1. Buat "Cetakan" Context-nya
const ApplicationContext = createContext();

// 2. Buat "Provider" (Pemasok) yang akan membungkus aplikasi kita
export default function AppContextProvider({ children }) {

  // 3. Ini dia "Papan Tulis Ajaib" (useState) untuk Naskah kita!
  //    Kita atur default-nya "dashboard"
  const [route, setRoute] = useState("dashboard"); 

  // 4. Siapkan "Panel Kontrol" (remote) yang mau dibagikan
  const contextValue = {
    route,      // Papan Tulis (Untuk dibaca Sutradara)
    setRoute,   // Spidol Ajaib (Untuk dipakai Tombol Sidebar)
  };

  // 5. Bagikan "Panel Kontrol" ke semua 'children' (aplikasimu)
  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}

// 6. Buat 'shortcut' biar komponen lain gampang pakai Context-nya
export const AppContext = ApplicationContext;
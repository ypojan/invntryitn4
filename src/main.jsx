// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. IMPORT "Ruang Kontrol" yang baru kita buat
import AppContextProvider from './Context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* 2. BUNGKUS <App /> dengan <AppContextProvider> */}
    {/* Ini membuat "Panel Kontrol" (route & setRoute)
      tersedia untuk semua komponen di dalam <App /> 
      (termasuk Dashboard, Sidebar, dan Route nanti)
    */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
    
  </React.StrictMode>,
)
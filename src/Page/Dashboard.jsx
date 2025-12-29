import React, { useState } from 'react';
import Sidebar from "../Component/common/Sidebar.jsx";
import Header from "../Component/common/Header.jsx";
import Route from "../Route/Route.jsx"; 

export default function Dashboard({ onLogout }) {
  // State untuk mengontrol Sidebar di Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Kirim fungsi toggleSidebar ke Header */}
      <Header 
        onLogout={onLogout} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Kirim status isOpen dan fungsi close ke Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
          <Route /> 
        </main>
        
      </div>
    </div>
  );
}
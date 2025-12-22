import React from 'react';
import Sidebar from "../Component/common/Sidebar.jsx";
import Header from "../Component/common/Header.jsx";
import Route from "../Route/Route.jsx"; 

export default function Dashboard({ onLogout }) {
  
  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Header onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Route /> 
        </main>
        
      </div>
    </div>
  );
}
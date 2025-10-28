
import React from 'react';
import Sidebar from "../Component/common/Sidebar.jsx";
import Header from "../Component/common/Header.jsx";
import Route from "../Route/Route.jsx"; 

// 2. Komponen Dashboard - terima props 'onLogout' dari App.jsx
export default function Dashboard({ onLogout }) {
  
  return (
    // 3. Container utama - flex horizontal (sidebar kiri, konten kanan)
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ============================================
          4. SIDEBAR - Nempel di kiri, fixed
          ============================================ */}
      <Sidebar /> 
      
      {/* ============================================
          5. AREA KONTEN - Sebelah kanan sidebar
          ============================================ */}
      <div className="flex-1 flex flex-col">
        
        {/* ============================================
            6. HEADER - Nempel di atas
               Oper 'onLogout' ke Header supaya tombol logout bisa jalan
            ============================================ */}
        <Header onLogout={onLogout} />
        
        {/* ============================================
            7. MAIN CONTENT AREA
               Di sinilah Route.jsx bekerja!
               Route akan "muntah" komponen sesuai menu yang diklik
               (MasterData, History, Peminjaman, dll)
            ============================================ */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Route /> 
        </main>
        
      </div>
    </div>
  );
}

// ============================================
// PENJELASAN ALUR:
// ============================================
// App.jsx 
//   → Dashboard.jsx (file ini) 
//       → Sidebar (menu navigasi)
//       → Header (tombol logout, nama user)
//       → Route.jsx (ganti-ganti halaman)
//           → MasterData / History / Peminjaman / dll
// ============================================
import React from "react";
import logoptpn4 from "../assets/ptpn4.png";
import backgroundLanding from "../assets/backgroundlanding.jpg";
import Swal from "sweetalert2";

import {
  IoAirplane,
  IoServer,
  IoDesktop,
} from "react-icons/io5";

function LandingPage({ onSelectIT }) {
  // LOGIKA CEK ROLE DRONE
  const handleDroneClick = (e) => {
    e.preventDefault();
    const role = sessionStorage.getItem("userRole");

    if (role === "admin_drone" || role === "superadmin") {
      window.open("http://localhost:5174/", "_blank");
    } else {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak!",
        text: "Maaf, Anda tidak memiliki izin mengakses Inventory Drone.",
        confirmButtonColor: "#d33",
        customClass: {
          confirmButton:
            "bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors",
        },
      });
    }
  };

  // LOGIKA CEK ROLE IT
  const handleITClick = () => {
    const role = sessionStorage.getItem("userRole");

    if (role === "admin_it" || role === "superadmin") {
      onSelectIT();
    } else {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak!",
        text: "Maaf, Anda tidak memiliki izin mengakses Inventory IT.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    // FIX SCROLL: Gunakan h-screen dan overflow-hidden pada container utama
    <div className="h-screen w-full relative overflow-hidden bg-gray-900">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundLanding} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* KONTEN UTAMA */}
      {/* Gunakan Flexbox (justify-between) agar layout terbagi rata dari atas ke bawah */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between px-4 py-4 md:py-6 text-white">
        
        {/* HEADER LOGO */}
        <header className="flex justify-center flex-shrink-0">
          <img
            src={logoptpn4}
            alt="PTPN4 Logo"
            className="h-16 md:h-24 w-auto drop-shadow-2xl object-contain transition-all"
          />
        </header>

        {/* MAIN CONTENT (Centered) */}
        <main className="flex-1 flex flex-col justify-center items-center text-center w-full max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-6 tracking-wide uppercase drop-shadow-lg">
            Dashboard Inventory
          </h1>

          <p className="text-sm md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-6 md:mb-12 leading-relaxed font-light px-4">
            Selamat datang di aplikasi Dashboard Inventory. Aplikasi terdiri
            dari 2 modul yaitu Inventory IT dan Inventory Drone.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 lg:gap-12 w-full px-4 items-center">
            
            {/* CARD INVENTORY DRONE */}
            <a
              href="http://localhost:5174/"
              onClick={handleDroneClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden 
                         w-full max-w-[320px] md:max-w-[380px] flex-shrink-1
                         transform hover:scale-105 hover:bg-white/20 hover:border-blue-400
                         transition-all duration-500 cursor-pointer flex flex-col relative"
            >
              {/* Image Area - Responsive Height */}
              <div className="h-32 md:h-52 lg:h-60 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-blue-900 group-hover:to-slate-900 transition-colors duration-500">
                <IoAirplane className="absolute -bottom-6 -right-6 w-32 h-32 md:w-56 md:h-56 text-white/5 rotate-[-45deg]" />
                <div className="relative z-10 p-4 bg-white/10 rounded-full border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <IoAirplane className="w-12 h-12 md:w-20 md:h-20 text-blue-300 drop-shadow-lg transform -rotate-45" />
                </div>
              </div>

              {/* Text Area */}
              <div className="p-4 md:p-6 text-center flex-1 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-blue-300 transition-colors">
                  Inventory Drone
                </h2>
                <p className="text-gray-300 text-xs md:text-sm">
                  Data aset drone
                </p>
              </div>
            </a>

            {/* CARD INVENTORY IT */}
            <button
              onClick={handleITClick}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden 
                         w-full max-w-[320px] md:max-w-[380px] flex-shrink-1
                         transform hover:scale-105 hover:bg-white/20 hover:border-green-400
                         transition-all duration-500 cursor-pointer flex flex-col relative"
            >
              <div className="h-32 md:h-52 lg:h-60 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-green-900 group-hover:to-slate-900 transition-colors duration-500">
                <IoDesktop className="absolute -bottom-6 -left-6 w-32 h-32 md:w-56 md:h-56 text-white/5" />
                <div className="relative z-10 p-4 bg-white/10 rounded-full border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <IoServer className="w-12 h-12 md:w-20 md:h-20 text-green-300 drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4 md:p-6 text-center flex-1 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-green-300 transition-colors">
                  Inventory IT
                </h2>
                <p className="text-gray-300 text-xs md:text-sm">
                  Data aset hardware dan perangkat IT
                </p>
              </div>
            </button>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center text-gray-400 text-[10px] md:text-xs py-2 flex-shrink-0">
          © 2025 N4TI
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
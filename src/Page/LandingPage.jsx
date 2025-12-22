import React from 'react';
import logoptpn4 from '../assets/ptpn4.png';
import backgroundVideo from '../assets/bgvidio.mp4';

//Import Ikon Pengganti Gambar
import { IoAirplane, IoServer, IoDesktop, IoHardwareChip } from "react-icons/io5";

function LandingPage({ onSelectIT }) {
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      
       {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src={backgroundVideo}
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/60"></div> 
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-10 p-8 text-white min-h-screen flex flex-col">
        
        {/* Header Logo */}
        <header className="flex justify-center mb-8">
          <img src={logoptpn4} alt="PTPN4 Logo" className="h-28 w-auto drop-shadow-2xl" />
        </header>

        <main className="max-w-6xl mx-auto text-center flex-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide uppercase drop-shadow-lg">
            Dashboard Inventory
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
            Selamat datang di aplikasi Dashboard Inventory. Aplikasi terdiri dari 2 modul yaitu Inventory IT dan Inventory Drone.
          </p>

          {/* Container Kartu */}
          <div className="flex flex-col md:flex-row justify-center gap-10 items-stretch">

            {/* --- KARTU 1: INVENTORY DRONE (External Link) --- */}
            <a 
              href="http://localhost:5174/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden 
                         w-full md:w-96 transform hover:scale-105 hover:bg-white/20 hover:border-blue-400
                         transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Bagian Visual (Pengganti Gambar) */}
              <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-blue-900 group-hover:to-slate-900 transition-colors duration-500">
                
                {/* Dekorasi Background Ikon */}
                <IoAirplane className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-[-45deg]" />
                
                {/* Ikon Utama */}
                <div className="relative z-10 p-6 bg-white/10 rounded-full border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <IoAirplane className="w-24 h-24 text-blue-300 drop-shadow-lg transform -rotate-45" />
                </div>
              </div>

              {/* Bagian Teks */}
              <div className="p-8 text-center flex-1">
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  Inventory Drone
                </h2>
                <p className="text-gray-300 text-sm font-light">
                  Data aset drone
                </p>
              </div>
            </a>

            {/* --- KARTU 2: INVENTORY IT (Internal Link) --- */}
            <button
              onClick={onSelectIT} 
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden 
                         w-full md:w-96 transform hover:scale-105 hover:bg-white/20 hover:border-green-400
                         transition-all duration-500 cursor-pointer flex flex-col text-left"
            >
              {/* Bagian Visual (Pengganti Gambar) */}
              <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-green-900 group-hover:to-slate-900 transition-colors duration-500">
                
                {/* Dekorasi Background Ikon */}
                <IoDesktop className="absolute -bottom-10 -left-10 w-64 h-64 text-white/5" />

                {/* Ikon Utama */}
                <div className="relative z-10 p-6 bg-white/10 rounded-full border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <IoServer className="w-24 h-24 text-green-300 drop-shadow-lg" />
                </div>
              </div>

              {/* Bagian Teks */}
              <div className="p-8 text-center flex-1">
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                  Inventory IT
                </h2>
                <p className="text-gray-300 text-sm font-light">
                  Data aset hardware dan perangkat IT
                </p>
              </div>
            </button>

          </div>
        </main>
        
        <footer className="text-center text-gray-400 text-xs mt-8">
          © 2025 N4TI 
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
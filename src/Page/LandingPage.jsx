import React from 'react';
import logoptpn4 from '../assets/ptpn4.png';
import droneImageUrl from '../assets/drone.png';
import itImageUrl from '../assets/inventry.png';

// 1. IMPORT BACKGROUND VIDEONYA
import backgroundVideo from '../assets/bgvidio.mp4';

function LandingPage({ onSelectIT }) {
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src={backgroundVideo}
        />

        <div className="absolute inset-0 bg-black/50"></div> 
      </div>

      <div className="relative z-10 p-8 text-white">
        <header className="flex justify-center mb-8">
          <img src={logoptpn4} alt="PTPN4 Logo" className="h-24 w-auto" />
        </header>

        <main className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-wide uppercase">
            Dashboard Inventory
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Selamat datang di aplikasi Dashboard Inventory. Aplikasi terdiri dari 2 modul yaitu Inventory IT dan Inventory Drone. Dashboard Inventory IT menyimpan data seluruh barang yang dimiliki oleh bagian IT. Dashboard Inventory Drone menyimpan data seluruh drone yang dimiliki oleh bagian Tanaman.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-10">

            <a 
              href="http://localhost:5174/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden 
                         w-full md:w-96 transform hover:scale-105 
                         transition-transform duration-300 group"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={droneImageUrl} 
                  alt="Inventory Drone" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 bg-white/5">
                <h2 className="text-2xl font-bold text-white">Inventory Drone</h2>
              </div>
            </a>

            <button
              onClick={onSelectIT}
              
              className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden 
                         w-full md:w-96 transform hover:scale-105 
                         transition-transform duration-300 group"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={itImageUrl} 
                  alt="Inventory IT" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 bg-white/5">
                <h2 className="text-2xl font-bold text-white">Inventory IT</h2>
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
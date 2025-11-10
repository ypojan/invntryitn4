// src/Route/Route.jsx

import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";

// 1. IMPORT SEMUA AKTOR (HALAMAN KONTEN) KAMU
//    (Kita rename file Dashboard-mu yang lama jadi MasterData kan)
import MasterData from "../Component/MasterData.jsx";

// (Nanti kalau file-file ini sudah kamu buat, kamu tinggal import di sini)
// import History from "../Component/History.jsx";
import Peminjaman from "../Component/Peminjaman.jsx";
import Pengembalian from "../Component/Pengembalian.jsx";
// import InputSpesifikasi from "../Component/InputSpesifikasi.jsx";

export default function Route() {
  // 2. Dengarkan "Naskah" (route) dari Ruang Kontrol
  const { route } = useContext(AppContext);
  
  // 3. Logika "Makan-Muntah" pakai Switch Case
  switch (route) {
    case "dashboard":
      return <MasterData />; // <-- Tampilkan Aktor MasterData

    // --- Ini adalah placeholder untuk halaman lain ---
    // (Ganti <div>...</div> ini dengan komponen aslinya kalau sudah kamu buat)

    case "input-spesifikasi":
      // return <InputSpesifikasi />;
      return <div>Halaman Input Spesifikasi (Coming Soon)</div>;

    case "peminjaman":
      // return <Peminjaman />;
      return <Peminjaman />;

    case "pengembalian":
      // return <Pengembalian />;
      return <Pengembalian />;

    case "history":
      // return <History />;
      return <div>Halaman History (Coming Soon)</div>;

    // 4. Jika 'route'-nya aneh, tampilkan MasterData saja
    default:
      return <MasterData />;
  }
}

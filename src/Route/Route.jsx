// src/Route/Route.jsx

import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import MasterData from "../Component/MasterData.jsx";
import History from "../Component/History.jsx";
import Peminjaman from "../Component/Peminjaman.jsx";
import Pengembalian from "../Component/Pengembalian.jsx";
import DetailBarang from "../Component/DetailBarang.jsx"; // <-- 1. IMPORT

import { IoGridOutline } from "react-icons/io5";

export default function Route() {
    const { route } = useContext(AppContext);
  
  switch (route) {
    case "dashboard":
      return <MasterData />;

    case "input-spesifikasi":
      return <div>Halaman Input Spesifikasi (Coming Soon)</div>;

    case "peminjaman":
      return <Peminjaman />;

    case "pengembalian":
      return <Pengembalian />;

    case "history":
      return <History/>;

    case "detail-barang": // <-- 2. TAMBAH CASE INI
      return <DetailBarang />;
      
    default:
      return <MasterData />;
  }
}
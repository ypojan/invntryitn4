// src/Component/MasterData.jsx

import React, { useState } from "react";

// 1. IMPORT GAMBAR ASET LOKAL KAMU
import laptopImg from "../assets/laptop.png";
import pcImg from "../assets/pc.png";
import sparepartImg from "../assets/sparepart.png";
import printerImg from "../assets/printer.png";
import proyektorImg from "../assets/proyektor.png";

function MasterData() {
  const [searchTerm, setSearchTerm] = useState("");

  const inventoryItems = [
    {
      title: "Laptop",
      total: 35,
      image: laptopImg,
    },
    {
      title: "Komputer",
      total: 50,
      image: pcImg,
    },
    {
      title: "Sparepart",
      total: 27,
      image: sparepartImg,
    },
    {
      title: "Mesin Printer",
      total: 6,
      image: printerImg,
    },
    {
      title: "Projector",
      total: 20,
      image: proyektorImg,
    },
  ];

  const statusData = [
    { label: "Bagus", percentage: 60, color: "#40B7FE" },
    { label: "Diperbaiki", percentage: 25, color: "#234FEA" },
    { label: "Rusak", percentage: 15, color: "#E62727" },
  ];

  const filteredItems = inventoryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent py-2">
          Master Data Seluruh Barang
        </h1>
      </div>

      {/* Search Bar and Button */}
      <div className="flex items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari barang..."
              className="w-full rounded-lg px-5 py-3 pr-12 text-gray-700 
                         border border-gray-300 bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tambah Data Button - GRADASI BIRU */}
        <button
          className="px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg ml-auto
                     bg-gradient-to-r from-blue-600 to-blue-700 text-white
                     hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-semibold">Tambah Data</span>
        </button>
      </div>

      {/* ================================================================
        BAGIAN KARTU (CARD) - DESAIN BARU LEBIH DINAMIS
        ================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden 
                       border border-gray-100
                       hover:shadow-2xl hover:-translate-y-2 
                       transition-all duration-300 group"
          >
            {/* Card Image Section - Gambar di kiri */}
            <div className="flex">
              <div className="w-2/5 p-4 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=" + item.title;
                  }}
                />
              </div>

              {/* Card Content Section - Teks di kanan */}
              <div className="w-3/5 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Unit
                  </p>
                  <p className="text-4xl font-extrabold text-blue-600">
                    {item.total}
                  </p>
                </div>

                <button
                  className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-700 
                                 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Lihat Detail
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ================================================================
        AKHIR BAGIAN KARTU (CARD)
        ================================================================
      */}

      {/* ================================================================
        BAGIAN CHART STATUS KONDISI BARANG (TIDAK DIUBAH)
        ================================================================
      */}
      <div
        className="rounded-xl shadow-md p-8"
        style={{ backgroundColor: "#DBEAFE" }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#1F2937" }}>
          Status Kondisi Barang
        </h2>

        <div className="flex items-center justify-between gap-12">
          {/* Legend */}
          <div className="flex-1 space-y-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-12 h-8"
                  style={{
                    backgroundColor: item.color,
                    borderRadius: "12px",
                  }}
                ></div>
                <div>
                  <div className="font-semibold" style={{ color: "#1F2937" }}>
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Donut Chart */}
          <div className="relative w-64 h-64">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F0F0F0"
                strokeWidth="20"
              />

              {/* Bagus - 60% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="20"
                strokeDasharray="150.8 251.2"
                strokeDashoffset="0"
              />

              {/* Diperbaiki - 25% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#2563EB"
                strokeWidth="20"
                strokeDasharray="62.8 251.2"
                strokeDashoffset="-150.8"
              />

              {/* Rusak - 15% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#EF4444"
                strokeWidth="20"
                strokeDasharray="37.7 251.2"
                strokeDashoffset="-213.6"
              />
            </svg>

            {/* Percentage labels */}
            <div className="absolute top-1 left-12 -translate-y-1/2">
              <div
                className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <span
                  className="font-bold text-base"
                  style={{ color: "#EF4444" }}
                >
                  15%
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 right-3">
              <div
                className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <span
                  className="font-bold text-base"
                  style={{ color: "#38BDF8" }}
                >
                  60%
                </span>
              </div>
            </div>

            <div className="absolute top-1/2 -left-10 -translate-y-1/2">
              <div
                className="backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <span
                  className="font-bold text-base"
                  style={{ color: "#2563EB" }}
                >
                  25%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterData;

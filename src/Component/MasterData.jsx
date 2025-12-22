import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../Context/AppContext.jsx";

// Lucide Icons
import {
  Search,
  ChevronRight,
  ChevronDown,
  Plus
} from "lucide-react";

function MasterData() {
  const {
    inventoryItems,
    detailBarangData,
    openModal,
    setRoute,
  } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  /* ============================
     HITUNG KONDISI BARANG
  ============================ */
  const kondisiSummary = useMemo(() => {
    let bagus = 0;
    let diperbaiki = 0;
    let rusak = 0;

    detailBarangData.forEach((item) => {
      bagus += item.kondisi.bagus;
      diperbaiki += item.kondisi.diperbaiki;
      rusak += item.kondisi.rusak;
    });

    const total = bagus + diperbaiki + rusak;

    return {
      total,
      persenBagus: total ? Math.round((bagus / total) * 100) : 0,
      persenDiperbaiki: total ? Math.round((diperbaiki / total) * 100) : 0,
      persenRusak: total ? Math.round((rusak / total) * 100) : 0,
    };
  }, [detailBarangData]);

  const statusData = [
    { label: "Bagus", value: kondisiSummary.persenBagus, color: "#38BDF8" },
    { label: "Diperbaiki", value: kondisiSummary.persenDiperbaiki, color: "#2563EB" },
    { label: "Rusak", value: kondisiSummary.persenRusak, color: "#EF4444" },
  ];

  const filteredItems = inventoryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const circumference = 2 * Math.PI * 40;
  let offset = 0;

  return (
    <>
      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Master Data Seluruh Barang
      </h1>

      {/* ================= SEARCH & ACTION ================= */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari barang..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => openModal("tambahBarang")}
          className="ml-auto px-6 py-3 rounded-lg flex items-center gap-2
                     bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Tambah Data
        </button>
      </div>

      {/* ================= GRID BARANG ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredItems.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain p-4"
            />

            <div className="p-4 flex justify-between items-center border-t">
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Total: <b>{item.total}</b>
                </p>
              </div>

              <button
                onClick={() => setRoute("detail-barang", item.title)}
                className="w-10 h-10 rounded-full flex items-center justify-center
                           text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition"
                title="Lihat Detail"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= LIHAT LEBIH BANYAK ================= */}
      {visibleCount < filteredItems.length && (
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="flex items-center gap-2 px-6 py-2 rounded-lg
                       bg-gray-100 hover:bg-gray-200
                       font-semibold text-gray-700 transition"
          >
            <span>Lihat Lebih Banyak</span>
            <ChevronDown size={18} />
          </button>
        </div>
      )}

      {/* ================= CHART ================= */}
      <div className="bg-blue-100 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Status Kondisi Barang
        </h2>

        <div className="flex items-center justify-between">
          {/* LEGEND */}
          <div className="space-y-4">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-6 rounded-lg"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold">
                  {item.label} ({item.value}%)
                </span>
              </div>
            ))}
          </div>

          {/* DONUT */}
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="20"
              />

              {statusData.map((item, i) => {
                const dash = (item.value / 100) * circumference;
                const dashOffset = offset;
                offset -= dash;

                return (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeDashoffset={dashOffset}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">
                {kondisiSummary.total}
              </span>
              <span className="text-sm text-gray-500">Total Barang</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterData;

// src/Component/MasterData.jsx

import React, { useContext, useMemo, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import Swal from "sweetalert2"; 

// GANTI IMPORT ICON KE IONICONS 5
import {
  IoSearchOutline,
  IoChevronDown,
  IoAdd,
  IoEllipsisVertical, // Pengganti MoreVertical
  IoPencil,           // Pengganti Edit
  IoTrashOutline,     // Pengganti Trash2
  IoArrowForward      // Pengganti ArrowRight
} from "react-icons/io5";

function MasterData() {
  const {
    inventoryItems,
    detailBarangData,
    openModal,
    setRoute,
    deleteInventoryItem,
  } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const getCategoryTotal = (categoryTitle) => {
    const items = detailBarangData.filter(d => d.kategori === categoryTitle);
    return items.reduce((acc, curr) => acc + curr.jumlah, 0);
  };

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

  // --- HANDLER ---
  const handleToggleDropdown = (e, id) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDelete = (e, id, title) => {
    e.stopPropagation(); 
    setActiveDropdown(null); 

    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `Data "${title}" akan dihapus permanen.`,
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl p-6',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-2',
        cancelButton: 'bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors mx-2'
      },
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInventoryItem(id, title);
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
          }
        });
      }
    });
  };

  const handleEdit = (e, title) => {
    e.stopPropagation();
    setActiveDropdown(null);
    Swal.fire({
      title: 'Fitur Belum Tersedia',
      text: `Edit data "${title}" akan segera hadir!`,
      icon: 'info',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
      }
    });
  };

  const handleLihatDetail = (e, title) => {
    setRoute("detail-barang", title);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
          Master Data Seluruh Barang
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative w-full md:max-w-lg">
          {/* ICON SEARCH */}
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari barang..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => openModal("tambahBarang")}
          className="w-full md:w-auto ml-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 
                     bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold 
                     shadow-md shadow-blue-200 
                     hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5
                     transition-all duration-300 active:scale-95 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          {/* ICON PLUS */}
          <IoAdd size={20} className="relative z-10" />
          <span className="relative z-10">Tambah Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredItems.slice(0, visibleCount).map((item) => {
          const totalReal = getCategoryTotal(item.title);

          return (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => handleToggleDropdown(e, item.id)}
                    className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    {/* ICON TITIK TIGA */}
                    <IoEllipsisVertical size={20} />
                  </button>
                  {activeDropdown === item.id && (
                    <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <button 
                        onClick={(e) => handleEdit(e, item.title)}
                        className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 flex items-center gap-2"
                      >
                        {/* ICON EDIT */}
                        <IoPencil size={16} /> Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id, item.title)}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-50"
                      >
                        {/* ICON TRASH */}
                        <IoTrashOutline size={16} /> Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium tracking-wider">
                  Total
                </p>
                
                <div className="flex items-end justify-between mt-2">
                  <span className="text-3xl font-extrabold text-blue-600">
                    {totalReal}
                  </span>
                  
                  <button
                    onClick={(e) => handleLihatDetail(e, item.title)}
                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:translate-x-1 transition-all"
                  >
                    {/* ICON PANAH KANAN */}
                    Lihat Detail <IoArrowForward size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 font-semibold transition-all"
          >
            {/* ICON CHEVRON DOWN */}
            <span>Lihat Lebih Banyak</span>
            <IoChevronDown size={18} />
          </button>
        </div>
      )}

      {/* CHART (Sama seperti sebelumnya) */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Status Kondisi Barang
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 w-full md:w-auto">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.value}% dari total aset</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-64 h-64 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="-rotate-90 drop-shadow-xl">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="20" />
              {statusData.map((item, i) => {
                const dash = (item.value / 100) * circumference;
                const dashOffset = offset;
                offset -= dash;
                return (
                  <circle
                    key={i} cx="50" cy="50" r="40" fill="none" stroke={item.color} strokeWidth="20"
                    strokeDasharray={`${dash} ${circumference}`} strokeDashoffset={dashOffset}
                    className="transition-all duration-1000 ease-out"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-800">
                {kondisiSummary.total}
              </span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Unit</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterData;
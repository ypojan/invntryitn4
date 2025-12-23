// src/Component/MasterData.jsx

import React, { useContext, useMemo, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import Swal from "sweetalert2"; 
import Chart from "react-apexcharts"; // Import ApexCharts

import {
  IoSearchOutline,
  IoChevronDown,
  IoAdd,
  IoEllipsisVertical,
  IoPencil,
  IoTrashOutline,
  IoArrowForward
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

  // --- DATA UNTUK CHART ---
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

    return { total, bagus, diperbaiki, rusak };
  }, [detailBarangData]);

  // --- KONFIGURASI CHART (Bentuk Donut seperti Gambar) ---
  const chartSeries = [
    kondisiSummary.bagus, 
    kondisiSummary.diperbaiki, 
    kondisiSummary.rusak
  ];

  const chartOptions = {
    chart: {
      type: 'donut', // Menentukan bentuk chart
    },
    labels: ["Bagus", "Diperbaiki", "Rusak"],
    colors: ["#38BDF8", "#2563EB", "#EF4444"], // Warna: Biru Muda, Biru Tua, Merah
    plotOptions: {
      pie: {
        donut: {
          size: '70%', // Ketebalan donut (semakin besar %, semakin tipis)
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Unit',
              fontSize: '16px',
              color: '#64748b',
              formatter: () => kondisiSummary.total // Menampilkan angka total di tengah
            }
          }
        }
      }
    },
    dataLabels: { 
      enabled: true, // 1. Ubah jadi true (wajib)
      formatter: function (val) {
        return Math.round(val) + "%"  // 2. Format angkanya (misal: 25%)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        colors: ['#fff'] // Warna teks putih
      },
      dropShadow: {
        enabled: false // Matikan bayangan teks biar lebih tajam
      }
    },
    // ------------------------------
    legend: { show: false }, 
    tooltip: {
      enabled: true,
      y: { formatter: (val) => val + " Unit" }
    }
  };

  // Data untuk Legend Custom di Kiri
  const statusData = [
    { label: "Bagus", value: kondisiSummary.total ? Math.round((kondisiSummary.bagus / kondisiSummary.total) * 100) : 0, color: "#38BDF8" },
    { label: "Diperbaiki", value: kondisiSummary.total ? Math.round((kondisiSummary.diperbaiki / kondisiSummary.total) * 100) : 0, color: "#2563EB" },
    { label: "Rusak", value: kondisiSummary.total ? Math.round((kondisiSummary.rusak / kondisiSummary.total) * 100) : 0, color: "#EF4444" },
  ];

  const filteredItems = inventoryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 mx-2',
        cancelButton: 'bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 mx-2'
      },
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInventoryItem(id, title);
        Swal.fire({ title: 'Terhapus!', icon: 'success', customClass: { confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg' }});
      }
    });
  };

  const handleEdit = (e, title) => {
    e.stopPropagation();
    setActiveDropdown(null);
    Swal.fire({ title: 'Info', text: 'Fitur Edit segera hadir!', icon: 'info', customClass: { confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg' }});
  };

  const handleLihatDetail = (e, title) => {
    setRoute("detail-barang", title);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 tracking-tight">Master Data Seluruh Barang</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative w-full md:max-w-lg">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text" placeholder="Cari barang..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => openModal("tambahBarang")}
          className="w-full md:w-auto ml-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <IoAdd size={20} /> <span>Tambah Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredItems.slice(0, visibleCount).map((item) => {
          const totalReal = getCategoryTotal(item.title);
          return (
            <div key={item.id} className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="relative">
                  <button onClick={(e) => handleToggleDropdown(e, item.id)} className="p-2 rounded-full text-slate-400 hover:bg-slate-100">
                    <IoEllipsisVertical size={20} />
                  </button>
                  {activeDropdown === item.id && (
                    <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                      <button onClick={(e) => handleEdit(e, item.title)} className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 flex items-center gap-2"><IoPencil size={16} /> Edit</button>
                      <button onClick={(e) => handleDelete(e, item.id, item.title)} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-50"><IoTrashOutline size={16} /> Hapus</button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium tracking-wider">Total</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-3xl font-extrabold text-blue-600">{totalReal}</span>
                  <button onClick={(e) => handleLihatDetail(e, item.title)} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:translate-x-1 transition-all">Lihat Detail <IoArrowForward size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center mb-10">
          <button onClick={() => setVisibleCount((prev) => prev + 6)} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 font-semibold transition-all">
            <span>Lihat Lebih Banyak</span> <IoChevronDown size={18} />
          </button>
        </div>
      )}

      {/* --- CHART SECTION (DIGANTI DENGAN APEXCHARTS) --- */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Status Kondisi Barang</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Legend Custom di Kiri (Tetap dipertahankan agar detail) */}
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

          {/* Component Chart dari ApexCharts */}
          <div className="relative w-full md:w-80 flex-shrink-0 flex justify-center">
            <Chart 
              options={chartOptions} 
              series={chartSeries} 
              type="donut" 
              width="100%" 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterData;
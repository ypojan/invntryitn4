// src/Component/History.jsx

import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2"; // Import SweetAlert2

import laptopImg from "../assets/laptop.png";
import pcImg from "../assets/pc.png";

import { 
  IoArrowBack, IoSearchOutline, IoTrashOutline, 
  IoChevronBack, IoChevronForward, IoDocumentTextOutline 
} from "react-icons/io5";

// --- DATA DUMMY ---
const addingData = [
  { id: "01111", tanggal: "04/01/2025", spesifikasi: "MSI Stealth A16 Mercedes", gambar: laptopImg, jumlah: 1, hargaSatuan: 50000000, totalHarga: 50000000 },
  { id: "01112", tanggal: "05/01/2025", spesifikasi: "Lenovo Yoga", gambar: pcImg, jumlah: 10, hargaSatuan: 5000000, totalHarga: 50000000 },
];

const borrowingData = [
  { id: "01111", tanggal: "04/01/2025", spesifikasi: "MSI Stealth A16 Mercedes", gambar: laptopImg, jumlah: 1, unit: "Kepala Sub Bagian HPS", departement: "PENGADAAN DAN TEKNOLOGI INFORMASI" },
  { id: "01112", tanggal: "05/01/2025", spesifikasi: "Lenovo Yoga", gambar: pcImg, jumlah: 10, unit: "Pengadaan dan TI", departement: "PENGADAAN DAN TEKNOLOGI INFORMASI" },
];

const returningData = [
  { id: "01111", tanggal: "10/01/2025", spesifikasi: "MSI Stealth A16 Mercedes", gambar: laptopImg, jumlah: 1, unit: "Kepala Sub Bagian HPS", departement: "PENGADAAN DAN TEKNOLOGI INFORMASI" },
];

export default function History() {
  const { setRoute } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("adding");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Perbaiki: State data lokal agar bisa dihapus
  const [dataAdding, setDataAdding] = useState(addingData);
  const [dataBorrowing, setDataBorrowing] = useState(borrowingData);
  const [dataReturning, setDataReturning] = useState(returningData);

  const formatRupiah = (number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);

  const getCurrentData = () => {
    if (activeTab === "adding") return dataAdding;
    if (activeTab === "borrowing") return dataBorrowing;
    return dataReturning;
  };

  const filterData = () => {
    return getCurrentData().filter((item) =>
      item.spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // --- PERBAIKAN FUNGSI DELETE ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus History?",
      text: "Data ini akan dihapus dari riwayat secara permanen.",
      icon: "warning",
      showCancelButton: true,
      
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl p-6',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-2',
        cancelButton: 'bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors mx-2'
      },
      
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (activeTab === "adding") setDataAdding(prev => prev.filter(i => i.id !== id));
        else if (activeTab === "borrowing") setDataBorrowing(prev => prev.filter(i => i.id !== id));
        else setDataReturning(prev => prev.filter(i => i.id !== id));
        
        Swal.fire({
          title: "Terhapus!",
          text: "Data riwayat berhasil dihapus.",
          icon: "success",
          buttonsStyling: false,
          customClass: { confirmButton: "bg-blue-600 text-white px-6 py-2 rounded-lg" }
        });
      }
    });
  };

  return (
    <>
      <header className="mb-8 flex items-center gap-4">
        <button onClick={() => setRoute("dashboard")} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <IoArrowBack className="w-7 h-7 text-gray-800" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text" placeholder="Cari Spesifikasi..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-10"></div>
      </header>

      <section>
        <div className="flex items-end gap-2 mb-0 px-2">
          {['adding', 'borrowing', 'returning'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-t-xl font-semibold text-sm transition-all duration-200 capitalize ${activeTab === tab ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-10" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
            >
              {tab === 'adding' ? 'History of Adding' : tab === 'borrowing' ? 'History of Borrowing' : 'History of Returning'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg border border-gray-200 overflow-hidden min-h-[500px]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-700 text-white text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-center font-semibold">
                    {activeTab === 'adding' ? 'Tanggal Pembelian' : activeTab === 'borrowing' ? 'Tanggal Peminjaman' : 'Tanggal Pengembalian'}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">ID Barang</th>
                  <th className="px-6 py-4 text-center font-semibold">Spesifikasi</th>
                  <th className="px-6 py-4 text-center font-semibold">Gambar</th>
                  <th className="px-6 py-4 text-center font-semibold">Jumlah</th>
                  {activeTab === 'adding' && (
                    <>
                      <th className="px-6 py-4 text-center font-semibold">Harga Satuan</th>
                      <th className="px-6 py-4 text-center font-semibold">Total Harga</th>
                      <th className="px-6 py-4 text-center font-semibold">Kwitansi</th>
                    </>
                  )}
                  {(activeTab === 'borrowing' || activeTab === 'returning') && (
                    <>
                      <th className="px-6 py-4 text-center font-semibold">Unit/Bagian</th>
                      <th className="px-6 py-4 text-center font-semibold">Departement</th>
                      <th className="px-6 py-4 text-center font-semibold">{activeTab === 'borrowing' ? 'Surat Peminjaman' : 'Surat Pengembalian'}</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterData().map((row, index) => (
                  <tr key={index} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 font-medium">{row.tanggal}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{row.id}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-800 font-semibold">{row.spesifikasi}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <div className="w-20 h-14 p-1 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                        <img src={row.gambar} alt="produk" className="max-w-full max-h-full object-contain" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700 font-bold">{row.jumlah}</td>
                    {activeTab === 'adding' && (
                      <>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">{formatRupiah(row.hargaSatuan)}</td>
                        <td className="px-6 py-4 text-center text-sm font-bold text-gray-800">{formatRupiah(row.totalHarga)}</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => Swal.fire({title:"Info", text:"Detail kwitansi", icon:"info", buttonsStyling:false, customClass:{confirmButton:"bg-blue-600 text-white px-6 py-2 rounded-lg"}})}>Lihat Detail</button>
                        </td>
                      </>
                    )}
                    {(activeTab === 'borrowing' || activeTab === 'returning') && (
                      <>
                        <td className="px-6 py-4 text-sm text-center text-gray-700">{row.unit}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700 font-medium uppercase">{row.departement}</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => Swal.fire({title:"Info", text:"Detail surat", icon:"info", buttonsStyling:false, customClass:{confirmButton:"bg-blue-600 text-white px-6 py-2 rounded-lg"}})}>Lihat Detail</button>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 justify-center">
                        <button onClick={() => handleDelete(row.id)} className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors" title="Hapus"><IoTrashOutline className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filterData().length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
               <IoDocumentTextOutline className="w-16 h-16 mb-4 opacity-20" />
               <p>Data tidak ditemukan.</p>
            </div>
          )}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
             <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600" disabled><IoChevronBack className="w-5 h-5" /></button>
                <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold shadow-sm">1</span>
                <button className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600" disabled><IoChevronForward className="w-5 h-5" /></button>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
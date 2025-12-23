// src/Component/History.jsx

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2"; 

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
  { id: "01113", tanggal: "06/01/2025", spesifikasi: "Asus ROG", gambar: laptopImg, jumlah: 2, hargaSatuan: 15000000, totalHarga: 30000000 },
  { id: "01114", tanggal: "07/01/2025", spesifikasi: "HP Pavilion", gambar: pcImg, jumlah: 5, hargaSatuan: 7000000, totalHarga: 35000000 },
  { id: "01115", tanggal: "08/01/2025", spesifikasi: "Dell XPS", gambar: laptopImg, jumlah: 1, hargaSatuan: 20000000, totalHarga: 20000000 },
  { id: "01116", tanggal: "09/01/2025", spesifikasi: "Macbook Air", gambar: laptopImg, jumlah: 3, hargaSatuan: 18000000, totalHarga: 54000000 },
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
  
  const [dataAdding, setDataAdding] = useState(addingData);
  const [dataBorrowing, setDataBorrowing] = useState(borrowingData);
  const [dataReturning, setDataReturning] = useState(returningData);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Tampilkan 5 data per halaman

  const formatRupiah = (number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);

  const getCurrentData = () => {
    if (activeTab === "adding") return dataAdding;
    if (activeTab === "borrowing") return dataBorrowing;
    return dataReturning;
  };

  const getFilteredData = () => {
    return getCurrentData().filter((item) =>
      item.spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredResult = getFilteredData();

  // --- LOGIKA PAGINATION ---
  const totalPages = Math.ceil(filteredResult.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResult.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Reset page kalau ganti Tab atau Search
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

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

        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
          {/* SCROLL WRAPPER */}
          <div className="overflow-x-auto w-full flex-1">
            <table className="min-w-full whitespace-nowrap">
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
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={index} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-6 py-4 text-sm text-center text-gray-700 font-medium">{row.tanggal}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{row.id}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-800 font-semibold">{row.spesifikasi}</td>
                      <td className="px-6 py-4 flex justify-center">
                        <div className="w-20 h-14 p-1 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                          {row.gambar ? <img src={row.gambar} alt="produk" className="max-w-full max-h-full object-contain" /> : "-"}
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
                  ))
                ) : (
                   <tr>
                    <td colSpan="12" className="text-center py-12 text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <IoDocumentTextOutline className="w-16 h-16 mb-4 opacity-20" />
                        <p>Data tidak ditemukan.</p>
                      </div>
                    </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER PAGINATION */}
          {filteredResult.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end items-center gap-4">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <IoChevronBack className="w-5 h-5" />
                  </button>
                  
                  <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold shadow-sm">
                    {currentPage} / {totalPages}
                  </span>

                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <IoChevronForward className="w-5 h-5" />
                  </button>
                </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
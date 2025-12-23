// src/Component/DetailBarang.jsx

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2"; 
import { 
  IoArrowBack, IoSearchOutline, IoPrintOutline, IoAdd, 
  IoPencil, IoTrashOutline, IoDocumentTextOutline, 
  IoChevronBack, IoChevronForward
} from "react-icons/io5";
import Modal from "./common/Modal";
import FormTambahSpesifikasi from "./FormTambahSpesifikasi.jsx";

export default function DetailBarang() {
  const { setRoute, selectedCategory, detailBarangData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Menggunakan state lokal agar bisa dimanipulasi (tambah/hapus) tanpa reload
  const [localData, setLocalData] = useState(detailBarangData);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Data
  const filteredData = localData.filter(item => 
    item.kategori === selectedCategory && 
    (item.spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- LOGIKA PAGINATION ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Reset pagination ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);


  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // --- FUNGSI HAPUS ---
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Data "${nama}" akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl p-6',
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-2',
        cancelButton: 'bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors mx-2'
      },
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setLocalData(prev => prev.filter(item => item.id !== id));
        Swal.fire({
          title: "Terhapus!",
          text: "Data berhasil dihapus.",
          icon: "success",
          buttonsStyling: false,
          customClass: { confirmButton: "bg-blue-600 text-white px-6 py-2 rounded-lg" }
        });
      }
    });
  };

  // --- FUNGSI SIMPAN BARU ---
  const handleSimpanSpesifikasi = (newData) => {
    let gambarUrl = null;
    if (newData.gambar) {
      gambarUrl = URL.createObjectURL(newData.gambar);
    }

    const newItem = {
      id: newData.idBarang,
      kategori: selectedCategory,
      tanggal: newData.tanggal, 
      spesifikasi: newData.spesifikasi,
      gambar: gambarUrl, 
      jumlah: newData.jumlah,
      hargaSatuan: newData.hargaSatuan,
      totalHarga: newData.totalHarga || (newData.jumlah * newData.hargaSatuan),
      kondisi: { 
        bagus: newData.kondisi === 'bagus' ? newData.jumlah : 0, 
        diperbaiki: newData.kondisi === 'diperbaiki' ? newData.jumlah : 0, 
        rusak: newData.kondisi === 'rusak' ? newData.jumlah : 0 
      }
    };
    
    // PERUBAHAN DI SINI:
    // newItem ditaruh di depan array ([newItem, ...prev])
    // agar data baru muncul di baris paling atas tabel.
    setLocalData(prev => [newItem, ...prev]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* HEADER PAGE */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setRoute("dashboard")} 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Kembali ke Dashboard"
        >
          <IoArrowBack className="w-8 h-8 text-slate-800" />
        </button>
        <div>
            <h1 className="text-3xl font-bold text-slate-800">
            Detail Spesifikasi {selectedCategory}
            </h1>
        </div>
      </header>

      {/* FILTER & ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative">
              <input type="text" placeholder="Pilih Tanggal" className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 text-sm shadow-sm" onFocus={(e)=>e.target.type='date'} onBlur={(e)=>e.target.type='text'} />
           </div>
           <div className="relative">
              <input type="text" placeholder="Cari Spesifikasi..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm shadow-sm"/>
              <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
           </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* TOMBOL CETAK LAPORAN */}
          <button
            onClick={() => Swal.fire("Info", "Fitur Cetak Coming Soon", "info")}
            className="w-1/2 md:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 
                       bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold 
                       shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800 
                       hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 
                       relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <IoPrintOutline className="w-5 h-5 relative z-10" /> 
            <span className="relative z-10 text-sm">Cetak Laporan</span>
          </button>

          {/* TOMBOL TAMBAH SPESIFIKASI */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-1/2 md:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 
                       bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold 
                       shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800 
                       hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 
                       relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <IoAdd className="w-5 h-5 relative z-10" /> 
            <span className="relative z-10 text-sm">Tambah Spesifikasi</span>
          </button>
        </div>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col">
        <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm whitespace-nowrap">
            <thead className="bg-slate-700 text-white uppercase tracking-wider">
                <tr>
                <th className="px-4 py-4 text-center font-semibold">Tanggal Pembelian</th>
                <th className="px-4 py-4 text-center font-semibold">ID Barang</th>
                <th className="px-4 py-4 text-left font-semibold">Spesifikasi</th>
                <th className="px-4 py-4 text-center font-semibold">Gambar</th>
                <th className="px-4 py-4 text-center font-semibold">Jumlah</th>
                <th className="px-4 py-4 text-center font-semibold">Harga Satuan</th>
                <th className="px-4 py-4 text-center font-semibold">Total Harga</th>
                <th className="px-4 py-4 text-center font-semibold">Kwitansi</th>
                <th className="px-4 py-4 text-center font-semibold bg-blue-600 text-white">Bagus</th>
                <th className="px-4 py-4 text-center font-semibold bg-yellow-600 text-white">Diperbaiki</th>
                <th className="px-4 py-4 text-center font-semibold bg-red-600 text-white">Rusak</th>
                <th className="px-4 py-4 text-center font-semibold">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.tanggal}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 min-w-[200px] whitespace-normal">{item.spesifikasi}</td>
                    <td className="px-4 py-3 text-center">
                        <div className="w-12 h-10 mx-auto bg-white border border-gray-200 rounded flex items-center justify-center p-1 overflow-hidden">
                            {item.gambar ? (
                              <img src={item.gambar} alt="img" className="w-full h-full object-contain"/>
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                        </div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-gray-700">{item.jumlah}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{formatRupiah(item.hargaSatuan)}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-800">{formatRupiah(item.totalHarga)}</td>
                    <td className="px-4 py-3 text-center">
                        <button className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-gray-400 transition-colors">Lihat Detail</button>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50/30">{item.kondisi.bagus}</td>
                    <td className="px-4 py-3 text-center font-bold text-yellow-600 bg-yellow-50/30">{item.kondisi.diperbaiki}</td>
                    <td className="px-4 py-3 text-center font-bold text-red-600 bg-red-50/30">{item.kondisi.rusak}</td>
                    <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit"><IoPencil size={18} /></button>
                        <button onClick={() => handleDelete(item.id, item.spesifikasi)} className="text-red-600 hover:text-red-800 transition-colors" title="Hapus"><IoTrashOutline size={18} /></button>
                        </div>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="12" className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center">
                        <IoDocumentTextOutline className="w-12 h-12 mb-2 opacity-20"/>
                        <p>Belum ada data detail untuk {selectedCategory}.</p>
                    </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* PAGINATION FOOTER */}
        {filteredData.length > 0 && (
          <div className="p-4 border-t border-white bg-white-50 flex justify-end items-center gap-4">
             <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronBack className="w-5 h-5" />
                </button>
                
                <span className="px-4 py-2 bg-white border-gray-300 text-gray-700 rounded-lg text-sm font-semibold">
                  {currentPage}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="600px">
        <FormTambahSpesifikasi 
          onClose={() => setIsModalOpen(false)} 
          onSimpan={handleSimpanSpesifikasi} 
        />
      </Modal>

    </div>
  );
}
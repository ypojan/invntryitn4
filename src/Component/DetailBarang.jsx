// src/Component/DetailBarang.jsx

import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2"; 
import { 
  IoArrowBack, IoSearchOutline, IoPrintOutline, IoAdd, 
  IoPencil, IoTrashOutline, IoDocumentTextOutline 
} from "react-icons/io5";

import Modal from "./common/Modal"; // Pastikan path Modal benar
import FormTambahSpesifikasi from "./FormTambahSpesifikasi.jsx";

export default function DetailBarang() {
  const { setRoute, selectedCategory, detailBarangData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State lokal untuk data agar bisa di-update (Hapus/Tambah) secara real-time di halaman ini
  // (Idealnya fungsi delete/add ada di AppContext, tapi untuk demo kita pakai state lokal dulu)
  const [localData, setLocalData] = useState(detailBarangData);

  // Filter Data
  const filteredData = localData.filter(item => 
    item.kategori === selectedCategory && 
    (item.spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  // --- FUNGSI EDIT ---
  const handleEdit = (item) => {
    Swal.fire({
      title: "Info",
      text: `Fitur edit untuk "${item.spesifikasi}" segera hadir!`,
      icon: "info",
      buttonsStyling: false,
      customClass: { confirmButton: "bg-blue-600 text-white px-6 py-2 rounded-lg" }
    });
  };

  // --- FUNGSI SIMPAN BARU ---
  const handleSimpanSpesifikasi = (newData) => {
    // Tambahkan data baru ke state lokal (Simulasi)
    const newItem = {
      id: newData.idBarang,
      kategori: selectedCategory,
      tanggal: newData.tanggal, // Format perlu disesuaikan jika mau dd/mm/yyyy
      spesifikasi: newData.spesifikasi,
      gambar: null, // Placeholder
      jumlah: newData.jumlah,
      hargaSatuan: newData.hargaSatuan,
      totalHarga: newData.totalHarga || (newData.jumlah * newData.hargaSatuan),
      kondisi: { 
        bagus: newData.kondisi === 'bagus' ? newData.jumlah : 0, 
        diperbaiki: newData.kondisi === 'diperbaiki' ? newData.jumlah : 0, 
        rusak: newData.kondisi === 'rusak' ? newData.jumlah : 0 
      }
    };
    setLocalData(prev => [...prev, newItem]);
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
        
        {/* Kiri: Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative">
              <input type="text" placeholder="Pilih Tanggal" className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 text-sm shadow-sm" onFocus={(e)=>e.target.type='date'} onBlur={(e)=>e.target.type='text'} />
           </div>
           <div className="relative">
              <input type="text" placeholder="Cari Spesifikasi..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm shadow-sm"/>
              <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
           </div>
        </div>

        {/* Kanan: Tombol Aksi (Efek Shimmer seperti Peminjaman) */}
        <div className="flex gap-3 w-full md:w-auto">
          
          {/* Tombol Cetak */}
          <button
            onClick={() => Swal.fire("Info", "Fitur Cetak Coming Soon", "info")}
            className="w-1/2 md:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 
                       bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold 
                       shadow-md shadow-slate-300 hover:from-slate-800 hover:to-slate-900 
                       hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 
                       relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <IoPrintOutline className="w-5 h-5 relative z-10" />
            <span className="relative z-10 text-sm">Cetak Laporan</span>
          </button>

          {/* Tombol Tambah */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-1/2 md:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 
                       bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold 
                       shadow-md shadow-slate-300 hover:from-slate-800 hover:to-slate-900 
                       hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 
                       relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <IoAdd className="w-5 h-5 relative z-10" />
            <span className="relative z-10 text-sm">Tambah Spesifikasi</span>
          </button>

        </div>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead className="bg-slate-700 text-white uppercase tracking-wider">
                <tr>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Tanggal Pembelian</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">ID Barang</th>
                <th className="px-4 py-4 text-left font-semibold whitespace-nowrap">Spesifikasi</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Gambar</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Jumlah</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Harga Satuan</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Total Harga</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Kwitansi</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap bg-blue-600 text-white">Bagus</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap bg-yellow-600 text-white">Diperbaiki</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap bg-red-600 text-white">Rusak</th>
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-center text-gray-600 font-medium whitespace-nowrap">{item.tanggal}</td>
                    <td className="px-4 py-3 text-center text-gray-600 whitespace-nowrap">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 min-w-[200px]">{item.spesifikasi}</td>
                    <td className="px-4 py-3 text-center">
                        <div className="w-12 h-10 mx-auto bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                            {item.gambar ? <img src={item.gambar} alt="img" className="max-w-full max-h-full object-contain"/> : "-"}
                        </div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-gray-700 whitespace-nowrap">{item.jumlah}</td>
                    <td className="px-4 py-3 text-center text-gray-600 whitespace-nowrap">{formatRupiah(item.hargaSatuan)}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-800 whitespace-nowrap">{formatRupiah(item.totalHarga)}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                        <button className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-gray-400 transition-colors">Lihat Detail</button>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50/30 whitespace-nowrap">{item.kondisi.bagus}</td>
                    <td className="px-4 py-3 text-center font-bold text-yellow-600 bg-yellow-50/30 whitespace-nowrap">{item.kondisi.diperbaiki}</td>
                    <td className="px-4 py-3 text-center font-bold text-red-600 bg-red-50/30 whitespace-nowrap">{item.kondisi.rusak}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit"><IoPencil size={18} /></button>
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
      </div>

      {/* MODAL TAMBAH SPESIFIKASI */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="600px">
        <FormTambahSpesifikasi 
          onClose={() => setIsModalOpen(false)} 
          onSimpan={handleSimpanSpesifikasi} 
        />
      </Modal>

    </div>
  );
}
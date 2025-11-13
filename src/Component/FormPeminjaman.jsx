// src/Component/FormPeminjaman.jsx

import React from "react";
// Import ikon-ikon baru
import { IoCalendarOutline, IoCloudUploadOutline, IoClose } from "react-icons/io5";

function FormPeminjaman({ onClose }) {

  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Data Peminjaman Disimpan!");
    // Nanti di sini logika simpan datanya...
    onClose(); // Tutup modal setelah simpan
  };

  return (
    // Kita buat form-nya sedikit lebih lebar (600px) agar muat 2 kolom upload
    <form onSubmit={handleSimpan} style={{width: "550px"}}> 
      
      {/* Header Form dengan Tombol Close 'X' */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Peminjaman Barang</h2>
        <button
          type="button"
          onClick={onClose} 
          className="text-gray-400 hover:text-red-600 bg-red-100 hover:bg-red-200 rounded-full p-1 transition-colors"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      {/* Input Tanggal Peminjaman (dengan Ikon) */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Tanggal Peminjaman
        </label>
        <input
          type="text" // Tipe 'text' agar placeholder terlihat
          placeholder="Pilih Tanggal"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          // Trik: ubah jadi 'date' saat diklik
          onFocus={(e) => (e.target.type = "date")}
          // Kembalikan ke 'text' jika diklik tapi tidak diisi
          onBlur={(e) => { if(!e.target.value) e.target.type = "text"} } 
          required
        />
        <IoCalendarOutline className="absolute right-4 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Input ID Barang */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> ID Barang
        </label>
        <input
          type="text"
          placeholder="Masukkan ID Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      
      {/* Input Spesifikasi */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Spesifikasi
        </label>
        <input
          type="text"
          placeholder="Masukkan Spesifikasi Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      
      {/* Input Jumlah Barang */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Jumlah Barang
        </label>
        <input
          type="number"
          placeholder="Masukkan Jumlah Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Input Unit/Bagian */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Unit/Bagian
        </label>
        <input
          type="text"
          placeholder="Masukkan Unit/Bagian"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* File Uploads (2 Kolom) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Surat Peminjaman */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Surat Peminjaman
          </label>
          <div className="w-full flex justify-center items-center px-6 py-10
                        rounded-lg bg-blue-50 border-2 border-dashed border-blue-200
                        text-blue-500 hover:bg-blue-100 cursor-pointer">
            <div className="text-center">
              <IoCloudUploadOutline className="w-10 h-10 mx-auto" />
              <p className="mt-2 font-semibold">Upload File</p>
              <p className="text-xs text-gray-500 mt-1">Format: PDF, maksimal 5MB</p>
            </div>
          </div>
        </div>
        
        {/* Tanda Terima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Tanda Terima
          </label>
          <div className="w-full flex justify-center items-center px-6 py-10
                        rounded-lg bg-blue-50 border-2 border-dashed border-blue-200
                        text-blue-500 hover:bg-blue-100 cursor-pointer">
            <div className="text-center">
              <IoCloudUploadOutline className="w-10 h-10 mx-auto" />
              <p className="mt-2 font-semibold">Upload File</p>
              <p className="text-xs text-gray-500 mt-1">Format: PDF, maksimal 5MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Batal & Simpan */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose} 
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold
                     hover:bg-red-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit" 
          className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold
                     hover:bg-gray-800 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormPeminjaman;
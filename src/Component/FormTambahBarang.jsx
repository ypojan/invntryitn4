// src/Component/FormTambahBarang.jsx

import React from "react";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5"; // Import ikon

// Komponen ini menerima prop `onClose` agar tombol "Batal"
// bisa memberi tahu `MasterData.jsx` untuk menutup modal
function FormTambahBarang({ onClose }) {
  
  const handleSimpan = (e) => {
    e.preventDefault();
    alert("Data Disimpan!");
    // Nanti di sini logika simpan datanya...
    onClose(); // Tutup modal setelah simpan
  };

  return (
    <form onSubmit={handleSimpan}>
      {/* Header Form dengan Tombol Close */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tambah Data Barang</h2>
        <button
          type="button"
          onClick={onClose} // Tombol close merah
          className="text-gray-400 hover:text-red-600 bg-red-100 hover:bg-red-200 rounded-full p-1 transition-colors"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      {/* Input Nama Barang */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Nama Barang
        </label>
        <input
          type="text"
          placeholder="Masukkan Nama Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Upload Gambar */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Upload Gambar
        </label>
        <div className="w-full flex justify-center items-center px-6 py-10
                      rounded-lg bg-blue-50 border-2 border-dashed border-blue-200
                      text-blue-500 hover:bg-blue-100 cursor-pointer">
          <div className="text-center">
            <IoCloudUploadOutline className="w-10 h-10 mx-auto" />
            <p className="mt-2 font-semibold">Upload Gambar</p>
            <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, maksimal 2MB</p>
          </div>
        </div>
      </div>

      {/* Tombol Batal & Simpan */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose} // Tombol Batal
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold
                     hover:bg-red-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit" // Tombol Simpan
          className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold
                     hover:bg-gray-800 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormTambahBarang;
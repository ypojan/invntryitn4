// src/Component/FormTambahBarang.jsx

import React from "react";

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
          className="text-gray-400 hover:text-gray-600 bg-red-100 hover:bg-red-200 rounded-full p-1"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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

      {/* ================================================================
          PERUBAHAN BAGIAN UPLOAD GAMBAR (DESAIN SIMPEL)
          ================================================================
      */}
      <div className="mb-8">
        {/* Label "Upload Gambar" */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Upload Gambar
        </label>

        {/* Tombol "Upload Gambar" yang baru */}
        {/* Kita gunakan <label> yang di-style seperti tombol.
          'htmlFor' menyambungkannya ke <input type="file"> di bawah.
          Saat label ini diklik, otomatis input file akan terbuka.
        */}
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 px-4 py-2 
                     bg-white border border-gray-300 rounded-lg 
                     text-sm font-medium text-gray-700 
                     cursor-pointer hover:bg-gray-50"
        >
          {/* Ikon Upload (sesuai gambar) */}
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <span>Upload Gambar</span>
        </label>

        {/* Input file yang asli, kita sembunyikan */}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="hidden"
          // Nanti bisa tambahkan onChange handler di sini
        />

        {/* Teks format */}
        <p className="text-xs text-gray-500 mt-2">
          Format: JPG, PNG, maksimal 2MB
        </p>
      </div>
      {/* ================================================================
          AKHIR PERUBAHAN
          ================================================================
      */}

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
// src/Component/FormTambahSpesifikasi.jsx

import React, { useState } from "react";
import { IoClose, IoCloudUploadOutline, IoCalendarOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function FormTambahSpesifikasi({ onClose, onSimpan }) {
  const [formData, setFormData] = useState({
    tanggal: "",
    idBarang: "",
    spesifikasi: "",
    jumlah: "",
    hargaSatuan: "",
    totalHarga: "",
    kondisi: "bagus", // default
    gambar: null,
    kwitansi: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi Sederhana
    if (!formData.idBarang || !formData.spesifikasi) {
      Swal.fire("Gagal", "Mohon lengkapi data wajib (ID & Spesifikasi)", "error");
      return;
    }
    
    // Kirim data ke parent (DetailBarang)
    onSimpan(formData);
    onClose();
    Swal.fire("Berhasil", "Data spesifikasi berhasil ditambahkan", "success");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Tambah Spesifikasi</h2>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-500">
          <IoClose size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto pr-2">
        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Tanggal Pembelian
          </label>
          <div className="relative">
            <input 
              type="date" 
              name="tanggal" 
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
            />
            <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* ID Barang */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> ID Barang
          </label>
          <input 
            type="text" 
            name="idBarang" 
            value={formData.idBarang}
            onChange={handleChange}
            placeholder="Masukkan ID Barang"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
          />
        </div>

        {/* Spesifikasi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Spesifikasi
          </label>
          <input 
            type="text" 
            name="spesifikasi" 
            value={formData.spesifikasi}
            onChange={handleChange}
            placeholder="Masukkan Spesifikasi Barang"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
          />
        </div>

        {/* Jumlah */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Jumlah Barang
          </label>
          <input 
            type="number" 
            name="jumlah" 
            value={formData.jumlah}
            onChange={handleChange}
            placeholder="Masukkan Jumlah Barang"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
          />
        </div>

        {/* Harga & Total (Grid 2 Kolom) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Harga Satuan
            </label>
            <input 
              type="number" 
              name="hargaSatuan" 
              value={formData.hargaSatuan}
              onChange={handleChange}
              placeholder="Masukkan Harga"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Harga
            </label>
            <input 
              type="number" 
              name="totalHarga" 
              value={formData.totalHarga}
              onChange={handleChange}
              placeholder="Total Harga"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              readOnly 
            />
          </div>
        </div>

        {/* Kondisi Barang */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Kondisi Barang
          </label>
          <div className="flex gap-4">
            {['bagus', 'diperbaiki', 'rusak'].map(kondisi => (
              <label key={kondisi} className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="kondisi" 
                  value={kondisi}
                  checked={formData.kondisi === kondisi}
                  onChange={handleChange}
                  className="peer hidden"
                />
                <div className="text-center py-2 border rounded-lg bg-blue-50/50 peer-checked:bg-blue-600 peer-checked:text-white capitalize transition-all">
                  {kondisi}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Uploads (Grid 2 Kolom) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Upload Gambar
            </label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/30 cursor-pointer hover:bg-blue-50 transition-colors">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'gambar')} accept="image/*" />
              <IoCloudUploadOutline size={24} className="text-blue-500 mb-1" />
              <span className="text-xs text-gray-500 text-center px-2">
                {formData.gambar ? formData.gambar.name : "Upload Gambar"}
              </span>
            </label>
            <p className="text-[10px] text-gray-400 mt-1">Format: JPG, PNG, max 2MB</p>
          </div>

          {/* Upload Kwitansi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Upload Kwitansi
            </label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/30 cursor-pointer hover:bg-blue-50 transition-colors">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'kwitansi')} accept="application/pdf,image/*" />
              <IoCloudUploadOutline size={24} className="text-blue-500 mb-1" />
              <span className="text-xs text-gray-500 text-center px-2">
                {formData.kwitansi ? formData.kwitansi.name : "Upload File/Gambar"}
              </span>
            </label>
            <p className="text-[10px] text-gray-400 mt-1">Format: PDF, PNG, max 2MB</p>
          </div>
        </div>
      </div>

      {/* Footer Tombol */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
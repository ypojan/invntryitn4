// src/Component/FormTambahSpesifikasi.jsx

import React, { useState, useEffect } from "react";
import { IoClose, IoCloudUploadOutline, IoCalendarOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function FormTambahSpesifikasi({ onClose, onSimpan }) {
  const [formData, setFormData] = useState({
    tanggal: "",
    idBarang: "",
    spesifikasi: "",
    jumlah: "",
    hargaSatuan: "", // Simpan angka murni di sini
    hargaSatuanDisplay: "", // Untuk tampilan Rp
    totalHarga: "",
    kondisi: "bagus", 
    gambar: null,
    kwitansi: null
  });

  // Helper Format Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Helper Parsing Rupiah ke Angka Murni
  const parseRupiah = (rupiahString) => {
    return parseInt(rupiahString.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // Efek Samping: Hitung Total Harga Otomatis
  useEffect(() => {
    const qty = parseInt(formData.jumlah) || 0;
    const price = parseInt(formData.hargaSatuan) || 0;
    
    if (qty > 0 && price > 0) {
      const total = qty * price;
      setFormData(prev => ({ ...prev, totalHarga: total }));
    } else {
      setFormData(prev => ({ ...prev, totalHarga: "" }));
    }
  }, [formData.jumlah, formData.hargaSatuan]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Logika Khusus untuk Jumlah Barang (Bilangan Asli > 0)
    if (name === "jumlah") {
      // Hanya izinkan angka, tidak boleh 0 atau negatif di awal
      if (value === "0" || value.includes("-")) return; 
      
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler Khusus Harga (Format Rupiah saat mengetik)
  const handleHargaChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = parseRupiah(rawValue);
    
    setFormData(prev => ({
      ...prev,
      hargaSatuan: numericValue,
      hargaSatuanDisplay: formatRupiah(numericValue)
    }));
  };

  const handleFileChange = (e, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.idBarang || !formData.spesifikasi || !formData.jumlah || !formData.hargaSatuan) {
      Swal.fire({
        title: "Data Belum Lengkap!",
        text: "Mohon lengkapi semua field yang wajib diisi",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Oke",
        buttonsStyling: false,
        customClass: { confirmButton: "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"}
      });
      return;
    }
    
    onSimpan(formData);
    onClose();
    Swal.fire({
        title: "Berhasil!",
        text: "Data barang baru berhasil ditambahkan.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
  };

  return (
    // Tambahkan padding px-6 agar konten tidak mepet/terpotong di kiri-kanan
    <form onSubmit={handleSubmit} className="p-4 px-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Tambah Spesifikasi</h2>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
          <IoClose size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white shadow-sm"
            />
            {/* Ikon kalender (opsional, browser modern sudah punya ikon date picker sendiri) */}
            {/* <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white shadow-sm"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white shadow-sm"
          />
        </div>

        {/* Jumlah Barang (Bilangan Asli) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500">*</span> Jumlah Barang
          </label>
          <input 
            type="number" 
            name="jumlah" 
            min="1" // Minimal 1
            step="1" // Kelipatan 1 (bulat)
            value={formData.jumlah}
            onChange={handleChange}
            placeholder="Masukkan Jumlah (Min. 1)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white shadow-sm"
            onKeyDown={(e) => {
              // Mencegah input karakter -, +, e, . (agar tetap integer positif)
              if (["-", "+", "e", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>

        {/* Harga & Total (Grid 2 Kolom) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Harga Satuan (Format Rupiah) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Harga Satuan
            </label>
            <input 
              type="text" // Type text agar bisa format Rp
              name="hargaSatuanDisplay" 
              value={formData.hargaSatuanDisplay}
              onChange={handleHargaChange}
              placeholder="Rp 0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white shadow-sm"
            />
          </div>

          {/* Total Harga (Otomatis & ReadOnly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Harga
            </label>
            <input 
              type="text" 
              value={formatRupiah(formData.totalHarga)}
              readOnly 
              placeholder="Rp 0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm font-semibold"
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
              <label key={kondisi} className="flex-1 cursor-pointer group">
                <input 
                  type="radio" 
                  name="kondisi" 
                  value={kondisi}
                  checked={formData.kondisi === kondisi}
                  onChange={handleChange}
                  className="peer hidden"
                />
                <div className="text-center py-2 border border-gray-300 rounded-lg bg-white 
                                peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                                group-hover:bg-gray-50 capitalize transition-all shadow-sm">
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
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/20 cursor-pointer hover:bg-blue-50 transition-colors">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'gambar')} accept="image/*" />
              <IoCloudUploadOutline size={28} className="text-blue-500 mb-1" />
              <span className="text-xs text-gray-600 text-center px-2 font-medium truncate max-w-full">
                {formData.gambar ? formData.gambar.name : "Pilih Gambar"}
              </span>
            </label>
            <p className="text-[10px] text-gray-400 mt-1 text-center">JPG, PNG (Max 2MB)</p>
          </div>

          {/* Upload Kwitansi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Upload Kwitansi
            </label>
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/20 cursor-pointer hover:bg-blue-50 transition-colors">
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'kwitansi')} accept="application/pdf,image/*" />
              <IoCloudUploadOutline size={28} className="text-blue-500 mb-1" />
              <span className="text-xs text-gray-600 text-center px-2 font-medium truncate max-w-full">
                {formData.kwitansi ? formData.kwitansi.name : "Pilih File"}
              </span>
            </label>
            <p className="text-[10px] text-gray-400 mt-1 text-center">PDF, PNG (Max 2MB)</p>
          </div>
        </div>
      </div>

      {/* Footer Tombol */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-md active:scale-95"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-colors shadow-md active:scale-95"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
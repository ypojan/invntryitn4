// src/Component/FormPengembalian.jsx

import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoCalendarOutline, IoCloudUploadOutline, IoClose, IoDocumentAttachOutline } from "react-icons/io5";

function FormPengembalian({ onClose, onSimpan }) {
  const [formData, setFormData] = useState({
    tanggal: "",
    idBarang: "",
    spesifikasi: "",
    jumlah: "",
    unit: "",
    suratFile: null,
    tandaTerimaFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        Swal.fire("Gagal", "Ukuran file maksimal 2MB!", "error");
        e.target.value = null; 
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi Bilangan Asli
    const jumlahInt = parseInt(formData.jumlah);
    if (!jumlahInt || jumlahInt < 1) {
      Swal.fire("Validasi Error", "Jumlah barang harus minimal 1 (bilangan asli).", "warning");
      return;
    }

    const [y, m, d] = formData.tanggal.split("-");
    const formattedDate = `${d}/${m}/${y}`;

    const newData = {
      id: formData.idBarang,
      tanggal: formattedDate,
      spesifikasi: formData.spesifikasi,
      jumlah: jumlahInt,
      unit: formData.unit,
      suratFile: formData.suratFile,
      tandaTerimaFile: formData.tandaTerimaFile
    };

    onSimpan(newData);
  };

  return (
    <form onSubmit={handleSubmit} style={{width: "550px"}}> 
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pengembalian Barang</h2>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-600 bg-red-100 hover:bg-red-200 rounded-full p-1 transition-colors">
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Tanggal Pengembalian
        </label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          required
        />
        <IoCalendarOutline className="absolute right-4 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> ID Barang
        </label>
        <input
          type="text"
          name="idBarang"
          value={formData.idBarang}
          onChange={handleChange}
          placeholder="Masukkan ID Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Spesifikasi
        </label>
        <input
          type="text"
          name="spesifikasi"
          value={formData.spesifikasi}
          onChange={handleChange}
          placeholder="Masukkan Spesifikasi Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Jumlah Barang
        </label>
        <input
          type="number"
          name="jumlah"
          min="1"
          value={formData.jumlah}
          onChange={handleChange}
          placeholder="Masukkan Jumlah Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="text-red-500">*</span> Unit/Bagian
        </label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Masukkan Unit/Bagian"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Surat Pengembalian
          </label>
          <label className="w-full flex flex-col justify-center items-center px-4 py-6 rounded-lg bg-blue-50 border-2 border-dashed border-blue-200 text-blue-500 hover:bg-blue-100 cursor-pointer transition-colors h-32 relative">
             <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, "suratFile")} />
             {formData.suratFile ? (
               <div className="text-center text-green-600">
                 <IoDocumentAttachOutline className="w-8 h-8 mx-auto mb-1"/>
                 <p className="text-xs font-bold break-all line-clamp-2">{formData.suratFile.name}</p>
                 <p className="text-[10px] text-gray-500">Klik untuk ganti</p>
               </div>
             ) : (
               <div className="text-center">
                 <IoCloudUploadOutline className="w-8 h-8 mx-auto" />
                 <p className="mt-2 font-semibold text-sm">Upload File</p>
                 <p className="text-[10px] text-gray-500 mt-1">PDF, Max 2MB</p>
               </div>
             )}
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500">*</span> Tanda Terima
          </label>
          <label className="w-full flex flex-col justify-center items-center px-4 py-6 rounded-lg bg-blue-50 border-2 border-dashed border-blue-200 text-blue-500 hover:bg-blue-100 cursor-pointer transition-colors h-32 relative">
             <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, "tandaTerimaFile")} />
             {formData.tandaTerimaFile ? (
               <div className="text-center text-green-600">
                 <IoDocumentAttachOutline className="w-8 h-8 mx-auto mb-1"/>
                 <p className="text-xs font-bold break-all line-clamp-2">{formData.tandaTerimaFile.name}</p>
                 <p className="text-[10px] text-gray-500">Klik untuk ganti</p>
               </div>
             ) : (
               <div className="text-center">
                 <IoCloudUploadOutline className="w-8 h-8 mx-auto" />
                 <p className="mt-2 font-semibold text-sm">Upload File</p>
                 <p className="text-[10px] text-gray-500 mt-1">PDF, Max 2MB</p>
               </div>
             )}
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
          Batal
        </button>
        <button type="submit" className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors">
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormPengembalian;
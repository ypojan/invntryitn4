import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { X, Upload } from "lucide-react";

function FormTambahBarang({ onClose }) {
  const { addInventoryItem } = useContext(AppContext);

  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !gambar) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      addInventoryItem({
        title: nama,
        image: reader.result,
      });
      onClose();
    };
    reader.readAsDataURL(gambar);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Tambah Data Barang
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        >
          <X size={20} />
        </button>
      </div>

      {/* INPUT NAMA */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          <span className="text-red-500">*</span> Nama Barang
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan Nama Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* UPLOAD GAMBAR */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-700">
          <span className="text-red-500">*</span> Upload Gambar
        </label>

        <label className="w-full flex justify-center items-center px-6 py-10
                          rounded-lg bg-blue-50 border-2 border-dashed border-blue-200
                          text-blue-500 hover:bg-blue-100 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setGambar(e.target.files[0])}
          />
          <div className="text-center">
            <Upload size={40} className="mx-auto" />
            <p className="mt-2 font-semibold">
              {gambar ? gambar.name : "Upload Gambar"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Format JPG / PNG
            </p>
          </div>
        </label>
      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormTambahBarang;

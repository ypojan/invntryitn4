import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2";
import {
  IoClose,
  IoCloudUploadOutline,
  IoDocumentAttachOutline,
} from "react-icons/io5";

function FormTambahBarang({ onClose }) {
  const { addInventoryItem } = useContext(AppContext);

  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !gambar) {
      Swal.fire({
        title: "Data Belum Lengkap!",
        text: "Harap isi nama barang dan upload gambar",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Oke",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors",
        },
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      addInventoryItem({
        title: nama,
        image: reader.result,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Data barang baru berhasil ditambahkan.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    };
    reader.readAsDataURL(gambar);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tambah Data Barang</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* INPUT NAMA */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Nama Barang
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan Nama Barang"
          className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
      </div>

      {/* UPLOAD GAMBAR */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-700">
          Upload Gambar
        </label>

        <label
          className={`w-full flex justify-center items-center px-6 py-10 rounded-lg border-2 border-dashed cursor-pointer transition-colors h-40 relative
          ${
            gambar
              ? "bg-green-50 border-green-300"
              : "bg-blue-50 border-blue-200 hover:bg-blue-100"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setGambar(e.target.files[0])}
          />

          {gambar ? (
            <div className="text-center text-green-600 animate-in fade-in zoom-in duration-300">
              <IoDocumentAttachOutline className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm font-bold break-all line-clamp-2 px-2">
                {gambar.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Klik untuk ganti gambar
              </p>
            </div>
          ) : (
            <div className="text-center">
              <IoCloudUploadOutline
                size={40}
                className="mx-auto text-blue-500 mb-2"
              />
              <p className="mt-2 font-semibold text-gray-600">
                Klik untuk Upload Gambar
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Format JPG / PNG (Maks. 2MB)
              </p>
            </div>
          )}
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

export default FormTambahBarang;

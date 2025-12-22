import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { X } from "lucide-react";

export default function FormEditBarang({ data, onClose }) {
  const { updateInventoryItem } = useContext(AppContext);

  const [nama, setNama] = useState(data.title);
  const [gambar, setGambar] = useState(data.image);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateInventoryItem(data.id, {
      title: nama,
      image: gambar,
    });

    onClose();
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setGambar(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Data Barang</h2>
        <button type="button" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="mb-4">
        <label className="font-medium">Nama Barang</label>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mt-2"
          required
        />
      </div>

      <div className="mb-6">
        <label className="font-medium">Gambar</label>
        <input
          type="file"
          accept="image/*"
          className="block mt-2"
          onChange={(e) => handleImageChange(e.target.files[0])}
        />
        {gambar && (
          <img
            src={gambar}
            alt="preview"
            className="mt-3 w-32 h-32 object-contain border rounded"
          />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

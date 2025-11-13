import React, { useState, useContext } from "react"; 
import { AppContext } from "../Context/AppContext"; 

import { 
  IoSearchOutline, 
  IoCalendarOutline, 
  IoPrintOutline, 
  IoAdd, 
  IoPencil, 
  IoTrashOutline, 
  IoArrowBack,
  IoChevronBack,
  IoChevronForward
} from "react-icons/io5";

import Modal from "./common/Modal"; 
import FormPengembalian from "./FormPengembalian.jsx"; 

const initialData = [
  {
    id: "01111",
    tanggal: "04/01/2025",
    spesifikasi: "MSI Stealth A16 Mercedes",
    jumlah: 1,
    unit: "Kepala Sub Bagian HPS",
  },
  {
    id: "01112",
    tanggal: "05/01/2025",
    spesifikasi: "Lenovo Yoga",
    jumlah: 3,
    unit: "Pengadaan dan TI",
  },
];


export default function Pengembalian() {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");

  // 1. TAMBAHKAN STATE BARU INI
  // State ini akan melacak apakah input tanggal kita sedang mode 'text' (untuk placeholder)
  // atau mode 'date' (saat diklik)
  const [dateInputType, setDateInputType] = useState("text");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setRoute } = useContext(AppContext);

  // ... (semua fungsi-fungsi helper-mu tetap di sini) ...
  const filtered = data.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q && !date) return true;
    const matchQ =
      r.id.toLowerCase().includes(q) ||
      r.spesifikasi.toLowerCase().includes(q) ||
      r.unit.toLowerCase().includes(q);
    const matchDate = date ? r.tanggal === formatDateInputToDisplay(date) : true;
    return matchQ && matchDate;
  });

  function formatDateInputToDisplay(value) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }

  function handleEdit(row) {
    alert(`Edit: ${row.id}`);
  }
  function handleDelete(row) {
    if (!confirm(`Hapus data ${row.id} ?`)) return;
    setData((prev) => prev.filter((p) => p.id !== row.id));
  }
  function handleViewSurat(row) {
    alert(`Lihat detail surat untuk ${row.id}\nSpesifikasi: ${row.spesifikasi}`);
  }
  function handleViewTandaTerima(row) {
    alert(`Lihat tanda terima untuk ${row.id}`);
  }
  function submitSearch() {
    document.getElementById("search-input")?.blur();
  }
  function focusDatePicker() {
    const el = document.getElementById("date-input");
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
  }


  return (
    <>
      <header className="mb-6 flex items-center gap-4">
        {/* ... (kode header tetap sama) ... */}
        <button 
          onClick={() => setRoute("dashboard")} 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Kembali ke Dashboard"
        >
          <IoArrowBack className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 py-2">
          Pengembalian Barang
        </h1>
      </header>

      <section>
        {/* Filter & Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          
          {/* Filter (Kiri) */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            {/* --- 2. MODIFIKASI BLOK INPUT TANGGAL INI --- */}
            <div className="relative">
              <input
                id="date-input"
                type={dateInputType} // Gunakan state untuk 'type'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy" // Tambahkan placeholder di sini
                
                // Saat di-klik, ubah type jadi 'date'
                onFocus={() => setDateInputType("date")} 
                
                // Saat fokus hilang, cek apakah ada isinya
                onBlur={() => {
                  // Jika 'date' (dari state) kosong, kembalikan ke type "text"
                  // agar placeholder-nya muncul lagi
                  if (!date) {
                    setDateInputType("text");
                  }
                }}
                
                className="w-48 appearance-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={focusDatePicker}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-gray-100"
                aria-label="Pilih Tanggal"
              >
                <IoCalendarOutline className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {/* --- BATAS MODIFIKASI --- */}

            <div className="relative flex-1 md:flex-none">
              {/* ... (kode input search tetap sama) ... */}
              <input
                id="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari Spesifikasi..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                }}
                aria-label="Cari Spesifikasi"
              />
              <button
                onClick={submitSearch}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400"
                aria-label="Cari"
                type="button"
              >
                <IoSearchOutline className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tombol Aksi (Kanan) */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* ... (kode tombol-tombol aksi tetap sama) ... */}
            <button
              className="w-1/2 md:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                         bg-gradient-to-r from-blue-600 to-blue-700 text-white
                         hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105
                         relative overflow-hidden group"
              onClick={() => alert("Cetak laporan (placeholder)")}
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <IoPrintOutline className="w-5 h-5 relative z-10" /> 
              <span className="font-semibold text-sm relative z-10">Cetak Laporan</span> 
            </button>
            
            <button
              className="w-1/2 md:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                         bg-gradient-to-r from-blue-600 to-blue-700 text-white
                         hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105
                         relative overflow-hidden group" 
              onClick={() => setIsModalOpen(true)} 
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <IoAdd className="w-5 h-5 relative z-10" /> 
              <span className="font-semibold text-sm relative z-10">Pengembalian Barang</span>
            </button>
          </div>
        </div>

        
        {/* Tabel */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {/* ... (kode tabel tetap sama) ... */}
          <table className="min-w-full">
            <thead className="bg-slate-700 text-sm text-white uppercase">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Tanggal Pengembalian</th>
                <th className="px-6 py-3 text-left font-semibold">ID Barang</th>
                <th className="px-6 py-3 text-left font-semibold">Spesifikasi</th>
                <th className="px-6 py-3 text-left font-semibold">Jumlah</th>
                <th className="px-6 py-3 text-left font-semibold">Unit/Bagian</th>
                <th className="px-6 py-3 text-left font-semibold">Surat Pengembalian</th>
                <th className="px-6 py-3 text-left font-semibold">Tanda Terima</th>
                <th className="px-6 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800 divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{row.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{row.spesifikasi}</td>
                    <td className="px-6 py-4">{row.jumlah}</td>
                    <td className="px-6 py-4">{row.unit}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => handleViewSurat(row)}>
                        Lihat Detail
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => handleViewTandaTerima(row)}>
                        Lihat Detail
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button className="p-2 rounded-full text-blue-600 hover:bg-blue-100" onClick={() => handleEdit(row)} title="Edit">
                          <IoPencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full text-red-600 hover:bg-red-100" onClick={() => handleDelete(row)} title="Hapus">
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <footer className="flex justify-end items-center mt-4">
          {/* ... (kode pagination tetap sama) ... */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50" disabled>
              <IoChevronBack className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
              1
            </span>
            <button className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50" disabled>
              <IoChevronForward className="w-5 h-5" />
            </button>
          </div>
        </footer>

      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="612px">
        <FormPengembalian onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
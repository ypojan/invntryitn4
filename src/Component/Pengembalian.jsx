import React, { useState } from "react";


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


function IconSearch() {
  return (
    <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 3a7.5 7.5 0 105.303 12.803l4.197 4.197a1 1 0 001.414-1.414l-4.197-4.197A7.5 7.5 0 0010.5 3zm0 2a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="16" rx="2" ry="2" strokeWidth="1.5"></rect>
      <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}
function IconPrint() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18h12v-7H6v7zM6 14H4a2 2 0 01-2-2V7a2 2 0 012-2h2" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg className="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20l6-1 9-9-5-5-9 9L4 20z" />
    </svg>
  );
}
function IconDelete() {
  return (
    <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

export default function Pengembalian() {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");


  const fixedWidth = "w-40";

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
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-black py-2">
          Pengembalian Barang
        </h1>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  id="date-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="appearance-none px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm pr-10"
                  title="Pilih Tanggal"
                />
                <button
                  type="button"
                  onClick={focusDatePicker}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-slate-100"
                  aria-label="Pilih Tanggal"
                  title="Pilih Tanggal"
                >
                  <IconCalendar />
                </button>
              </div>

              
            </div>

            
            <div className="flex flex-col md:items-end gap-3">
             
              <div className={`${fixedWidth}`}>
                <div className="relative">
                  <input
                    id="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari Spesifikasi"
                    className={`w-full pr-9 pl-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitSearch();
                    }}
                    aria-label="Cari Spesifikasi"
                  />
                  <button
                    onClick={submitSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-slate-100 z-20"
                    aria-label="Cari"
                    title="Cari"
                    type="button"
                  >
                    <IconSearch />
                  </button>
                </div>
              </div>

              
              <div className="flex gap-3">
                <button
                  className={`${fixedWidth} px-0 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-sm`}
                  onClick={() => alert("Cetak laporan (placeholder)")}
                  type="button"
                >
                  <IconPrint /> <span className="font-medium text-sm">Cetak Laporan</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                </button>

                <button
                  className={`${fixedWidth} px-0 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-sm`}
                  onClick={() => alert("Tambah Pengembalian (placeholder)")}
                  type="button"
                >
                  <IconPlus /> <span className="font-medium text-sm hidden md:inline">Pengembalian Barang</span>
                </button>
              </div>
            </div>
          </div>

          
          <div className="mt-6 bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 text-sm text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">Tanggal Pengembalian</th>
                  <th className="px-6 py-3 text-left">ID Barang</th>
                  <th className="px-6 py-3 text-left">Spesifikasi</th>
                  <th className="px-6 py-3 text-left">Jumlah Barang</th>
                  <th className="px-6 py-3 text-left">Unit/Bagian</th>
                  <th className="px-6 py-3 text-left">Surat Pengembalian</th>
                  <th className="px-6 py-3 text-left">Tanda Terima</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-800 divide-y">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4">{row.tanggal}</td>
                      <td className="px-6 py-4">{row.id}</td>
                      <td className="px-6 py-4">{row.spesifikasi}</td>
                      <td className="px-6 py-4">{row.jumlah}</td>
                      <td className="px-6 py-4">{row.unit}</td>
                      <td className="px-6 py-4">
                        <button className="text-sky-600 underline text-sm" onClick={() => handleViewSurat(row)}>
                          Lihat Detail
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sky-600 underline text-sm" onClick={() => handleViewTandaTerima(row)}>
                          Lihat Detail
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button className="p-2 rounded hover:bg-slate-100" onClick={() => handleEdit(row)} title="Edit">
                            <IconEdit />
                          </button>
                          <button className="p-2 rounded hover:bg-slate-100" onClick={() => handleDelete(row)} title="Hapus">
                            <IconDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
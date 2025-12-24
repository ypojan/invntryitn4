import React, { useState, useContext, useEffect } from "react"; 
import { AppContext } from "../Context/AppContext"; 
import Swal from "sweetalert2"; 
import { 
  IoSearchOutline, 
  IoCalendarOutline, 
  IoPrintOutline, 
  IoAdd, 
  IoPencil, 
  IoTrashOutline, 
  IoArrowBack,
  IoChevronBack,
  IoChevronForward,
  IoDocumentTextOutline
} from "react-icons/io5";
import Modal from "./common/Modal"; 
import FormPeminjaman from "./FormPeminjaman.jsx"; 

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

export default function Peminjaman() {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [dateInputType, setDateInputType] = useState("text");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setRoute } = useContext(AppContext);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // FILTER DATA
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

  // PAGINATION LOGIC 
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query, date]);

  function formatDateInputToDisplay(value) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }

  // FUNGSI TAMBAH DATA BARU
  const handleSimpanData = (newData) => {
    // Tambahkan ke state data paling atas
    setData(prev => [newData, ...prev]);
    
    Swal.fire({
      title: "Berhasil!",
      text: "Data peminjaman berhasil ditambahkan.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
    setIsModalOpen(false);
  };

  function handleEdit(row) {
    Swal.fire("Info", "Fitur edit segera hadir!", "info");
  }

  function handleDelete(row) {
    Swal.fire({
      title: "Yakin hapus?",
      text: `Data ${row.spesifikasi} akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: 'rounded-2xl p-6',
        confirmButton: 'bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 mx-2',
        cancelButton: 'bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 mx-2'
      },
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((p) => p.id !== row.id));
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    });
  }

  function handleViewSurat(row) {
    if(row.suratFile){
        // Jika ada file
        const fileName = row.suratFile.name || "File Surat";
        Swal.fire("Surat Peminjaman", `File: ${fileName}`, "info");
    } else {
        Swal.fire("Surat Peminjaman", `Detail surat ID: ${row.id}`, "info");
    }
  }

  function handleViewTandaTerima(row) {
    if(row.tandaTerimaFile){
        const fileName = row.tandaTerimaFile.name || "File Tanda Terima";
        Swal.fire("Tanda Terima", `File: ${fileName}`, "info");
    } else {
        Swal.fire("Tanda Terima", `Bukti tanda terima ID: ${row.id}`, "info");
    }
  }

  function submitSearch() { document.getElementById("search-input")?.blur(); }
  function focusDatePicker() {
    const el = document.getElementById("date-input");
    if (!el) return;
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
  }

  return (
    <>
      <header className="mb-6 flex items-center gap-4">
        <button onClick={() => setRoute("dashboard")} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <IoArrowBack className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 py-2">Peminjaman Barang</h1>
      </header>

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                id="date-input"
                type={dateInputType}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                onFocus={() => setDateInputType("date")} 
                onBlur={() => { if (!date) setDateInputType("text"); }}
                className="w-48 appearance-none px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={focusDatePicker} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-gray-100">
                <IoCalendarOutline className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="relative flex-1 md:flex-none">
              <input
                id="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari Spesifikasi..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => { if (e.key === "Enter") submitSearch(); }}
              />
              <button onClick={submitSearch} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400" type="button">
                <IoSearchOutline className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <button
              className="w-1/2 md:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
              onClick={() => Swal.fire("Info", "Fitur Cetak belum tersedia", "info")}
            >
              <IoPrintOutline className="w-5 h-5" /> 
              <span className="font-semibold text-sm">Cetak Laporan</span> 
            </button>
            
            <button
              className="w-1/2 md:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold 
                       shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800 
                       hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95 
                       relative overflow-hidden group" onClick={() => setIsModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div> 
               
            
              <IoAdd className="w-5 h-5" /> 
              <span className="font-semibold text-sm">Peminjaman Barang</span>
            </button>
          </div>
        </div>

        {/* TABEL */}
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full whitespace-nowrap">
              <thead className="bg-slate-700 text-sm text-white uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Tanggal Peminjaman</th>
                  <th className="px-6 py-4 text-left font-semibold">ID Barang</th>
                  <th className="px-6 py-4 text-left font-semibold">Spesifikasi</th>
                  <th className="px-6 py-4 text-left font-semibold">Jumlah</th>
                  <th className="px-6 py-4 text-left font-semibold">Unit/Bagian</th>
                  <th className="px-6 py-4 text-left font-semibold">Surat Peminjaman</th>
                  <th className="px-6 py-4 text-left font-semibold">Tanda Terima</th>
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800 divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">{row.tanggal}</td>
                      <td className="px-6 py-4">{row.id}</td>
                      <td className="px-6 py-4 max-w-xs truncate font-medium">{row.spesifikasi}</td>
                      <td className="px-6 py-4 font-bold">{row.jumlah}</td>
                      <td className="px-6 py-4">{row.unit}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => handleViewSurat(row)}>Lihat Detail</button>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm" onClick={() => handleViewTandaTerima(row)}>Lihat Detail</button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button className="p-2 rounded-full text-blue-600 hover:bg-blue-100" onClick={() => handleEdit(row)}><IoPencil className="w-4 h-4" /></button>
                          <button className="p-2 rounded-full text-red-600 hover:bg-red-100" onClick={() => handleDelete(row)}><IoTrashOutline className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400">
                        <div className="flex flex-col items-center">
                            <IoDocumentTextOutline className="w-12 h-12 mb-2 opacity-20"/>
                            <p>Tidak ada data peminjaman.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {filtered.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end items-center gap-4">
               <div className="flex items-center gap-2">
                  <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600"><IoChevronBack className="w-5 h-5" /></button>
                  <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold ">{currentPage} / {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-600"><IoChevronForward className="w-5 h-5" /></button>
                </div>
            </div>
          )}
        </div>
      </section>

      {/* MODAL dengan Props onSimpan */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="612px">
        <FormPeminjaman 
            onClose={() => setIsModalOpen(false)} 
            onSimpan={handleSimpanData} // Kirim fungsi simpan ke anak
        />
      </Modal>
    </>
  );
}
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { 
  IoArrowBack, IoSearchOutline, IoPrintOutline, IoAdd, 
  IoPencil, IoTrashOutline, IoDocumentTextOutline 
} from "react-icons/io5";

export default function DetailBarang() {
  const { setRoute, selectedCategory, detailBarangData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = detailBarangData.filter(item => 
    item.kategori === selectedCategory && 
    (item.spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* HEADER */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setRoute("dashboard")} 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Kembali ke Dashboard"
        >
          <IoArrowBack className="w-8 h-8 text-slate-800" />
        </button>
        <div>
            <h1 className="text-3xl font-bold text-slate-800">
            Detail Spesifikasi {selectedCategory}
            </h1>
        </div>
      </header>

      {/* FILTER & ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Kiri: Date & Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Date Picker Placeholder */}
           <div className="relative">
              <input 
                type="text" 
                placeholder="Pilih Tanggal" 
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 text-sm" 
                onFocus={(e)=>e.target.type='date'} 
                onBlur={(e)=>e.target.type='text'} 
              />
           </div>
           {/* Search Bar */}
           <div className="relative">
              <input 
                type="text" 
                placeholder="Cari Spesifikasi..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
              />
              <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
           </div>
        </div>

        {/* Kanan: Tombol Aksi */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all text-sm font-medium shadow-md">
            <IoPrintOutline className="w-4 h-4"/> Cetak Laporan
          </button>
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all text-sm font-medium shadow-md">
            <IoAdd className="w-4 h-4"/> Tambah Spesifikasi
          </button>
        </div>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead className="bg-slate-700 text-white uppercase tracking-wider">
                <tr>
                <th className="px-4 py-4 text-center font-semibold">Tanggal Pembelian</th>
                <th className="px-4 py-4 text-center font-semibold">ID Barang</th>
                <th className="px-4 py-4 text-left font-semibold">Spesifikasi</th>
                <th className="px-4 py-4 text-center font-semibold">Gambar</th>
                <th className="px-4 py-4 text-center font-semibold">Jumlah Barang</th>
                <th className="px-4 py-4 text-right font-semibold">Harga Satuan</th>
                <th className="px-4 py-4 text-right font-semibold">Total Harga</th>
                <th className="px-4 py-4 text-center font-semibold">Kwitansi</th>
                <th className="px-2 py-4 text-center font-semibold">Bagus</th>
                <th className="px-2 py-4 text-center font-semibold">Diperbaiki</th>
                <th className="px-2 py-4 text-center font-semibold ">Rusak</th>
                <th className="px-4 py-4 text-center font-semibold">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-center text-gray-600">{item.tanggal}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{item.spesifikasi}</td>
                    
                    <td className="px-4 py-3 text-center">
                        <div className="w-16 h-12 mx-auto bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                            <img src={item.gambar} alt="img" className="max-w-full max-h-full object-contain"/>
                        </div>
                    </td>
                    
                    <td className="px-4 py-3 text-center font-bold text-gray-700">{item.jumlah}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatRupiah(item.hargaSatuan)}</td>
                    <td className="px-4 py-3 text-right font-bold text-gray-800">{formatRupiah(item.totalHarga)}</td>
                    
                    <td className="px-4 py-3 text-center">
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-bold hover:bg-gray-300 transition-colors">
                            Lihat Detail
                        </button>
                    </td>
                    
                    {/* Kondisi Barang */}
                    <td className="px-2 py-3 text-center font-bold text-gray-700 bg-blue-50/50">{item.kondisi.bagus}</td>
                    <td className="px-2 py-3 text-center font-bold text-gray-700 bg-yellow-50/50">{item.kondisi.diperbaiki}</td>
                    <td className="px-2 py-3 text-center font-bold text-gray-700 bg-red-50/50">{item.kondisi.rusak}</td>
                    
                    <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                        <button className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors" title="Edit">
                            <IoPencil />
                        </button>
                        <button className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors" title="Hapus">
                            <IoTrashOutline />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="12" className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center">
                        <IoDocumentTextOutline className="w-12 h-12 mb-2 opacity-20"/>
                        <p>Belum ada data detail untuk {selectedCategory}.</p>
                    </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import {
  IoGridOutline,
  IoSwapHorizontalOutline,
  IoReturnDownBackOutline,
  IoTimeOutline,
  IoArrowBack,
  IoClose // Tambah icon close
} from "react-icons/io5";

// Terima prop isOpen dan onClose
function Sidebar({ isOpen, onClose }) {
  const { route, setRoute } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: IoGridOutline },
    { name: "Peminjaman", key: "peminjaman", icon: IoSwapHorizontalOutline },
    {
      name: "Pengembalian",
      key: "pengembalian",
      icon: IoReturnDownBackOutline,
    },
    { name: "History", key: "history", icon: IoTimeOutline },
  ];

  const handleMenuClick = (key) => {
    setRoute(key);
    // Tutup sidebar otomatis di mobile setelah klik menu
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* OVERLAY GELAP (Hanya Mobile) */}
      {/* Jika isOpen true, tampilkan background hitam transparan */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR CONTAINER */}
      <div 
        className={`bg-slate-700 text-white flex flex-col h-full w-64 
          transition-transform duration-300 ease-in-out z-40
          absolute md:relative top-0 left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header Sidebar (Hanya Mobile untuk tombol close) */}
        <div className="flex justify-between items-center p-4 md:hidden border-b border-slate-600">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu Utama */}
        <nav className="p-4 flex-1 overflow-y-auto mt-2 md:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  route === item.key
                    ? "bg-slate-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Aksi Sekunder */}
        <div className="p-4 border-t border-slate-600">
          <button
            onClick={() => setRoute("lobby")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition"
          >
            <IoArrowBack size={20} />
            <span className="text-sm font-medium">Pilih Modul</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import {
  LayoutDashboard,
  ArrowLeftRight,
  RotateCcw,
  History,
  ArrowLeft
} from "lucide-react";
function Sidebar() {
  const { route, setRoute } = useContext(AppContext);

  const menuItems = [
    // DASHBOARD
    { name: "Dashboard", key: "dashboard", icon: LayoutDashboard},
    // PEMINJAMAN
    { name: "Peminjaman", key: "peminjaman", icon: ArrowLeftRight },
    // PENGEMBALIAN
    { name: "Pengembalian", key: "pengembalian", icon: RotateCcw },
    // HISTORY
    { name: "History", key: "history", icon: History },
  ];

  return (
    <div className="w-64 h-full bg-slate-700 text-white flex flex-col">
       {/* Menu Utama */}
      <nav className="p-4 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setRoute(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                route === item.key
                  ? "bg-slate-600 text-white shadow-md"
                  : "text-slate-300 hover:bg-slate-600 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Aksi Sekunder */}
      <div className ="p-4 border-t border-slate-600">
        <button
        onClick={() => setRoute("lobby")}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Pilih Modul</span>
        </button>
        </div>
    </div>
  );
}

export default Sidebar;
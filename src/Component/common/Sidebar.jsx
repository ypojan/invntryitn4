
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import logoptpn4 from "../../assets/logoptpn4.png";

function Sidebar() {
  const { route, setRoute } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: "Input Spesifikasi",
      key: "input-spesifikasi",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Peminjaman",
      key: "peminjaman",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      name: "Pengembalian",
      key: "pengembalian",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
          />
        </svg>
      ),
    },
    {
      name: "History",
      key: "history",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-700 text-white sticky top-0 h-screen overflow-y-auto">
      {/* ==================================
          GARIS (border-b) SUDAH DIHAPUS DARI DIV INI
          ================================== 
      */}
      <div className="p-4 flex justify-center items-center">
        {/* Gunakan satu <img> untuk logo barumu */}
        <img
          src={logoptpn4}
          alt="Logo PTPN IV"
          className="h-auto w-auto" 
        />
      </div>
      {/* ==================================
          AKHIR BAGIAN PERUBAHAN
          ================================== 
      */}

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setRoute(item.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              route === item.key
                ? "bg-slate-600 text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
import React, { useState, useEffect, useContext, useRef } from 'react';
import logoptpn4 from "../../assets/logoptpn4.png";
import { AppContext } from "../../Context/AppContext"; 
import Swal from "sweetalert2"; 

import { 
  IoPerson, 
  IoLogOutOutline, 
  IoPencil,
  IoSettingsOutline 
} from "react-icons/io5";

function Header() {
  const { setRoute } = useContext(AppContext);
  const [username, setUsername] = useState("User");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUsername(savedName);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);

    Swal.fire({
      title: "Yakin ingin logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userRole"); 

        Swal.fire({
          icon: "success",
          title: "Berhasil Logout",
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
            setRoute("login"); 
        }, 1000);
      }
    });
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    Swal.fire("Info", "Fitur Edit Profile segera hadir!", "info");
  };

  return (
    <div className="bg-[#d3e1ee] border-b border-gray-200 px-6 py-2 shadow-sm z-50 relative">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center">
            <img 
              src={logoptpn4} 
              alt="Logo PTPN IV" 
              className="h-12 w-auto object-contain hover:scale-105 transition-transform" 
            />
        </div>

        {/* USER PROFILE SECTION */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-gray-700 capitalize  transition-colors">
                {username}
              </div>
            </div>

            {/* ICON PROFILE  */}
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover:shadow-blue-500 transition-all transform group-hover:scale-105">
               <IoPerson className="w-5 h-5" />
            </div>
          </button>

          {/* DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-16 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 md:hidden">
                <p className="text-sm font-bold text-gray-800 capitalize">{username}</p>
              </div>

              <div className="p-2">
                {/* Opsi 1: Edit Profile */}
                <button 
                  onClick={handleEditProfile}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <IoPencil className="w-5 h-5" />
                  Edit Profile
                </button>

                <div className="h-px bg-gray-100 my-1"></div>

                {/* Opsi 3: Logout */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium"
                >
                  <IoLogOutOutline className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Header;
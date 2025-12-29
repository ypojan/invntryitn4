import React, { useState, useEffect, useContext } from 'react';
import logoptpn4 from "../../assets/logoptpn4.png";
import { AppContext } from "../../Context/AppContext"; 
import Swal from "sweetalert2"; 
import { Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";

// Terima prop toggleSidebar
function Header({ toggleSidebar }) {
  const { setRoute } = useContext(AppContext);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-2xl p-6",
        confirmButton:
          "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 mx-2",
        cancelButton:
          "bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 mx-2",
      },
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

  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ color: 'red' }} 
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-[#d3e1ee] border-b border-gray-200 px-4 md:px-6 py-2 shadow-sm z-50 relative">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-2xl text-slate-700 hover:text-blue-600 transition-colors"
            >
              <MenuOutlined />
            </button>

            <img 
              src={logoptpn4} 
              alt="Logo PTPN IV" 
              className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform" 
            />
        </div>

        {/* USER PROFILE SECTION */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-gray-700 capitalize transition-colors">
              {username}
            </div>
          </div>

          <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={["click"]}
            overlayStyle={{ zIndex: 1100 }}
          >
            <button
              className="relative w-[50px] h-[50px] flex items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-600 shadow-sm overflow-hidden transition-all duration-300 group hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0"></div>
              
              {/* Icon User */}
              <UserOutlined className="text-xl relative z-10" />
            </button>
          </Dropdown>
        </div>

      </div>
    </div>
  );
}

export default Header;
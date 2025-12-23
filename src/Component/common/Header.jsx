import React from 'react';
import logoptpn4 from "../../assets/logoptpn4.png";

function Header() {
  return (
    <div className="bg-[#d3e1ee] border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between">

        <div className="flex items-center">
            <img 
              src={logoptpn4} 
              alt="Logo PTPN IV" 
              className="h-12 w-auto object-contain" 
            />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">Raa</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
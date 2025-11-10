// src/Component/common/Modal.jsx

// 1. Kita import useState dan useEffect
import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  // 2. Kita buat 2 state baru:
  // isMounted: untuk memunculkan/menghilangkan komponen dari DOM
  // isAnimating: untuk mengontrol 'opacity' (animasi fade-in/out)
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 3. Ini 'Sutradara' animasinya (useEffect)
  useEffect(() => {
    if (isOpen) {
      // SAAT PERINTAH MUNCUL (isOpen = true)
      setIsMounted(true); // 1. Munculkan komponen di DOM (masih transparan)
      // 2. Beri jeda sedikit, lalu jalankan animasi fade-in
      setTimeout(() => setIsAnimating(true), 10); 
    } else {
      // SAAT PERINTAH HILANG (isOpen = false)
      setIsAnimating(false); // 1. Jalankan animasi fade-out
      // 2. Tunggu 300ms (selama animasi berjalan), BARU hilangkan dari DOM
      setTimeout(() => setIsMounted(false), 300); 
    }
  }, [isOpen]); // 'Sutradara' ini hanya bekerja saat prop 'isOpen' berubah

  // 4. Kita ganti 'if (!isOpen)' dengan 'if (!isMounted)'
  //    Artinya, komponen ini baru benar-benar hilang setelah 300ms
  if (!isMounted) return null;

  return (
    <>
      {/* 1. Latar Belakang Gelap (Overlay) */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out
                   ${isAnimating ? 'bg-opacity-60' : 'bg-opacity-0'}`} // <-- CSS Animasi
        onClick={onClose} 
      ></div>

      {/* 2. Kontainer Modal (Box Putih) */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   bg-white rounded-2xl shadow-2xl z-50 p-8
                   transition-all duration-300 ease-in-out
                   ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} // <-- CSS Animasi
        style={{ width: "500px" }} 
      >
        {children}
      </div>
    </>
  );
}

export default Modal;
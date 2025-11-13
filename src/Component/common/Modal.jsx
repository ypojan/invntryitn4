import React, { useState, useEffect } from "react";
function Modal({ isOpen, onClose, children, width = "500px" }) {
  
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true); 
      setTimeout(() => setIsAnimating(true), 10); 
    } else {
      setIsAnimating(false); 
      setTimeout(() => setIsMounted(false), 300); 
    }
  }, [isOpen]); 

  if (!isMounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out
                   ${isAnimating ? 'bg-opacity-60' : 'bg-opacity-0'}`}
        onClick={onClose} 
      ></div>

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   bg-white rounded-2xl shadow-2xl z-50 p-8
                   transition-all duration-300 ease-in-out
                   ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ width: width }} 
      >
        {children}
      </div>
    </>
  );
}

export default Modal;
// src/Context/AppContext.jsx

import React, { createContext, useEffect, useState } from "react";

// Import gambar default
import laptopImg from "../assets/laptop.png";
import pcImg from "../assets/pc.png";
import sparepartImg from "../assets/sparepart.png";
import printerImg from "../assets/printer.png";
import proyektorImg from "../assets/proyektor.png";
import acImg from "../assets/ac.png";
import tvImg from "../assets/tv.png";

const ApplicationContext = createContext();

/* =================================================================
   1. DATA MASTER KATEGORI
================================================================= */
const MASTER_CATEGORIES = [
  { id: 1, title: "Laptop", image: laptopImg },
  { id: 2, title: "Komputer", image: pcImg },
  { id: 3, title: "Sparepart", image: sparepartImg },
  { id: 4, title: "Mesin Printer", image: printerImg },
  { id: 5, title: "Projector", image: proyektorImg },
  { id: 6, title: "AC", image: acImg },
  { id: 7, title: "TV", image: tvImg },
];

/* =================================================================
   2. DAFTAR MEREK & TIPE ASLI (REAL MODELS)
================================================================= */
const REAL_MODELS = {
  "Laptop": ["MSI Stealth A16", "Lenovo Yoga 9i", "MacBook Pro M2", "Asus ROG Zephyrus", "Dell XPS 15"],
  "Komputer": ["PC Rakitan i9", "iMac 24 Inch", "Dell OptiPlex", "HP Pavilion", "Lenovo Legion"],
  "Sparepart": ["SSD Samsung 1TB", "RAM Corsair 32GB", "VGA RTX 4060", "Motherboard ASUS", "PSU Seasonic"],
  "Mesin Printer": ["Epson L3210", "HP LaserJet Pro", "Canon Pixma", "Brother DCP", "Fuji Xerox"],
  "Projector": ["Epson EB-X500", "BenQ MW560", "Sony VPL", "Panasonic PT", "ViewSonic"],
  "AC": ["Daikin 2PK", "Panasonic 1PK", "Sharp 1.5PK", "Gree 1.5PK", "LG Dual Cool"],
  "TV": ["Samsung 50 Inch", "LG OLED 55", "Sony Bravia 65", "TCL 43 Inch", "Xiaomi TV 32"]
};

/* =================================================================
   3. GENERATOR DATA DUMMY
================================================================= */
const generateDummyDetailData = () => {
  const allData = [];
  
  MASTER_CATEGORIES.forEach((cat) => {
    const models = REAL_MODELS[cat.title] || ["Tipe Standar", "Tipe Pro"];

    for (let i = 0; i < 3; i++) {
      const modelName = models[i % models.length];

      allData.push({
        id: `${cat.title.substring(0, 3).toUpperCase()}-${1000 + (i + 1)}`, 
        kategori: cat.title, 
        tanggal: `0${i + 1}/01/2025`,
        spesifikasi: modelName, 
        gambar: cat.image,
        jumlah: 5, 
        hargaSatuan: 2000000 * (i + 1),
        totalHarga: (2000000 * (i + 1)) * 5,
        kondisi: { bagus: 3, diperbaiki: 1, rusak: 1 } 
      });
    }
  });
  
  return allData;
};

const initialDetailData = generateDummyDetailData();

export default function AppContextProvider({ children }) {
  
  /* --- ROUTING BARU (CLEAN URL + PERSISTENCE) --- */
  
  // 1. Cek LocalStorage saat pertama kali load
  const getInitialRoute = () => {
    // Ambil halaman terakhir yang disimpan
    const savedRoute = localStorage.getItem("activeRoute");
    // Kalau ada, pakai itu. Kalau tidak, masuk ke 'lobby'
    return savedRoute || "lobby";
  };

  const [route, setRouteInternal] = useState(getInitialRoute);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setRoute = (newRoute, category = null) => {
    setRouteInternal(newRoute);
    if (category) setSelectedCategory(category);

    // 2. SIMPAN POSISI KE LOCALSTORAGE (Ingatan Gajah)
    // Setiap kali pindah halaman, kita catat di buku harian browser
    localStorage.setItem("activeRoute", newRoute);

    // 3. BERSIHKAN URL (Agar tidak ada #pagar)
    // Kita paksa URL browser tetap bersih (contoh: localhost:5173/)
    window.history.replaceState(null, "", "/");
  };

  // Kita hapus useEffect 'hashchange' karena kita tidak pakai pagar (#) lagi.

  /* --- MODAL --- */
  const [modal, setModal] = useState({ tambahBarang: false, peminjaman: false });
  const openModal = (name) => setModal((prev) => ({ ...prev, [name]: true }));
  const closeModal = () => setModal({ tambahBarang: false, peminjaman: false });

  /* --- INVENTORY STATE --- */
  const STORAGE_KEY_ITEMS = "inventoryItems_v3";
  const STORAGE_KEY_DETAILS = "detailBarangData_v3";

  const [inventoryItems, setInventoryItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : MASTER_CATEGORIES;
    } catch (error) {
      return MASTER_CATEGORIES;
    }
  });

  const [detailBarangData, setDetailBarangData] = useState(() => {
     try {
       const savedDetails = localStorage.getItem(STORAGE_KEY_DETAILS);
       return savedDetails ? JSON.parse(savedDetails) : initialDetailData;
     } catch (error) {
       return initialDetailData;
     }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(inventoryItems));
      localStorage.setItem(STORAGE_KEY_DETAILS, JSON.stringify(detailBarangData));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // Silent error atau handling simple
        console.error("Storage Penuh");
      }
    }
  }, [inventoryItems, detailBarangData]);


  /* --- LOGIKA TAMBAH BARANG --- */
  const addInventoryItem = (newItem) => {
    setInventoryItems((prev) => [
      ...prev,
      { ...newItem, id: Date.now() }, 
    ]);

    const newDetail = {
      id: `NEW-${Date.now()}`,
      kategori: newItem.title,
      tanggal: new Date().toLocaleDateString("id-ID"),
      spesifikasi: `${newItem.title} (Baru)`,
      gambar: newItem.image,
      jumlah: 1, 
      hargaSatuan: 0,
      totalHarga: 0,
      kondisi: { bagus: 1, diperbaiki: 0, rusak: 0 }
    };
    setDetailBarangData(prev => [...prev, newDetail]);
  };

  /* --- LOGIKA HAPUS BARANG --- */
  const deleteInventoryItem = (id, title) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== id));
    setDetailBarangData((prev) => prev.filter(item => item.kategori !== title));
  };

  const contextValue = {
    route, setRoute, selectedCategory,
    inventoryItems, addInventoryItem, deleteInventoryItem,
    detailBarangData, 
    modal, openModal, closeModal,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const AppContext = ApplicationContext;
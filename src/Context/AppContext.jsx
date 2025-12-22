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

/* =============================
   MASTER INVENTORY DEFAULT
============================= */
const DEFAULT_INVENTORY = [
  { id: 1, title: "Laptop", total: 35, image: laptopImg },
  { id: 2, title: "Komputer", total: 35, image: pcImg },
  { id: 3, title: "Sparepart", total: 35, image: sparepartImg },
  { id: 4, title: "Mesin Printer", total: 35, image: printerImg },
  { id: 5, title: "Projector", total: 35, image: proyektorImg },
  { id: 6, title: "AC", total: 35, image: acImg },
  { id: 7, title: "TV", total: 35, image: tvImg },
];

/* =============================
   DETAIL BARANG (SUMBER DATA)
============================= */
const detailBarangData = [
  // ===== LAPTOP (35) =====
  {
    id: "L-001",
    kategori: "Laptop",
    tanggal: "01/01/2025",
    spesifikasi: "Lenovo ThinkPad X1",
    gambar: laptopImg,
    jumlah: 15,
    hargaSatuan: 18000000,
    totalHarga: 270000000,
    kondisi: { bagus: 12, diperbaiki: 2, rusak: 1 },
  },
  {
    id: "L-002",
    kategori: "Laptop",
    tanggal: "02/01/2025",
    spesifikasi: "HP Elitebook",
    gambar: laptopImg,
    jumlah: 20,
    hargaSatuan: 16000000,
    totalHarga: 320000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },

  // ===== KOMPUTER (35) =====
  {
    id: "K-001",
    kategori: "Komputer",
    tanggal: "03/01/2025",
    spesifikasi: "PC Office",
    gambar: pcImg,
    jumlah: 20,
    hargaSatuan: 8500000,
    totalHarga: 170000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "K-002",
    kategori: "Komputer",
    tanggal: "04/01/2025",
    spesifikasi: "PC Design",
    gambar: pcImg,
    jumlah: 15,
    hargaSatuan: 12000000,
    totalHarga: 180000000,
    kondisi: { bagus: 13, diperbaiki: 1, rusak: 1 },
  },

  // ===== PRINTER (35) =====
  {
    id: "P-001",
    kategori: "Mesin Printer",
    tanggal: "05/01/2025",
    spesifikasi: "HP LaserJet",
    gambar: printerImg,
    jumlah: 20,
    hargaSatuan: 3500000,
    totalHarga: 70000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "P-002",
    kategori: "Mesin Printer",
    tanggal: "06/01/2025",
    spesifikasi: "Epson L-Series",
    gambar: printerImg,
    jumlah: 15,
    hargaSatuan: 2800000,
    totalHarga: 42000000,
    kondisi: { bagus: 13, diperbaiki: 1, rusak: 1 },
  },

  // ===== PROJECTOR (35) =====
  {
    id: "PR-001",
    kategori: "Projector",
    tanggal: "07/01/2025",
    spesifikasi: "Epson EB-X400",
    gambar: proyektorImg,
    jumlah: 20,
    hargaSatuan: 7500000,
    totalHarga: 150000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "PR-002",
    kategori: "Projector",
    tanggal: "08/01/2025",
    spesifikasi: "BenQ MX550",
    gambar: proyektorImg,
    jumlah: 15,
    hargaSatuan: 7000000,
    totalHarga: 105000000,
    kondisi: { bagus: 14, diperbaiki: 1, rusak: 0 },
  },

  // ===== SPAREPART (35) =====
  {
    id: "SP-001",
    kategori: "Sparepart",
    tanggal: "09/01/2025",
    spesifikasi: "RAM DDR4 8GB",
    gambar: sparepartImg,
    jumlah: 20,
    hargaSatuan: 600000,
    totalHarga: 12000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "SP-002",
    kategori: "Sparepart",
    tanggal: "10/01/2025",
    spesifikasi: "SSD NVMe 512GB",
    gambar: sparepartImg,
    jumlah: 15,
    hargaSatuan: 900000,
    totalHarga: 13500000,
    kondisi: { bagus: 14, diperbaiki: 1, rusak: 0 },
  },

  // ===== AC (35) =====
  {
    id: "AC-001",
    kategori: "AC",
    tanggal: "11/01/2025",
    spesifikasi: "Daikin Inverter",
    gambar: acImg,
    jumlah: 20,
    hargaSatuan: 4500000,
    totalHarga: 90000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "AC-002",
    kategori: "AC",
    tanggal: "12/01/2025",
    spesifikasi: "LG Dual Cool",
    gambar: acImg,
    jumlah: 15,
    hargaSatuan: 4200000,
    totalHarga: 63000000,
    kondisi: { bagus: 14, diperbaiki: 1, rusak: 0 },
  },

  // ===== TV (35) =====
  {
    id: "TV-001",
    kategori: "TV",
    tanggal: "13/01/2025",
    spesifikasi: "Samsung Smart TV",
    gambar: tvImg,
    jumlah: 20,
    hargaSatuan: 5500000,
    totalHarga: 110000000,
    kondisi: { bagus: 18, diperbaiki: 1, rusak: 1 },
  },
  {
    id: "TV-002",
    kategori: "TV",
    tanggal: "14/01/2025",
    spesifikasi: "LG UHD TV",
    gambar: tvImg,
    jumlah: 15,
    hargaSatuan: 5200000,
    totalHarga: 78000000,
    kondisi: { bagus: 14, diperbaiki: 1, rusak: 0 },
  },
];

export default function AppContextProvider({ children }) {
  /* ================= ROUTING ================= */
  const getInitialRoute = () =>
    window.location.hash.replace("#", "") || "lobby";
  const [route, setRouteInternal] = useState(getInitialRoute);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setRoute = (newRoute, category = null) => {
    setRouteInternal(newRoute);
    if (category) setSelectedCategory(category);
    newRoute === "lobby"
      ? window.history.pushState(null, "", window.location.pathname)
      : (window.location.hash = newRoute);
  };

  /* ================= MODAL ================= */
  const [modal, setModal] = useState({ tambahBarang: false });
  const openModal = (name) =>
    setModal((prev) => ({ ...prev, [name]: true }));
  const closeModal = () => setModal({ tambahBarang: false });

  /* ================= INVENTORY (LOCALSTORAGE) ================= */
  const [inventoryItems, setInventoryItems] = useState(() => {
    const saved = localStorage.getItem("inventoryItems");
    return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
  });

  useEffect(() => {
    localStorage.setItem(
      "inventoryItems",
      JSON.stringify(inventoryItems)
    );
  }, [inventoryItems]);

  const addInventoryItem = (item) => {
    setInventoryItems((prev) => [
      ...prev,
      { ...item, id: Date.now(), total: 0 },
    ]);
  };

  /* ================= CONTEXT VALUE ================= */
  const contextValue = {
    route,
    setRoute,
    selectedCategory,

    inventoryItems,
    addInventoryItem,

    detailBarangData,

    modal,
    openModal,
    closeModal,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const AppContext = ApplicationContext;

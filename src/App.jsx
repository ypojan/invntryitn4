import React, { useContext, useEffect } from "react"; // Hapus useState
import { AppContext } from "./Context/AppContext.jsx"; 
import LandingPage from "./Page/LandingPage.jsx";
import Login from "./Page/Login.jsx"; // (Opsional, jika nanti butuh)
import Dashboard from "./Page/Dashboard.jsx";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Modal Global
import Modal from "./Component/common/Modal.jsx";
import FormTambahBarang from "./Component/FormTambahBarang.jsx";
import FormPeminjaman from "./Component/FormPeminjaman.jsx";

function App() {
  // Kita tidak lagi pakai 'useState' lokal untuk stage.
  // Kita ambil 'route' langsung dari Context (yang sinkron dengan URL).
  const { route, setRoute, modal, closeModal } = useContext(AppContext);

  // Fungsi saat tombol "Inventory IT" diklik di Landing Page
  const handleSelectIT = () => {
    setRoute("dashboard"); // Ini akan mengubah URL jadi /#dashboard
  };

  const handleLogout = () => {
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Berhasil logout!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    // Saat logout, kembalikan ke Lobi
    setRoute("lobby");
  };

  // Logika Render Utama
  // Cek isi variabel 'route' (dari URL)
  const renderContent = () => {
    if (route === "lobby") {
      return <LandingPage onSelectIT={handleSelectIT} />;
    } 
    // Jika route adalah 'login', tampilkan Login (opsional)
    else if (route === "login") {
       return <Login onLoginSuccess={() => setRoute("dashboard")} />;
    }
    // Untuk semua route lain (dashboard, peminjaman, history, dll),
    // Kita tampilkan DASHBOARD sebagai kerangkanya.
    // Nanti 'Route.jsx' di dalam Dashboard yang akan menangani detail isinya.
    else {
      return <Dashboard onLogout={handleLogout} />;
    }
  };

  return (
    <>
      {renderContent()}

      {/* Wadah Notifikasi */}
      <ToastContainer />
      
      {/* --- MODAL GLOBAL --- */}
      <Modal isOpen={modal.tambahBarang} onClose={closeModal}>
        <FormTambahBarang onClose={closeModal} />
      </Modal>

      <Modal isOpen={modal.peminjaman} onClose={closeModal}>
        <FormPeminjaman onClose={closeModal} />
      </Modal>
    </>
  );
}

export default App;
import React, { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import LandingPage from "./Page/LandingPage.jsx";
import Login from "./Page/Login.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Component/common/Modal.jsx";
import FormTambahBarang from "./Component/FormTambahBarang.jsx";
import FormPeminjaman from "./Component/FormPeminjaman.jsx";

function App() {
  const { route, setRoute, modal, closeModal } = useContext(AppContext);

  const handleSelectIT = () => {
    setRoute("dashboard");
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
      },
    });
    setRoute("lobby");
  };

  const renderContent = () => {
    if (route === "lobby") {
      return <LandingPage onSelectIT={handleSelectIT} />;
    } else if (route === "login") {
      return <Login onLoginSuccess={() => setRoute("dashboard")} />;
    } else {
      return <Dashboard onLogout={handleLogout} />;
    }
  };

  return (
    <>
      {renderContent()}
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

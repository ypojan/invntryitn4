import backgroundImage from "../assets/background.jpg";
import logoptpn4 from "../assets/logoptpn4.png";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const DUMMY_USERS = [
    { username: "adminndrone", password: "1234", role: "admin_drone" },
    { username: "adminit", password: "1234", role: "admin_it" },
    { username: "bosbesar", password: "4321", role: "superadmin" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = DUMMY_USERS.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      sessionStorage.setItem("userRole", foundUser.role);
      localStorage.setItem("username", foundUser.username);

      toast.success(`Login Berhasil! Halo ${foundUser.username}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } else {
      toast.error("Login gagal! Periksa username dan password Anda.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-4 animate-[fadeInUp_0.6s_ease-out]">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:scale-105">
          <div className="flex justify-center mb-6">
            <img src={logoptpn4} alt="Logo PTPN" className="h-20 w-auto" />
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Input Username */}
            <div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70">
                  <svg
                    className="w-6 h-6"
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
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-14 py-4 text-white text-lg placeholder-white/80 focus:outline-none focus:border-white/60 focus:bg-white/25 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-14 py-4 text-white text-lg placeholder-white/80 focus:outline-none focus:border-white/60 focus:bg-white/25 focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                >
                  {showPassword ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/60 hover:scale-105 active:scale-95 border border-blue-400/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Login</span>
            </button>

            <p className="text-center text-white/70 text-sm mt-4 hover:text-white hover:underline cursor-pointer transition-colors duration-300">
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// src/Page/Login.jsx

import backgroundVideo from "../assets/bgvidio.mp4"; // (Pastikan path ../assets/ sudah benar dari folder Page)
import logo1 from "../assets/logo_Holding-2.png";
import logo2 from "../assets/bumn.png";
import logo3 from "../assets/ptpn4.png";
import { useState } from "react";

// <<< PERUBAHAN DI SINI (1/2): Terima 'onLoginSuccess' (bukan 'onLogin')
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked", { username, password });
    
    // <<< PERUBAHAN DI SINI (2/2): Panggil 'onLoginSuccess'
    onLoginSuccess(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src={backgroundVideo}
        />
        {/* Overlay warna biru transparan */}
        <div className="absolute inset-0 bg-blue-900/40"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Username Input */}
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
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-14 py-4 text-white text-lg placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/25 transition"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-14 py-4 text-white text-lg placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/25 transition"
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-bold text-lg py-4 rounded-xl hover:bg-blue-50 transition shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Logo - pakai import */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <img src={logo1} alt="Logo 1" className="h-10 w-auto" />
            <img src={logo2} alt="Logo 2" className="h-10 w-auto" />
            <img src={logo3} alt="Logo 3" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
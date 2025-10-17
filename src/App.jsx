import { useState } from 'react';
import Login from './components/pages/Login.jsx';
import Dashboard from './components/pages/Dashboard.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // state untuk track page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function untuk handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  // Render page sesuai state
  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }
}

export default App;
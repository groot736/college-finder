import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/colleges', label: 'Colleges' },
    { path: '/career-test', label: 'Career Test' },
    { path: '/contact', label: 'Contact' }
  ];

  const linkClass = (path) => (
    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
      isActive(path)
        ? 'text-white bg-[#152238] shadow-md'
        : 'text-[#152238] hover:bg-[#152238]/10'
    }`
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#152238]/10 backdrop-blur-xl bg-[#fff8ef]/80">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-6">
        <Link 
          to="/" 
          className="text-2xl font-black text-[#152238] tracking-tight"
        >
          CollegeFinder
        </Link>
        
        <div className="items-center hidden gap-1 md:flex">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={linkClass(item.path)}
            >
              {item.label}
            </Link>
          ))}
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`${linkClass('/dashboard')} inline-flex items-center gap-2`}
              >
                <FaTachometerAlt className="text-sm" />
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={linkClass('/admin')}
                >
                  Admin
                </Link>
              )}
              <button 
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 ml-2 text-sm font-semibold text-white transition rounded-lg bg-[#dc2626] hover:bg-[#b91c1c]"
              >
                <FaSignOutAlt className="text-sm" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-5 py-2 ml-2 text-sm font-semibold text-[#152238] border border-[#152238]/20 rounded-lg hover:bg-[#152238]/5 transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2 ml-2 text-sm font-semibold text-white rounded-lg bg-[#f97316] hover:bg-[#ea580c] transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center p-2 text-xl text-[#152238] rounded-lg md:hidden hover:bg-[#152238]/10"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="px-4 pb-4 md:hidden bg-[#fff8ef] border-t border-[#152238]/10">
          <div className="flex flex-col gap-2 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={linkClass(item.path)}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className={`${linkClass('/dashboard')} inline-flex items-center gap-2`}
                >
                  <FaTachometerAlt className="text-sm" />
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className={linkClass('/admin')}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 mt-2 text-sm font-semibold text-white rounded-lg bg-[#dc2626]"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm font-semibold text-center border rounded-lg border-[#152238]/20 text-[#152238]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm font-semibold text-center text-white rounded-lg bg-[#f97316]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


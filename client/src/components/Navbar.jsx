import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Libris
        </Link>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </button>

        <div className={`${open ? 'block' : 'hidden'} md:flex items-center gap-4 text-sm`}>
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/search" className="hover:text-blue-300">
            Search
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-300">
                Profile
              </Link>
              {user.roles?.includes('admin') && (
                <Link to="/admin" className="hover:text-blue-300">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="hover:text-red-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

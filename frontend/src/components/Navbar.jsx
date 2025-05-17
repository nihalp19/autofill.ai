import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Navbar({ isAuthenticated, onMenuClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">Autofill.AI</Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={onMenuClick}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

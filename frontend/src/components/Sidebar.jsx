import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, History, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-64 bg-gray-900 z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-white font-semibold">Menu</h2>
              </div>
              
              <nav className="flex-1 p-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  to="/history"
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  <History className="h-5 w-5" />
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;

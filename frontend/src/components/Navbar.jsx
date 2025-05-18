import React, { useState, useEffect } from 'react';
import { Menu, X, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isSideBarOpen, toogleSideBar } = useAuthStore();
  const navigate = useNavigate();

  // Menu button JSX for reuse
  const menuButton = (
    <button
      className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      onClick={() => toogleSideBar(!isSideBarOpen)}
    >
      <span className="sr-only">Toggle sidebar</span>
      {isSideBarOpen ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-2 md:mx-4 px-1 sm:px-2 lg:px-3 py-3">
        <div className="flex items-center justify-between h-14">
          {/* Left: Hamburger (visible only on md and up) and Logo */}
          <div className="flex items-center">
            <div className="hidden md:block mr-2">{menuButton}</div>
            <div className="flex-shrink-0 flex items-center ml-1 md:ml-0">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={handleHome}
              >
                <ShieldCheck className="h-8 w-8 text-blue-500 mr-1" />
                <span className="text-white font-bold text-xl cursor-pointer">
                  Autofill.AI
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right: On small screens, show menu button here before profile */}
          <div className="flex items-center space-x-2">
            <div className="block md:hidden">{menuButton}</div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
              <button className="flex items-center max-w-xs bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 p-1">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

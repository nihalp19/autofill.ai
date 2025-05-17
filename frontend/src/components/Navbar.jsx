import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { isSideBarOpen } = useAuthStore();

    // Sidebar width in px
    const sidebarWidth = isSideBarOpen ? 240 : 72;

    const navigate = useNavigate()
    const handleHome = () => {
        navigate("/home")
    }

    return (
        <header
            className="fixed top-0 z-50 bg-transparent backdrop-blur-md py-3  transition-all duration-300"
            style={{
                left: sidebarWidth,
                width: `calc(100% - ${sidebarWidth}px)`,
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={isSideBarOpen ? "flex items-center justify-end" : "flex items-center justify-between"}>
                    {/* Logo */}
                    {isSideBarOpen ? <></> :<motion.div
                        className="flex items-center cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    onClick={handleHome}>
                        <ShieldCheck className="h-8 w-8 text-blue-500 mr-2" />
                        <span className="text-white font-bold text-xl">Autofill.AI</span>
                    </motion.div> }
                    

                    {/* User Profile */}
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-medium">JD</span>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-white font-medium">John Doe</p>
                            <p className="text-gray-400 text-sm">john@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

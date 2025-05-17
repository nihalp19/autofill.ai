import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    History,
    User,
    LogOut,
    ShieldCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('Dashboard');
    const { isSideBarOpen, toogleSideBar, logout } = useAuthStore();

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/home/dashboard' },
        { name: 'History', icon: <History size={20} />, path: '/home/history' },
        { name: 'Profile', icon: <User size={20} />, path: '/home/profile' },
    ];

    const sidebarVariants = {
        open: { width: '240px', transition: { duration: 0.3, ease: 'easeInOut' } },
        closed: { width: '72px', transition: { duration: 0.3, ease: 'easeInOut' } }
    };

    const textVariants = {
        open: { opacity: 1, x: 0, display: 'block', transition: { delay: 0.1, duration: 0.2 } },
        closed: { opacity: 0, x: -10, transitionEnd: { display: 'none' }, transition: { duration: 0.2 } }
    };

    const logoTextVariants = {
        open: { opacity: 1, width: 'auto', transition: { delay: 0.1, duration: 0.2 } },
        closed: { opacity: 0, width: 0, transition: { duration: 0.2 } }
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <motion.div
            className="fixed left-0 top-0 bottom-0 z-40 h-screen
        bg-gradient-to-br from-black via-gray-900 to-black
        bg-opacity-80 backdrop-blur-md shadow-lg"
            variants={sidebarVariants}
            initial="closed"
            animate={isSideBarOpen ? 'open' : 'closed'}
        >
            <div className="flex flex-col  h-full">
                {/* Logo and Toggle Button */}
                <div className="flex items-center h-16 px-4 border-b border-gray-800">
                    {isSideBarOpen ? (
                        <div className="flex items-center flex-1 overflow-hidden">
                            <ShieldCheck className="h-8 w-8 text-blue-500 flex-shrink-0" />
                            {isSideBarOpen && (
                                <motion.span
                                    className="text-white font-bold ml-2 whitespace-nowrap"
                                    variants={logoTextVariants}
                                >
                                    Autofill.AI
                                </motion.span>
                            )}
                        </div>
                    ) : <></>}

                    <button
                        className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={toogleSideBar}
                    >
                        {isSideBarOpen ?
                            <ChevronLeft size={20} className="text-gray-400" /> :
                            <ChevronRight size={20} className="text-gray-400" />
                        }
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-2 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-3 py-3 rounded-lg transition-all
                                    ${location.pathname === item.path
                                        ? 'bg-blue-600/20 text-blue-400'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                onClick={() => setActiveItem(item.name)}
                            >
                                <div className="flex-shrink-0">{item.icon}</div>
                                {isSideBarOpen && (
                                    <motion.span
                                        className="ml-3 font-medium"
                                        variants={textVariants}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-800" onClick={handleLogout}>
                    <button
                        className="flex items-center px-3 py-3 rounded-lg w-full text-red-400 hover:bg-white/10 hover:text-red-500 transition-all"
                    >
                        <LogOut size={20} />
                        {isSideBarOpen && (
                            <motion.span
                                className="ml-3 font-medium"
                                variants={textVariants}
                            >
                                Logout
                            </motion.span>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;

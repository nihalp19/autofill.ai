import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login")
    }
    const handleHome = () => {
        navigate("/")
    }


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onClick={handleHome}>
                        <ShieldCheck className="h-8 w-8 text-blue-500 mr-2" />
                        <span className="text-white font-bold text-xl cursor-pointer">Autofill.AI</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['Docs','Features', 'How It Works', 'Use Cases'].map((item) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-gray-300 hover:text-white transition-colors"
                                whileHover={{ y: -2 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                {item}
                            </motion.a>
                        ))}
                        <motion.button
                            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2 rounded-lg font-medium transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogin}>
                            Get Started
                        </motion.button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-gray-900/95 backdrop-blur-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col space-y-4">
                            {['Features', 'How It Works', 'Use Cases', 'Pricing'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-300 hover:text-white py-2 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2 rounded-lg font-medium transition-all mt-2">
                                Get Started
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;

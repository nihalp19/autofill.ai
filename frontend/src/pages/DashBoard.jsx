import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

const Dashboard = () => {
    const { isSideBarOpen } = useAuthStore();

    return (
        <div className='bg-black min-h-screen flex justify-center items-center'>

            <motion.div
                className="text-center bg-black "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            >
                <motion.div
                    className="inline-block mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-16 w-16 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6 4A10 10 0 11 2 12a10 10 0 0120 0z"
                        />
                    </svg>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Dashboard Under Development
                </h1>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    We're working hard to bring you an awesome dashboard experience. Stay tuned for updates!
                </p>
                <span className="inline-block bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg font-semibold text-sm animate-pulse">
                    Coming Soon
                </span>
            </motion.div>
        </div>

    );
};

export default Dashboard;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, History, User, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-black py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/history">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all"
                            >
                                <History className="h-8 w-8 text-blue-500 mb-4" />
                                <h2 className="text-xl font-semibold text-white mb-2">Form History</h2>
                                <p className="text-gray-400 mb-4">View and manage your previously filled forms</p>
                                <div className="flex items-center text-blue-500">
                                    View History <ArrowRight className="h-4 w-4 ml-2" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link to="/profile">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all"
                            >
                                <User className="h-8 w-8 text-blue-500 mb-4" />
                                <h2 className="text-xl font-semibold text-white mb-2">Profile Settings</h2>
                                <p className="text-gray-400 mb-4">Update your personal information and preferences</p>
                                <div className="flex items-center text-blue-500">
                                    Manage Profile <ArrowRight className="h-4 w-4 ml-2" />
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Forms</h2>
                        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                            <div className="divide-y divide-gray-800">
                                {[1, 2, 3].map((_, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 hover:bg-gray-800/50 transition-all"
                                    >
                                        <Link to={`/form/${index}`} className="flex items-center">
                                            <FileText className="h-5 w-5 text-blue-500 mr-3" />
                                            <div>
                                                <h3 className="text-white font-medium">Sample Form {index + 1}</h3>
                                                <p className="text-sm text-gray-400">Completed 2 days ago</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
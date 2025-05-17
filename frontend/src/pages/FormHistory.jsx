import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Search, Calendar, ArrowRight } from 'lucide-react';

const FormHistory = () => {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Form History</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search forms..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
            <div className="divide-y divide-gray-800">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-800/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-blue-500 mr-4" />
                      <div>
                        <h3 className="text-white font-medium text-lg">Sample Form {index + 1}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Completed on March 15, 2024</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`../form/${index}`}
                      className="flex items-center text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      View Form <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormHistory;

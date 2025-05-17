import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ParticleBackground from './PraticleBackground';
import toast from 'react-hot-toast';
import { useUrlStore } from '../store/useUrlStore';

function MainHero() {
  const [url, setUrl] = useState('');

  const { isProcessing, autoFillForm } = useUrlStore()

  const handleAutofill = async (e) => {
    e.preventDefault();

    if (!url) {
      toast.error('Please enter a form URL');
      return;
    }
    await autoFillForm({url})
    setUrl('')
  };

  return (
    <div className="relative bg-black overflow-hidden min-h-screen">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Particle effect */}
      <ParticleBackground />

      {/* Content */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full py-12 sm:py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ready to
              <motion.span
                className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Autofill
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Enter your form URL below and let AI handle the rest
            </motion.p>

            <motion.form
              onSubmit={handleAutofill}
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative w-full max-w-xl mx-auto">
                <motion.div
                  className="flex rounded-xl overflow-hidden w-full shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    placeholder="Enter form URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full py-4 px-6 rounded-l-xl text-gray-800 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-r-xl flex items-center justify-center transition-all hover:from-blue-700 hover:to-indigo-800 min-w-[140px] ${isProcessing ? 'opacity-75' : ''}`}
                  >
                    {isProcessing ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Search className="h-5 w-5 mr-2" />
                    )}
                    <span className="text-base font-medium">
                      {isProcessing ? 'Processing...' : 'Autofill'}
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default MainHero;

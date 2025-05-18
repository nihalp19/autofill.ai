import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useUrlStore } from '../store/useUrlStore';
import toast from 'react-hot-toast';

function Hero() {

  const [url, setUrl] = useState('')
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { setCurrentUrl } = useUrlStore()

  const handleAutoFill = async () => {
    if (!user) {
      navigate("/login");
    }
    if (!url) {
      toast.error('Please enter a form URL');
      return;
    }
    setCurrentUrl({ url })
    navigate("/home");
    setUrl('')
    console.log('Autofill clicked');
  };


  const handleViewDocs = () => {
    navigate("/docs")
    console.log('View docs clicked');
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Particle effect */}
      <ParticleBackground />

      {/* Hero content */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full py-12 sm:py-16 md:py-20 lg:py-24">
          <motion.div
            className="text-center space-y-8 sm:space-y-10 md:space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Autofill
                <motion.span
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  .AI
                </motion.span>
              </motion.h1>

              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mr-2" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-blue-400">Powered by AI</h2>
              </motion.div>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Stop wasting time filling out forms. Let AI do the work for you.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <motion.div
                  className="flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    placeholder="Enter form URL..."
                    value={url}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl text-gray-800 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base sm:text-lg"
                    onChange={(e) => setUrl(e.target.value)} />
                  <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl flex items-center justify-center transition-all hover:from-blue-700 hover:to-indigo-800 sm:min-w-[140px]"
                    onClick={handleAutoFill}
                  >
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="ml-2 text-sm sm:text-base font-medium">Autofill</span>
                  </button>
                </motion.div>
              </div>

              <motion.button
                onClick={handleViewDocs}
                className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">View Documentation</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <StatsItem text="#1 Time Saver" />
              <StatsItem text="25+ Forms Filled" />
              <StatsItem text="98% Accuracy" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StatsItem({ text }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-base text-gray-300">
      {text}
    </div>
  );
}

export default Hero;
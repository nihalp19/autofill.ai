import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import ParticleBackground from '../effects/ParticleBackground';

function Hero() {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Particle effect */}
      <ParticleBackground />
      
      {/* Hero content */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl w-full py-12 sm:py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight"
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
              className="mt-4 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl md:text-2xl font-medium text-blue-400">Powered by AI</h2>
            </motion.div>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Stop wasting time filling out forms. Let AI do the work for you.
              Complete any form with a single click using our intelligent autofill technology.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative w-full max-w-2xl mx-auto">
                <motion.div
                  className="flex rounded-xl overflow-hidden w-full shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    placeholder="Enter form URL..."
                    className="w-full py-4 px-6 rounded-l-xl text-gray-800 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-r-xl flex items-center justify-center transition-all hover:from-blue-700 hover:to-indigo-800 min-w-[140px]">
                    <Search className="h-5 w-5" />
                    <span className="ml-2 text-base font-medium">Autofill</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <p className="text-gray-400 text-sm">
                Works with Google Forms, Typeform, SurveyMonkey, PDFs, and more
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-gray-300">
                #1 Time Saver
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-gray-300">
                250,000+ Forms Filled
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-gray-300">
                98% Accuracy
              </div>
            </motion.div>
            
            <motion.div
              className="mt-16 sm:mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="flex justify-center">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="animate-bounce text-gray-500"
                >
                  <path 
                    d="M7 13L12 18L17 13" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Hero;

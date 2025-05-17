import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

function Hero() {
  return (
    <div className='bg-black'>
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl w-full py-12 sm:py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
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

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Stop wasting time filling out forms. Let AI do the work for you.
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
                Works with Google Forms, Typeform, SurveyMonkey and more
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>

  );
}

export default Hero;

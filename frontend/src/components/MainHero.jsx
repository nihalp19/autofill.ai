import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ParticleBackground from './ParticleBackground';
import { useUrlStore } from '../store/useUrlStore';

const MainHero = () => {
  const [url, setUrl] = useState('');
  const { isProcessing, autoFillForm, currentUrl } = useUrlStore();

  useEffect(() => {
    const funct = async () => {
      if (currentUrl !== null) {
        console.log(currentUrl)
        autoFillForm(currentUrl)
      }
    }
    funct()
  }, [])

  const handleAutofill = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a form URL');
      return;
    }
    try {
      await autoFillForm({ url });
      toast.success('Form processed successfully!');
      setUrl('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative bg-black overflow-hidden min-h-screen">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <ParticleBackground />

      <section className="relative z-10 w-full mt-6 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
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
              className="mt-3 md:mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Enter your form URL below and let AI handle the rest
            </motion.p>

            <motion.form
              onSubmit={handleAutofill}
              className="mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="relative w-full max-w-xl mx-auto">
                <label htmlFor="form-url" className="sr-only">Form URL</label>
                <motion.div
                  className="flex flex-col sm:flex-row rounded-xl sm:overflow-hidden w-full shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    id="form-url"
                    type="text"
                    placeholder="Enter form URL (e.g. https://forms.gle/xyz...)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl text-gray-800 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base sm:text-lg"
                  />
                  <button
                    type="submit"
                    disabled={isProcessing}
                    aria-label="Autofill form"
                    className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl flex items-center justify-center transition-all hover:from-blue-700 hover:to-indigo-800 min-h-[50px] sm:min-w-[140px] mt-1 sm:mt-0 ${isProcessing ? 'opacity-75' : ''}`}
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

            {/* Mobile-friendly feature highlights */}
            <motion.div
              className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {[
                { title: "Fast", description: "Autofill forms in seconds" },
                { title: "Accurate", description: "AI-powered precision" },
                { title: "Secure", description: "Your data stays private" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl"
                >
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MainHero;

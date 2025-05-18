import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <section className="relative bg-black py-20 sm:py-32">
      {/* Gradient background with animated effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-black to-indigo-900/20 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-xl p-8 sm:p-12 border border-blue-500/20 shadow-xl shadow-blue-500/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Save Hours</span> Every Week?
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of users who have reclaimed their time with Autofill.AI. 
              Start autofilling forms in seconds with our powerful AI technology.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl flex items-center justify-center shadow-lg transition-all hover:from-blue-700 hover:to-indigo-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={handleLogin}>
                <Zap className="h-5 w-5 mr-2" />
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
              
              <motion.button
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">Setup in 2 minutes</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">Secure & private</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300 text-sm">Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

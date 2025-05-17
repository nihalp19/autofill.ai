import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

const DemoSection = () => {
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const handleAutofill = () => {
    setIsAutoFilling(true);
    setTimeout(() => {
      setIsAutoFilling(false);
      setIsFilled(true);
    }, 1500);
  };
  
  const handleReset = () => {
    setIsFilled(false);
  };
  
  const formFields = [
    { icon: User, label: "Full Name", placeholder: "Enter your full name", filledValue: "Nihal Pandey" },
    { icon: Mail, label: "Email Address", placeholder: "Enter your email", filledValue: "nihal.pandey@example.com" },
    { icon: Phone, label: "Phone Number", placeholder: "Enter your phone number", filledValue: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Address", placeholder: "Enter your address", filledValue: "123 Innovation Drive, Tech City, CA 94123" },
    { icon: Briefcase, label: "Current Occupation", placeholder: "What do you do?", filledValue: "Software Developer" },
    { icon: Calendar, label: "Date of Birth", placeholder: "MM/DD/YYYY", filledValue: "06/14/1995" }
  ];
  
  return (
    <section id="demo" className="relative bg-black py-20 sm:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black pointer-events-none"></div>
      
      {/* Animated lines in background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            See <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Autofill.AI</span> in Action
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Watch how quickly and accurately our AI can fill out forms with a simple click
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-800 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl text-white font-semibold">Personal Information Form</h3>
            
            <div className="flex space-x-3">
              <motion.button
                onClick={handleAutofill}
                disabled={isAutoFilling || isFilled}
                className={`px-4 py-2 rounded-lg flex items-center ${isAutoFilling || isFilled 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'}`}
                whileHover={!isAutoFilling && !isFilled ? { scale: 1.03 } : {}}
                whileTap={!isAutoFilling && !isFilled ? { scale: 0.97 } : {}}
              >
                {isAutoFilling ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : isFilled ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Autofill Form'
                )}
              </motion.button>
              
              {isFilled && (
                <motion.button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Reset
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formFields.map((field, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                    readOnly
                    value={isFilled ? field.filledValue : ""}
                  />
                  {isAutoFilling && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-700/20 rounded-lg pointer-events-none"
                      animate={{ 
                        x: ['-100%', '100%'], 
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "linear"
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-6 bg-gray-800/80 p-4 rounded-lg border border-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-sm font-medium text-gray-300 mb-2">Why would you like to join our platform?</h4>
            <textarea
              className="w-full min-h-[100px] bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your response here..."
              readOnly
              value={isFilled ? "I'm excited to join this platform because of its innovative approach to problem-solving and the opportunity to collaborate with like-minded individuals. I believe my experience in software development and passion for technology make me a great fit for this community." : ""}
            />
            {isAutoFilling && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-700/20 rounded-lg pointer-events-none"
                animate={{ 
                  x: ['-100%', '100%'], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400">
            Our AI accurately fills forms in seconds, saving you valuable time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
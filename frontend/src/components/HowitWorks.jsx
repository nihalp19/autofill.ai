import React from 'react';
import { motion } from 'framer-motion';
import { Link, ArrowRight, Search, Database, Sparkles, Zap } from 'lucide-react';

const steps = [
  {
    icon: Link,
    title: "Share Form URL",
    description: "Just paste any form URL or upload a PDF into Autofill.AI",
    color: "from-blue-600 to-blue-800"
  },
  {
    icon: Search,
    title: "AI Analyzes the Form",
    description: "Our AI quickly analyzes all fields and understands what information is needed",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    icon: Database,
    title: "Access Your Data",
    description: "The system retrieves your saved information or generates appropriate responses",
    color: "from-purple-600 to-purple-800"
  },
  {
    icon: Sparkles,
    title: "Smart Completion",
    description: "All fields are instantly filled with accurate, context-appropriate responses",
    color: "from-blue-500 to-indigo-700"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative bg-black py-20 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-gray-900/50 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Autofill.AI</span> Works
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our intelligent system makes form filling effortless in just a few seconds
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row items-center md:items-start mb-12 md:mb-20 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step number */}
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="h-7 w-7 text-white" />
                </div>
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute hidden md:block h-full w-0.5 bg-gradient-to-b from-blue-500/30 to-indigo-600/30 left-8 top-16 -z-10"></div>
              )}
              
              {/* Content */}
              <div className="md:ml-10 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 max-w-2xl">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Demo button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl flex items-center justify-center transition-all hover:from-blue-700 hover:to-indigo-800 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-5 w-5 mr-2" />
            <span>Try it now</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

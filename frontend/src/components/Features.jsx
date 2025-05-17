import React from 'react';
import { motion } from 'framer-motion';
import { 
  FormInput, 
  FileText, 
  Brain, 
  CheckSquare, 
  ImagePlus, 
  Clock, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';

const featuresList = [
  {
    icon: FormInput,
    title: "Smart Form Detection",
    description: "Our AI instantly recognizes any form field type and fills it with the appropriate information."
  },
  {
    icon: FileText,
    title: "PDF & Document Support",
    description: "Works with PDFs, Word documents, and any digital form that requires filling."
  },
  {
    icon: Brain,
    title: "Learns Your Responses",
    description: "Remembers your personal info and repeated responses to save even more time on future forms."
  },
  {
    icon: CheckSquare,
    title: "All Field Types Supported",
    description: "Handles short answers, paragraphs, multiple choice, checkboxes, and all other input types."
  },
  {
    icon: ImagePlus,
    title: "Image Data Extraction",
    description: "Can extract information from images and screenshots to fill forms with even greater accuracy."
  },
  {
    icon: Clock,
    title: "Save Hours Weekly",
    description: "Reduce form completion time by up to 95% and focus on what really matters."
  },
  {
    icon: ShieldCheck,
    title: "Privacy Protection",
    description: "Your data is encrypted and never shared with third parties. Your information stays yours."
  },
  {
    icon: Settings,
    title: "Customizable Responses",
    description: "Set preferences for how you want certain questions answered across different contexts."
  }
];

// Clean JSX props (no :any)
const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative bg-black py-20 sm:py-32">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Intelligent Features for <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Effortless Form Filling</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI-powered technology understands forms just like a human would, but works at superhuman speed.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuresList.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

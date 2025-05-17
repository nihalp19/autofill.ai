import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Clipboard, FileSpreadsheet, GraduationCap, FileCheck } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: "Academic Forms",
    description: "Quickly complete school applications, course registrations, and evaluation forms with accurate information.",
    color: "from-blue-600 to-blue-800"
  },
  {
    icon: Briefcase,
    title: "Job Applications",
    description: "Effortlessly fill out job applications with your experience, skills, and qualifications for faster submissions.",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    icon: FileSpreadsheet,
    title: "Surveys & Questionnaires",
    description: "Complete surveys with thoughtful responses tailored to your preferences and past answers.",
    color: "from-purple-600 to-purple-800"
  },
  {
    icon: Clipboard,
    title: "Medical Forms",
    description: "Securely complete patient intake forms and medical history questionnaires with your health information.",
    color: "from-blue-500 to-indigo-700"
  },
  {
    icon: FileCheck,
    title: "Tax Documents",
    description: "Fill out tax forms with precise information pulled from your previous filings and financial records.",
    color: "from-indigo-600 to-blue-600"
  },
  {
    icon: BookOpen,
    title: "Educational Assessments",
    description: "Complete educational tests and assessments with personalized responses based on your knowledge level.",
    color: "from-blue-700 to-indigo-800"
  }
];

const UseCases = () => {
  return (
    <section id="use-cases" className="relative bg-black py-20 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-black pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Use Cases</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI handles multiple scenarios, saving you time on all your form-filling needs
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.3)" }}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4`}>
                <useCase.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial/Quote */}
        <motion.div 
          className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-sm p-8 sm:p-10 rounded-xl border border-blue-500/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center text-center">
            <svg className="h-10 w-10 text-blue-500 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote className="text-gray-300 text-xl italic mb-6">
              Autofill.AI saved me hours every week. I use it for everything from job applications to school forms, and it's incredibly accurate.
            </blockquote>
            <p className="font-medium text-white">Sarah L. - Graduate Student</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;

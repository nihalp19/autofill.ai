import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';

const FormView = () => {
  const { id } = useParams();

  // Sample form data structure
  const formData = {
    questions: [
      {
        question: "Email",
        type: "short_answer",
        answer: "user@example.com"
      },
      {
        question: "Name",
        type: "short_answer",
        answer: "John Doe"
      },
      {
        question: "What is your preferred programming language?",
        type: "multiple_choice",
        options: ["JavaScript", "Python", "Java", "C++"],
        answer: "JavaScript"
      },
      {
        question: "Tell us about your experience",
        type: "long_answer",
        answer: "I have been programming for over 5 years..."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Form Response #{id}</h1>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
            <div className="space-y-8">
              {formData.questions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-800 pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="text-white font-medium mb-2">{item.question}</h3>
                  
                  {item.type === 'multiple_choice' ? (
                    <div className="space-y-2">
                      {item.options?.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`flex items-center p-3 rounded-lg ${
                            option === item.answer
                              ? 'bg-blue-500/20 border border-blue-500/30'
                              : 'bg-gray-800/50 border border-gray-700'
                          }`}
                        >
                          {option === item.answer && (
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                          )}
                          <span className={option === item.answer ? 'text-blue-400' : 'text-gray-400'}>
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <p className="text-gray-300">{item.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormView;

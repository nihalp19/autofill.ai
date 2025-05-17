import React from 'react';
import { motion } from 'framer-motion';

function History() {
  const history = [
    {
      id: 1,
      formName: 'Customer Survey',
      date: '2024-02-28',
      status: 'Completed',
    },
    {
      id: 2,
      formName: 'Job Application',
      date: '2024-02-27',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gray-900/50 rounded-xl backdrop-blur-lg p-8 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Form History</h2>
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-black/30 p-4 rounded-lg border border-gray-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">{item.formName}</h3>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
                <span className="text-green-500">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default History;

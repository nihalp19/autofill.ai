import React from 'react';
import { motion } from 'framer-motion';

function Profile() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gray-900/50 rounded-xl backdrop-blur-lg p-8 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <p className="text-white">John Doe</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <p className="text-white">john@example.com</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;

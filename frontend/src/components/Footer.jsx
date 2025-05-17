import React from 'react';
import { ShieldCheck, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
     <footer className="bg-gray-950 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        
        <div className="border-t border-gray-800 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Autofill.AI. All rights reserved.
          </p>
          <p className="text-sm mt-4 md:mt-0">
            Developed by Nihal Pandey
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

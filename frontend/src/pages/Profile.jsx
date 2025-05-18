import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Save, GraduationCap,
  BookOpen, Calendar, Award, Briefcase, Building,
  Clock, Code, Camera
} from 'lucide-react';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',

    // Educational Information
    collegeName: 'University of Technology',
    collegeDegree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science',
    graduationYear: '2022',
    isGraduated: true,

    // Professional Information
    currentPosition: 'Software Developer',
    companyName: 'Tech Innovations Inc.',
    yearsOfExperience: '2',
    skills: 'JavaScript, React, Node.js, TypeScript'
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = () => {
    setFormData(prev => ({
      ...prev,
      isGraduated: !prev.isGraduated
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Profile updated successfully!');
  };

  const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor of Arts',
    'Bachelor of Science',
    'Master of Arts',
    'Master of Science',
    'Master of Business Administration',
    'Doctor of Philosophy'
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 56 }, (_, i) => (currentYear - 50 + i).toString());

  const FormInput = ({ label, name, type, icon: Icon, required }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-transparent transition-all duration-200 hover:bg-gray-800"
          required={required}
        />
      </div>
    </div>
  );

  const FormSelect = ({ label, name, icon: Icon, options }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg 
            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200 hover:bg-gray-800 appearance-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (

    <div className='bg-black min-h-screen flex justify-center items-center'>

      <motion.div
        className="text-center bg-black "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
      >
        <motion.div
          className="inline-block mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6 4A10 10 0 11 2 12a10 10 0 0120 0z"
            />
          </svg>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Profile Under Development
        </h1>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          We're working hard to bring you an awesome dashboard experience. Stay tuned for updates!
        </p>
        <span className="inline-block bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg font-semibold text-sm animate-pulse">
          Coming Soon
        </span>
      </motion.div>
    </div>




    // <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20">
    //   <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="max-w-3xl mx-auto"
    //     >
    //       <div className="flex items-center mb-8">
    //         <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
    //         <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
    //       </div>

    //       <div className="relative">
    //         <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
    //         <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 sm:p-8">
    //           <form onSubmit={handleSubmit} className="space-y-8">
    //             {/* Avatar Section */}
    //             <div className="flex flex-col items-center mb-8">
    //               <motion.div
    //                 className="relative group cursor-pointer"
    //                 whileHover={{ scale: 1.05 }}
    //                 onClick={handleAvatarClick}
    //               >
    //                 {avatar ? (
    //                   <img
    //                     src={avatar}
    //                     alt="Profile"
    //                     className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
    //                   />
    //                 ) : (
    //                   <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
    //                     flex items-center justify-center text-3xl font-bold text-white border-4 border-blue-500">
    //                     {getInitials(formData.fullName)}
    //                   </div>
    //                 )}
    //                 <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 
    //                   group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
    //                   <Camera className="w-8 h-8 text-white" />
    //                 </div>
    //               </motion.div>
    //               <input
    //                 type="file"
    //                 ref={fileInputRef}
    //                 onChange={handleAvatarChange}
    //                 accept="image/*"
    //                 className="hidden"
    //               />
    //               <p className="mt-2 text-sm text-gray-400">
    //                 Click to upload profile picture
    //               </p>
    //             </div>

    //             {/* Personal Information */}
    //             <div className="space-y-4">
    //               <div className="flex items-center mb-4">
    //                 <div className="mr-2 text-blue-500"><User className="h-5 w-5" /></div>
    //                 <h2 className="text-xl font-semibold text-white">Personal Information</h2>
    //               </div>
    //               <FormInput label="Full Name" name="fullName" type="text" icon={User} required />
    //               <FormInput label="Email Address" name="email" type="email" icon={Mail} required />
    //               <FormInput label="Phone Number" name="phone" type="tel" icon={Phone} />
    //               <FormInput label="Address" name="address" type="text" icon={MapPin} />
    //             </div>

    //             {/* Educational Information */}
    //             <div className="space-y-4">
    //               <div className="flex items-center mb-4">
    //                 <div className="mr-2 text-blue-500"><GraduationCap className="h-5 w-5" /></div>
    //                 <h2 className="text-xl font-semibold text-white">Educational Information</h2>
    //               </div>
    //               <FormInput label="College/University" name="collegeName" type="text" icon={BookOpen} />
    //               <FormSelect label="Degree" name="collegeDegree" icon={Award} options={degreeOptions} />
    //               <FormInput label="Field of Study" name="fieldOfStudy" type="text" icon={BookOpen} />
    //               <FormSelect label="Graduation Year" name="graduationYear" icon={Calendar} options={yearOptions} />
    //               <div className="flex items-center justify-between">
    //                 <span className="text-sm font-medium text-gray-300">Graduated</span>
    //                 <button
    //                   type="button"
    //                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
    //                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
    //                     focus:ring-offset-gray-900 ${formData.isGraduated ? 'bg-blue-600' : 'bg-gray-700'}`}
    //                   onClick={handleToggle}
    //                 >
    //                   <motion.span
    //                     className="inline-block h-4 w-4 rounded-full bg-white"
    //                     initial={false}
    //                     animate={{ x: formData.isGraduated ? 20 : 3 }}
    //                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
    //                   />
    //                 </button>
    //               </div>
    //             </div>

    //             {/* Professional Information */}
    //             <div className="space-y-4">
    //               <div className="flex items-center mb-4">
    //                 <div className="mr-2 text-blue-500"><Briefcase className="h-5 w-5" /></div>
    //                 <h2 className="text-xl font-semibold text-white">Professional Information</h2>
    //               </div>
    //               <FormInput label="Current Position" name="currentPosition" type="text" icon={Briefcase} />
    //               <FormInput label="Company/Organization" name="companyName" type="text" icon={Building} />
    //               <FormInput label="Years of Experience" name="yearsOfExperience" type="number" icon={Clock} />
    //               <FormInput label="Skills & Expertise" name="skills" type="text" icon={Code} />
    //             </div>

    //             <motion.button
    //               type="submit"
    //               className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 
    //                 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all 
    //                 flex items-center justify-center"
    //               whileHover={{ scale: 1.02 }}
    //               whileTap={{ scale: 0.98 }}
    //             >
    //               <Save className="h-5 w-5 mr-2" />
    //               Save Changes
    //             </motion.button>
    //           </form>
    //         </div>
    //       </div>
    //       <p className="text-gray-500 text-sm mt-6 text-center">
    //         Your information is securely stored and will not be shared with third parties.
    //       </p>
    //     </motion.div>
    //   </div>
    // </div>
  );
};

export default Profile;

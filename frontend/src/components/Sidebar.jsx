import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FileText,
  Settings,
  Users,
  History,
  LogOut,
  X,
  User,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { isSideBarOpen, toogleSideBar, user ,logout} = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation items and their routes
  const mainNavItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, to: '/home/dashboard' },
    { name: 'Docs', icon: <FileText className="w-5 h-5" />, to: '/docs' },
    { name: 'History', icon: <History className="w-5 h-5" />, to: '/home/history' },
    { name: 'Profile', icon: <Users className="w-5 h-5" />, to: '/home/profile' },
  ];

  const bottomNavItems = [
    { name: 'Logout', icon: <LogOut className="w-5 h-5" />, action: async() => {
      await logout()
      window.location.href = '/';
    }},
  ];

  // NavItem as a regular functional component
  const NavItem = ({ name, icon, to, active, onClick }) => (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group flex items-center gap-x-3 rounded-lg px-3 py-2 my-1 text-sm font-medium cursor-pointer ${
        active
          ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className={`${active ? 'text-blue-500' : 'text-gray-400 group-hover:text-white'}`}>
        {icon}
      </div>
      <span>{name}</span>
      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500"></span>
      )}
    </motion.li>
  );

  // Backdrop for mobile
  const Backdrop = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={toogleSideBar}
    />
  );

  return (
    <AnimatePresence>
      {isSideBarOpen && (
        <>
          <Backdrop />
          <motion.aside
            className="fixed inset-y-0 left-0 w-64 bg-gray-900/95 backdrop-blur-md border-r border-gray-800 pt-5 pb-4 flex flex-col z-[60] lg:translate-x-0"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
              closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
            }}
          >
            <div className="flex items-center justify-between px-4 mb-6">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {navigate('/home'); toogleSideBar(false);}}
                style={{cursor: 'pointer'}}
              >
                <ShieldCheck className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-white font-bold text-xl">Autofill.AI</span>
              </motion.div>
              <button
                className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
                onClick={toogleSideBar}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="px-3 pt-1 mb-3">
                  <div className="flex items-center p-2 rounded-lg bg-gray-800/50 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-white">{user?.name || 'Alex Johnson'}</p>
                      <p className="text-xs text-gray-400">{user?.email || 'alex@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="px-3">
                  <nav className="space-y-1">
                    <motion.ul className="space-y-2">
                      {mainNavItems.map((item) => (
                        <NavItem
                          key={item.name}
                          name={item.name}
                          icon={item.icon}
                          to={item.to}
                          active={item.to && location.pathname.startsWith(item.to)}
                          onClick={() => {
                            navigate(item.to);
                            toogleSideBar(false);
                          }}
                        />
                      ))}
                    </motion.ul>
                  </nav>
                </div>
              </div>

              <div className="px-3 pt-4 border-t border-gray-800 mt-5">
                <motion.ul className="space-y-2">
                  {bottomNavItems.map((item) => (
                    <NavItem
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      onClick={item.action}
                    />
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

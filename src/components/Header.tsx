import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, HelpCircle, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed = false }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header 
      className="bg-[#0a1628] border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4 fixed top-0 right-0 z-40 transition-all duration-300"
      animate={{
        left: sidebarCollapsed ? '80px' : '280px'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-between max-w-full">
        {/* Left side - Logo for mobile */}
        <div className="sm:hidden flex items-center">
          <div className="text-white font-semibold text-lg">finicity</div>
        </div>

        {/* Spacer for desktop */}
        <div className="hidden sm:block"></div>

        {/* Right side - User info and icons */}
        <motion.div 
          className="flex items-center gap-1 sm:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Search icon */}
          <motion.button 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
          >
            <Search size={18} className="sm:w-5 sm:h-5" />
          </motion.button>

          {/* Info icon */}
          <motion.button 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-500/10 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Information"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Info size={14} className="sm:w-4 sm:h-4 text-blue-400" />
            </div>
          </motion.button>

          {/* Help icon */}
          <motion.button 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-500/10 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Help"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
              <HelpCircle size={14} className="sm:w-4 sm:h-4 text-blue-400" />
            </div>
          </motion.button>

          {/* Bell icon with notification badge */}
          <motion.button 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
            <motion.span 
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a1628]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Divider - hidden on mobile */}
          <div className="hidden sm:block w-px h-8 bg-gray-700 mx-1"></div>

          {/* User profile */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 ml-1 cursor-pointer group relative"
            whileHover={{ scale: 1.01 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <motion.div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-blue-500 transition-colors shadow-lg flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* User info - hidden on small mobile */}
            <div className="hidden md:block text-sm">
              <div className="font-medium text-white text-sm leading-tight">John Doe</div>
              <div className="text-xs text-gray-400 leading-tight">Geide Elektrik Kurumu</div>
            </div>
            
            <motion.div
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block"
            >
              <ChevronDown size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-[#1a2942] rounded-lg shadow-xl border border-gray-700 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <div className="font-medium text-white text-sm">John Doe</div>
                    <div className="text-xs text-gray-400">Geide Elektrik Kurumu</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-gray-700">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
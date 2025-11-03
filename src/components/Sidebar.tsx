import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  TrendingUp,
  PieChart,
  Briefcase,
  Package,
  LineChart,
  DollarSign,
  Bot,
  Calculator,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  active: boolean;
  subItems?: SubMenuItem[];
  path?: string;
}

interface SubMenuItem {
  label: string;
  path: string;
  active?: boolean;
}

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, onNavigate, currentPath = '/' }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(2);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Anasayfa', active: currentPath === '/', path: '/', subItems: [] },
    { icon: TrendingUp, label: 'Hisse Senetleri', active: false, path: '/stocks', subItems: [] },
    { 
      icon: PieChart, 
      label: 'Yatırım Fonları', 
      active: currentPath.startsWith('/investment-funds'),
      subItems: [
        { label: 'Yatırım Fonları Detaylı Analiz', path: '/investment-funds/detailed-analysis' },
        { label: 'Yıldız/Derecelendirme', path: '/investment-funds/rating' },
        { label: 'PYŞ-Şirket Bazlı Analiz', path: '/investment-funds/company-analysis' },
        { label: 'Şirket İçi Karşılaştırma', path: '/investment-funds/company-comparison', active: currentPath === '/investment-funds/company-comparison' },
        { label: 'Yatırım Fonu', path: '/investment-funds/fund' },
        { label: 'Yatırım Fonu Risk Analizi', path: '/investment-funds/risk-analysis', active: currentPath === '/investment-funds/risk-analysis' },
        { label: 'Model Portföy Özelleştirme', path: '/investment-funds/portfolio-model' },
        { label: 'Yatırım Fonu Karşılaştırmalı Analiz', path: '/investment-funds/comparative' },
        { label: 'Portföy Değişim Analizi', path: '/investment-funds/portfolio-change' }
      ]
    },
    { icon: Briefcase, label: 'Kripto', active: false, path: '/crypto', subItems: [] },
    { icon: Package, label: 'Emtia', active: false, path: '/commodities', subItems: [] },
    { icon: LineChart, label: 'Tahvil', active: false, path: '/bonds', subItems: [] },
    { icon: DollarSign, label: 'Forex', active: false, path: '/forex', subItems: [] },
    { icon: Bot, label: 'Finicify AI', active: false, path: '/ai', subItems: [] },
    { icon: Calculator, label: 'Hesap Makinesi', active: false, path: '/calculator', subItems: [] },
    { icon: FileText, label: 'Raporlama', active: false, path: '/reports', subItems: [] }
  ];

  const toggleExpand = (index: number) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      onToggle?.(false);
    }
    setExpandedItem(expandedItem === index ? null : index);
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle?.(newCollapsedState);
    if (newCollapsedState) {
      setExpandedItem(null);
    }
  };

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
  };

  const handleSubItemClick = (path: string, parentIndex: number) => {
    setExpandedItem(parentIndex);
    handleNavigation(path);
  };

  return (
    <motion.aside 
      className="bg-dark-bg border-r border-gray-800 h-screen overflow-hidden fixed left-0 top-0 z-50 flex flex-col"
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between min-h-[72px]">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="text-primary-blue text-2xl font-bold">≋ finicify</div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-nav-active/50 text-gray-400 hover:text-white transition-all ml-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </motion.button>
      </div>

      {/* Navigation with custom scrollbar */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sidebar-scrollbar">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <motion.div
                className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  item.active 
                    ? 'bg-nav-active text-white' 
                    : 'text-gray-400 hover:bg-nav-active/50 hover:text-white'
                }`}
                whileHover={{ x: isCollapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (item.subItems && item.subItems.length > 0) {
                    toggleExpand(index);
                  } else if (item.path) {
                    handleNavigation(item.path);
                  }
                }}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} className="flex-shrink-0" />
                
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm flex-1 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {!isCollapsed && item.subItems && item.subItems.length > 0 && (
                  <motion.div
                    animate={{ rotate: expandedItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} className="flex-shrink-0" />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Sub-items */}
              <AnimatePresence>
                {!isCollapsed && item.active && item.subItems && item.subItems.length > 0 && expandedItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-1 ml-3"
                  >
                    <div className="space-y-1 pl-6 border-l border-gray-700">
                      {item.subItems.map((subItem, subIndex) => (
                        <motion.div
                          key={subIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: subIndex * 0.03 }}
                          className={`px-3 py-2.5 text-xs rounded-lg cursor-pointer transition-all duration-200 ${
                            subItem.active || currentPath === subItem.path
                              ? 'bg-nav-active text-white font-medium' 
                              : 'text-gray-400 hover:text-gray-200 hover:bg-nav-active/30'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSubItemClick(subItem.path, index)}
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight size={12} className="flex-shrink-0" />
                            <span className="leading-tight">{subItem.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-gray-800">
        <motion.div
          className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-gray-400 hover:bg-nav-active/50 hover:text-white transition-all duration-200"
          whileHover={{ x: isCollapsed ? 0 : 4 }}
          whileTap={{ scale: 0.98 }}
          title={isCollapsed ? 'Ayarlar' : ''}
          onClick={() => handleNavigation('/settings')}
        >
          <Settings size={20} className="flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap"
              >
                Ayarlar
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
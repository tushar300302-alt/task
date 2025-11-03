import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsBox from './components/StatsBox';
import ComparisonTable from './components/ComparisonTable';
import CompanyComparisonCard from './components/CompanyComparisonCard';
import PerformanceChart from './components/PerformanceChart';
import RiskMetricsHeatmap from './components/RiskMetricsHeatmap';
import SectorRiskChart from './components/SectorRiskChart';
import './index.css';

function App() {
  const [compareMode, setCompareMode] = useState<'sector' | 'company'>('company');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('/investment-funds/company-comparison');

  // Mock data for comparison table
  const comparisonData = [
    { company: 'Yapı Kredi Portföy Yönetimi A.Ş.', points: '12', budget: '34.53', avgGorne: '23.53', avgGrneli: '23.24', volatility: '23.14' },
    { company: 'Deniz Portföy Yönetimi A.Ş.', points: '15', budget: '42.18', avgGorne: '25.67', avgGrneli: '24.89', volatility: '21.56' },
    { company: 'Atlas Portföy Yönetimi A.Ş.', points: '10', budget: '28.95', avgGorne: '22.34', avgGrneli: '21.78', volatility: '24.32' },
    { company: 'Ak Portföy Yönetimi A.Ş.', points: '18', budget: '51.27', avgGorne: '27.89', avgGrneli: '26.45', volatility: '19.87' },
    { company: 'İş Portföy Yönetimi A.Ş.', points: '14', budget: '38.64', avgGorne: '24.12', avgGrneli: '23.56', volatility: '22.43' },
    { company: 'Garanti Portföy Yönetimi A.Ş.', points: '16', budget: '45.92', avgGorne: '26.34', avgGrneli: '25.67', volatility: '20.98' },
    { company: 'TEB Portföy Yönetimi A.Ş.', points: '11', budget: '31.48', avgGorne: '21.89', avgGrneli: '21.23', volatility: '23.76' },
    { company: 'Ziraat Portföy Yönetimi A.Ş.', points: '13', budget: '36.75', avgGorne: '23.45', avgGrneli: '22.89', volatility: '22.15' },
  ];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/investment-funds/risk-analysis':
        return <RiskAnalysisPage />;
      case '/investment-funds/company-comparison':
      default:
        return <ComparisonPage compareMode={compareMode} setCompareMode={setCompareMode} comparisonData={comparisonData} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar onToggle={setSidebarCollapsed} onNavigate={handleNavigation} currentPath={currentPath} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <motion.main 
        className="pt-20 p-4 sm:p-5 md:p-6 transition-all duration-300"
        animate={{ 
          marginLeft: sidebarCollapsed ? '80px' : '280px' 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>

        {/* Floating Chat Button */}
        <motion.button
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 z-50 group"
          style={{ backgroundColor: '#0EA5E9' }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1,
            type: 'spring',
            stiffness: 200
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </motion.div>
          
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: '#0EA5E9' }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
          
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            Yardım için sohbet başlat
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </motion.div>
        </motion.button>
      </motion.main>
    </div>
  );
}

// Risk Analysis Page Component
const RiskAnalysisPage: React.FC = () => {
  return (
    <motion.div
      key="risk-analysis"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Yatırım Fonu Risk Analizi
      </motion.h1>

      <motion.p 
        className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Farklı fonların risk metriklerini karşılaştırın ve analiz edin.
      </motion.p>

      <RiskMetricsHeatmap />

      <SectorRiskChart />

      <motion.div
        className="rounded-lg p-4 sm:p-5 md:p-6 mt-6"
        style={{ backgroundColor: '#1a2332' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <h3 className="text-white font-medium text-base sm:text-lg mb-3">
          Risk Metrikleri Hakkında
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Bu ısı haritası, portföy fonlarının çeşitli risk metriklerine göre karşılaştırmasını gösterir. 
          Mavi renkler düşük riski, kırmızı renkler ise yüksek riski temsil eder. Her bir hücreye tıklayarak 
          detaylı bilgi alabilirsiniz.
        </p>
      </motion.div>
    </motion.div>
  );
};

// Comparison Page Component
interface ComparisonPageProps {
  compareMode: 'sector' | 'company';
  setCompareMode: (mode: 'sector' | 'company') => void;
  comparisonData: any[];
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ compareMode, setCompareMode, comparisonData }) => {
  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Şirket içi karşılaştırma
      </motion.h1>

      <motion.div 
        className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.button
          onClick={() => setCompareMode('sector')}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
            compareMode === 'sector'
              ? 'bg-dark-bg border-2 border-gray-600 text-white shadow-lg'
              : 'bg-transparent border-2 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Şirketi Sektörü ile Karşılaştırma
        </motion.button>
        <motion.button
          onClick={() => setCompareMode('company')}
          style={{
            backgroundColor: compareMode === 'company' ? '#0EA5E9' : 'transparent',
            borderColor: compareMode === 'company' ? '#0EA5E9' : '#374151',
            color: compareMode === 'company' ? '#ffffff' : '#9ca3af'
          }}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border-2`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Şirketin Fonlarını Kendi İçinde Karşılaştırma
        </motion.button>
      </motion.div>

      <motion.p 
        className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Şirket Seçimi: Belirli bir portföy yönetimi şirketinin fonlarını olarak analiz edin.
      </motion.p>

      <CompanyComparisonCard />

      <motion.div 
        className="rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6"
        style={{ backgroundColor: '#1a2332' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
          <h3 className="text-white font-medium text-base sm:text-lg">
            Şirket Analizi
          </h3>
          <motion.button 
            className="text-xs sm:text-sm hover:underline"
            style={{ color: '#0EA5E9' }}
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Sektörle Karşılaştır →
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatsBox label="Toplam Fon Sayısı" value="75" delay={0} />
          <StatsBox label="Toplam Yönetilen Varlık Büyüklüğü" value="75.7B TL" delay={0.1} />
          <StatsBox label="Ortalama Yönetim Ücreti" value="2.03%" delay={0.2} />
          <StatsBox label="Ortalama 1 Yıl Getiri" value="23.61%" delay={0.3} />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {compareMode === 'company' ? (
          <motion.div
            key="company-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ComparisonTable data={comparisonData} />
            <PerformanceChart />
          </motion.div>
        ) : (
          <motion.div
            key="sector-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg p-8 sm:p-12 text-center"
            style={{ backgroundColor: '#0F1F35' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Sektör Karşılaştırma Görünümü
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                Bu görünüm seçili şirketi sektör ortalamaları ile karşılaştırır.
              </p>
              <motion.div
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'rgba(14, 165, 233, 0.2)',
                  color: '#0EA5E9'
                }}
                whileHover={{ scale: 1.05 }}
              >
                Yakında Aktif Olacak
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
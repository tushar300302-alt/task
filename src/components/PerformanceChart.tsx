import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  label: string;
  values: {
    [key: string]: number;
  };
}

const PerformanceChart: React.FC = () => {
  const periods = ['1 hafta', '1 ay', '6 ay', '2025', '1 Yıl', '5 Yıl'];
  const [selectedPeriod, setSelectedPeriod] = useState('6 ay');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Data for each fund with different values for each period
  const chartData: ChartData[] = [
    { 
      label: 'Teknoloji Fonu', 
      values: {
        '1 hafta': 2.5,
        '1 ay': 5.8,
        '6 ay': 14.64,
        '2025': 18.2,
        '1 Yıl': 22.5,
        '5 Yıl': 145.3
      }
    },
    { 
      label: 'Global Hisse Senedi', 
      values: {
        '1 hafta': 1.8,
        '1 ay': 4.2,
        '6 ay': 14.64,
        '2025': 16.8,
        '1 Yıl': 19.8,
        '5 Yıl': 128.4
      }
    },
    { 
      label: 'Yapay Zeka Fonu', 
      values: {
        '1 hafta': 3.2,
        '1 ay': 7.1,
        '6 ay': 14.64,
        '2025': 21.4,
        '1 Yıl': 28.9,
        '5 Yıl': 167.2
      }
    },
    { 
      label: 'Portföy Fonu', 
      values: {
        '1 hafta': 1.2,
        '1 ay': 3.4,
        '6 ay': 14.64,
        '2025': 15.2,
        '1 Yıl': 17.6,
        '5 Yıl': 98.7
      }
    },
    { 
      label: 'Sürdürülebilirlik Fonu', 
      values: {
        '1 hafta': 2.8,
        '1 ay': 6.5,
        '6 ay': 14.64,
        '2025': 19.7,
        '1 Yıl': 25.3,
        '5 Yıl': 152.8
      }
    },
  ];

  // Calculate max value for scaling
  const getCurrentValues = () => {
    return chartData.map(item => item.values[selectedPeriod]);
  };

  const maxValue = Math.max(...getCurrentValues());
  const getBarWidth = (value: number) => (value / maxValue) * 100;

  // Month labels for x-axis
  const monthLabels = ['Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'];

  return (
    <motion.div 
      className="rounded-lg p-6"
      style={{ backgroundColor: '#0F1F35' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-white font-medium text-lg flex items-center gap-2">
          <TrendingUp size={20} style={{ color: '#0EA5E9' }} />
          Şirket İçi Performans Grafiği - En İyi 5 Fon
        </h3>
      </div>

      {/* Period selector */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {periods.map((period, index) => (
          <motion.button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200`}
            style={{
              backgroundColor: selectedPeriod === period ? '#1E3A5F' : '#0A1628',
              color: selectedPeriod === period ? '#ffffff' : '#9ca3af'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {period}
          </motion.button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="relative">
        {/* Y-axis values */}
        <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
          {Array.from({ length: 7 }, (_, i) => {
            const value = (maxValue / 6) * i;
            return (
              <span key={i} className="w-12 text-center">
                {value.toFixed(2)}
              </span>
            );
          })}
        </div>

        {/* Chart bars */}
        <div className="space-y-3 pt-4 pb-8">
          <AnimatePresence mode="wait">
            {chartData.map((item, index) => {
              const currentValue = item.values[selectedPeriod];
              const barWidth = getBarWidth(currentValue);
              
              return (
                <motion.div
                  key={`${item.label}-${selectedPeriod}`}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="flex items-center gap-3">
                    {/* Label */}
                    <motion.div 
                      className="w-44 text-sm flex-shrink-0"
                      style={{ color: hoveredBar === index ? '#ffffff' : '#d1d5db' }}
                      animate={{ x: hoveredBar === index ? 4 : 0 }}
                    >
                      {item.label}
                    </motion.div>

                    {/* Bar container with grid lines */}
                    <div className="flex-1 relative h-10">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex justify-between">
                        {Array.from({ length: 7 }, (_, i) => (
                          <div
                            key={i}
                            className="w-px h-full"
                            style={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                          />
                        ))}
                      </div>

                      {/* Bar */}
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-r-sm overflow-hidden"
                        style={{ 
                          backgroundColor: '#0EA5E9',
                          boxShadow: hoveredBar === index ? '0 0 20px rgba(14, 165, 233, 0.5)' : 'none'
                        }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${barWidth}%`,
                          filter: hoveredBar === index ? 'brightness(1.2)' : 'brightness(1)'
                        }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 50
                        }}
                      >
                        {/* Value label inside bar */}
                        <motion.div 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs font-semibold whitespace-nowrap"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          {currentValue.toFixed(2)}
                        </motion.div>

                        {/* Shimmer effect on hover */}
                        {hoveredBar === index && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                            }}
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ 
                              duration: 1, 
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* X-axis labels (months) */}
        <motion.div
          className="flex justify-between text-xs text-gray-400 pt-2"
          style={{ borderTop: '1px solid #374151' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {monthLabels.map((month, index) => (
            <span key={index} className="w-12 text-center">
              {month}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
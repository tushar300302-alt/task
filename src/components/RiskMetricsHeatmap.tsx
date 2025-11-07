import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RiskData {
  fundName: string;
  metrics: number[];
}

const RiskMetricsHeatmap: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('risk');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Column headers for risk metrics
  const metricHeaders = [
    'Risk Metric 1',
    'Risk Metric 2', 
    'Risk Metric 3',
    'Risk Metric 4',
    'Risk Metric 5',
    'Risk Metric 6'
  ];

  // Mobile-friendly short headers
  const mobileHeaders = ['RM1', 'RM2', 'RM3', 'RM4', 'RM5', 'RM6'];

  // Sample data - 20 funds with 6 metrics each
  const riskData: RiskData[] = Array.from({ length: 20 }, (_) => ({
    fundName: 'Atlas Portföy Yönetimi Fonu',
    metrics: Array.from({ length: 6 }, () => 
      Number((Math.random() * 4 + 4).toFixed(2)) // Random values between 4 and 8
    )
  }));

  // Get color based on value (heatmap colors)
  const getHeatmapColor = (value: number): string => {
    // Value range: 4-8
    // Red (high) to Green (low)
    if (value >= 7.5) return '#FF4444'; // Red
    if (value >= 7) return '#FF6B6B';
    if (value >= 6.5) return '#FFA07A';
    if (value >= 6) return '#FFB84D';
    if (value >= 5.5) return '#FFD700';
    if (value >= 5) return '#90EE90';
    if (value >= 4.5) return '#7FD8FF';
    if (value >= 4.2) return '#4DA6FF';
    return '#0080FF'; // Blue (low)
  };

  // Get text color based on background brightness
  const getTextColor = (bgColor: string): string => {
    // Light colors get dark text, dark colors get light text
    const lightColors = ['#FFD700', '#90EE90', '#7FD8FF'];
    return lightColors.some(c => bgColor.includes(c)) ? '#1a2332' : '#ffffff';
  };

  return (
    <motion.div
      className="rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 mb-4 sm:mb-6"
      style={{ backgroundColor: '#1a2332' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      {/* Tab Buttons */}
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
        <motion.button
          onClick={() => setSelectedTab('risk')}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: selectedTab === 'risk' ? '#0EA5E9' : 'transparent',
            border: `2px solid ${selectedTab === 'risk' ? '#0EA5E9' : '#374151'}`,
            color: selectedTab === 'risk' ? '#ffffff' : '#9ca3af'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Risk Metrikleri
        </motion.button>
        <motion.button
          onClick={() => setSelectedTab('performance')}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: selectedTab === 'performance' ? '#0EA5E9' : 'transparent',
            border: `2px solid ${selectedTab === 'performance' ? '#0EA5E9' : '#374151'}`,
            color: selectedTab === 'performance' ? '#ffffff' : '#9ca3af'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Performance
        </motion.button>
        <motion.button
          onClick={() => setSelectedTab('other')}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: selectedTab === 'other' ? '#0EA5E9' : 'transparent',
            border: `2px solid ${selectedTab === 'other' ? '#0EA5E9' : '#374151'}`,
            color: selectedTab === 'other' ? '#ffffff' : '#9ca3af'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Other
        </motion.button>
      </div>

      {/* Heatmap Title */}
      <h3 className="text-white font-medium text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
        Risk Metrikleri Karşılaştırması
      </h3>

      {/* Heatmap Container with Horizontal Scroll */}
      <div className="rounded-lg overflow-hidden">
        <div className="flex">
          {/* Fund Names Column - Fixed (No Scroll) */}
          <div 
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 z-20" 
            style={{ 
              backgroundColor: '#2a3441'
            }}
          >
            {/* Empty corner cell */}
            <div className="h-10 sm:h-12 border-b border-gray-700 flex items-center justify-center" style={{ backgroundColor: '#2a3441' }}>
              <span className="text-xs text-gray-500 font-medium hidden md:block">Fund Name</span>
            </div>
            
            {/* Fund name cells */}
            {riskData.map((fund, index) => (
              <motion.div
                key={index}
                className="h-8 sm:h-9 md:h-10 px-2 sm:px-3 flex items-center text-xs sm:text-sm text-gray-300 border-b border-gray-700 overflow-hidden"
                style={{ backgroundColor: '#2a3441' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                title={fund.fundName}
              >
                <span className="truncate">{fund.fundName}</span>
              </motion.div>
            ))}
          </div>

          {/* Scrollable Metrics Section */}
          <div className="flex-1 overflow-x-auto -mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6 px-3 sm:px-4 md:px-5 lg:px-6">
            <div className="min-w-[500px] sm:min-w-[560px] md:min-w-[650px]">
              <div className="flex">
                {/* Metrics Columns */}
                {metricHeaders.map((header, colIndex) => (
                  <div 
                    key={colIndex} 
                    className="flex-1 min-w-[70px] sm:min-w-[85px] md:min-w-[100px]"
                  >
                    {/* Header cell - Responsive text */}
                    <div 
                      className="h-10 sm:h-12 px-2 sm:px-3 flex items-center justify-center text-xs sm:text-sm font-medium text-white border-b border-l border-gray-700"
                      style={{ backgroundColor: '#2a3441' }}
                    >
                      {/* Show short version on mobile, full on desktop */}
                      <span className="hidden md:block">{header}</span>
                      <span className="md:hidden">{mobileHeaders[colIndex]}</span>
                    </div>
                    
                    {/* Data cells - Responsive sizing */}
                    {riskData.map((fund, rowIndex) => {
                      const value = fund.metrics[colIndex];
                      const bgColor = getHeatmapColor(value);
                      const textColor = getTextColor(bgColor);
                      const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                      
                      return (
                        <motion.div
                          key={rowIndex}
                          className="h-8 sm:h-9 md:h-10 px-1 sm:px-2 md:px-3 flex items-center justify-center text-xs sm:text-sm font-medium border-b border-l border-gray-700/50 cursor-pointer relative"
                          style={{ 
                            backgroundColor: bgColor,
                            color: textColor,
                            ...(isSelected && {
                              boxShadow: '0 0 0 2px #0EA5E9 inset',
                              zIndex: 5
                            })
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: (rowIndex * 0.02) + (colIndex * 0.05) 
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            zIndex: 10,
                            boxShadow: '0 0 15px rgba(14, 165, 233, 0.6)'
                          }}
                          onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                        >
                          {value.toFixed(2)}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}

                {/* Color Scale Legend - Responsive with Full Height */}
                <div className="flex-shrink-0 w-8 sm:w-10 md:w-12 ml-1 sm:ml-2 flex flex-col">
                  {/* Header space */}
                  <div className="h-10 sm:h-12 border-b border-transparent"></div>
                  
                  {/* Gradient scale - Takes full remaining height */}
                  <div 
                    className="flex-1 rounded"
                    style={{
                      background: 'linear-gradient(to bottom, #FF4444, #FF6B6B, #FFA07A, #FFB84D, #FFD700, #90EE90, #7FD8FF, #4DA6FF, #0080FF)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend - Responsive Text */}
      <div className="flex items-center justify-between mt-3 sm:mt-4 text-xs text-gray-400 px-1">
        <span className="text-left">Düşük Risk</span>
        <span className="text-center">Orta Risk</span>
        <span className="text-right">Yüksek Risk</span>
      </div>

      {/* Mobile Helper Text */}
      <div className="mt-3 sm:mt-4 text-xs text-gray-500 text-center md:hidden">
        <p>← Kaydırın →</p>
      </div>

      {/* Selected Cell Info - Mobile Friendly */}
      {selectedCell && (
        <motion.div
          className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg"
          style={{ backgroundColor: '#2a3441' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Seçili Fon</p>
              <p className="text-sm sm:text-base text-white font-medium truncate">
                {riskData[selectedCell.row].fundName}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Metrik</p>
                <p className="text-sm sm:text-base text-white font-medium">
                  {metricHeaders[selectedCell.col]}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Değer</p>
                <p 
                  className="text-base sm:text-lg font-bold px-3 py-1 rounded"
                  style={{
                    backgroundColor: getHeatmapColor(riskData[selectedCell.row].metrics[selectedCell.col]),
                    color: getTextColor(getHeatmapColor(riskData[selectedCell.row].metrics[selectedCell.col]))
                  }}
                >
                  {riskData[selectedCell.row].metrics[selectedCell.col].toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedCell(null)}
            className="mt-3 text-xs text-gray-400 hover:text-white transition-colors"
          >
            ✕ Kapat
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RiskMetricsHeatmap;
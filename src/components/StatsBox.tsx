import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsBoxProps {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  delay?: number;
}

const StatsBox: React.FC<StatsBoxProps> = ({ 
  label, 
  value, 
  trend,
  trendValue,
  delay = 0
}) => {
  return (
    <motion.div 
      className="rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[100px] sm:min-h-[110px] md:min-h-[120px] relative overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#222B38'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient overlay - matching SVG blur effect */}
      <div 
        className="absolute -top-32 -right-20 w-44 h-80 rounded-full opacity-30 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #006EF9 0%, transparent 70%)'
        }}
      />
      
      <div className="relative z-10 w-full space-y-2 sm:space-y-3">
        {/* Label with optional trend */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-[#AEB9E1] text-xs sm:text-sm leading-tight">
            {label}
          </span>
          {trend && trendValue && (
            <motion.div
              className={`flex items-center gap-1 text-xs flex-shrink-0 ${
                trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{trendValue}</span>
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div 
          className="text-white text-2xl sm:text-3xl md:text-4xl font-bold"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsBox;
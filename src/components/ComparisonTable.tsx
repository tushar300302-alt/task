import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

interface TableData {
  company: string;
  points: string;
  budget: string;
  avgGorne: string;
  avgGrneli: string;
  volatility: string;
}

interface ComparisonTableProps {
  data: TableData[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const headers = [
    { key: 'company', label: 'Yansıma' },
    { key: 'points', label: 'Pkt Sayısı' },
    { key: 'budget', label: 'Toplam Bütçelük (₺)' },
    { key: 'avgGorne', label: 'Ortalama Gröne (%)' },
    { key: 'avgGrneli', label: 'Ortalama Grneli (%)' },
    { key: 'volatility', label: 'Ortalama Volatilite (%)' }
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <motion.div 
      className="bg-card-bg rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="text-white font-medium text-lg mb-4">Şirket Bazlı Karşılaştırma</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {headers.map((header, index) => (
                <motion.th
                  key={header.key}
                  className="text-left text-gray-400 text-sm font-medium py-3 px-4 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort(header.key)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(30, 58, 95, 0.2)' }}
                >
                  <div className="flex items-center gap-2">
                    {header.label}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-gray-600 group-hover:text-gray-400"
                    >
                      {sortColumn === header.key ? (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </motion.div>
                  </div>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((row, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                >
                  <td className="py-4 px-4 text-white text-sm">{row.company}</td>
                  <td className="py-4 px-4 text-white text-sm">
                    <motion.span
                      className="inline-block px-2 py-1 bg-blue-900/30 rounded group-hover:bg-blue-800/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {row.points}
                    </motion.span>
                  </td>
                  <td className="py-4 px-4 text-white text-sm font-medium">{row.budget}</td>
                  <td className="py-4 px-4 text-white text-sm">{row.avgGorne}</td>
                  <td className="py-4 px-4 text-white text-sm">{row.avgGrneli}</td>
                  <td className="py-4 px-4 text-white text-sm">
                    <motion.span
                      className="inline-block"
                      whileHover={{ scale: 1.1 }}
                    >
                      {row.volatility}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;
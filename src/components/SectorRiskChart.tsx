import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

interface SectorData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; 
}

interface FundData {
  id: number;
  fundName: string;
  sector: string;
  return1Year: number;
  return3Year: number;
  riskLevel: 'Düşük' | 'Orta' | 'Yüksek';
  aum: number; // Assets Under Management in millions
}

const SectorRiskChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FundData;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Sector risk distribution data
  const sectorData: SectorData[] = [
    { name: 'Teknoloji', value: 28, color: '#0EA5E9' },
    { name: 'Finans', value: 22, color: '#8B5CF6' },
    { name: 'Enerji', value: 18, color: '#10B981' },
    { name: 'Sağlık', value: 15, color: '#F59E0B' },
    { name: 'Emlak', value: 10, color: '#EF4444' },
    { name: 'Diğer', value: 7, color: '#6B7280' },
  ];

  // Top performing funds data
  const [fundsData, setFundsData] = useState<FundData[]>([
    { id: 1, fundName: 'Teknoloji Büyüme Fonu', sector: 'Teknoloji', return1Year: 24.5, return3Year: 68.2, riskLevel: 'Yüksek', aum: 1250 },
    { id: 2, fundName: 'Global Finans Fonu', sector: 'Finans', return1Year: 18.3, return3Year: 45.6, riskLevel: 'Orta', aum: 980 },
    { id: 3, fundName: 'Yenilenebilir Enerji Fonu', sector: 'Enerji', return1Year: 22.1, return3Year: 52.4, riskLevel: 'Orta', aum: 750 },
    { id: 4, fundName: 'Sağlık Teknolojileri Fonu', sector: 'Sağlık', return1Year: 20.8, return3Year: 58.3, riskLevel: 'Yüksek', aum: 890 },
    { id: 5, fundName: 'Emlak Yatırım Fonu', sector: 'Emlak', return1Year: 12.4, return3Year: 32.1, riskLevel: 'Düşük', aum: 650 },
    { id: 6, fundName: 'Yapay Zeka Fonu', sector: 'Teknoloji', return1Year: 32.7, return3Year: 85.5, riskLevel: 'Yüksek', aum: 1420 },
    { id: 7, fundName: 'Bankacılık Fonu', sector: 'Finans', return1Year: 15.6, return3Year: 38.9, riskLevel: 'Orta', aum: 1100 },
    { id: 8, fundName: 'Biyoteknoloji Fonu', sector: 'Sağlık', return1Year: 28.3, return3Year: 72.8, riskLevel: 'Yüksek', aum: 820 },
  ]);

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg p-3 shadow-xl border border-gray-700" style={{ backgroundColor: '#1a2332' }}>
          <p className="text-white font-semibold text-sm">{payload[0].name}</p>
          <p className="text-gray-400 text-xs mt-1">
            {payload[0].value}% Risk Dağılımı
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Sorting function
  const handleSort = (key: keyof FundData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...fundsData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFundsData(sorted);
  };

  // Get sort icon
  const getSortIcon = (key: keyof FundData) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-gray-500" />;
    }
    return sortConfig.direction === 'asc' ? (
      <TrendingUp size={14} className="text-blue-400" />
    ) : (
      <TrendingDown size={14} className="text-blue-400" />
    );
  };

  // Risk level badge color
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Düşük': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Orta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Yüksek': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <motion.div
      className="rounded-lg p-4 sm:p-5 md:p-6 mb-6"
      style={{ backgroundColor: '#1a2332' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-white font-medium text-lg sm:text-xl mb-2">
          Sektör Risk Dağılımı
        </h3>
        <p className="text-gray-400 text-sm">
          Portföy fonlarının sektörlere göre risk dağılımı ve en iyi performans gösteren fonlar
        </p>
      </div>

      {/* Donut Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={140}
              innerRadius={90}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {sectorData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))' : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-gray-300 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Funds Table */}
      <div>
        <h4 className="text-white font-medium text-base sm:text-lg mb-4">
          En İyi Performans Gösteren Fonlar
        </h4>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full min-w-[800px]">
            <thead style={{ backgroundColor: '#2a3441' }}>
              <tr>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('fundName')}
                >
                  <div className="flex items-center gap-2">
                    Fon Adı
                    {getSortIcon('fundName')}
                  </div>
                </th>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('sector')}
                >
                  <div className="flex items-center gap-2">
                    Sektör
                    {getSortIcon('sector')}
                  </div>
                </th>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('return1Year')}
                >
                  <div className="flex items-center gap-2">
                    1 Yıllık Getiri
                    {getSortIcon('return1Year')}
                  </div>
                </th>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('return3Year')}
                >
                  <div className="flex items-center gap-2">
                    3 Yıllık Getiri
                    {getSortIcon('return3Year')}
                  </div>
                </th>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('riskLevel')}
                >
                  <div className="flex items-center gap-2">
                    Risk Seviyesi
                    {getSortIcon('riskLevel')}
                  </div>
                </th>
                <th
                  className="text-left text-gray-300 text-xs sm:text-sm font-medium py-3 px-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
                  onClick={() => handleSort('aum')}
                >
                  <div className="flex items-center gap-2">
                    Büyüklük (M₺)
                    {getSortIcon('aum')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {fundsData.map((fund, index) => (
                <motion.tr
                  key={fund.id}
                  className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                >
                  <td className="py-3 px-4 text-white text-sm">{fund.fundName}</td>
                  <td className="py-3 px-4">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: sectorData.find(s => s.name === fund.sector)?.color + '20',
                        color: sectorData.find(s => s.name === fund.sector)?.color
                      }}
                    >
                      {fund.sector}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold ${fund.return1Year > 20 ? 'text-green-400' : 'text-gray-300'}`}>
                      {fund.return1Year > 0 ? '+' : ''}{fund.return1Year}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold ${fund.return3Year > 50 ? 'text-green-400' : 'text-gray-300'}`}>
                      {fund.return3Year > 0 ? '+' : ''}{fund.return3Year}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getRiskColor(fund.riskLevel)}`}>
                      {fund.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-sm font-medium">
                    {fund.aum.toLocaleString()}M₺
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Info */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-gray-400 text-xs">
            Toplam {fundsData.length} fon gösteriliyor
          </p>
          <p className="text-gray-400 text-xs">
            Sıralamak için sütun başlıklarına tıklayın
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SectorRiskChart;
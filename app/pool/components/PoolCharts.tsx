'use client'

import { useState } from 'react';
import {
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

// Mock data for the charts - in production, this would come from an API
const generateMockDataByRange = (range: '7d' | '30d' | '90d', type: 'volume' | 'tvl' | 'fees') => {
  // Generate different data based on range
  const count = range === '7d' ? 7 : range === '30d' ? 10 : 12;
  
  // Base multipliers to make the data look different for each range
  const baseMultiplier = range === '7d' ? 1 : range === '30d' ? 1.2 : 1.5;
  
  // Generate different date formats based on range
  const getDate = (i: number) => {
    if (range === '7d') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days[i % 7];
    } else if (range === '30d') {
      return `Mar ${i * 3 + 1}`;
    } else {
      return `${Math.floor(i / 4) + 1}Q ${2023 + (i % 4)}`;
    }
  };
  
  // Generate different value ranges based on the type and range
  const getValue = (i: number, type: 'volume' | 'tvl' | 'fees') => {
    const baseValues = {
      volume: 3000 + Math.random() * 2000,
      tvl: 94000000 + Math.random() * 5000000,
      fees: 10000 + Math.random() * 6000
    };
    
    // Add some variance based on the index
    const variance = Math.sin(i * 0.5) * 0.3 + 0.85;
    return baseValues[type] * variance * baseMultiplier;
  };
  
  return Array.from({ length: count }, (_, i) => ({
    date: getDate(i),
    value: getValue(i, type)
  }));
};

// Format values for display
const formatValue = (value: number, type: 'volume' | 'tvl' | 'fees') => {
  if (type === 'tvl') {
    return value >= 1000000 
      ? `$${(value / 1000000).toFixed(2)}M` 
      : `$${(value / 1000).toFixed(2)}K`;
  }
  return value >= 1000 
    ? `$${(value / 1000).toFixed(2)}K` 
    : `$${value.toFixed(2)}`;
};

interface PoolChartsProps {
  className?: string;
}

export const PoolCharts = ({ className = '' }: PoolChartsProps) => {
  const [activeTab, setActiveTab] = useState<'volume' | 'tvl' | 'fees'>('volume');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  
  const tabs = [
    { id: 'volume', label: 'Volume' },
    { id: 'tvl', label: 'TVL' },
    { id: 'fees', label: 'Fees' },
  ];
  
  const timeRanges = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
  ];

  const activeData = generateMockDataByRange(timeRange, activeTab);
  
  // Get gradient ID and colors based on active tab
  const getGradientDetails = () => {
    switch(activeTab) {
      case 'volume':
        return { 
          id: 'volumeGradient', 
          startColor: 'rgba(124, 58, 237, 0.8)',  // Primary color
          stopColor: 'rgba(124, 58, 237, 0.1)'
        };
      case 'tvl':
        return { 
          id: 'tvlGradient', 
          startColor: 'rgba(16, 185, 129, 0.8)',  // Green
          stopColor: 'rgba(16, 185, 129, 0.1)' 
        };
      case 'fees':
        return { 
          id: 'feesGradient', 
          startColor: 'rgba(59, 130, 246, 0.8)',  // Blue
          stopColor: 'rgba(59, 130, 246, 0.1)' 
        };
    }
  };

  const { id: gradientId, startColor, stopColor } = getGradientDetails();

  // Content for the current tab
  const chartContent = (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={activeData}
        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={startColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <YAxis 
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickFormatter={(value) => formatValue(value, activeTab)}
        />
        <Tooltip 
          formatter={(value: number) => [formatValue(value, activeTab), activeTab.toUpperCase()]}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{ 
            backgroundColor: 'rgba(23, 23, 23, 0.9)', 
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={startColor} 
          fillOpacity={1} 
          fill={`url(#${gradientId})`} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <motion.div
      className={`bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col space-y-4">
        {/* Tabs and Time Range */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-2">
          {/* Data Type Tabs */}
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'volume' | 'tvl' | 'fees')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-default/10 text-primary-default'
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-surface/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Time Range Selector */}
          <div className="flex rounded-lg border border-border/40 overflow-hidden">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as '7d' | '30d' | '90d')}
                className={`px-3 py-1 font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-primary-default/20 text-primary-default'
                    : 'text-foreground-secondary hover:bg-surface/80'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-[300px] w-full">
          {chartContent}
        </div>
      </div>
    </motion.div>
  );
}; 
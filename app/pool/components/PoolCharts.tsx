'use client'

import { useState, useMemo } from 'react';
import { 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import numeral from 'numeral';

const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `$${numeral(value / 1000000).format('0,0.00')}M`;
  } else if (value >= 1000) {
    return `$${numeral(value / 1000).format('0,0.00')}K`;
  }
  return `$${numeral(value).format('0,0.00')}`;
};

interface PoolChartsProps {
  className?: string;
  historicalData?: Array<{
    id: string;
    volume24h: string;
    totalSwapVolume: string;
    timestamp: number;
    totalLiquidity: string;
    fees24h: string;
    totalSwapFee: string;
  }>;
}

export const PoolCharts = ({ className = '', historicalData }: PoolChartsProps) => {
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

  // Function to process historical data
  const processHistoricalData = (
    data: PoolChartsProps['historicalData'],
    type: 'volume' | 'tvl' | 'fees',
    range: '7d' | '30d' | '90d'
  ) => {
    // Filter data based on the selected time range
    const now = Date.now();
    const msInDay = 86400000; // 24 * 60 * 60 * 1000
    
    const daysToFilter = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const filteredData = data?.filter(
      item => (now - item.timestamp * 1000) <= daysToFilter * msInDay
    ) ?? [];

    // Sort by timestamp in ascending order
    const sortedData = [...filteredData].sort((a, b) => a.timestamp - b.timestamp);
    
    // Map to the format expected by the chart
    return sortedData.map(item => {
      // Get the correct value based on type
      let value;
      if (type === 'volume') {
        value = parseFloat(item.volume24h);
      } else if (type === 'tvl') {
        value = parseFloat(item.totalLiquidity);
      } else { // fees
        value = parseFloat(item.fees24h);
      }
      
      return {
        date: item.timestamp * 1000, // Convert to milliseconds for JavaScript Date
        value
      };
    });
  };

  const activeData = useMemo(() => 
    processHistoricalData(historicalData, activeTab, timeRange),
    [historicalData, activeTab, timeRange]
  );
  
  // Get gradient ID and colors based on active tab
  const getGradientDetails = () => {
    switch(activeTab) {
      case 'volume':
        return { 
          id: 'volumeGradient', 
          startColor: 'rgba(124, 58, 237, 0.8)',  // Purple
          stopColor: 'rgba(124, 58, 237, 0.1)',
          stroke: 'rgba(124, 58, 237, 1)',
          barColor: 'rgba(124, 58, 237, 0.8)'
        };
      case 'tvl':
        return { 
          id: 'tvlGradient', 
          startColor: 'rgba(16, 185, 129, 0.8)',  // Green
          stopColor: 'rgba(16, 185, 129, 0.1)',
          stroke: 'rgba(16, 185, 129, 1)',
          barColor: 'rgba(16, 185, 129, 0.8)'
        };
      case 'fees':
        return { 
          id: 'feesGradient', 
          startColor: 'rgba(59, 130, 246, 0.8)',  // Blue
          stopColor: 'rgba(59, 130, 246, 0.1)',
          stroke: 'rgba(59, 130, 246, 1)',
          barColor: 'rgba(59, 130, 246, 0.8)'
        };
    }
  };

  const { id: gradientId, startColor, stopColor, stroke, barColor } = getGradientDetails();

  // Common chart props
  const commonChartProps = {
    data: activeData,
    margin: { top: 10, right: 10, left: 10, bottom: 5 }
  };

  const renderYAxis = () => (
    <YAxis 
      tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
      tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
      axisLine={false}
      tickFormatter={(value) => formatValue(value)}
      width={60}
      domain={['auto', 'auto']}
    />
  );

  const renderXAxis = () => (
    <XAxis 
      dataKey="date" 
      type="number" 
      domain={['dataMin', 'dataMax']}
      padding={{ left: 50, right: 20 }}
      tickFormatter={(value) => {
        const date = new Date(Number(value));
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }}
      hide={true}
      axisLine={false}
    />
  );
  

  const renderCartesianGrid = () => (
    <CartesianGrid 
      strokeDasharray="3 3" 
      stroke="rgba(255,255,255,0.05)" 
      vertical={false} 
      horizontalPoints={[50, 100, 150, 200, 250]}
    />
  );

  const renderTooltip = () => (
    <Tooltip 
      formatter={(value: number) => [formatValue(value), activeTab.charAt(0).toUpperCase() + activeTab.slice(1)]}
      labelFormatter={(label) => {
        const date = new Date(Number(label));
        
        // Format the date based on locale
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        
        return date.toLocaleDateString('en-US', options);
      }}
      contentStyle={{ 
        backgroundColor: 'rgba(17, 17, 17, 0.95)', 
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '8px',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        padding: '10px 14px',
        fontSize: '13px'
      }}
      cursor={{ 
        fill: 'rgba(255, 255, 255, 0.05)',
        strokeWidth: 0
      }}
      wrapperStyle={{
        zIndex: 100
      }}
    />
  );

  const renderGradientDefs = () => (
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={startColor} stopOpacity={0.6} />
        <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
      </linearGradient>
    </defs>
  );

  // Content for the current tab
  const renderBarChart = (dataKey: 'value') => (
    <BarChart {...commonChartProps}>
      {renderGradientDefs()}
      {renderCartesianGrid()}
      {renderYAxis()}
      {renderXAxis()}
      {renderTooltip()}
      <Bar 
        dataKey={dataKey} 
        fill={barColor}
        radius={[6, 6, 0, 0]}
        maxBarSize={timeRange === '7d' ? 50 : timeRange === '30d' ? 16 : 8}
        animationDuration={750}
        animationEasing="ease-out"
        isAnimationActive={true}
        name={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      >
        {activeData.map((entry, index) => (
          <defs key={`gradient-${index}`}>
            <linearGradient 
              id={`color-${index}`} 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="1"
            >
              <stop offset="0%" stopColor={barColor} stopOpacity={1} />
              <stop offset="95%" stopColor={barColor} stopOpacity={0.7} />
            </linearGradient>
          </defs>
        ))}
      </Bar>
    </BarChart>
  );

  const renderAreaChart = () => (
    <AreaChart {...commonChartProps}>
      {renderGradientDefs()}
      {renderCartesianGrid()}
      {renderYAxis()}
      <XAxis 
      dataKey="date" 
      type="number" 
      domain={['dataMin', 'dataMax']}
      tickFormatter={(value) => {
        const date = new Date(Number(value));
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }}
      hide={true}
      axisLine={false}
    />
      {renderTooltip()}
      <defs>
        <linearGradient id={`${gradientId}-enhanced`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={startColor} stopOpacity={0.5} />
          <stop offset="95%" stopColor={stopColor} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke={stroke} 
        strokeWidth={2}
        fillOpacity={1} 
        fill={`url(#${gradientId}-enhanced)`} 
        animationDuration={750}
        animationEasing="ease-out"
        dot={false}
        activeDot={{ 
          r: 6, 
          stroke: 'var(--background)',
          strokeWidth: 2,
          fill: stroke 
        }}
      />
    </AreaChart>
  );

  const chartContent = (
    <ResponsiveContainer width="100%" height={300}>
      {activeTab === 'tvl' ? renderAreaChart() : renderBarChart('value')}
    </ResponsiveContainer>
  );

  return (
    <motion.div
      className={`bg-surface/80 backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col space-y-4">
        {/* Chart Title and Current Value */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-foreground-primary to-foreground-secondary bg-clip-text text-transparent">Pool Analytics</h2>
          {activeData.length > 0 && (
            <div className="font-medium text-foreground-primary bg-surface/40 px-3 py-1 rounded-lg border border-border/30">
              {formatValue(activeData[activeData.length - 1]?.value || 0)}
            </div>
          )}
        </div>
        
        {/* Tabs and Time Range */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/20 pb-3">
          {/* Data Type Tabs */}
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'volume' | 'tvl' | 'fees')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-default/10 text-primary-default border border-primary-default/30'
                    : 'text-foreground-secondary hover:text-foreground-primary hover:bg-surface/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Time Range Selector */}
          <div className="flex rounded-lg border border-border/40 overflow-hidden bg-surface/30">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as '7d' | '30d' | '90d')}
                className={`px-3 py-1 font-medium transition-all duration-200 ${
                  timeRange === range.id
                    ? 'bg-primary-default/20 text-primary-default'
                    : 'text-foreground-secondary hover:bg-surface/60'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Data Summary */}
        <div className="text-sm text-foreground-secondary mb-1 italic">
          <div>
            {activeTab === 'volume' && 'Daily trading volume over time'}
            {activeTab === 'tvl' && 'Total value locked over time'}
            {activeTab === 'fees' && 'Daily trading fees over time'}
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-[300px] w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-default/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
          {chartContent}
        </div>
      </div>
    </motion.div>
  );
}; 
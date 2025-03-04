"use client";

import { motion } from "framer-motion";
import { Card, Title } from "@tremor/react";
import { FileIcon } from "@radix-ui/react-icons";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface MetricChartProps {
  data: unknown[];
  title: string;
  dataKey: string;
  valueFormatter: (value: number) => string;
  tooltipLabel: string;
  gradientId: string;
}

const MetricChart = ({ 
  data, 
  title, 
  dataKey, 
  valueFormatter, 
  tooltipLabel,
  gradientId 
}: MetricChartProps) => {
  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300">
      <Title className="text-xl font-semibold mb-4">{title}</Title>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-default)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--primary-default)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="currentColor"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              dy={16}
              axisLine={false}
              height={50}
              tickMargin={16}
            />
            <YAxis 
              stroke="currentColor"
              tickFormatter={valueFormatter}
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              dx={-8}
              width={80}
              tickMargin={8}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [valueFormatter(value as number), tooltipLabel]}
              cursor={{ stroke: 'var(--primary-default)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke="var(--primary-default)" 
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={{ stroke: 'var(--primary-default)', fill: 'var(--surface)', strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: 'var(--primary-default)', fill: 'var(--primary-default)', strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const TreasuryPage = () => {
  const reports = [
    { month: "March 2024", url: "#" },
    { month: "February 2024", url: "#" },
    { month: "January 2024", url: "#" },
  ];

  // Sample historical data
  const treasuryData = [
    { date: '2023-04', value: 1200000 },
    { date: '2023-05', value: 1250000 },
    { date: '2023-06', value: 1300000 },
    { date: '2023-07', value: 1280000 },
    { date: '2023-08', value: 1350000 },
    { date: '2023-09', value: 1400000 },
    { date: '2023-10', value: 1450000 },
    { date: '2023-11', value: 1480000 },
    { date: '2023-12', value: 1500000 },
  ];

  const bfdPriceData = [
    { date: '2023-04', price: 1.2 },
    { date: '2023-05', price: 1.3 },
    { date: '2023-06', price: 1.4 },
    { date: '2023-07', price: 1.35 },
    { date: '2023-08', price: 1.5 },
    { date: '2023-09', price: 1.6 },
    { date: '2023-10', price: 1.7 },
    { date: '2023-11', price: 1.75 },
    { date: '2023-12', price: 1.8 },
  ];

  const bfdBackingData = [
    { date: '2023-04', backing: 0.8 },
    { date: '2023-05', backing: 0.85 },
    { date: '2023-06', backing: 0.9 },
    { date: '2023-07', backing: 0.88 },
    { date: '2023-08', backing: 0.95 },
    { date: '2023-09', backing: 1.0 },
    { date: '2023-10', backing: 1.05 },
    { date: '2023-11', backing: 1.1 },
    { date: '2023-12', backing: 1.15 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-default to-secondary bg-clip-text text-transparent">
          Treasury Overview
        </h1>
        <p className="text-foreground-secondary mt-2">
          Real-time insights into BFD`s treasury performance and metrics
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <InfoCard
          title="Total Treasury Value"
          value="$1,500,000"
          gradient="from-blue-500/20 to-blue-600/20"
        />
        <InfoCard
          title="Total Circulating BFD"
          value="1,000,000"
          gradient="from-primary-default/20 to-secondary/20"
        />
        <InfoCard
          title="BFD Price"
          value="$1.80"
          gradient="from-purple-500/20 to-purple-600/20"
        />
        <InfoCard
          title="Treasury APR"
          value="12.5%"
          gradient="from-green-500/20 to-green-600/20"
        />
        <InfoCard
          title="Expected Profit (monthly)"
          value="$45,000"
          gradient="from-yellow-500/20 to-yellow-600/20"
        />
      </div>

      {/* Charts Section */}
      <div className="space-y-8 mb-12">
        <MetricChart 
          data={treasuryData}
          title="Treasury Value History"
          dataKey="value"
          valueFormatter={(value) => `$${(value/1000000).toFixed(2)}M`}
          tooltipLabel="Treasury Value"
          gradientId="treasuryGradient"
        />

        <MetricChart 
          data={bfdPriceData}
          title="BFD Price History"
          dataKey="price"
          valueFormatter={(value) => `$${value.toFixed(2)}`}
          tooltipLabel="BFD Price"
          gradientId="priceGradient"
        />

        <MetricChart 
          data={bfdBackingData}
          title="BFD Backing History"
          dataKey="backing"
          valueFormatter={(value) => `${value.toFixed(2)}x`}
          tooltipLabel="BFD Backing"
          gradientId="backingGradient"
        />
      </div>

      {/* Monthly Reports */}
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
        <Title className="text-xl font-semibold mb-4">Monthly Treasury Reports</Title>
        <div className="mt-4 divide-y divide-border/40">
          {reports.map((report) => (
            <a
              key={report.month}
              href={report.url}
              className="flex items-center justify-between py-4 hover:bg-surface/40 px-4 rounded-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-default/10 group-hover:bg-primary-default/20 transition-colors">
                  <FileIcon className="w-5 h-5 text-primary-default" />
                </div>
                <span className="font-medium group-hover:text-primary-default transition-colors">
                  {report.month} Report
                </span>
              </div>
              <span className="text-sm text-foreground-secondary group-hover:text-primary-default transition-colors">
                View PDF →
              </span>
            </a>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

interface InfoCardProps {
  title: string;
  value: string;
  gradient: string;
}

const InfoCard = ({ title, value, gradient }: InfoCardProps) => {
    return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <div className={`absolute inset-0 opacity-20 blur-xl bg-gradient-to-br ${gradient} group-hover:opacity-30 transition-opacity duration-300`} />
      <Card className="relative overflow-hidden hover:shadow-xl border-2 border-border/40 rounded-xl transition-all duration-300 group-hover:border-border bg-surface/30 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground-secondary">{title}</span>
            <div className="flex items-end justify-between mt-2">
              <span className="text-2xl font-bold font-mono bg-gradient-to-br from-foreground-primary to-foreground-secondary bg-clip-text text-transparent">
                {value}
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Card>
    </motion.div>
  );
};

export default TreasuryPage;

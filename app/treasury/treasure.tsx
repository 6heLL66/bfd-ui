'use client';

import { motion } from 'framer-motion';
import { Card, Title } from '@tremor/react';
import { FileIcon } from '@radix-ui/react-icons';
import numeral from 'numeral';
import { TokensData, TreasuryHistory } from '@/shared/api/types';
import { MetricChart } from './components/MetricChart';
import { TokenDistributionChart } from './components/TokenDistributionChart';
import { InfoCard } from './components/InfoCard';

const TOKEN_COLORS = [
  '#2775CA', // USDC Blue
  '#627EEA', // ETH Blue
  '#F7931A', // BTC Orange
  '#E84142', // USDT Green
  '#8247E5', // Polygon Purple
  '#FAX725', // BNB Yellow
  '#FF007A', // Uniswap Pink
  '#03795C', // DAI Yellow-Green
  '#FF3B3B', // Avalanche Red
  '#232731', // NEAR Black
  '#25292E', // Arbitrum Blue
  '#6748FF', // Optimism Red
  '#FFD700', // Gold
  '#2BBEA3', // Turquoise
  '#FF69B4', // Pink
];

const TreasuryPage = ({ history, tokens }: { history: TreasuryHistory[], tokens: TokensData }) => {
  // Comment out the reports array since it's not ready yet
  // const reports = [
  //   { month: 'March 2024', url: '#' },
  //   { month: 'February 2024', url: '#' },
  //   { month: 'January 2024', url: '#' },
  // ];

  const treasuryData = history.map(item => ({
    date: item.created_at,
    value: item.total_usd_value
  }));

  const { total_usd_value, token_price, total_supply } = history[history.length - 1];

  const bfdPriceData = history.map(item => ({
    date: item.created_at,
    price: item.token_price
  }));

  const bfdBackingData = history.map(item => ({
    date: item.created_at,
    backing: item.backing
  }));

  const filteredTokens = tokens.tokens.filter(token => token.price > 0);

  const formatedTokens = filteredTokens.map((token) => {
    return {
        ...token,
        percent: ((token.amount * token.price) / total_usd_value) * 100
    }
  }).filter(token => token.percent > 0.5);

  // Updated token distribution data with colors from array
  const tokenDistributionData = formatedTokens.map((token, index) => {
    return {
        name: token.symbol,
        value: token.percent,
        color: TOKEN_COLORS[index % TOKEN_COLORS.length],
        usdValue: token.amount * token.price
    }
  }).slice(0, 10)

  tokenDistributionData.push({
    name: 'Other',
    value: 100 - tokenDistributionData.reduce((acc, token) => acc + token.value, 0),
    color: '#E84142',
    usdValue: total_usd_value - tokenDistributionData.reduce((acc, token) => acc + token.usdValue, 0)
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
      <div className="px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-default to-secondary bg-clip-text text-transparent">Treasury Overview</h1>
          <p className="text-foreground-secondary mt-2">Real-time insights into BeraFlowDao`s treasury performance and metrics</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <InfoCard title="Total Treasury Value" value={numeral(total_usd_value).format('$0,0.00')} gradient="from-blue-500/20 to-blue-600/20" />
          <InfoCard title="Total Circulating $BFD" value={numeral(total_supply).format('0,0')} gradient="from-primary-default/20 to-secondary/20" />
          <InfoCard title="$BFD Dex Price" value={numeral(token_price).format('$0,0.000')} gradient="from-purple-500/20 to-purple-600/20" />
          <InfoCard title="$BFD Backing Price" value={numeral(bfdBackingData[bfdBackingData.length - 1].backing).format('$0,0.000')} gradient="from-purple-500/20 to-purple-600/20" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8 sm:mb-12 px-2 sm:-mx-4 md:-mx-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6 px-2 sm:px-4">
          <MetricChart
            data={treasuryData}
            title="Treasury Value History"
            dataKey="value"
            valueFormatter={value => numeral(value / 1000000).format('$0,0.00') + 'M'}
            tooltipLabel="Treasury Value"
            gradientId="treasuryGradient"
          />

          <MetricChart
            data={bfdPriceData}
            title="$BFD Price History"
            dataKey="price"
            valueFormatter={value => numeral(value).format('$0,0.000')}
            tooltipLabel="$BFD Price"
            gradientId="priceGradient"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 px-2 sm:px-4">
          <MetricChart
            data={bfdBackingData}
            title="$BFD Backing History"
            dataKey="backing"
            valueFormatter={value => numeral(value).format('$0,0.000')}
            tooltipLabel="$BFD Backing"
            gradientId="backingGradient"
          />
          
          <TokenDistributionChart 
            data={tokenDistributionData} 
            lastUpdated={new Date(history[history.length - 1].created_at).toLocaleString()}
          />
        </div>
      </div>

      <div className="px-4">
        {/* Monthly Reports */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <Title className="text-xl font-semibold mb-4">Monthly Treasury Reports</Title>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileIcon className="w-12 h-12 text-foreground-secondary mb-4" />
            <p className="text-lg font-medium text-foreground-secondary">Monthly Reports Coming Soon</p>
            <p className="text-sm text-foreground-secondary mt-2">Stay tuned for detailed monthly treasury reports</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export { TreasuryPage };

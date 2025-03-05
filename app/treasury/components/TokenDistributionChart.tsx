import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import numeral from 'numeral';

interface TokenDistributionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    usdValue: number;
  }[];
  lastUpdated?: string;
}

const formatCurrency = (value: number) => {
  return numeral(value).format('$0.00a').toUpperCase();
};

export const TokenDistributionChart = ({ data, lastUpdated }: TokenDistributionChartProps) => {
  const totalValue = data.reduce((sum, item) => sum + item.usdValue, 0);

  return (
    <motion.div className="relative group">
      <div className="absolute inset-0 opacity-20 blur-xl bg-gradient-to-br from-primary-default/20 to-secondary/20 group-hover:opacity-30 transition-opacity duration-300" />
      <Card className="relative overflow-hidden hover:shadow-xl border-2 border-border/40 rounded-xl transition-all duration-300 group-hover:border-border bg-surface/30 backdrop-blur-sm">
        <div className="p-0">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <Title className="text-base sm:text-xl font-semibold bg-gradient-to-br from-foreground-primary to-foreground-secondary bg-clip-text text-transparent">
              Token Distribution
            </Title>
            {lastUpdated && (
              <span className="text-xs text-foreground-secondary">
                Last updated: {lastUpdated}
              </span>
            )}
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[400px] relative">
            <div className="flex items-start h-full">
              <div className="flex-1 h-full relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-semibold text-foreground-primary">
                      {formatCurrency(totalValue)}
                    </div>
                    <div className="text-xs text-foreground-secondary">
                      Total Value
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '0.875rem',
                        padding: '0.75rem',
                      }}
                      formatter={(value: number, name, props) => {
                        const entry = props.payload;
                        return [
                          <div key="tooltip" className="flex flex-col gap-1 text-white">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="font-medium text-white">{entry.name}</span>
                            </div>
                            <div className="text-xs text-white/70">
                              <div>{formatCurrency(entry.usdValue)}</div>
                              <div>{value.toFixed(2)}% of total</div>
                            </div>
                          </div>,
                          null
                        ];
                      }}
                      wrapperStyle={{ outline: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-48 flex flex-col gap-3 pr-4 pt-8">
                {data.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-foreground-secondary">
                      {entry.name} ({entry.value.toFixed(2)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Card>
    </motion.div>
  );
}; 
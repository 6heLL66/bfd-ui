import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface MetricChartProps {
  data: unknown[];
  title: string;
  dataKey: string;
  valueFormatter: (value: number) => string;
  tooltipLabel: string;
  gradientId: string;
}

export const MetricChart = ({ data, title, dataKey, valueFormatter, tooltipLabel, gradientId }: MetricChartProps) => {
  return (
    <motion.div className="relative group">
      <div className="absolute inset-0 opacity-20 blur-xl bg-gradient-to-br from-primary-default/20 to-secondary/20 group-hover:opacity-30 transition-opacity duration-300" />
      <Card className="relative overflow-hidden hover:shadow-xl border-2 border-border/40 rounded-xl transition-all duration-300 group-hover:border-border bg-surface/30 backdrop-blur-sm">
        <div className="p-0">
          <Title className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 bg-gradient-to-br from-foreground-primary to-foreground-secondary bg-clip-text text-transparent">{title}</Title>
          <div className="h-[250px] sm:h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-default)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary-default)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="currentColor"
                  tick={{ fill: 'currentColor', fontSize: '0.75rem' }}
                  tickLine={{ stroke: 'currentColor' }}
                  dy={8}
                  axisLine={false}
                  height={35}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric'
                    });
                  }}
                  interval="preserveStartEnd"
                  minTickGap={20}
                />
                <YAxis 
                  stroke="currentColor" 
                  tickFormatter={valueFormatter} 
                  tick={{ fill: 'currentColor', fontSize: '0.75rem' }} 
                  tickLine={{ stroke: 'currentColor' }} 
                  dx={-4} 
                  width={60} 
                  tickMargin={4}
                  domain={([dataMin, dataMax]) => {
                    const padding = (dataMax - dataMin) * 0.5;
                    return [Math.max(0, dataMin - padding), dataMax + padding];
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '0.875rem',
                    padding: '0.5rem',
                  }}
                  formatter={value => [valueFormatter(value as number), tooltipLabel]}
                  cursor={{ stroke: 'var(--primary-default)', strokeWidth: 1 }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke="var(--primary-default)"
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Card>
    </motion.div>
  );
}; 
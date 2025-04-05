import { Card } from '@tremor/react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  title: string;
  value: string;
  gradient: string;
}

export const InfoCard = ({ title, value, gradient }: InfoCardProps) => {
  return (
    <motion.div className="relative group">
      <div className={`absolute inset-0 opacity-20 blur-xl bg-gradient-to-br ${gradient} group-hover:opacity-30 transition-opacity duration-300`} />
      <Card className="relative overflow-hidden hover:shadow-xl border-2 border-border/40 rounded-xl transition-all duration-300 group-hover:border-border bg-surface/30 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground-secondary">{title}</span>
            <div className="flex items-end justify-between mt-2">
              <span className="text-2xl font-bold font-mono bg-gradient-to-br from-foreground-primary to-foreground-secondary bg-clip-text text-transparent">{value}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Card>
    </motion.div>
  );
}; 
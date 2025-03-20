import { motion } from 'framer-motion';
import React from 'react';

type InfoCardProps = {
  title: string;
  value: React.ReactNode;
  gradientFrom: string;
  isSaleActive: boolean;
  progressBar?: {
    progress: number;
    label: string;
    color: string;
  };
};

const getGradientClasses = (from: string) => {
  const gradientMap = {
    'purple-600': 'from-purple-600/10 via-violet-600/10 to-fuchsia-600/10',
    'indigo-600': 'from-indigo-600/10 via-blue-600/10 to-sky-600/10',
    'emerald-600': 'from-emerald-600/10 via-green-600/10 to-teal-600/10',
    'amber-600': 'from-amber-600/10 via-yellow-600/10 to-orange-600/10',
  };

  const progressGradientMap = {
    'purple-600': 'from-purple-600/30 via-violet-600/30 to-fuchsia-600/30',
    'indigo-600': 'from-indigo-600/30 via-blue-600/30 to-sky-600/30',
    'emerald-600': 'from-emerald-600/30 via-green-600/30 to-teal-600/30',
    'amber-600': 'from-amber-600/30 via-yellow-600/30 to-orange-600/30',
  };

  const dotColorMap = {
    'purple-600': 'bg-purple-600',
    'indigo-600': 'bg-indigo-600',
    'emerald-600': 'bg-emerald-600',
    'amber-600': 'bg-amber-600',
  };

  const titleGradientMap = {
    'purple-600': 'from-purple-600 to-violet-600 shadow-purple-500/20',
    'indigo-600': 'from-indigo-600 to-blue-600 shadow-indigo-500/20',
    'emerald-600': 'from-emerald-600 to-green-600 shadow-emerald-500/20',
    'amber-600': 'from-amber-600 to-yellow-600 shadow-amber-500/20',
  };

  return {
    gradient: gradientMap[from as keyof typeof gradientMap] || gradientMap['purple-600'],
    progressGradient: progressGradientMap[from as keyof typeof progressGradientMap] || progressGradientMap['purple-600'],
    dotColor: dotColorMap[from as keyof typeof dotColorMap] || dotColorMap['purple-600'],
    titleGradient: titleGradientMap[from as keyof typeof titleGradientMap] || titleGradientMap['purple-600'],
  };
};

export const InfoCard = ({ title, value, gradientFrom, isSaleActive, progressBar }: InfoCardProps) => {
  const { gradient, progressGradient, dotColor, titleGradient } = getGradientClasses(gradientFrom);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative px-5 py-4 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg overflow-hidden"
    >
      {isSaleActive && (
        <>
          <motion.div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          {progressBar && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${progressGradient}`}
              initial={{ width: progressBar.progress === 0 ? '100%' : '0%' }}
              animate={{ width: `${progressBar.progress === 0 ? 100 - progressBar.progress : progressBar.progress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          )}
          <motion.div
            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${dotColor}`}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${dotColor}`}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
      <div className="relative flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full gap-2">
            <span
              className={`text-sm font-bold ${
                isSaleActive ? `text-white bg-gradient-to-r ${titleGradient} shadow-lg` : 'text-foreground-secondary bg-surface/60'
              } px-2.5 py-0.5 rounded-lg`}
            >
              {title}
            </span>
            {progressBar && isSaleActive && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${progressBar.color}-500/10 text-${progressBar.color}-400 border border-${progressBar.color}-500/30`}
              >
                {progressBar.label}
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className={`font-bold text-xl ${isSaleActive ? 'bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent' : 'text-foreground-primary'}`}>
              {value}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { Button } from '@heroui/button';
import { CheckIcon, LockClosedIcon } from '@radix-ui/react-icons';

type GatheringPhase = {
  id: string;
  title: string;
  description: string;
  rate: string;
  price: string;
  eligibility: string;
  active: boolean;
  comingSoon: boolean;
  color: string;
};

type GatheringPhaseCardProps = {
  phase: GatheringPhase;
  isActive: boolean;
  onClick: () => void;
};

const getGradientClasses = (color: string) => {
  const colorMap = {
    'primary': {
      background: 'from-primary-default/10 via-primary/5 to-purple-600/10',
      border: 'border-primary-default/40',
      activeBorder: 'border-primary-default',
      textGradient: 'from-primary-default to-purple-500',
      buttonGradient: 'from-primary-default to-primary-hover',
      dot: 'bg-primary-default',
    },
    'violet': {
      background: 'from-violet-600/10 via-violet-500/5 to-indigo-600/10',
      border: 'border-violet-500/40',
      activeBorder: 'border-violet-500',
      textGradient: 'from-violet-500 to-indigo-400',
      buttonGradient: 'from-violet-500 to-indigo-500',
      dot: 'bg-violet-500',
    },
    'emerald': {
      background: 'from-emerald-600/10 via-emerald-500/5 to-green-600/10',
      border: 'border-emerald-500/40',
      activeBorder: 'border-emerald-500',
      textGradient: 'from-emerald-500 to-green-400',
      buttonGradient: 'from-emerald-500 to-green-500',
      dot: 'bg-emerald-500',
    },
  };

  return colorMap[color as keyof typeof colorMap] || colorMap.primary;
};

export const GatheringPhaseCard = ({ phase, isActive, onClick }: GatheringPhaseCardProps) => {
  const colors = getGradientClasses(phase.color);

  return (
    <motion.div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${colors.background} backdrop-blur-sm border-2 ${isActive ? colors.activeBorder : colors.border} transition-all duration-300 p-6 cursor-pointer`}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {phase.active && (
          <motion.div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/20 border border-success/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-success"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-xs font-medium text-success">Active</span>
          </motion.div>
        )}
        
        {phase.comingSoon && (
          <motion.div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-amber-500"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-xs font-medium text-amber-500">Coming Soon</span>
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col h-full">
        <h3 className={`text-xl font-bold bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent mb-2`}>
          {phase.title}
        </h3>
        
        <p className="text-sm text-foreground-secondary mb-6">
          {phase.description}
        </p>
        
        <div className="space-y-4 flex-grow mb-6">
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground-secondary">Price</span>
            <span className="text-sm font-bold text-foreground-primary">{phase.price}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground-secondary">Phase</span>
            <span className="text-sm font-bold text-foreground-primary">{phase.eligibility}</span>
          </div>
        </div>
        
        {!phase.active && <Button
          className={`w-full bg-gradient-to-r ${colors.buttonGradient} hover:opacity-90 transition-opacity h-10`}
          isDisabled={!phase.active}
        >
          {phase.active ? (
            <>
              <span className="text-white font-medium">Participate</span>
              <CheckIcon className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              <span className="text-white font-bold">Coming Soon</span>
              <LockClosedIcon className="ml-2 w-5 h-5 text-white" />
            </>
          )}
        </Button>}
      </div>

      {/* Decorative elements */}
      <motion.div 
        className={`absolute -top-12 -right-12 w-24 h-24 rounded-full ${colors.dot} opacity-10 blur-xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className={`absolute -bottom-8 -left-8 w-16 h-16 rounded-full ${colors.dot} opacity-10 blur-xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
}; 
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GatheringAnimationProps {
  activePhase: 'initial' | 'whitelist' | 'public';
}

// Animation variants for the flow lines
const flowVariants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

// Chain icon variants
const chainIconVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
    }
  }
};

// Enhanced flow particles variants
const flowParticleVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: [0.7, 0.9, 0.7],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Phase color mapping
const getPhaseColor = (phase: 'initial' | 'whitelist' | 'public') => {
  const colorMap = {
    initial: '#6C5ED3', // primary color
    whitelist: '#8B5CF6', // violet color
    public: '#10B981', // emerald color
  };
  
  return colorMap[phase];
};

export function GatheringAnimation({ activePhase }: GatheringAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseColor = getPhaseColor(activePhase);
  
  // Initialize the blockchain network particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Particle system
    const particleCount = 100;
    const particles: Particle[] = [];
    const connections: Connection[] = [];
    const connectionDistance = 100;
    const phaseColorRgb = hexToRgb(phaseColor);
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        // Random between phase color and white with low opacity
        const usePhaseColor = Math.random() > 0.6;
        if (usePhaseColor && phaseColorRgb) {
          this.color = `rgba(${phaseColorRgb.r}, ${phaseColorRgb.g}, ${phaseColorRgb.b}, ${Math.random() * 0.2 + 0.1})`;
        } else {
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    class Connection {
      p1: Particle;
      p2: Particle;
      distance: number;
      
      constructor(p1: Particle, p2: Particle, distance: number) {
        this.p1 = p1;
        this.p2 = p2;
        this.distance = distance;
      }
      
      draw() {
        if (!ctx) return;
        const opacity = 1 - (this.distance / connectionDistance);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Find connections
      connections.length = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            connections.push(new Connection(particles[i], particles[j], distance));
          }
        }
      }
      
      // Draw connections
      connections.forEach(connection => connection.draw());
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [phaseColor]);
  
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[320px] md:w-[450px] lg:w-[520px] h-[320px] md:h-[450px] lg:h-[520px]"
        >
          {/* Ethereum Network - Left Side */}
          <motion.div
            className="absolute top-[50%] left-0 transform -translate-y-1/2 -translate-x-1/3 bg-surface/60 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg shadow-[#627EEA]/10 border border-[#627EEA]/20"
            variants={chainIconVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className="w-[46px] h-[46px] md:w-[56px] md:h-[56px] bg-gradient-to-br from-[#627EEA] to-[#3b5fe9] rounded-full flex items-center justify-center filter drop-shadow-md">
              <span className="text-white font-bold text-sm md:text-base">ETH</span>
            </div>
            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium text-white/90 px-2 py-0.5 rounded-md bg-[#627EEA]/10 backdrop-blur-sm">First Sale</span>
            </div>
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <motion.span 
                className="text-xs font-bold text-white bg-[#627EEA]/30 px-3 py-1 rounded-md shadow-sm" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                ETHEREUM
              </motion.span>
            </div>
          </motion.div>

          {/* Berachain Network - Right Side */}
          <motion.div
            className="absolute top-[50%] right-0 transform -translate-y-1/2 translate-x-1/3 bg-surface/60 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg shadow-[#FFD580]/10 border border-[#FFD580]/20"
            variants={chainIconVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="w-[46px] h-[46px] md:w-[56px] md:h-[56px] bg-gradient-to-br from-[#FFD580] to-[#F9BC64] rounded-full flex items-center justify-center filter drop-shadow-md">
              <span className="text-black font-bold text-sm md:text-base">BERA</span>
            </div>
            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium text-white/90 px-2 py-0.5 rounded-md bg-[#FFD580]/10 backdrop-blur-sm">Future Sales</span>
            </div>
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <motion.span 
                className="text-xs font-bold text-black bg-[#FFD580]/70 px-3 py-1 rounded-md shadow-sm" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                BERACHAIN
              </motion.span>
            </div>
          </motion.div>

          {/* Bridge Line between networks with animated particles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M80 260 C140 210, 380 310, 440 260"
              stroke="url(#bridgeGradient)"
              strokeWidth="3"
              strokeDasharray="8 4"
              variants={flowVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5, duration: 1.8 }}
            />
            {/* Animated particles along the bridge path */}
            <motion.circle
              cx="130" cy="240" r="4"
              fill="#627EEA"
              variants={flowParticleVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8, duration: 2 }}
            />
            <motion.circle
              cx="260" cy="270" r="4"
              fill="#9E77ED"
              variants={flowParticleVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.3, duration: 2 }}
            />
            <motion.circle
              cx="390" cy="240" r="4"
              fill="#FFD580"
              variants={flowParticleVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.8, duration: 2 }}
            />
            <defs>
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#627EEA" />
                <stop offset="50%" stopColor="#9E77ED" />
                <stop offset="100%" stopColor="#FFD580" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central orb - Treasury - Advanced version with particle effects */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[170px] md:h-[170px] lg:w-[190px] lg:h-[190px] rounded-full z-10"
            style={{ 
              background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(${parseInt(phaseColor.slice(1, 3), 16)},${parseInt(phaseColor.slice(3, 5), 16)},${parseInt(phaseColor.slice(5, 7), 16)},0.4) 70%, transparent 100%)` 
            }}
            animate={{
              boxShadow: [
                `0 0 30px 5px ${phaseColor}40`,
                `0 0 50px 15px ${phaseColor}50`,
                `0 0 30px 5px ${phaseColor}40`,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer decorative rings */}
            <motion.div 
              className="absolute -inset-3 rounded-full border-2 border-dashed opacity-30"
              style={{ borderColor: phaseColor }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Outer glow effect */}
            <motion.div 
              className="absolute -inset-1 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${phaseColor}10 0%, transparent 70%)`
              }}
              animate={{ 
                rotate: -360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Inner spinning gradient */}
            <motion.div 
              className="absolute inset-2 rounded-full overflow-hidden"
              style={{
                background: `conic-gradient(from 0deg, ${phaseColor}30, rgba(30,30,30,0.3) 40%, ${phaseColor}30 60%, rgba(30,30,30,0.3) 80%, ${phaseColor}30)`
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Main treasury container */}
            <div className="absolute inset-3 md:inset-4 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              {/* Small decorative orbs floating around treasury */}
              <motion.div 
                className="absolute w-3 h-3 rounded-full"
                style={{ background: phaseColor, filter: 'blur(1px)' }}
                animate={{ 
                  x: [10, -10, 10], 
                  y: [10, 20, 10],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-2 h-2 rounded-full"
                style={{ background: '#3B82F6', filter: 'blur(1px)' }}
                animate={{ 
                  x: [-15, 10, -15], 
                  y: [-15, -5, -15],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-2 h-2 rounded-full"
                style={{ background: 'white', filter: 'blur(1px)' }}
                animate={{ 
                  x: [15, 0, 15], 
                  y: [-5, -15, -5],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Content */}
              <motion.div 
                className="text-center px-3 relative z-10" 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.h3 
                  className="text-lg md:text-xl lg:text-2xl font-bold text-white filter drop-shadow-md"
                  animate={{ 
                    textShadow: [
                      `0 0 8px ${phaseColor}70`, 
                      `0 0 12px ${phaseColor}90`, 
                      `0 0 8px ${phaseColor}70`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Treasury
                </motion.h3>
                <p className="text-xs md:text-sm font-bold text-white/70 mt-1">$BFD Minting</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced rotating rings with gradients */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full border"
            style={{ borderColor: `${phaseColor}15` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[290px] md:h-[290px] lg:w-[340px] lg:h-[340px] rounded-full border border-white/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full border"
            style={{ borderColor: `${phaseColor}08` }}
            animate={{ rotate: 180 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          />

          {/* USDC input - Enhanced version */}
          <motion.div
            className="absolute top-[40px] left-0 right-0 mx-auto w-[55px] h-[55px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-surface/80 backdrop-blur-sm rounded-full border-2 border-blue-400/30 p-2 md:p-3 flex items-center justify-center shadow-lg"
            style={{ boxShadow: `0 5px 20px 0 rgba(59, 130, 246, 0.2)` }}
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              <Image src="/images/usdc.png" alt="USDC" width={42} height={42} />
            </div>
            <motion.div 
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-xs text-white/80 bg-blue-500/20 px-2 py-0.5 rounded-md backdrop-blur-sm">Input Token</span>
            </motion.div>
          </motion.div>

          {/* BFD output - Enhanced version */}
          <motion.div
            className="absolute bottom-[20px] left-0 right-0 mx-auto w-[65px] h-[65px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px] bg-surface/80 backdrop-blur-sm rounded-full border-2 p-2 md:p-3 flex items-center justify-center shadow-lg"
            style={{ borderColor: `${phaseColor}30`, boxShadow: `0 5px 20px 0 ${phaseColor}20` }}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: `${phaseColor}20` }}
              />
              <div className="p-1.5 bg-black rounded-full border-2 border-primary-default/80">
                <Image src="/images/bear-paw.png" alt="USDC" width={32} height={32} />
              </div>
              
            </div>
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              <span className="text-xs text-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm" style={{ background: `${phaseColor}20` }}>Output Token</span>
            </motion.div>
          </motion.div>

          {/* Flow lines with animated particles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* USDC to Treasury flow */}
            <motion.path
              d="M260 90 C260 90, 260 120, 260 150"
              stroke="url(#usdcGradient)"
              strokeWidth="3"
              strokeDasharray="6 4"
              initial="initial"
              animate="animate"
              variants={flowVariants}
            />
            
            {/* Treasury to BFD flow */}
            <motion.path
              d="M260 310 C260 310, 260 340, 260 430"
              stroke={`url(#bfdGradient-${activePhase})`}
              strokeWidth="3"
              strokeDasharray="6 4"
              initial="initial"
              animate="animate"
              variants={flowVariants}
            />
            
            {/* Animated particles on USDC flow */}
            <motion.circle 
              cx="260" cy="120" r="4" 
              fill="#3B82F6"
              animate={{
                y: [0, 60, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Animated particles on BFD flow */}
            <motion.circle 
              cx="260" cy="360" r="4" 
              fill={phaseColor}
              animate={{
                y: [0, 60, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            
            <defs>
              <linearGradient id="usdcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
              </linearGradient>
              
              <linearGradient id={`bfdGradient-${activePhase}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={phaseColor} />
                <stop offset="100%" stopColor={`${phaseColor}80`} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
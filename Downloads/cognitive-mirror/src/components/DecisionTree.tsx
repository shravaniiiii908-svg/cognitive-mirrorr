import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, TrendingUp, ArrowRight, Brain, Zap, Target } from 'lucide-react';

interface DecisionPath {
  label: string;
  type: "doom" | "logic" | "growth";
  outcome: string;
}

interface DecisionTreeProps {
  paths: DecisionPath[];
  onSelect?: (path: DecisionPath) => void;
}

export const DecisionTree: React.FC<DecisionTreeProps> = ({ paths, onSelect }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'doom': return <Zap className="w-5 h-5 text-red-500" />;
      case 'logic': return <Target className="w-5 h-5 text-blue-500" />;
      case 'growth': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      default: return null;
    }
  };

  const getTheme = (type: string) => {
    switch (type) {
      case 'doom': return {
        bg: 'bg-red-50/50',
        border: 'border-red-100',
        text: 'text-red-900',
        accent: 'bg-red-500',
        glow: 'shadow-red-500/10'
      };
      case 'logic': return {
        bg: 'bg-blue-50/50',
        border: 'border-blue-100',
        text: 'text-blue-900',
        accent: 'bg-blue-500',
        glow: 'shadow-blue-500/10'
      };
      case 'growth': return {
        bg: 'bg-emerald-50/50',
        border: 'border-emerald-100',
        text: 'text-emerald-900',
        accent: 'bg-emerald-500',
        glow: 'shadow-emerald-500/10'
      };
      default: return {
        bg: 'bg-white',
        border: 'border-black/5',
        text: 'text-black',
        accent: 'bg-black',
        glow: 'shadow-black/10'
      };
    }
  };

  return (
    <div className="relative py-12">
      {/* Root Node */}
      <div className="flex justify-center mb-24">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative px-10 py-6 bg-black text-white rounded-[32px] shadow-2xl z-20 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-40">Neural Origin</div>
            <div className="text-sm font-black uppercase tracking-tighter">Cognitive Seed</div>
          </div>
          
          {/* Connecting Lines Container */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-24 pointer-events-none overflow-visible">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1.5 }}
                d="M 50 0 L 10 100" 
                stroke="black" 
                strokeWidth="0.5" 
                fill="none" 
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                d="M 50 0 L 50 100" 
                stroke="black" 
                strokeWidth="0.5" 
                fill="none" 
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                d="M 50 0 L 90 100" 
                stroke="black" 
                strokeWidth="0.5" 
                fill="none" 
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Path Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10 px-4">
        {paths.map((path, index) => {
          const theme = getTheme(path.type);
          return (
            <motion.div
              key={path.label}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring", damping: 20 }}
              onClick={() => onSelect?.(path)}
              className={`group relative p-8 rounded-[40px] border transition-all cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${theme.bg} ${theme.border} ${theme.glow}`}
            >
              {/* Decorative Background Element */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${theme.accent} opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:opacity-[0.08] transition-opacity`} />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(path.type)}
                  </div>
                  <div className="text-right">
                    <div className={`text-[8px] font-black uppercase tracking-widest opacity-40 ${theme.text}`}>Pathway</div>
                    <div className={`text-[10px] font-black uppercase tracking-tighter ${theme.text}`}>{path.type}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`text-2xl font-black uppercase tracking-tighter leading-tight ${theme.text}`}>{path.label}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm line-clamp-4 group-hover:line-clamp-none transition-all">
                    {path.outcome}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <span className={theme.text}>Neural Reframing</span>
                  <ArrowRight className={`w-3 h-3 ${theme.text}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

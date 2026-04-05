import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Brain, Sparkles, Zap, Shield, AlertCircle } from 'lucide-react';
import { analyzeMindDump, AnalysisResult } from '../services/geminiService';

interface MindDumpProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const MindDump: React.FC<MindDumpProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeMindDump(text);
      onAnalysisComplete(result);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAnalyze();
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-24 space-y-12">
      <div className="space-y-4 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-black/5 rounded-full border border-black/5 mx-auto backdrop-blur-sm"
        >
          <Brain className="w-4 h-4 text-black/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Neural Input Phase</span>
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Unload your<br />
          <span className="text-gray-400 italic font-serif lowercase tracking-normal">consciousness.</span>
        </h2>
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-[64px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white rounded-[48px] shadow-2xl overflow-hidden border border-black/5">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="I'm feeling overwhelmed because..."
            className="w-full h-[300px] bg-transparent p-8 text-xs font-medium leading-relaxed focus:outline-none resize-none placeholder:text-gray-200 selection:bg-black selection:text-white"
          />
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-6 left-8 right-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-6 right-8 flex items-center gap-6">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-20">
              {text.length} characters
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className={`
                px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3
                ${isAnalyzing || !text.trim() 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:scale-105 active:scale-95 shadow-2xl shadow-black/20'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Thoughts
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 opacity-20">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Private</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Instant</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[8px] font-bold uppercase tracking-widest">AI-Powered</span>
        </div>
      </div>
    </div>
  );
};

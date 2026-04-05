import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, ChevronRight, Github, Twitter, Instagram, Facebook,
  Moon, Sun, Loader2, AlertCircle, ArrowRight, Zap, Target, Shield, Activity
} from 'lucide-react';
import { MindDump } from './components/MindDump';
import { AnalysisView } from './components/AnalysisView';
import { AnalysisResult } from './services/geminiService';

type Page = 'home' | 'dump' | 'analysis';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0] p-8">
          <div className="bg-white p-12 rounded-[32px] shadow-xl max-w-md text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black">Something went wrong</h2>
            <p className="text-gray-500 text-sm">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-lg"
            >
              RELOAD APP
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans selection:bg-black selection:text-white flex flex-col">
    {/* Navigation */}
    <nav className="px-6 py-8 flex items-center justify-between max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-black tracking-tighter uppercase">CognitiveMirror</span>
      </motion.div>
      <motion.button 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={onStart}
        className="px-8 py-3 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
      >
        Start Session
      </motion.button>
    </nav>

    {/* Hero Section */}
    <section className="relative flex-1 px-6 max-w-7xl mx-auto flex flex-col justify-center items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="blob-container w-full h-full opacity-30">
          <div className="blob-shape" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/5"
        >
          <Sparkles className="w-4 h-4 text-black/40" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">AI-Powered Cognitive Reframing</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-[100px] font-black leading-[0.8] tracking-tighter uppercase"
        >
          Unmask<br />
          Your<br />
          <span className="text-gray-400 italic font-serif lowercase tracking-normal">Logic.</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-tight font-medium"
        >
          Transform chaotic System 1 emotional loops into structured System 2 logical clarity. Meet your cognitive mirror.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <button 
            onClick={onStart}
            className="group w-full sm:w-auto px-12 py-6 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
          >
            Start Free Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-12 px-6 border-t border-black/5 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-black tracking-tighter uppercase">CognitiveMirror</span>
      </div>
      <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-widest opacity-40">
        <a href="#" className="hover:opacity-100">Privacy</a>
        <a href="#" className="hover:opacity-100">Terms</a>
      </div>
    </footer>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentPage('analysis');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-[#f5f5f0] text-[#1a1a1a] font-sans">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage onStart={() => setCurrentPage('dump')} />
            </motion.div>
          )}

          {currentPage === 'dump' && (
            <motion.div
              key="dump"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-screen flex flex-col"
            >
              <nav className="px-6 py-8 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tighter uppercase">CognitiveMirror</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Cancel Session
                </button>
              </nav>
              <main className="flex-1 flex items-center justify-center">
                <MindDump onAnalysisComplete={handleAnalysisComplete} />
              </main>
            </motion.div>
          )}

          {currentPage === 'analysis' && analysisResult && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-screen"
            >
              <nav className="px-6 py-8 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tighter uppercase">CognitiveMirror</span>
                </div>
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => setCurrentPage('dump')}
                    className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    New Session
                  </button>
                </div>
              </nav>
              <main className="max-w-7xl mx-auto px-6 py-12">
                <AnalysisView result={analysisResult} />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

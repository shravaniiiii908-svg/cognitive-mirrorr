import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Zap, Target, AlertTriangle, Activity, Heart, 
  Thermometer, ChevronRight, Shield, Cpu, Download, 
  ArrowRight, Info, CheckCircle2, TreePine, MessageSquare,
  Lightbulb, Sparkles
} from 'lucide-react';
import { AnalysisResult } from '../services/geminiService';
import { BrainView } from './BrainView';
import { DecisionTree } from './DecisionTree';

interface AnalysisViewProps {
  result: AnalysisResult;
}

type Stage = 'scores' | 'questions' | 'results';

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result }) => {
  const [stage, setStage] = useState<Stage>('scores');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (question: string, val: string) => {
    setAnswers(prev => ({ ...prev, [question]: val }));
  };

  const allQuestionsAnswered = [
    ...result.sys1.questions,
    ...result.sys2.questions
  ].every(q => answers[q]?.trim().length > 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 space-y-12">
      <AnimatePresence mode="wait">
        {stage === 'scores' && (
          <motion.div
            key="scores"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/5">
                <Activity className="w-4 h-4 text-black/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Initial Neural Scan</span>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                System <span className="text-gray-400 italic font-serif lowercase tracking-normal">Activation.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* System 1 */}
              <div className="p-12 bg-red-50 rounded-[48px] border border-red-100 space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-4xl font-black uppercase tracking-tighter">System 1</h4>
                  <span className="text-3xl font-black text-red-500">{result.sys1.score}%</span>
                </div>
                <div className="h-2 w-full bg-red-200/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.sys1.score}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-red-500"
                  />
                </div>
                <p className="text-xl font-bold text-red-900 italic leading-tight">"{result.sys1.description}"</p>
              </div>

              {/* System 2 */}
              <div className="p-12 bg-emerald-50 rounded-[48px] border border-emerald-100 space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-4xl font-black uppercase tracking-tighter">System 2</h4>
                  <span className="text-3xl font-black text-emerald-500">{result.sys2.score}%</span>
                </div>
                <div className="h-2 w-full bg-emerald-200/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.sys2.score}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <p className="text-xl font-bold text-emerald-900 italic leading-tight">"{result.sys2.description}"</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setStage('questions')}
                className="group px-12 py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Proceed to Reframing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/5">
                <MessageSquare className="w-4 h-4 text-black/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Cognitive Reframing Phase</span>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                Neural <span className="text-gray-400 italic font-serif lowercase tracking-normal">Inquiry.</span>
              </h2>
              <p className="text-gray-500 font-medium">Answer these to bridge the gap between instinct and logic.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* System 1 Questions */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 opacity-40">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">System 1: Emotional Check</span>
                </div>
                {result.sys1.questions.map((q, i) => (
                  <div key={i} className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-tight opacity-60">{q}</label>
                    <input 
                      type="text"
                      value={answers[q] || ''}
                      onChange={(e) => handleAnswer(q, e.target.value)}
                      placeholder="Your emotional response..."
                      className="w-full p-6 bg-white rounded-3xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm font-medium"
                    />
                  </div>
                ))}
              </div>

              {/* System 2 Questions */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 opacity-40">
                  <Shield className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">System 2: Logical Audit</span>
                </div>
                {result.sys2.questions.map((q, i) => (
                  <div key={i} className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-tight opacity-60">{q}</label>
                    <input 
                      type="text"
                      value={answers[q] || ''}
                      onChange={(e) => handleAnswer(q, e.target.value)}
                      placeholder="Your logical analysis..."
                      className="w-full p-6 bg-white rounded-3xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setStage('results')}
                disabled={!allQuestionsAnswered}
                className={`
                  px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-4 transition-all shadow-2xl
                  ${allQuestionsAnswered ? 'bg-black text-white hover:scale-105 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
              >
                Generate Neural Tree
                <TreePine className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Final Cognitive Map</span>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
                Neural <span className="text-gray-400 italic font-serif lowercase tracking-normal">Synthesis.</span>
              </h2>
            </div>

            {/* Neural Tree */}
            <section className="space-y-12">
              <div className="flex items-center gap-4">
                <TreePine className="w-6 h-6 opacity-20" />
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Predictive Logic Tree</h3>
              </div>
              <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-2xl border border-black/5 w-full">
                <DecisionTree paths={result.decisionPaths} />
              </div>
            </section>

            {/* Biases & Brain Regions */}
            <div className="space-y-24">
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-6 h-6 opacity-20" />
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Detected Biases</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {result.biases.map((bias, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl border border-black/5 space-y-4">
                      <div className="w-10 h-10 bg-black/5 rounded-2xl flex items-center justify-center text-[10px] font-black">
                        0{i + 1}
                      </div>
                      <h5 className="text-xl font-black uppercase tracking-tighter">{bias}</h5>
                      <p className="text-gray-500 text-xs leading-tight font-medium">
                        This cognitive distortion was identified in your thought pattern.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <Activity className="w-6 h-6 opacity-20" />
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Neural Metrics</h3>
                </div>
                <div className="bg-black text-white p-12 rounded-[56px] shadow-2xl space-y-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Amygdala</span>
                        <span className="text-xl font-black text-red-500">{result.brainRegions.amygdala}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${result.brainRegions.amygdala}%` }} />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Prefrontal Cortex</span>
                        <span className="text-xl font-black text-emerald-500">{result.brainRegions.prefrontalCortex}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${result.brainRegions.prefrontalCortex}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-widest opacity-40 mb-2">Heart Rate</div>
                      <div className="text-2xl font-black">{result.bodyEffects.heartRate}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-widest opacity-40 mb-2">Adrenaline</div>
                      <div className="text-2xl font-black">{result.bodyEffects.adrenaline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

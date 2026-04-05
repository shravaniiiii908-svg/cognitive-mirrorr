import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { TrendingUp, Brain, Target, AlertTriangle, History, Calendar, ChevronRight, Activity, Shield, Cpu } from 'lucide-react';

const data = [
  { name: 'Mon', sys1: 72, sys2: 28 },
  { name: 'Tue', sys1: 65, sys2: 35 },
  { name: 'Wed', sys1: 85, sys2: 15 },
  { name: 'Thu', sys1: 58, sys2: 42 },
  { name: 'Fri', sys1: 45, sys2: 55 },
  { name: 'Sat', sys1: 30, sys2: 70 },
  { name: 'Sun', sys1: 40, sys2: 60 },
];

const pieData = [
  { name: 'System 1 (Automatic)', value: 58 },
  { name: 'System 2 (Analytical)', value: 42 },
];

const COLORS = ['#EF4444', '#1a1a1a'];

const biasData = [
  { name: 'Catastrophizing', count: 42, trend: '+12%' },
  { name: 'Black & White', count: 31, trend: '-5%' },
  { name: 'Overgeneralization', count: 24, trend: '+2%' },
  { name: 'Mind Reading', count: 19, trend: '-8%' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-32 px-6">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-black/10 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-ink animate-pulse" />
            <span className="col-header">Neural Evolution Tracking</span>
          </div>
          <h2 className="text-6xl font-display font-black uppercase tracking-tighter">System <span className="text-accent italic font-serif lowercase tracking-normal">Metrics</span></h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-black/5 rounded-2xl border border-black/5 flex items-center gap-3 group hover:bg-black/10 transition-all cursor-pointer">
            <Calendar className="w-4 h-4 text-ink/40 group-hover:text-accent transition-colors" />
            <span className="text-sm font-bold uppercase tracking-widest">Last 7 Cycles</span>
          </div>
        </div>
      </div>

      {/* High Level Metrics - Technical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5 rounded-[32px] overflow-hidden">
        {[
          { label: 'Total Dumps', value: '145', icon: History, color: 'text-ink/40', trend: '+12' },
          { label: 'Logic Streak', value: '5 Days', icon: TrendingUp, color: 'text-emerald-500', trend: 'STABLE' },
          { label: 'Avg. Sys2 Score', value: '42%', icon: Target, color: 'text-ink', trend: '+5.2%' },
          { label: 'Top Bias', value: 'Catastrophizing', icon: AlertTriangle, color: 'text-accent', trend: 'HIGH' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 space-y-4 hover:bg-black/[0.02] transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center border border-black/5 group-hover:border-accent/30 transition-all">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-[10px] font-bold text-emerald-500/50">{stat.trend}</div>
            </div>
            <div className="space-y-1">
              <div className="col-header text-[10px]">{stat.label}</div>
              <div className="text-3xl font-display font-black uppercase tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* System 1 vs System 2 Ratio - Atmospheric Chart */}
        <div className="lg:col-span-2 glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 blob-container opacity-10 -z-10">
            <div className="blob-shape" />
          </div>
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display uppercase tracking-tight">Cognitive Balance</h3>
              <div className="col-header">System 1 vs. System 2 Temporal Analysis</div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                <span className="col-header text-[10px]">System 1</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-ink shadow-sm" />
                <span className="col-header text-[10px]">System 2</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSys1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSys2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.3)', fontWeight: 'bold' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.3)', fontWeight: 'bold' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sys1" stroke="#EF4444" fillOpacity={1} fill="url(#colorSys1)" strokeWidth={3} />
                <Area type="monotone" dataKey="sys2" stroke="#1a1a1a" fillOpacity={1} fill="url(#colorSys2)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Distribution - Hardware Widget */}
        <div className="glass-card p-12 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Cpu className="w-5 h-5 text-black/10" />
          </div>
          <h3 className="text-2xl font-bold font-display uppercase tracking-tight mb-12">Neural Load</h3>
          <div className="flex-1 h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-4xl font-sans font-black">58/42</div>
              <div className="col-header text-[8px]">Ratio Index</div>
            </div>
          </div>
          <div className="mt-12 p-8 bg-black/5 rounded-3xl border border-black/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <div className="col-header text-accent mb-2">System Insight</div>
            <p className="text-lg font-light italic font-serif leading-relaxed group-hover:text-ink transition-colors">
              "Your logical processing has stabilized. Neural efficiency increased by 15%."
            </p>
          </div>
        </div>
      </div>

      {/* Data Grids Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Bias Tracker - Technical List */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-tight">Bias Frequency</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {biasData.map((bias, i) => (
              <div key={bias.name} className="data-row group">
                <div className="col-header">0{i + 1}</div>
                <div className="font-bold group-hover:text-accent transition-colors">{bias.name}</div>
                <div className="data-value">{bias.count}x</div>
                <div className="text-[10px] font-bold text-emerald-500/50">{bias.trend}</div>
                <div className="flex justify-end"><ChevronRight className="w-4 h-4 opacity-20" /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Session History - Technical List */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <History className="w-6 h-6 text-ink/40" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-tight">Neural History</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { dump: "Failed quiz -> dropping out", bias: "Catastrophizing", path: "Growth Path", color: "text-emerald-500" },
              { dump: "Job anxiety at meeting", bias: "Overgeneralization", path: "Logic Path", color: "text-ink" },
              { dump: "Money stress with rent", bias: "Mind Reading", path: "Doom Path", color: "text-red-500" },
            ].map((session, i) => (
              <div key={i} className="data-row group">
                <div className="col-header">0{i + 1}</div>
                <div className="flex flex-col">
                  <span className="font-bold group-hover:text-ink transition-colors truncate max-w-[200px]">{session.dump}</span>
                  <span className="col-header text-[8px] opacity-40">{session.bias}</span>
                </div>
                <div className={`data-value text-[10px] uppercase tracking-widest ${session.color}`}>{session.path}</div>
                <div className="flex justify-end"><ChevronRight className="w-4 h-4 opacity-20" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

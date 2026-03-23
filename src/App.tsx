import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Cpu, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  Play, 
  X,
  ChevronRight,
  Info,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { robots } from './data/robots';
import { Robot, Profession } from './types';

const PROFESSIONS: Profession[] = [
  'Agriculture', 
  'Construction', 
  'Logistics', 
  'Food Service', 
  'Medical', 
  'Manufacturing', 
  'Maintenance', 
  'Retail', 
  'Security'
];

export default function App() {
  const [selectedProfession, setSelectedProfession] = useState<Profession | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);

  const filteredRobots = useMemo(() => {
    return robots.filter(robot => {
      const matchesProfession = selectedProfession === 'All' || robot.profession === selectedProfession;
      const matchesSearch = robot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           robot.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           robot.subProfession.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesProfession && matchesSearch;
    });
  }, [selectedProfession, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="text-slate-950 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Robot<span className="text-cyan-400">onomics</span>
              </h1>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mechanical Labor Database</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Database</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Autonomy Score</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">ROI Calculator</a>
            <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-white">
              Submit Data
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            LIVE AUTOMATION TRACKER 2025
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
          >
            The State of <br /> Mechanical Labor
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Real-world pricing, availability, and autonomy scores for the robots automating every profession. From fry cooks to grid maintenance.
          </motion.p>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Robots Tracked', value: robots.length, icon: Cpu },
              { label: 'Industries', value: PROFESSIONS.length, icon: Zap },
              { label: 'Avg Autonomy', value: '42%', icon: TrendingUp },
              { label: 'Market Cap', value: '$12.4B', icon: DollarSign },
            ].map((stat, i) => (
              <div key={i} className="glass-panel rounded-2xl p-4 border border-slate-800/50">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-3 h-3 text-cyan-500" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-[73px] z-40 glass-panel border-y border-slate-800/50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <button 
              onClick={() => setSelectedProfession('All')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedProfession === 'All' 
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Sectors
            </button>
            {PROFESSIONS.map(prof => (
              <button 
                key={prof}
                onClick={() => setSelectedProfession(prof)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedProfession === prof 
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {prof}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search robots, manufacturers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRobots.map((robot) => (
              <RobotCard 
                key={robot.id} 
                robot={robot} 
                onClick={() => setSelectedRobot(robot)} 
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredRobots.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
              <Search className="text-slate-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-white">No robots found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <Cpu className="text-cyan-500 w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">Robotonomics</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md text-center md:text-right">
            Data sourced from SEC filings, manufacturer disclosures, and industry reports. 
            All autonomy scores are proprietary estimates based on task coverage and supervision ratios.
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRobot && (
          <RobotDetail 
            robot={selectedRobot} 
            onClose={() => setSelectedRobot(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface RobotCardProps {
  robot: Robot;
  onClick: () => void;
  key?: string | number;
}

function RobotCard({ robot, onClick }: RobotCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-panel rounded-2xl border border-slate-800/50 overflow-hidden cursor-pointer group hover:border-cyan-500/30 transition-all"
    >
      <div className="relative h-48 bg-slate-800/30 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
        <div className="text-7xl opacity-10 group-hover:scale-110 transition-transform duration-500">🤖</div>
        
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
            robot.availability === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            robot.availability === 'Pilot' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-blue-500/10 text-blue-400 border-blue-500/20'
          }`}>
            {robot.availability}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-950/80 text-slate-400 text-[10px] font-mono border border-slate-800 uppercase tracking-wider">
              {robot.profession}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{robot.name}</h3>
            <p className="text-sm text-slate-500">{robot.manufacturer}</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Autonomy</div>
            <div className={`text-xl font-mono font-bold ${
              robot.autonomyScore > 80 ? 'text-emerald-400' : 
              robot.autonomyScore > 50 ? 'text-amber-400' : 
              'text-red-400'
            }`}>
              {robot.autonomyScore}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] mb-1.5">
              <span className="text-slate-500 uppercase font-semibold">Task Coverage</span>
              <span className="text-slate-300 font-mono">{robot.taskCoverage}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${robot.taskCoverage}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-2 text-slate-400">
              <DollarSign className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-mono font-medium text-slate-200">{robot.price}</span>
            </div>
            <button className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface RobotDetailProps {
  robot: Robot;
  onClose: () => void;
}

function RobotDetail({ robot, onClose }: RobotDetailProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center">
              <Cpu className="text-cyan-500 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{robot.name}</h2>
              <p className="text-slate-400 text-sm">{robot.manufacturer} • {robot.subProfession}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Visuals & Core Info */}
            <div className="space-y-8">
              <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center relative group overflow-hidden">
                <Play className="w-12 h-12 text-cyan-500 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Video Demonstration
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Pricing Model</div>
                  <div className="text-lg font-bold text-white font-mono">{robot.price}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Availability</div>
                  <div className="text-lg font-bold text-white">{robot.availability}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-500" />
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {robot.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-500" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(robot.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-slate-800/50">
                      <span className="text-slate-500 text-sm">{key}</span>
                      <span className="text-white font-mono text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Autonomy Analysis */}
            <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-inner">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-500" />
                  Autonomy Analysis
                </h3>
                
                <div className="flex items-center gap-8 mb-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                      <motion.circle 
                        cx="64" cy="64" r="56" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        fill="none" 
                        strokeDasharray="351.8"
                        initial={{ strokeDashoffset: 351.8 }}
                        animate={{ strokeDashoffset: 351.8 - (351.8 * robot.autonomyScore / 100) }}
                        className={robot.autonomyScore > 80 ? 'text-emerald-500' : robot.autonomyScore > 50 ? 'text-amber-500' : 'text-red-500'}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white font-mono">{robot.autonomyScore}%</span>
                      <span className="text-[8px] text-slate-500 uppercase font-bold">Autonomy</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Task Coverage</span>
                        <span className="text-white font-mono">{robot.taskCoverage}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${robot.taskCoverage}%` }} />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Human Supervision</div>
                      <div className="text-sm font-bold text-white">{robot.deploymentCount || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    The SOTA Gap: {100 - robot.autonomyScore}%
                  </div>
                  <div className="space-y-3">
                    {robot.limitations.map((lim, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        {lim}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  Verification & Sources
                </h3>
                <div className="flex flex-wrap gap-2">
                  {robot.sources.map((source, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" />
                      {source}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/30 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all"
          >
            Close
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all">
            Request Quote
          </button>
        </div>
      </motion.div>
    </div>
  );
}

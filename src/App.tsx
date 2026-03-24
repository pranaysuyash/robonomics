import { useState, useMemo } from 'react';
import { 
  Cpu, 
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  X,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  FileText,
  Building2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { industries, professions, robots } from './data/robots';
import { Robot, Profession, Industry, Task, Capability, Evidence } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>(null);
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<string>('All');
  const [filterManufacturer, setFilterManufacturer] = useState<string>('All');
  
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const activeProfession = professions.find(p => p.id === selectedProfessionId);
  const activeRobot = robots.find(r => r.id === selectedRobotId);

  // Derived data for filters
  const manufacturers = useMemo(() => ['All', ...Array.from(new Set(robots.map(r => r.manufacturer)))].sort(), []);
  const availabilities = ['All', 'Available', 'Pilot', 'Concept'];

  // Filtered robots for global search/filter view
  const filteredRobots = useMemo(() => {
    return robots.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAvailability = filterAvailability === 'All' || r.availability === filterAvailability;
      const matchesManufacturer = filterManufacturer === 'All' || r.manufacturer === filterManufacturer;
      return matchesSearch && matchesAvailability && matchesManufacturer;
    });
  }, [searchQuery, filterAvailability, filterManufacturer]);

  const isFiltering = searchQuery !== '' || filterAvailability !== 'All' || filterManufacturer !== 'All';

  return (
    <div className="min-h-screen flex text-[#1A1A1A] bg-[#F5F5F0] font-sans selection:bg-[#D97757] selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-[#D1D1CA] bg-[#F5F5F0] flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-8 pb-6">
          <button 
            onClick={() => {
              setSelectedProfessionId(null);
              setSelectedRobotId(null);
              setSearchQuery('');
              setFilterAvailability('All');
              setFilterManufacturer('All');
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left w-full"
          >
            <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center rounded-sm shrink-0">
              <Cpu className="text-[#F5F5F0] w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Robonomics</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-10">
          {industries.map(ind => {
            const indProfessions = professions.filter(p => p.industry === ind.name);
            if (indProfessions.length === 0) return null;
            
            return (
              <div key={ind.name} className="space-y-4">
                <div>
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-1">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-[#8E8E8E] leading-relaxed mb-3">
                    {ind.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#8E8E8E]">
                    <span>Impact:</span>
                    <div className="flex-1 h-1.5 bg-[#E5E5DF] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#D97757]" 
                        style={{ width: `${ind.futureImpactScore}%` }}
                      />
                    </div>
                    <span>{ind.futureImpactScore}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {indProfessions.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        setSelectedProfessionId(p.id);
                        setSelectedRobotId(null);
                        setSearchQuery('');
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-all border-l-2 rounded-r-sm group flex items-center justify-between",
                        selectedProfessionId === p.id && !selectedRobotId
                          ? "border-[#D97757] text-[#1A1A1A] font-medium bg-[#E5E5DF]/50" 
                          : "border-transparent text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#E5E5DF]/30"
                      )}
                    >
                      <span className="truncate pr-2">{p.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D97757]" style={{ opacity: p.futureImpactScore / 100 }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* Top Bar (Search & Filters) */}
        <header className="h-20 border-b border-[#E5E5DF] px-8 lg:px-12 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6 flex-1 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
              <input 
                type="text"
                placeholder="Search robots, manufacturers, or capabilities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedProfessionId(null);
                  setSelectedRobotId(null);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F0] border border-transparent focus:border-[#D1D1CA] focus:bg-white rounded-sm text-sm outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <Filter className="w-4 h-4 text-[#8E8E8E]" />
              <select 
                value={filterAvailability}
                onChange={(e) => {
                  setFilterAvailability(e.target.value);
                  setSelectedProfessionId(null);
                  setSelectedRobotId(null);
                }}
                className="bg-transparent text-sm font-medium text-[#4A4A4A] outline-none cursor-pointer hover:text-[#1A1A1A]"
              >
                {availabilities.map(a => <option key={a} value={a}>{a === 'All' ? 'All Status' : a}</option>)}
              </select>
              <span className="text-[#D1D1CA]">|</span>
              <select 
                value={filterManufacturer}
                onChange={(e) => {
                  setFilterManufacturer(e.target.value);
                  setSelectedProfessionId(null);
                  setSelectedRobotId(null);
                }}
                className="bg-transparent text-sm font-medium text-[#4A4A4A] outline-none cursor-pointer hover:text-[#1A1A1A] max-w-[150px] truncate"
              >
                {manufacturers.map(m => <option key={m} value={m}>{m === 'All' ? 'All Makers' : m}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={() => setShowSubmissionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#D97757] transition-colors shrink-0 ml-6"
          >
            <Plus className="w-4 h-4" /> Submit Entry
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isFiltering ? (
              <SearchResultsView 
                key="search"
                robots={filteredRobots}
                onSelectRobot={setSelectedRobotId}
                onClear={() => {
                  setSearchQuery('');
                  setFilterAvailability('All');
                  setFilterManufacturer('All');
                }}
              />
            ) : selectedRobotId && activeRobot ? (
              <RobotView 
                key="robot" 
                robot={activeRobot} 
                onBack={() => setSelectedRobotId(null)} 
              />
            ) : selectedProfessionId && activeProfession ? (
              <ProfessionView 
                key="profession" 
                profession={activeProfession} 
                onSelectRobot={setSelectedRobotId} 
              />
            ) : (
              <HomeView 
                key="home" 
                onSelectProfession={setSelectedProfessionId} 
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {showSubmissionModal && (
        <SubmissionModal onClose={() => setShowSubmissionModal(false)} />
      )}
    </div>
  );
}

// --- Views ---

function HomeView({ onSelectProfession, key }: { onSelectProfession: (id: string) => void, key?: string }) {
  const totalRobots = robots.length;
  const totalProfessions = professions.length;
  const verifiedDeployments = robots.filter(r => r.evidence.some(e => e.verified && e.deploymentType === 'Production')).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-6xl mx-auto p-12 lg:p-20"
    >
      <header className="mb-24">
        <h1 className="text-6xl font-serif font-bold text-[#1A1A1A] mb-8 leading-tight max-w-4xl">
          The State of Global Automation
        </h1>
        <p className="text-2xl text-[#4A4A4A] max-w-3xl leading-relaxed font-serif italic">
          A living intelligence system tracking the exact tasks blocking full automation across every industry.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="p-8 border-l-2 border-[#1A1A1A]">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Tracked Systems</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{totalRobots}</div>
          <p className="text-sm text-[#4A4A4A]">Robots actively deployed in pilot or production environments.</p>
        </div>
        <div className="p-8 border-l-2 border-[#D97757]">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Analyzed Professions</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{totalProfessions}</div>
          <p className="text-sm text-[#4A4A4A]">Jobs broken down into atomic tasks for automation mapping.</p>
        </div>
        <div className="p-8 border-l-2 border-[#1A1A1A]">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Verified Deployments</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{verifiedDeployments}</div>
          <p className="text-sm text-[#4A4A4A]">Systems with verified real-world production evidence.</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-serif font-bold mb-12 border-b border-[#E5E5DF] pb-4">
          Industry Intelligence Reports
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {industries.map(ind => {
            const indProfessions = professions.filter(p => p.industry === ind.name);
            if (indProfessions.length === 0) return null;

            const indRobots = robots.filter(r => 
              r.capabilities.some(c => indProfessions.some(p => p.tasks.some(t => t.id === c.taskId)))
            );

            return (
              <div key={ind.name} className="group">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">{ind.name}</h3>
                  <div className="text-[10px] font-mono font-bold text-[#D97757]">IMPACT SCORE: {ind.futureImpactScore}</div>
                </div>
                <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                  {ind.description} Currently tracking {indProfessions.length} professions and {new Set(indRobots.map(r=>r.id)).size} robotic systems in this sector.
                </p>
                
                <div className="space-y-2">
                  {indProfessions.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => onSelectProfession(p.id)}
                      className="flex items-center justify-between w-full p-4 bg-[#F5F5F0] hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-sm text-sm font-medium text-left group/btn"
                    >
                      <span>{p.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#8E8E8E] group-hover/btn:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}

function ProfessionView({ profession, onSelectRobot, key }: { profession: Profession, onSelectRobot: (id: string) => void, key?: string }) {
  // Find robots that have capabilities for any task in this profession
  const relevantRobots = robots.filter(r => 
    r.capabilities.some(c => profession.tasks.some(t => t.id === c.taskId))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto p-12 lg:p-20"
    >
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] bg-[#F5F5F0] px-2 py-1 rounded-sm">
            {profession.industry}
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D97757] bg-[#FCE8E6] px-2 py-1 rounded-sm">
            Impact Score: {profession.futureImpactScore}/100
          </span>
        </div>
        <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-6">
          {profession.name}
        </h1>
        <p className="text-xl text-[#4A4A4A] leading-relaxed max-w-3xl mb-8">
          {profession.description}
        </p>
        
        <div className="p-6 bg-[#F5F5F0] border-l-4 border-[#1A1A1A]">
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">Future Impact Analysis</h3>
          <p className="text-sm text-[#4A4A4A] leading-relaxed">{profession.futureImpactExplanation}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#E5E5DF] pb-4">
              Task Decomposition
            </h2>
            <div className="space-y-6">
              {profession.tasks.map(task => {
                // Find the best robot for this task
                const bestCapability = relevantRobots
                  .flatMap(r => r.capabilities.map(c => ({ robot: r, cap: c })))
                  .filter(rc => rc.cap.taskId === task.id)
                  .sort((a, b) => b.cap.confidenceScore - a.cap.confidenceScore)[0];

                return (
                  <div key={task.id} className="p-6 border border-[#E5E5DF] rounded-sm bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{task.name}</h3>
                        <p className="text-sm text-[#8E8E8E]">{task.description}</p>
                      </div>
                      <span className={cn(
                        "text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-sm shrink-0",
                        task.difficulty === 'Extreme' ? 'bg-[#FCE8E6] text-[#C5221F]' :
                        task.difficulty === 'High' ? 'bg-[#FEF0D9] text-[#B94A00]' :
                        'bg-[#F5F5F0] text-[#4A4A4A]'
                      )}>
                        {task.difficulty} Difficulty
                      </span>
                    </div>

                    <div className="mb-6">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Environment Constraints</div>
                      <div className="flex flex-wrap gap-2">
                        {task.environmentConstraints.map(c => (
                          <span key={c} className="text-xs bg-[#F5F5F0] text-[#4A4A4A] px-2 py-1 rounded-sm border border-[#E5E5DF]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#F5F5F0] p-4 rounded-sm border border-[#E5E5DF]">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-3">State of the Art (SOTA)</div>
                      {bestCapability ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[#1A1A1A]">{bestCapability.robot.name}</span>
                              <span className="text-xs text-[#8E8E8E]">by {bestCapability.robot.manufacturer}</span>
                            </div>
                            <div className="text-sm text-[#4A4A4A]">
                              Capability: <span className="font-bold text-[#D97757]">{bestCapability.cap.successLevel}</span> 
                              <span className="text-[#8E8E8E] ml-2">(Confidence: {bestCapability.cap.confidenceScore}%)</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => onSelectRobot(bestCapability.robot.id)}
                            className="text-sm font-medium text-[#1A1A1A] hover:text-[#D97757] flex items-center gap-1 transition-colors"
                          >
                            View Evidence <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-[#8E8E8E] italic">No verified robotic solution currently tracked for this specific task.</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-sm">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#C5221F] mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Primary Blockers
            </h2>
            <p className="text-xs text-[#C5221F] mb-4 opacity-80">The "Last 10%" preventing full automation:</p>
            <ul className="space-y-4">
              {profession.blockers.map((blocker, i) => (
                <li key={i} className="text-sm text-[#1A1A1A] leading-relaxed pb-4 border-b border-[#FAD2CF] last:border-0 last:pb-0 flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5221F] mt-1.5 shrink-0" />
                  <span>{blocker}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
              Tracked Solutions
            </h2>
            <div className="space-y-3">
              {relevantRobots.map(r => (
                <button 
                  key={r.id}
                  onClick={() => onSelectRobot(r.id)}
                  className="w-full p-4 bg-white border border-[#E5E5DF] hover:border-[#1A1A1A] transition-colors rounded-sm text-left group"
                >
                  <div className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#D97757] transition-colors">{r.name}</div>
                  <div className="text-xs text-[#8E8E8E] flex justify-between">
                    <span>{r.manufacturer}</span>
                    <AvailabilityBadge status={r.availability} />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function RobotView({ robot, onBack, key }: { robot: Robot, onBack: () => void, key?: string }) {
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Calculate overall autonomy score based on average confidence of capabilities
  const overallConfidence = robot.capabilities.length > 0 
    ? Math.round(robot.capabilities.reduce((acc, c) => acc + c.confidenceScore, 0) / robot.capabilities.length)
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto p-12 lg:p-20"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-mono text-[#8E8E8E] hover:text-[#1A1A1A] mb-12 transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Back
      </button>

      <header className="mb-16 flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <AvailabilityBadge status={robot.availability} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">
              {robot.manufacturer}
            </span>
          </div>
          <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-6">
            {robot.name}
          </h1>
          <p className="text-xl text-[#4A4A4A] leading-relaxed max-w-3xl mb-8">
            {robot.description}
          </p>
          <button 
            onClick={() => setShowCompareModal(true)}
            className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#D97757] transition-colors"
          >
            Compare Intelligence
          </button>
        </div>
        
        <div className="flex gap-4 shrink-0">
          <div className="p-6 bg-[#F5F5F0] border border-[#E5E5DF] rounded-sm min-w-[160px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Pricing Model</div>
            <div className="font-bold text-[#1A1A1A]">{robot.pricingModel}</div>
          </div>
          <div className="p-6 bg-[#F5F5F0] border border-[#E5E5DF] rounded-sm min-w-[160px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Deployments</div>
            <div className="font-bold text-[#1A1A1A]">{robot.deploymentCount}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          
          {robot.videoUrl && (
            <section>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-4 flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> Verified Operation Footage
              </div>
              <div className="aspect-video w-full rounded-sm overflow-hidden border border-[#E5E5DF] bg-black shadow-lg">
                <iframe 
                  src={robot.videoUrl} 
                  title={`${robot.name} demonstration`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#E5E5DF] pb-4">
              Real-World Capabilities
            </h2>
            <div className="space-y-6">
              {robot.capabilities.map((cap, idx) => {
                // Find task name (inefficient but fine for this scale)
                const taskName = professions.flatMap(p => p.tasks).find(t => t.id === cap.taskId)?.name || cap.taskId;
                
                return (
                  <div key={idx} className="p-6 border border-[#E5E5DF] rounded-sm bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-[#1A1A1A]">{taskName}</h3>
                      <span className={cn(
                        "text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-sm",
                        cap.successLevel === 'Superhuman' ? 'bg-[#1A1A1A] text-white' :
                        cap.successLevel === 'Full' ? 'bg-[#E5E5DF] text-[#1A1A1A]' :
                        'bg-[#FCE8E6] text-[#C5221F]'
                      )}>
                        {cap.successLevel} Success
                      </span>
                    </div>
                    <p className="text-sm text-[#4A4A4A] mb-6 leading-relaxed">{cap.notes}</p>
                    
                    <div className="bg-[#F5F5F0] p-4 rounded-sm">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-3">Supporting Evidence</div>
                      <div className="space-y-2">
                        {cap.evidenceIds.map(eId => {
                          const ev = robot.evidence.find(e => e.id === eId);
                          if (!ev) return null;
                          return (
                            <a 
                              key={eId} 
                              href={ev.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white border border-[#E5E5DF] hover:border-[#D97757] rounded-sm group transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {ev.type === 'Video' ? <PlayCircle className="w-4 h-4 text-[#8E8E8E]" /> :
                                 ev.type === 'Paper' ? <FileText className="w-4 h-4 text-[#8E8E8E]" /> :
                                 ev.type === 'Company Claim' ? <Building2 className="w-4 h-4 text-[#8E8E8E]" /> :
                                 <Globe className="w-4 h-4 text-[#8E8E8E]" />}
                                <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#D97757] transition-colors">{ev.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {ev.verified && <span className="flex items-center gap-1 text-[10px] font-mono text-green-600"><CheckCircle2 className="w-3 h-3" /> Verified</span>}
                                <span className="text-[10px] font-mono text-[#8E8E8E] bg-[#F5F5F0] px-2 py-1 rounded-sm">{ev.deploymentType}</span>
                                <ExternalLink className="w-3 h-3 text-[#8E8E8E]" />
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-[#E5E5DF] pb-4">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(robot.specs).map(([key, value]) => (
                <div key={key} className="p-4 bg-[#F5F5F0] border border-[#E5E5DF] rounded-sm flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">{key}</span>
                  <span className="font-medium text-[#1A1A1A]">{value}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar: Limitations & Meta */}
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm flex flex-col items-center text-center">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-6">Data Confidence Score</h3>
            <RadialGauge score={overallConfidence} />
            <p className="text-xs text-[#8E8E8E] mt-6">Aggregated from verified evidence across all mapped capabilities.</p>
          </div>

          <section className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-sm">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#C5221F] mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Known Limitations
            </h2>
            <ul className="space-y-4">
              {robot.limitations.map((lim, i) => (
                <li key={i} className="text-sm text-[#1A1A1A] leading-relaxed pb-4 border-b border-[#FAD2CF] last:border-0 last:pb-0 flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5221F] mt-1.5 shrink-0" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {showCompareModal && (
        <CompareModal baseRobot={robot} onClose={() => setShowCompareModal(false)} />
      )}
    </motion.div>
  );
}

function SearchResultsView({ robots, onSelectRobot, onClear, key }: { robots: Robot[], onSelectRobot: (id: string) => void, onClear: () => void, key?: string }) {
  if (robots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <div className="w-16 h-16 bg-[#F5F5F0] rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-[#8E8E8E]" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">No robots found</h2>
        <p className="text-[#4A4A4A] mb-8 max-w-md">We couldn't find any robotic systems matching your current search and filter criteria.</p>
        <button 
          onClick={onClear}
          className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#D97757] transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="p-12 lg:p-20 max-w-6xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#E5E5DF] pb-4">
        Search Results ({robots.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {robots.map(r => (
          <button 
            key={r.id}
            onClick={() => onSelectRobot(r.id)}
            className="p-6 bg-white border border-[#E5E5DF] hover:border-[#1A1A1A] transition-colors rounded-sm text-left group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">{r.manufacturer}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#D97757] transition-colors">{r.name}</h3>
              </div>
              <AvailabilityBadge status={r.availability} />
            </div>
            <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-6 flex-1">{r.description}</p>
            <div className="flex items-center justify-between text-xs font-mono text-[#8E8E8E] pt-4 border-t border-[#E5E5DF]">
              <span>{r.pricingModel}</span>
              <span className="flex items-center gap-1 group-hover:text-[#D97757] transition-colors">View Details <ArrowRight className="w-3 h-3" /></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Components ---

function AvailabilityBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-sm whitespace-nowrap",
      status === 'Available' ? 'bg-[#E6F4EA] text-[#137333]' :
      status === 'Pilot' ? 'bg-[#FEF0D9] text-[#B94A00]' :
      'bg-[#F5F5F0] text-[#4A4A4A]'
    )}>
      {status}
    </span>
  );
}

function RadialGauge({ score }: { score: number }) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];
  
  return (
    <div className="w-48 h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#1A1A1A" />
            <Cell fill="#F5F5F0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-4xl font-serif font-bold text-[#1A1A1A]">{score}</span>
        <span className="text-[10px] font-mono text-[#8E8E8E]">/ 100</span>
      </div>
    </div>
  );
}

function CompareModal({ baseRobot, onClose }: { baseRobot: Robot, onClose: () => void }) {
  const [compareRobotId, setCompareRobotId] = useState<string | null>(null);
  const compareRobot = robots.find(r => r.id === compareRobotId);

  const getConfidence = (r: Robot) => r.capabilities.length > 0 
    ? Math.round(r.capabilities.reduce((acc, c) => acc + c.confidenceScore, 0) / r.capabilities.length)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:p-12 backdrop-blur-sm">
      <div className="bg-[#F5F5F0] w-full max-w-6xl max-h-full overflow-y-auto rounded-sm shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#D1D1CA] flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Comparative Intelligence</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F5F5F0] rounded-sm transition-colors">
            <X className="w-6 h-6 text-[#1A1A1A]" />
          </button>
        </div>
        
        <div className="p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Base Robot */}
            <div className="space-y-8">
              <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Base System</div>
                <h3 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">{baseRobot.name}</h3>
                <div className="text-sm text-[#4A4A4A] mb-4">by {baseRobot.manufacturer}</div>
                <AvailabilityBadge status={baseRobot.availability} />
              </div>
              
              <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm flex flex-col items-center">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Data Confidence</h4>
                <RadialGauge score={getConfidence(baseRobot)} />
              </div>

              <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">Specs</h4>
                <div className="space-y-3">
                  {Object.entries(baseRobot.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm border-b border-[#E5E5DF] pb-2 last:border-0 last:pb-0">
                      <span className="text-[#8E8E8E]">{key}</span>
                      <span className="font-medium text-right max-w-[60%]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-sm">
                <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[#C5221F] mb-4">Limitations</h4>
                <ul className="space-y-2">
                  {baseRobot.limitations.map((lim, i) => (
                    <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5221F] mt-1.5 shrink-0" />
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compare Robot */}
            <div className="space-y-8">
              <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Compare With</div>
                <select 
                  className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#D97757]"
                  value={compareRobotId || ''}
                  onChange={(e) => setCompareRobotId(e.target.value)}
                >
                  <option value="" disabled>Select a system to compare...</option>
                  {robots.filter(r => r.id !== baseRobot.id).map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.manufacturer})</option>
                  ))}
                </select>
              </div>

              {compareRobot ? (
                <>
                  <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm flex flex-col items-center">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Data Confidence</h4>
                    <RadialGauge score={getConfidence(compareRobot)} />
                  </div>
                  
                  <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                    <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">Specs</h4>
                    <div className="space-y-3">
                      {Object.entries(compareRobot.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-sm border-b border-[#E5E5DF] pb-2 last:border-0 last:pb-0">
                          <span className="text-[#8E8E8E]">{key}</span>
                          <span className="font-medium text-right max-w-[60%]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-sm">
                    <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[#C5221F] mb-4">Limitations</h4>
                    <ul className="space-y-2">
                      {compareRobot.limitations.map((lim, i) => (
                        <li key={i} className="text-sm text-[#1A1A1A] flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5221F] mt-1.5 shrink-0" />
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center p-12 border-2 border-dashed border-[#D1D1CA] rounded-sm text-[#8E8E8E] text-center">
                  Select a system above to see side-by-side comparison.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmissionModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'Robot' | 'Profession'>('Robot');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:p-12 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-full overflow-y-auto rounded-sm shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#E5E5DF] flex justify-between items-center sticky top-0 z-10 bg-white">
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Submit Intelligence</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F5F5F0] rounded-sm transition-colors">
            <X className="w-6 h-6 text-[#1A1A1A]" />
          </button>
        </div>
        
        <div className="p-8">
          <p className="text-sm text-[#4A4A4A] mb-8 leading-relaxed">
            Robonomics is a living document. Submit new robotic systems, unmapped professions, or verified evidence to improve the global automation dataset. All submissions undergo editorial review.
          </p>

          <div className="flex gap-4 mb-8 border-b border-[#E5E5DF]">
            <button 
              onClick={() => setTab('Robot')}
              className={cn(
                "pb-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2",
                tab === 'Robot' ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-transparent text-[#8E8E8E] hover:text-[#1A1A1A]"
              )}
            >
              New Robot
            </button>
            <button 
              onClick={() => setTab('Profession')}
              className={cn(
                "pb-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2",
                tab === 'Profession' ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-transparent text-[#8E8E8E] hover:text-[#1A1A1A]"
              )}
            >
              New Profession
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Submission received for editorial review.'); onClose(); }}>
            {tab === 'Robot' ? (
              <>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Robot Name</label>
                  <input type="text" required className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Manufacturer</label>
                  <input type="text" required className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Pricing Model</label>
                    <input type="text" placeholder="e.g. RaaS, Purchase" className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Availability</label>
                    <select className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none">
                      <option>Concept</option>
                      <option>Pilot</option>
                      <option>Available</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Evidence URL (Video/Paper)</label>
                  <input type="url" required className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Profession Name</label>
                  <input type="text" required className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Industry</label>
                  <select className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none">
                    {industries.map(i => <option key={i.name}>{i.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Future Impact Explanation (SOTA Analysis)</label>
                  <textarea required rows={4} className="w-full p-3 border border-[#D1D1CA] rounded-sm bg-[#F5F5F0] focus:bg-white focus:border-[#D97757] outline-none resize-none" placeholder="Explain the current state of the art and what is blocking full automation..."></textarea>
                </div>
              </>
            )}
            
            <div className="pt-6 border-t border-[#E5E5DF] flex justify-end gap-4">
              <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-medium text-[#4A4A4A] hover:text-[#1A1A1A]">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#D97757] transition-colors">Submit for Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

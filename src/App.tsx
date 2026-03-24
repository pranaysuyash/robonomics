import { useState, useMemo } from 'react';
import { 
  Cpu, 
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { robots } from './data/robots';
import { Robot } from './types';

export default function App() {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);

  const activeRobot = robots.find(r => r.id === selectedRobotId);
  const industries = useMemo(() => Array.from(new Set(robots.map(r => r.profession))), []);

  return (
    <div className="min-h-screen flex text-[#1A1A1A] bg-[#F5F5F0]">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-[#D1D1CA] p-8 flex flex-col gap-10 overflow-y-auto shrink-0">
        <button 
          onClick={() => {
            setSelectedProfession(null);
            setSelectedRobotId(null);
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
        >
          <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center rounded-sm shrink-0">
            <Cpu className="text-[#F5F5F0] w-5 h-5" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight">Robonomics</span>
        </button>

        <nav className="space-y-8">
          {industries.map(ind => {
            const indRobots = robots.filter(r => r.profession === ind);
            if (indRobots.length === 0) return null;
            
            return (
              <div key={ind}>
                <button
                  onClick={() => {
                    setSelectedProfession(ind);
                    setSelectedRobotId(null);
                  }}
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-4 hover:text-[#D97757] transition-colors ${selectedProfession === ind && !selectedRobotId ? 'text-[#D97757]' : 'text-[#8E8E8E]'}`}
                >
                  {ind}
                </button>
                <div className="space-y-2">
                  {indRobots.map(r => (
                    <button 
                      key={r.id}
                      onClick={() => {
                        setSelectedProfession(ind);
                        setSelectedRobotId(r.id);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm transition-all border-l-2 ${
                        selectedRobotId === r.id
                          ? 'border-[#D97757] text-[#1A1A1A] font-medium bg-[#E5E5DF]/30' 
                          : 'border-transparent text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#E5E5DF]/20'
                      }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedRobotId && activeRobot ? (
            <RobotView 
              key="robot" 
              robot={activeRobot} 
              onBack={() => setSelectedRobotId(null)} 
            />
          ) : selectedProfession ? (
            <IndustryView 
              key="industry" 
              industry={selectedProfession} 
              onSelectRobot={setSelectedRobotId} 
            />
          ) : (
            <HomeView 
              key="home" 
              onSelectIndustry={setSelectedProfession} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ onSelectIndustry, key }: { onSelectIndustry: (ind: string) => void, key?: string }) {
  const industries = Array.from(new Set(robots.map(r => r.profession)));
  const avgAutonomy = Math.round(robots.reduce((acc, r) => acc + r.autonomyScore, 0) / robots.length);
  const avgCoverage = Math.round(robots.reduce((acc, r) => acc + r.taskCoverage, 0) / robots.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-5xl mx-auto p-12 lg:p-20"
    >
      <header className="mb-20">
        <h1 className="text-6xl font-serif font-bold text-[#1A1A1A] mb-8 leading-tight max-w-4xl">
          The State of Global Automation
        </h1>
        <p className="text-2xl text-[#4A4A4A] max-w-3xl leading-relaxed font-serif italic">
          A living intelligence system tracking the exact tasks blocking full automation across every industry.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Average Autonomy</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{avgAutonomy}%</div>
          <p className="text-sm text-[#4A4A4A]">average autonomy score across all tracked robotic systems.</p>
        </div>
        <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Average Task Coverage</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{avgCoverage}%</div>
          <p className="text-sm text-[#4A4A4A]">average task coverage within their specific sub-professions.</p>
        </div>
        <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Tracked Systems</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{robots.length}</div>
          <p className="text-sm text-[#4A4A4A]">robots actively deployed in pilot or production environments.</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#D1D1CA] pb-4">
          Industry Automation Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map(ind => {
            const indRobots = robots.filter(r => r.profession === ind);
            if (indRobots.length === 0) return null;

            const indAvgAutonomy = Math.round(indRobots.reduce((acc, r) => acc + r.autonomyScore, 0) / indRobots.length);

            return (
              <div key={ind} className="p-8 border border-[#D1D1CA] bg-[#F5F5F0] hover:bg-white transition-colors rounded-sm group flex flex-col">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{ind}</h3>
                <p className="text-sm text-[#4A4A4A] mb-6 leading-relaxed flex-1">
                  Currently tracking {indRobots.length} key robotic system{indRobots.length === 1 ? '' : 's'} in this sector. Our analysis indicates an average autonomy score of {indAvgAutonomy}%.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white border border-[#E5E5DF] rounded-sm">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Systems</div>
                    <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{indRobots.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Avg Autonomy</div>
                    <div className="text-2xl font-serif font-bold text-[#1A1A1A]">{indAvgAutonomy}%</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-3">Tracked Systems</div>
                  {indRobots.map(r => (
                    <button 
                      key={r.id}
                      onClick={() => onSelectIndustry(ind)}
                      className="flex items-center justify-between w-full p-3 bg-white border border-[#E5E5DF] hover:border-[#D97757] transition-colors rounded-sm text-sm font-medium text-left group-hover:shadow-sm"
                    >
                      {r.name}
                      <ArrowRight className="w-4 h-4 text-[#8E8E8E] group-hover:text-[#D97757]" />
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

function IndustryView({ industry, onSelectRobot, key }: { industry: string, onSelectRobot: (id: string) => void, key?: string }) {
  const indRobots = robots.filter(r => r.profession === industry);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto p-12 lg:p-20"
    >
      <header className="mb-16">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Industry Overview</div>
        <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-6">
          {industry}
        </h1>
        <p className="text-xl text-[#4A4A4A] leading-relaxed max-w-3xl">
          Robotic systems and automation platforms currently deployed or in pilot phases within the {industry} sector.
        </p>
      </header>

      <div className="space-y-8">
        {indRobots.map(robot => (
          <div key={robot.id} className="p-8 bg-white border border-[#E5E5DF] rounded-sm hover:border-[#D1D1CA] transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D97757] mb-2">{robot.subProfession}</div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">{robot.name}</h3>
                <div className="text-sm text-[#8E8E8E] mb-4">by {robot.manufacturer}</div>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">{robot.description}</p>
                
                <div className="flex gap-4">
                  <div className="px-3 py-1.5 bg-[#F5F5F0] rounded-sm text-xs font-medium text-[#4A4A4A]">
                    Autonomy: {robot.autonomyScore}%
                  </div>
                  <div className="px-3 py-1.5 bg-[#F5F5F0] rounded-sm text-xs font-medium text-[#4A4A4A]">
                    Coverage: {robot.taskCoverage}%
                  </div>
                  <div className="px-3 py-1.5 bg-[#F5F5F0] rounded-sm text-xs font-medium text-[#4A4A4A]">
                    Status: {robot.availability}
                  </div>
                </div>
              </div>
              
              <div className="shrink-0">
                <button 
                  onClick={() => onSelectRobot(robot.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#4A4A4A] transition-colors"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RobotView({ robot, onBack, key }: { robot: Robot, onBack: () => void, key?: string }) {
  const [showCompareModal, setShowCompareModal] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto p-12 lg:p-20"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-mono text-[#8E8E8E] hover:text-[#1A1A1A] mb-12 transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Industry
      </button>

      <header className="mb-16 flex flex-col lg:flex-row justify-between items-start gap-8">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D97757] mb-2">{robot.subProfession}</div>
          <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-4">
            {robot.name}
          </h1>
          <div className="text-xl text-[#4A4A4A] font-medium mb-6">
            by {robot.manufacturer}
          </div>
          <button 
            onClick={() => setShowCompareModal(true)}
            className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-sm hover:bg-[#4A4A4A] transition-colors"
          >
            Compare Robots
          </button>
        </div>
        
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm min-w-[120px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Status</div>
            <div className="font-medium">{robot.availability}</div>
          </div>
          <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm min-w-[120px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Pricing</div>
            <div className="font-medium">{robot.price}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-[#D1D1CA] pb-4">
              Overview
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed text-lg">
              {robot.description}
            </p>
          </section>

          {robot.videoUrl && (
            <section>
              <div className="aspect-video w-full rounded-sm overflow-hidden border border-[#E5E5DF] bg-black">
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
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-[#D1D1CA] pb-4">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(robot.specs).map(([key, value]) => (
                <div key={key} className="p-4 bg-white border border-[#E5E5DF] rounded-sm flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">{key}</span>
                  <span className="font-medium text-[#1A1A1A]">{value}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar: Limitations & Meta */}
        <div className="space-y-12">
          <GaugeChart score={robot.autonomyScore} label="Autonomy Score" />
          <GaugeChart score={robot.taskCoverage} label="Task Coverage" color="#1A1A1A" />

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

          <section>
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">
              Deployment & Sources
            </h2>
            <div className="space-y-4 text-sm text-[#4A4A4A]">
              <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Deployments</div>
                <div className="font-medium text-[#1A1A1A]">{robot.deploymentCount}</div>
              </div>
              <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Sources</div>
                <ul className="space-y-2">
                  {robot.sources.map((source, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ExternalLink className="w-3 h-3 mt-1 shrink-0 text-[#D97757]" />
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showCompareModal && (
        <CompareModal baseRobot={robot} onClose={() => setShowCompareModal(false)} />
      )}
    </motion.div>
  );
}

function GaugeChart({ score, label = "Score", color = "#D97757" }: { score: number, label?: string, color?: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-[#E5E5DF] rounded-sm">
      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">{label}</div>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#F5F5F0"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-serif font-bold text-[#1A1A1A]">{score}%</span>
        </div>
      </div>
    </div>
  );
}

function CompareModal({ baseRobot, onClose }: { baseRobot: Robot, onClose: () => void }) {
  const [compareRobotId, setCompareRobotId] = useState<string | null>(null);
  const compareRobot = robots.find(r => r.id === compareRobotId);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:p-12">
      <div className="bg-[#F5F5F0] w-full max-w-6xl max-h-full overflow-y-auto rounded-sm shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#D1D1CA] flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Compare Robots</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F5F5F0] rounded-sm transition-colors">
            <X className="w-6 h-6 text-[#1A1A1A]" />
          </button>
        </div>
        
        <div className="p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Base Robot */}
            <div className="space-y-8">
              <div className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Base Robot</div>
                <h3 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">{baseRobot.name}</h3>
                <div className="text-sm text-[#4A4A4A]">by {baseRobot.manufacturer}</div>
                <div className="mt-4 inline-block px-3 py-1 bg-[#F5F5F0] text-xs font-medium rounded-sm">
                  {baseRobot.profession} • {baseRobot.subProfession}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <GaugeChart score={baseRobot.autonomyScore} label="Autonomy" />
                <GaugeChart score={baseRobot.taskCoverage} label="Task Coverage" color="#1A1A1A" />
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
                  <option value="" disabled>Select a robot to compare...</option>
                  {robots.filter(r => r.id !== baseRobot.id).map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.manufacturer})</option>
                  ))}
                </select>
              </div>

              {compareRobot ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <GaugeChart score={compareRobot.autonomyScore} label="Autonomy" />
                    <GaugeChart score={compareRobot.taskCoverage} label="Task Coverage" color="#1A1A1A" />
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
                  Select a robot above to see side-by-side comparison.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

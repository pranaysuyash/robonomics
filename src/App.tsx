import { useState, useMemo } from 'react';
import { 
  Search, 
  Cpu, 
  ChevronRight,
  Info,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { robots, professions, industries } from './data/robots';
import { Robot, Industry, Profession, Task, Capability } from './types';

export default function App() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>(null);
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);

  const activeProfession = professions.find(p => p.id === selectedProfessionId);
  const activeRobot = robots.find(r => r.id === selectedRobotId);

  return (
    <div className="min-h-screen flex text-[#1A1A1A] bg-[#F5F5F0]">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-[#D1D1CA] p-8 flex flex-col gap-10 overflow-y-auto shrink-0">
        <button 
          onClick={() => {
            setSelectedIndustry(null);
            setSelectedProfessionId(null);
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
            const indProfessions = professions.filter(p => p.industry === ind.name);
            if (indProfessions.length === 0) return null;
            
            return (
              <div key={ind.name}>
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">
                  {ind.name}
                </h3>
                <div className="space-y-2">
                  {indProfessions.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        setSelectedIndustry(ind.name);
                        setSelectedProfessionId(p.id);
                        setSelectedRobotId(null);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm transition-all border-l-2 ${
                        selectedProfessionId === p.id && !selectedRobotId
                          ? 'border-[#D97757] text-[#1A1A1A] font-medium bg-[#E5E5DF]/30' 
                          : 'border-transparent text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#E5E5DF]/20'
                      }`}
                    >
                      {p.name}
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
          ) : activeProfession ? (
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
      </main>
    </div>
  );
}

function HomeView({ onSelectProfession }: { onSelectProfession: (id: string) => void, key?: string }) {
  // Calculate global stats
  const totalTasks = professions.reduce((acc, p) => acc + p.tasks.length, 0);
  const automatedTasks = robots.flatMap(r => r.capabilities).filter(c => c.successLevel === 'Full' || c.successLevel === 'Superhuman').length;
  const automationPercentage = Math.round((automatedTasks / (totalTasks || 1)) * 100);

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
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Global Task Coverage</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{automationPercentage}%</div>
          <p className="text-sm text-[#4A4A4A]">of tracked tasks have a 'Full' or 'Superhuman' robotic solution.</p>
        </div>
        <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Tracked Professions</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{professions.length}</div>
          <p className="text-sm text-[#4A4A4A]">jobs analyzed down to their atomic tasks and environmental constraints.</p>
        </div>
        <div className="p-8 bg-white border border-[#E5E5DF] rounded-sm">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">Verified Deployments</div>
          <div className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{robots.reduce((acc, r) => acc + (r.deploymentCount === 'Unknown' ? 0 : parseInt(r.deploymentCount) || 0), 0)}+</div>
          <p className="text-sm text-[#4A4A4A]">robots actively deployed in pilot or production environments.</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#D1D1CA] pb-4">
          Industry Automation Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map(ind => {
            const indProfessions = professions.filter(p => p.industry === ind.name);
            if (indProfessions.length === 0) return null;

            return (
              <div key={ind.name} className="p-8 border border-[#D1D1CA] bg-[#F5F5F0] hover:bg-white transition-colors rounded-sm group">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{ind.name}</h3>
                <p className="text-sm text-[#4A4A4A] mb-6 leading-relaxed">{ind.description}</p>
                
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-3">Analyzed Professions</div>
                  {indProfessions.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => onSelectProfession(p.id)}
                      className="flex items-center justify-between w-full p-3 bg-white border border-[#E5E5DF] hover:border-[#D97757] transition-colors rounded-sm text-sm font-medium text-left group-hover:shadow-sm"
                    >
                      {p.name}
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

function ProfessionView({ profession, onSelectRobot }: { profession: Profession, onSelectRobot: (id: string) => void, key?: string }) {
  // Calculate overall automation progress based on task difficulty and robot capabilities
  const getTaskCoverage = (taskId: string) => {
    const capabilities = robots.flatMap(r => r.capabilities.filter(c => c.taskId === taskId).map(c => ({ robot: r, capability: c })));
    if (capabilities.length === 0) return { status: 'None', bestRobot: null, confidence: 0 };
    
    // Find the best capability
    const best = capabilities.reduce((prev, current) => {
      const scoreMap = { 'None': 0, 'Partial': 1, 'Full': 2, 'Superhuman': 3 };
      if (scoreMap[current.capability.successLevel] > scoreMap[prev.capability.successLevel]) return current;
      if (scoreMap[current.capability.successLevel] === scoreMap[prev.capability.successLevel] && current.capability.confidenceScore > prev.capability.confidenceScore) return current;
      return prev;
    });

    return { status: best.capability.successLevel, bestRobot: best.robot, confidence: best.capability.confidenceScore };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-5xl mx-auto p-12 lg:p-20"
    >
      <header className="mb-16">
        <div className="flex items-center gap-3 text-sm font-mono text-[#8E8E8E] mb-6">
          <span>{profession.industry}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A]">{profession.name}</span>
        </div>
        <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-6 leading-tight">
          {profession.name}
        </h1>
        <p className="text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
          {profession.description}
        </p>
      </header>

      {/* Blockers Section - Prominent */}
      <section className="mb-20 p-8 bg-[#FCE8E6] border border-[#FAD2CF] rounded-sm">
        <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#C5221F] mb-6 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> Primary Automation Blockers
        </h2>
        <ul className="space-y-4">
          {profession.blockers.map((blocker, i) => (
            <li key={i} className="flex gap-4 text-[#1A1A1A]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5221F] mt-2 shrink-0" />
              <span className="text-lg leading-relaxed">{blocker}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Task Breakdown */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#D1D1CA] pb-4">
          Task-Level Automation Map
        </h2>
        <div className="space-y-8">
          {profession.tasks.map(task => {
            const coverage = getTaskCoverage(task.id);
            return (
              <div key={task.id} className="p-8 border border-[#E5E5DF] bg-white rounded-sm shadow-sm">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Task Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{task.name}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-sm ${
                        task.difficulty === 'Extreme' ? 'border-[#FAD2CF] text-[#C5221F] bg-[#FCE8E6]' :
                        task.difficulty === 'High' ? 'border-[#FAD2CF] text-[#B06000] bg-[#FEF7E0]' :
                        'border-[#E5E5DF] text-[#4A4A4A] bg-[#F5F5F0]'
                      }`}>
                        {task.difficulty} Difficulty
                      </span>
                    </div>
                    <p className="text-[#4A4A4A] mb-4">{task.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {task.environmentConstraints.map(c => (
                        <span key={c} className="text-xs text-[#8E8E8E] bg-[#F5F5F0] px-2 py-1 rounded-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Automation Status */}
                  <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-[#E5E5DF] pt-6 lg:pt-0 lg:pl-8">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-3">
                      Current State of the Art
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      {coverage.status === 'Full' || coverage.status === 'Superhuman' ? (
                        <CheckCircle2 className="w-6 h-6 text-[#137333]" />
                      ) : coverage.status === 'Partial' ? (
                        <AlertCircle className="w-6 h-6 text-[#B06000]" />
                      ) : (
                        <HelpCircle className="w-6 h-6 text-[#8E8E8E]" />
                      )}
                      <span className="text-lg font-bold">
                        {coverage.status === 'None' ? 'Not Automated' : coverage.status}
                      </span>
                    </div>

                    {coverage.bestRobot && (
                      <div>
                        <div className="text-xs text-[#4A4A4A] mb-2">Leading Solution:</div>
                        <button 
                          onClick={() => onSelectRobot(coverage.bestRobot!.id)}
                          className="flex items-center justify-between w-full p-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] transition-colors rounded-sm text-sm font-medium border border-[#D1D1CA]"
                        >
                          {coverage.bestRobot.name}
                          <ArrowRight className="w-4 h-4 text-[#8E8E8E]" />
                        </button>
                        <div className="mt-2 text-[10px] font-mono text-[#8E8E8E] text-right">
                          Confidence: {coverage.confidence}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}

function RobotView({ robot, onBack }: { robot: Robot, onBack: () => void, key?: string }) {
  // Find which tasks this robot attempts
  const capabilities = robot.capabilities.map(c => {
    const task = professions.flatMap(p => p.tasks).find(t => t.id === c.taskId);
    return { ...c, task };
  }).filter(c => c.task);

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
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Profession
      </button>

      <header className="mb-16 flex flex-col lg:flex-row justify-between items-start gap-8">
        <div>
          <h1 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-4">
            {robot.name}
          </h1>
          <div className="text-xl text-[#4A4A4A] font-medium">
            by {robot.manufacturer}
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm min-w-[120px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Status</div>
            <div className="font-medium">{robot.availability}</div>
          </div>
          <div className="p-4 bg-white border border-[#E5E5DF] rounded-sm min-w-[120px]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-1">Deployments</div>
            <div className="font-medium">{robot.deploymentCount}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          
          {/* Real-World Capability vs Claims */}
          <section>
            <h2 className="text-2xl font-serif font-bold mb-8 border-b border-[#D1D1CA] pb-4">
              Real-World Capability
            </h2>
            <div className="space-y-6">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-6 bg-white border border-[#E5E5DF] rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#1A1A1A]">{cap.task?.name}</h3>
                    <span className={`pill ${
                      cap.successLevel === 'Full' || cap.successLevel === 'Superhuman' ? 'pill-success' :
                      cap.successLevel === 'Partial' ? 'pill-warning' : 'pill-danger'
                    }`}>
                      {cap.successLevel}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4">
                    {cap.notes}
                  </p>
                  
                  {/* Evidence Links */}
                  {cap.evidenceIds.length > 0 && (
                    <div className="pt-4 border-t border-[#E5E5DF]">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">Evidence</div>
                      <div className="flex flex-col gap-2">
                        {cap.evidenceIds.map(eId => {
                          const ev = robot.evidence.find(e => e.id === eId);
                          if (!ev) return null;
                          return (
                            <a key={eId} href={ev.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#D97757] hover:underline">
                              <ExternalLink className="w-3 h-3" />
                              {ev.title}
                              {ev.verified && <span className="text-[10px] bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-sm ml-2 no-underline">Verified {ev.deploymentType}</span>}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar: Limitations & Meta */}
        <div className="space-y-12">
          <section className="p-6 bg-[#F5F5F0] border border-[#D1D1CA] rounded-sm">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-6 flex items-center gap-2">
              <Info className="w-4 h-4" /> Known Limitations
            </h2>
            <ul className="space-y-4">
              {robot.limitations.map((lim, i) => (
                <li key={i} className="text-sm text-[#4A4A4A] leading-relaxed pb-4 border-b border-[#E5E5DF] last:border-0 last:pb-0">
                  {lim}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#8E8E8E] mb-4">
              System Meta
            </h2>
            <div className="space-y-3 text-sm text-[#4A4A4A]">
              <div className="flex justify-between">
                <span>Pricing Model</span>
                <span className="font-medium text-[#1A1A1A]">{robot.pricingModel}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Confidence</span>
                <span className="font-mono text-[#1A1A1A]">
                  {Math.round(capabilities.reduce((acc, c) => acc + c.confidenceScore, 0) / (capabilities.length || 1))}%
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

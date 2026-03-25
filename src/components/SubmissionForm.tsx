import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface SubmissionFormProps {
  onClose: () => void;
}

export function SubmissionForm({ onClose }: SubmissionFormProps) {
  const [type, setType] = useState<'new' | 'edit'>('new');
  const [newType, setNewType] = useState<'robot' | 'profession'>('robot');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-800 p-12 shadow-2xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Submission Received</h2>
          <p className="text-slate-400 mb-8">
            Thank you for contributing to Robonomics. Your submission has been sent to our editorial team for review and verification.
          </p>
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-800 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Submit Data</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        
        <div className="flex gap-4 mb-6">
          <button onClick={() => setType('new')} className={`px-4 py-2 rounded-lg ${type === 'new' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>New Entry</button>
          <button onClick={() => setType('edit')} className={`px-4 py-2 rounded-lg ${type === 'edit' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Suggest Edit</button>
        </div>

        {type === 'new' && (
          <div className="flex gap-4 mb-6">
            <button onClick={() => setNewType('robot')} className={`px-4 py-2 rounded-lg ${newType === 'robot' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`}>Robot</button>
            <button onClick={() => setNewType('profession')} className={`px-4 py-2 rounded-lg ${newType === 'profession' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`}>Profession</button>
          </div>
        )}

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          {type === 'new' && newType === 'robot' && (
            <>
              <input type="text" placeholder="Robot Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" required />
              <input type="text" placeholder="Manufacturer" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" required />
              <textarea placeholder="Description & SOTA Analysis" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white h-32" required />
              <input type="url" placeholder="Video URL" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" />
            </>
          )}
          {type === 'new' && newType === 'profession' && (
            <>
              <input type="text" placeholder="Profession Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" required />
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" required>
                <option value="">Select Industry</option>
                {['Agriculture', 'Construction', 'Logistics', 'Food Service', 'Medical', 'Manufacturing', 'Maintenance', 'Retail', 'Security'].map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <textarea placeholder="Future Impact Explanation" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white h-32" required />
            </>
          )}
          {type === 'edit' && (
             <textarea placeholder="Describe the suggested edit" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white h-32" required />
          )}
          <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400">Submit</button>
        </form>
      </motion.div>
    </div>
  );
}

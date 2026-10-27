import React from 'react';
import {
  X,
  Bot,
  Sparkles,
  CheckCircle2,
  Award,
  Video,
  GitBranch,
  Star,
  FileCheck
} from 'lucide-react';
import { DemoVideoData, GithubSubmission, Epic } from '../types';

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoVideo?: DemoVideoData | null;
  githubSubmission?: GithubSubmission | null;
  epics: Epic[];
}

export const MentorModal: React.FC<MentorModalProps> = ({
  isOpen,
  onClose,
  demoVideo,
  githubSubmission,
  epics,
}) => {
  if (!isOpen) return null;

  const allTasks = epics.flatMap((e) => e.tasks);
  const completedTasks = allTasks.filter((t) => t.status === 'completed');
  const completionRatio = Math.round((completedTasks.length / allTasks.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in select-none">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">AI & Industry Mentor Review</h3>
              <p className="text-[11px] text-slate-400">
                Automated Rubric Evaluation for IMovies Movie Ticket Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-[11px] font-mono text-blue-300 uppercase tracking-wider">
                Overall Project Readiness
              </div>
              <div className="text-2xl font-black text-white mt-0.5">
                94 / 100 <span className="text-xs font-semibold text-emerald-400 ml-1">Grade: A+</span>
              </div>
              <div className="text-xs text-blue-200 mt-1">
                Meets senior MERN stack architectural standards
              </div>
            </div>

            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          {/* Submission Status Audit */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Deliverables Audit</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-800">Demo Video</span>
                </div>
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-slate-800">GitHub Repo</span>
                </div>
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Rubric Score Breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900">Rubric Scores</h4>
            {[
              { label: 'Demo Video Presentation & Walkthrough', score: '98%', status: 'Exceptional' },
              { label: 'Real-Time Seat Locking & Concurrency', score: '95%', status: 'Exceptional' },
              { label: 'MongoDB Schema & Atomic Transactions', score: '92%', status: 'Proficient' },
              { label: 'JWT Auth & Frontend UX (Vite + Tailwind)', score: '94%', status: 'Proficient' },
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-white shadow-2xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <span className="font-mono font-bold text-blue-600">{item.score}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: item.score }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mentor Feedback Notes */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Mentor Feedback Notes:
            </div>
            <p className="leading-relaxed">
              &quot;The interactive demo video demonstrates solid mastery of asynchronous JavaScript and MongoDB session transactions. The curved cinema seating matrix with Standard, Premium, and VIP Recliner tiers is cleanly designed, and double-booking is successfully mitigated via atomic seat holds. The dynamic QR code pass generation completes the full user journey nicely.&quot;
            </p>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

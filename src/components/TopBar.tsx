import React from 'react';
import {
  ShieldCheck,
  Download,
  Star,
  User,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface TopBarProps {
  activeView: 'overview' | 'workspace' | 'kanban';
  onSelectView: (view: 'overview' | 'workspace' | 'kanban') => void;
  zoomLevel: number;
  onZoomChange: (delta: number) => void;
  onOpenAiAssist: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onSelectView,
  zoomLevel,
  onZoomChange,
  onOpenAiAssist,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 select-none">
      {/* Top URL / Breadcrumb Bar from screenshot */}
      <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2 overflow-hidden max-w-3xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="font-mono text-[11px] truncate text-slate-300">
            <span className="text-white font-semibold">myskillwallet.ai</span>
            <span className="text-slate-500">/dashboard/skillwallet/module/</span>
            <span className="text-blue-400">full-stack-development-mern-stack-6abcef5299f95df78ade4b61</span>
            <span className="text-slate-500">/projects/</span>
            <span className="text-slate-400">6abbb15bd0f1122938a</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-slate-400">
          <button
            onClick={() => onZoomChange(-10)}
            className="hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-slate-200 min-w-8 text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => onZoomChange(10)}
            className="hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-3 w-px bg-slate-700" />

          <button className="hover:text-white transition-colors" title="Bookmark Project">
            <Star className="w-3.5 h-3.5" />
          </button>
          <button className="hover:text-white transition-colors" title="Download Materials">
            <Download className="w-3.5 h-3.5" />
          </button>

          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-[10px] font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Project Subheader with Title & View Switcher (Overview, Workspace, Kanban) */}
      <div className="px-6 py-3 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            IMovies - Movie ticket booking made simple.
          </h2>
        </div>

        {/* View Switchers: Overview | Workspace | Kanban */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => onSelectView('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeView === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectView('workspace')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeView === 'workspace'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => onSelectView('kanban')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeView === 'kanban'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Kanban
          </button>
        </div>
      </div>
    </div>
  );
};

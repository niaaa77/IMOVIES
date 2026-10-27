import React, { useState } from 'react';
import {
  FolderTree,
  FileCode,
  Terminal,
  Play,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Server,
  Layers,
  Sparkles
} from 'lucide-react';
import { MOCK_CODE_FILES } from '../data/mockData';

export const WorkspaceView: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const currentFile = MOCK_CODE_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunApiTest = () => {
    setIsExecuting(true);
    setSimulatedLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] > node server/test_concurrency.js`,
      `[INFO] Connecting to MongoDB Replica Set at cluster0.mongodb.net...`,
      `[INFO] Simulating 10 concurrent seat lock requests on Showtime #659a2f...`,
      `[SUCCESS] Lock acquired for Seat F-12 (Lock token: 91fa02c)`,
      `[CONFLICT] 409 Conflict handled cleanly for 9 duplicate requests. Zero double-booking detected!`,
      `[REST] POST /api/v1/bookings 201 Created (14ms response time)`
    ]);
    setTimeout(() => {
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900 text-slate-200">
      {/* Top Workspace Toolbar */}
      <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-blue-400 flex items-center gap-1.5">
            <Server className="w-4 h-4" />
            IMovies MERN Project Repository
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-mono text-[11px]">branch: main</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunApiTest}
            disabled={isExecuting}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isExecuting ? 'Testing Concurrency...' : 'Run API & DB Test'}
          </button>
        </div>
      </div>

      {/* Main Code Viewport with File Explorer */}
      <div className="flex-1 flex overflow-hidden">
        {/* File tree sidebar */}
        <div className="w-64 bg-slate-950/80 border-r border-slate-800 p-3 select-none flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-2">
              Explorer Files
            </div>
            <div className="space-y-1">
              {MOCK_CODE_FILES.map((file, idx) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-mono text-left transition-colors truncate ${
                    selectedFileIndex === idx
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-400">
            <div className="font-bold text-slate-300 mb-1">MERN Stack Spec</div>
            <div>React 18 · Node 18</div>
            <div>Express 4 · MongoDB 6</div>
          </div>
        </div>

        {/* Code display */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-900">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-300">{currentFile.path}</span>
            <button
              onClick={handleCopy}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] flex items-center gap-1 transition-colors text-slate-300"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-slate-300 select-text">
            <pre className="text-slate-300 font-mono">
              <code>{currentFile.code}</code>
            </pre>
          </div>

          {/* Terminal output box */}
          <div className="h-44 bg-slate-950 border-t border-slate-800 p-3 flex flex-col font-mono text-[11px]">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-slate-400 text-[10px] uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Integrated Test Terminal
              </span>
              <button
                onClick={() => setSimulatedLog([])}
                className="hover:text-slate-200 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-2 space-y-1 text-slate-400">
              <div className="text-slate-500">// Press &quot;Run API & DB Test&quot; to execute real-time seat lock verification...</div>
              {simulatedLog.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('SUCCESS')
                      ? 'text-emerald-400'
                      : log.includes('CONFLICT')
                      ? 'text-amber-300'
                      : log.includes('REST')
                      ? 'text-blue-400'
                      : 'text-slate-300'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

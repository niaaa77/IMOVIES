import React, { useState } from 'react';
import {
  Play,
  GitBranch,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  Check
} from 'lucide-react';
import { Epic, Task, DemoVideoData, GithubSubmission } from '../types';

interface RightSidebarProps {
  epics: Epic[];
  onToggleTask: (epicId: string, taskId: string) => void;
  onOpenDemoModal: () => void;
  onOpenGithubModal: () => void;
  demoVideo?: DemoVideoData | null;
  githubSubmission?: GithubSubmission | null;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  epics,
  onToggleTask,
  onOpenDemoModal,
  onOpenGithubModal,
  demoVideo,
  githubSubmission,
}) => {
  const [expandedEpicId, setExpandedEpicId] = useState<string>('epic-4'); // DATABASE DEVELOPMENT opened by default as in screenshot

  // Calculate overall project progress
  const allTasks = epics.flatMap((e) => e.tasks);
  const completedTasks = allTasks.filter((t) => t.status === 'completed');
  const progressPercentage = Math.round(
    (completedTasks.length / (allTasks.length || 1)) * 100
  );

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full overflow-y-auto shrink-0 select-none">
      {/* Project Progress Section */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Project Progress
          </h3>
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4 border border-slate-200/60">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Two Submission Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDemoModal}
            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              demoVideo
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${demoVideo ? 'fill-blue-600 text-blue-600' : 'text-slate-700'}`} />
            <span className="truncate">{demoVideo ? 'Demo Added ✓' : 'Add Demo Link'}</span>
          </button>

          <button
            onClick={onOpenGithubModal}
            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              githubSubmission
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <GitBranch className={`w-3.5 h-3.5 ${githubSubmission ? 'text-emerald-600' : 'text-slate-700'}`} />
            <span className="truncate">{githubSubmission ? 'GitHub Added ✓' : 'Add Github Link'}</span>
          </button>
        </div>
      </div>

      {/* Accordion Epics List */}
      <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {epics.map((epic) => {
          const isExpanded = expandedEpicId === epic.id;
          const epicCompleted = epic.tasks.filter((t) => t.status === 'completed').length;
          const epicProgress = Math.round((epicCompleted / (epic.tasks.length || 1)) * 100);

          return (
            <div key={epic.id} className="transition-colors">
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedEpicId(isExpanded ? '' : epic.id)}
                className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors ${
                  isExpanded ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="overflow-hidden pr-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block truncate">
                    {epic.title}
                  </span>

                  {/* Metadata Chips (matching screenshot for Database Development) */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500 text-white">
                      Complexity: {epic.complexity}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white">
                      Duration: {epic.duration}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-500 text-white">
                      Progress: {epicProgress}%
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-600 text-white">
                      Stories: {epic.tasks.length}
                    </span>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Stories / Tasks Content */}
              {isExpanded && (
                <div className="px-5 py-3 bg-white space-y-2.5 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Stories & Acceptance Criteria
                  </div>

                  {epic.tasks.map((task) => {
                    const isDone = task.status === 'completed';

                    return (
                      <div
                        key={task.id}
                        className={`p-2.5 rounded-lg border text-xs transition-all ${
                          isDone
                            ? 'bg-slate-50/60 border-slate-200/60 opacity-80'
                            : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => onToggleTask(epic.id, task.id)}
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                              isDone
                                ? 'bg-blue-600 text-white'
                                : 'border border-slate-300 hover:border-blue-500'
                            }`}
                          >
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>

                          <div className="flex-1">
                            <span
                              className={`font-semibold leading-tight block ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}
                            >
                              {task.title}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                              {task.description}
                            </p>

                            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
                              <span>Est: {task.estimatedHours}h</span>
                              <span>·</span>
                              <span className="capitalize">{task.complexity}</span>
                              <span>·</span>
                              <span
                                className={`font-semibold capitalize ${
                                  task.status === 'completed'
                                    ? 'text-emerald-600'
                                    : task.status === 'in_progress'
                                    ? 'text-amber-600'
                                    : 'text-slate-500'
                                }`}
                              >
                                {task.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

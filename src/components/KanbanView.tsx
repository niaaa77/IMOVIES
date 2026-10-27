import React, { useState } from 'react';
import {
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Epic, Task } from '../types';

interface KanbanViewProps {
  epics: Epic[];
  onUpdateTaskStatus: (
    epicId: string,
    taskId: string,
    newStatus: Task['status']
  ) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  epics,
  onUpdateTaskStatus,
}) => {
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<string>('all');

  const allTasks = epics.flatMap((e) =>
    e.tasks.map((t) => ({ ...t, epicTitle: e.title, epicId: e.id }))
  );

  const filteredTasks =
    selectedEpicFilter === 'all'
      ? allTasks
      : allTasks.filter((t) => t.epicId === selectedEpicFilter);

  const columns: { id: Task['status']; label: string; color: string }[] = [
    { id: 'backlog', label: 'Backlog', color: 'border-slate-300' },
    { id: 'in_progress', label: 'In Progress', color: 'border-amber-400' },
    { id: 'review', label: 'Under Review', color: 'border-blue-400' },
    { id: 'completed', label: 'Completed', color: 'border-emerald-500' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      {/* Kanban Filter Header */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            Project Kanban Board
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{filteredTasks.length} Total Stories</span>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Filter Epic:</span>
          <select
            value={selectedEpicFilter}
            onChange={(e) => setSelectedEpicFilter(e.target.value)}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
          >
            <option value="all">All 6 Epics</option>
            {epics.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Column Board */}
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="grid grid-cols-4 gap-4 h-full min-w-[900px]">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                className="bg-slate-100/80 rounded-xl p-3 border border-slate-200 flex flex-col h-full"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 tracking-tight">
                      {col.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200">
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow text-xs"
                    >
                      <div className="text-[10px] font-mono font-bold uppercase text-blue-600 mb-1 truncate">
                        {task.epicTitle}
                      </div>
                      <h4 className="font-semibold text-slate-900 leading-snug mb-1.5">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium text-slate-600">
                          {task.complexity} · {task.estimatedHours}h
                        </span>

                        {/* Move status dropdown */}
                        <select
                          value={task.status}
                          onChange={(e) =>
                            onUpdateTaskStatus(
                              task.epicId,
                              task.id,
                              e.target.value as Task['status']
                            )
                          }
                          className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700"
                        >
                          <option value="backlog">Backlog</option>
                          <option value="in_progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

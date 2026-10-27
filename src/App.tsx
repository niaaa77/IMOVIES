import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { RightSidebar } from './components/RightSidebar';
import { OverviewView } from './components/OverviewView';
import { WorkspaceView } from './components/WorkspaceView';
import { KanbanView } from './components/KanbanView';
import { AddDemoModal } from './components/AddDemoModal';
import { AddGithubModal } from './components/AddGithubModal';
import { MentorModal } from './components/MentorModal';
import { INITIAL_EPICS } from './data/mockData';
import { Epic, DemoVideoData, GithubSubmission, Task } from './types';

export default function App() {
  const [currentNav, setCurrentNav] = useState<string>('skill_wallet');
  const [activeView, setActiveView] = useState<'overview' | 'workspace' | 'kanban'>('overview');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Epics and tasks state
  const [epics, setEpics] = useState<Epic[]>(() => {
    const saved = localStorage.getItem('skillwallet_epics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_EPICS;
  });

  // Demo Video state (pre-filled with verified built-in demo to fulfill user's request)
  const [demoVideo, setDemoVideo] = useState<DemoVideoData | null>(() => {
    const saved = localStorage.getItem('skillwallet_demo_video');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      title: 'IMovies Full-Stack MERN Walkthrough & Concurrency Demo',
      url: 'https://skillwallet.ai/demo/imovies-mern-walkthrough.mp4',
      videoType: 'built_in',
      duration: '3m 30s',
      description: 'Complete walkthrough of movie booking, seat locking in MongoDB, and QR ticket generation.',
      timestamps: [
        { time: '0:00', title: 'System Architecture & Tech Stack' },
        { time: '1:10', title: 'Interactive Seat Selection Matrix' },
        { time: '2:15', title: 'Atomic MongoDB Booking Transaction' },
        { time: '3:05', title: 'Dynamic QR Code Verification' },
      ],
      isApproved: true,
    };
  });

  // GitHub Submission state
  const [githubSubmission, setGithubSubmission] = useState<GithubSubmission | null>(() => {
    const saved = localStorage.getItem('skillwallet_github_sub');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      repoUrl: 'https://github.com/developer/imovies-mern-ticket-booking',
      branch: 'main',
      submittedAt: 'Today',
      status: 'verified',
    };
  });

  // Modals state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('skillwallet_epics', JSON.stringify(epics));
  }, [epics]);

  useEffect(() => {
    if (demoVideo) {
      localStorage.setItem('skillwallet_demo_video', JSON.stringify(demoVideo));
    }
  }, [demoVideo]);

  useEffect(() => {
    if (githubSubmission) {
      localStorage.setItem('skillwallet_github_sub', JSON.stringify(githubSubmission));
    }
  }, [githubSubmission]);

  // Toggle individual task completion in right sidebar
  const handleToggleTask = (epicId: string, taskId: string) => {
    setEpics((prev) =>
      prev.map((epic) => {
        if (epic.id !== epicId) return epic;
        return {
          ...epic,
          tasks: epic.tasks.map((task) => {
            if (task.id !== taskId) return task;
            const newStatus: Task['status'] =
              task.status === 'completed' ? 'in_progress' : 'completed';
            return { ...task, status: newStatus };
          }),
        };
      })
    );
  };

  // Update task status in Kanban board
  const handleUpdateTaskStatus = (
    epicId: string,
    taskId: string,
    newStatus: Task['status']
  ) => {
    setEpics((prev) =>
      prev.map((epic) => {
        if (epic.id !== epicId) return epic;
        return {
          ...epic,
          tasks: epic.tasks.map((task) => {
            if (task.id !== taskId) return task;
            return { ...task, status: newStatus };
          }),
        };
      })
    );
  };

  // Zoom level handler
  const handleZoomChange = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 50), 150));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans antialiased text-slate-800">
      {/* SkillWallet Left Sidebar */}
      <Sidebar
        currentNav={currentNav}
        onSelectNav={setCurrentNav}
        onOpenAiAssist={() => setIsMentorModalOpen(true)}
      />

      {/* Main Center & Right Content Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Bar */}
        <TopBar
          activeView={activeView}
          onSelectView={setActiveView}
          zoomLevel={zoomLevel}
          onZoomChange={handleZoomChange}
          onOpenAiAssist={() => setIsMentorModalOpen(true)}
        />

        {/* View Content & Right Accordion Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main View Area */}
          <main className="flex-1 flex flex-col overflow-hidden bg-white">
            {activeView === 'overview' && (
              <OverviewView
                epics={epics}
                onOpenDemoModal={() => setIsDemoModalOpen(true)}
                onOpenGithubModal={() => setIsGithubModalOpen(true)}
                onRequestMentorReview={() => setIsMentorModalOpen(true)}
                demoVideo={demoVideo}
                githubSubmission={githubSubmission}
              />
            )}

            {activeView === 'workspace' && <WorkspaceView />}

            {activeView === 'kanban' && (
              <KanbanView
                epics={epics}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            )}
          </main>

          {/* Right Sidebar with Project Progress & Epics Accordions */}
          <RightSidebar
            epics={epics}
            onToggleTask={handleToggleTask}
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
            onOpenGithubModal={() => setIsGithubModalOpen(true)}
            demoVideo={demoVideo}
            githubSubmission={githubSubmission}
          />
        </div>
      </div>

      {/* Modal: Add/Update Demo Video */}
      <AddDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSubmit={(data) => {
          setDemoVideo(data);
          setIsDemoModalOpen(false);
        }}
        currentDemo={demoVideo}
      />

      {/* Modal: Add/Update GitHub Link */}
      <AddGithubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        onSubmit={(data) => {
          setGithubSubmission(data);
          setIsGithubModalOpen(false);
        }}
        currentSubmission={githubSubmission}
      />

      {/* Modal: AI & Industry Mentor Review */}
      <MentorModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        demoVideo={demoVideo}
        githubSubmission={githubSubmission}
        epics={epics}
      />
    </div>
  );
}

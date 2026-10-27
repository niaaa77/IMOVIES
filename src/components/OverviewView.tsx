import React, { useState } from 'react';
import {
  Clock,
  CheckSquare,
  Sparkles,
  ExternalLink,
  Bot,
  Play,
  GitBranch,
  Video,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Database,
  Cpu,
  Monitor
} from 'lucide-react';
import { DemoVideoPlayer } from './DemoVideoPlayer';
import { DemoVideoData, GithubSubmission, Epic } from '../types';

interface OverviewViewProps {
  epics: Epic[];
  onOpenDemoModal: () => void;
  onOpenGithubModal: () => void;
  onRequestMentorReview: () => void;
  demoVideo?: DemoVideoData | null;
  githubSubmission?: GithubSubmission | null;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  epics,
  onOpenDemoModal,
  onOpenGithubModal,
  onRequestMentorReview,
  demoVideo,
  githubSubmission,
}) => {
  const [activeTab, setActiveTab] = useState<'system_requirements' | 'instructions' | 'demo_rubric' | 'api_spec'>('system_requirements');

  // Stats calculation
  const totalEpics = epics.length;
  const totalTasks = epics.reduce((acc, e) => acc + e.tasks.length, 0);

  const skills = [
    'HyperText Markup Language (HTML)',
    'Cascading Style Sheets (CSS)',
    'JavaScript (Programming Language)',
    'React.js (Javascript Library)',
    'Node.js (Javascript Library)',
    'Express.js (Javascript Library)',
    'MongoDB',
    'Asynchronous Javascript',
    'JSON Web Token (JWT)',
    'Bootstrap (Front-End Framework)',
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
      {/* Blue Alert Banner from screenshot */}
      <div className="bg-blue-600 rounded-xl p-4 text-white shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold tracking-tight">Add Demo and GitHub links!</h3>
          <p className="text-xs text-blue-100 mt-0.5">
            Please update the demo and GitHub links so that your mentor can review and evaluate your project.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenDemoModal}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-xs ${
              demoVideo
                ? 'bg-blue-800 text-white border border-blue-400'
                : 'bg-white text-blue-700 hover:bg-blue-50'
            }`}
          >
            <Video className="w-4 h-4" />
            {demoVideo ? 'Update Demo Video' : 'Add Demo Link'}
          </button>

          <button
            onClick={onOpenGithubModal}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-xs ${
              githubSubmission
                ? 'bg-blue-800 text-white border border-blue-400'
                : 'bg-blue-700 text-white hover:bg-blue-800 border border-blue-500'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            {githubSubmission ? 'GitHub Repo Linked' : 'Add GitHub Link'}
          </button>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 text-white">
          Entertainment
        </span>
        <span className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 text-white">
          Individual
        </span>
        {demoVideo && (
          <span className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Demo Video Attached
          </span>
        )}
      </div>

      {/* Project Description from screenshot */}
      <div className="text-xs text-slate-700 leading-relaxed max-w-5xl">
        The IMovies is a seamless online platform that enhances the cinema experience by allowing users to browse movies, select showtimes, and reserve seats with real-time availability tracking. Built with <strong className="font-semibold text-slate-900">Express.js</strong> and <strong className="font-semibold text-slate-900">MongoDB</strong>, it leverages a robust client-server architecture to ensure efficient data management and smooth performance. Key features include secure user authentication, booking management, and an intuitive interface that makes ticket reservations convenient and personalized. This project documentation provides a complete guide to the setup, development, and technical architecture of the system.
      </div>

      {/* SPOTLIGHT: Interactive Demo Video Player (Primary Request) */}
      <div>
        <DemoVideoPlayer
          onOpenAddModal={onOpenDemoModal}
          customVideoUrl={demoVideo?.url}
        />
      </div>

      {/* Skills Required */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 mb-2">Skills Required</h4>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors border border-slate-200/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Mentor Section */}
      <div className="pt-1">
        <h4 className="text-xs font-bold text-slate-900 mb-1">Mentor</h4>
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-600">
                No mentor assigned yet
              </div>
              <div className="text-[11px] text-slate-400">
                Submit Demo Video and GitHub links to trigger mentor evaluation
              </div>
            </div>
          </div>
          <button
            onClick={onRequestMentorReview}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Request AI Mentor Review
          </button>
        </div>
      </div>

      {/* Project Stats (Purple & Teal cards from screenshot) */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 mb-3">Project Stats</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Purple Card: Epics */}
          <div className="bg-purple-600 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-purple-700/80 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-purple-200" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase">Epics</span>
            </div>
            <div className="text-sm font-semibold tracking-tight">
              Total Epics: <span className="text-lg font-extrabold">{totalEpics}</span>
            </div>
          </div>

          {/* Right Teal/Emerald Card: Stories & Subtasks */}
          <div className="bg-teal-600 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-teal-700/80 flex items-center justify-center">
                <CheckSquare className="w-3.5 h-3.5 text-teal-200" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase">Stories & Subtasks</span>
            </div>
            <div className="space-y-0.5 text-sm font-semibold tracking-tight">
              <div>Total Tasks: <span className="text-lg font-extrabold">{totalTasks}</span></div>
              <div className="text-teal-100 text-xs font-normal">Total Subtasks: 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher below: System Requirements, Instructions, Demo Video Rubric, API Specs */}
      <div className="pt-2">
        <div className="border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setActiveTab('system_requirements')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'system_requirements'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            System Requirements
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'instructions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('demo_rubric')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'demo_rubric'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Demo Video Rubric & Checklist
          </button>
          <button
            onClick={() => setActiveTab('api_spec')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'api_spec'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            MERN API Contracts
          </button>
        </div>

        {/* Tab 1: System Requirements (Exact text from screenshot) */}
        {activeTab === 'system_requirements' && (
          <div className="py-4 space-y-4 text-xs text-slate-700 leading-relaxed animate-fade-in">
            <p className="text-slate-600">
              To ensure smooth development, deployment, and usage of the JobPortal Web-Application, certain system prerequisites must be met. These requirements are categorized into software, setup, and hardware specifications, all of which contribute to building a robust and scalable agricultural platform.
            </p>

            {/* 1. Software Requirements */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">1. Software Requirements</h3>
              <p className="text-slate-600 mb-2">
                These are the essential tools and platforms required to develop, test, and run the application efficiently.
              </p>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>
                  <strong className="text-slate-900">Operating System:</strong> Windows 10/11, macOS, or Linux — Supports cross-platform development and testing.
                </li>
                <li>
                  <strong className="text-slate-900">Node.js (v16 or above):</strong> Provides the runtime environment for building and managing frontend logic and Powers the server-side logic and handles API routing. 👉{' '}
                  <a
                    href="https://nodejs.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 font-medium"
                  >
                    Download Node.js
                  </a>
                </li>
                <li>
                  <strong className="text-slate-900">npm (v8 or above):</strong> A package manager required to install dependencies for React and related libraries.
                </li>
                <li>
                  <strong className="text-slate-900">React.js:</strong> A JavaScript library for building dynamic and responsive user interfaces.
                </li>
                <li>
                  <strong className="text-slate-900">Browser:</strong> Google Chrome / Firefox (latest version) — For rendering and testing the UI in real-time.
                </li>
                <li>
                  <strong className="text-slate-900">Express.js:</strong> A lightweight web framework for building RESTful APIs.
                </li>
                <li>
                  <strong className="text-slate-900">MongoDB:</strong> A NoSQL database used to store structured and unstructured data related to farms, users, and resources. 👉{' '}
                  <a
                    href="https://www.mongodb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 font-medium"
                  >
                    Download MongoDB
                  </a>
                </li>
                <li>
                  <strong className="text-slate-900">Postman:</strong> Tool for testing APIs during development.
                </li>
                <li>
                  <strong className="text-slate-900">Visual Studio Code:</strong> Preferred code editor with built-in Git and terminal support.
                </li>
              </ul>
            </div>

            {/* 2. Hardware Requirements */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 mb-2">2. Hardware Requirements</h3>
              <p className="text-slate-600 mb-2">
                Describes the minimum and recommended specifications needed to support the development and usage of the application.
              </p>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>
                  <strong className="text-slate-900">Processor:</strong> Intel Core i5 (8th Gen or above) / AMD Ryzen 5 or better — Ensures fast compilation and multitasking during development.
                </li>
                <li>
                  <strong className="text-slate-900">RAM:</strong> Minimum 8 GB (16 GB recommended) — For handling development servers, IDEs, and browser testing simultaneously.
                </li>
                <li>
                  <strong className="text-slate-900">Storage:</strong> At least 1 GB free space — Required for package installations, MongoDB setup, and local project files.
                </li>
                <li>
                  <strong className="text-slate-900">Display:</strong> 1366x768 or higher — Recommended for optimal coding experience and application layout visualization.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Instructions */}
        {activeTab === 'instructions' && (
          <div className="py-4 space-y-4 text-xs text-slate-700 leading-relaxed animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">Project Setup & Execution Instructions</h3>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2">
              <div className="text-slate-400"># 1. Clone repository and install dependencies</div>
              <div>git clone https://github.com/developer/imovies-mern-booking.git</div>
              <div>cd imovies-mern-booking</div>
              <div>npm run install:all</div>
              <div className="text-slate-400 pt-2"># 2. Configure Environment Variables</div>
              <div>cp .env.example .env</div>
              <div className="text-slate-400 pt-2"># 3. Seed MongoDB database with initial movies & theater halls</div>
              <div>npm run db:seed</div>
              <div className="text-slate-400 pt-2"># 4. Start concurrent development server (Client on :5173, Server on :5000)</div>
              <div className="text-emerald-400">npm run dev</div>
            </div>
          </div>
        )}

        {/* Tab 3: Demo Video Rubric & Checklist */}
        {activeTab === 'demo_rubric' && (
          <div className="py-4 space-y-4 text-xs text-slate-700 leading-relaxed animate-fade-in">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                Demo Video Presentation Standard
              </h3>
              <p className="text-blue-800 text-xs">
                To receive credit for this project, your submitted demo video must meet the following four criteria. Mentors evaluate your video directly from this portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</span>
                  Duration & Format (3-5 Minutes)
                </div>
                <p className="text-slate-600 text-[11px]">
                  Keep it concise. Speak clearly and demonstrate the end-to-end user journey rather than raw source code reading.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">2</span>
                  Real-time Concurrency Proof
                </div>
                <p className="text-slate-600 text-[11px]">
                  Show how two simultaneous users cannot book the same seat. Highlight MongoDB transactions and lock indicators.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">3</span>
                  QR Ticket Generation & Gate Scan
                </div>
                <p className="text-slate-600 text-[11px]">
                  Demonstrate the resulting digital boarding pass with the generated scannable QR verification code.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">4</span>
                  GitHub Repository Walkthrough
                </div>
                <p className="text-slate-600 text-[11px]">
                  Brief 30-second inspection of modular folder structure, clean commit history, and environment setup instructions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: API Specification */}
        {activeTab === 'api_spec' && (
          <div className="py-4 space-y-3 text-xs animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900">Documented REST API Endpoints</h3>
            <div className="space-y-2">
              {[
                { method: 'GET', path: '/api/v1/movies', desc: 'Fetch all active movies with genre filter and ratings' },
                { method: 'GET', path: '/api/v1/shows/:movieId', desc: 'Retrieve showtimes, cinema halls, and available seating matrix' },
                { method: 'POST', path: '/api/v1/bookings/reserve', desc: 'Acquire 10-minute atomic hold on selected seats' },
                { method: 'POST', path: '/api/v1/bookings/confirm', desc: 'Finalize payment, commit MongoDB transaction, generate QR code' },
                { method: 'GET', path: '/api/v1/tickets/:ticketCode', desc: 'Validate ticket authenticity at theater scanner gate' },
              ].map((ep, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-bold text-slate-800">{ep.path}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

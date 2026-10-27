import React, { useState } from 'react';
import {
  X,
  Video,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Play,
  Square,
  Mic,
  Camera
} from 'lucide-react';
import { DemoVideoData } from '../types';

interface AddDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DemoVideoData) => void;
  currentDemo?: DemoVideoData | null;
}

export const AddDemoModal: React.FC<AddDemoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentDemo,
}) => {
  const [activeMode, setActiveMode] = useState<'url' | 'record' | 'upload'>('url');
  const [videoUrl, setVideoUrl] = useState<string>(
    currentDemo?.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  );
  const [title, setTitle] = useState<string>(
    currentDemo?.title || 'IMovies Full-Stack MERN Walkthrough & Concurrency Demo'
  );
  const [description, setDescription] = useState<string>(
    currentDemo?.description ||
      'Complete walkthrough of the IMovies movie ticket booking platform. Demonstrates user authentication, movie catalog browsing, interactive seat matrix, atomic seat locking in MongoDB, and scannable QR ticket generation.'
  );

  // Recording simulator
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    const timer = setInterval(() => {
      setRecordSeconds((s) => {
        if (s >= 180) {
          clearInterval(timer);
          setIsRecording(false);
          return s;
        }
        return s + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordedBlobUrl('simulated_recorded_session.webm');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl =
      activeMode === 'record'
        ? recordedBlobUrl || 'https://skillwallet.ai/recordings/imovies-demo.mp4'
        : videoUrl;

    onSubmit({
      title,
      url: finalUrl,
      videoType: activeMode === 'record' ? 'recorded' : activeMode === 'upload' ? 'uploaded' : 'custom_url',
      duration: '3m 30s',
      addedAt: new Date().toLocaleDateString(),
      description,
      timestamps: [
        { time: '0:00', title: 'System Architecture & Tech Stack' },
        { time: '1:10', title: 'Interactive Seat Selection Matrix' },
        { time: '2:15', title: 'Atomic MongoDB Booking Transaction' },
        { time: '3:05', title: 'Dynamic QR Code Verification' },
      ],
      isApproved: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Add Project Demo Video</h3>
              <p className="text-[11px] text-slate-400">
                Required for mentor evaluation and skill verification
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

        {/* Tab switchers */}
        <div className="px-6 pt-4 border-b border-slate-100 flex gap-2">
          <button
            onClick={() => setActiveMode('url')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeMode === 'url'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Paste Demo URL
          </button>
          <button
            onClick={() => setActiveMode('record')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeMode === 'record'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Record Screen & Audio
          </button>
          <button
            onClick={() => setActiveMode('upload')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeMode === 'upload'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Video File
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          {activeMode === 'url' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Video Link (Loom, YouTube, Drive, or Direct MP4) *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.loom.com/share/... or https://youtu.be/..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-mono"
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Ensure permissions are set to &apos;Anyone with the link can view&apos;.
              </p>
            </div>
          )}

          {activeMode === 'record' && (
            <div className="bg-slate-900 rounded-xl p-5 text-white text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                In-Browser Screen & Mic Recorder
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Record your browser tab or entire screen while talking through your MERN architecture.
              </p>

              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  Start Recording Demo
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-rose-400 font-mono font-bold text-sm">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping inline-block" />
                    RECORDING: {Math.floor(recordSeconds / 60)}:{(recordSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-2"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    Finish & Save Recording
                  </button>
                </div>
              )}

              {recordedBlobUrl && (
                <div className="mt-4 p-2 bg-emerald-500/20 text-emerald-300 text-xs rounded-lg border border-emerald-500/40 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Recording captured successfully (3m 30s)
                </div>
              )}
            </div>
          )}

          {activeMode === 'upload' && (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700">Drop your .mp4 or .webm file here</div>
              <p className="text-[11px] text-slate-500 mt-1">Maximum file size: 250 MB (1080p 60fps recommended)</p>
              <button
                type="button"
                className="mt-3 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
              >
                Browse Files
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Video Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description & Key Features Covered
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Verification Rubric Checklist */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-xs">
            <div className="font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              SkillWallet Demo Video Rubric Requirements:
            </div>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Clear audio narration explaining architecture choices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Live demonstration of seat selection & instant checkout
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Proof of MongoDB transactions and QR ticket generation
              </li>
            </ul>
          </div>

          {/* Footer Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Save & Submit Demo Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

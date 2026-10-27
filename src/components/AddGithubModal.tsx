import React, { useState } from 'react';
import {
  X,
  GitBranch,
  Github,
  CheckCircle2,
  ExternalLink,
  Code2,
  FolderTree
} from 'lucide-react';
import { GithubSubmission } from '../types';

interface AddGithubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GithubSubmission) => void;
  currentSubmission?: GithubSubmission | null;
}

export const AddGithubModal: React.FC<AddGithubModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentSubmission,
}) => {
  const [repoUrl, setRepoUrl] = useState<string>(
    currentSubmission?.repoUrl || 'https://github.com/developer/imovies-mern-ticket-booking'
  );
  const [branch, setBranch] = useState<string>(currentSubmission?.branch || 'main');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedFiles, setVerifiedFiles] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSubmit({
        repoUrl,
        branch,
        submittedAt: new Date().toLocaleDateString(),
        status: 'verified',
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Add GitHub Repository Link</h3>
              <p className="text-[11px] text-slate-400">
                Submit repository code for mentor review and automated code quality grading
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Repository URL (Public or SkillWallet authorized) *
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-mono"
              />
              <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Production / Evaluation Branch
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 font-mono"
              />
              <GitBranch className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Repo Audit Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
            <div className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-blue-600" />
              Automated Pre-Flight Repository Check:
            </div>
            <div className="space-y-1.5 text-slate-600 text-[11px]">
              <div className="flex items-center justify-between">
                <span>server/models/ (Mongoose Schema)</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Detected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>client/src/components/ (React Components)</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Detected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>README.md with setup instructions</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Detected
                </span>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
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
              disabled={isVerifying}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
            >
              {isVerifying ? 'Verifying Repo...' : 'Verify & Submit GitHub Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import {
  LayoutDashboard,
  Landmark,
  Wallet,
  CreditCard,
  Coins,
  Settings,
  Sparkles,
  Bot,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentNav: string;
  onSelectNav: (nav: string) => void;
  onOpenAiAssist: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onSelectNav,
  onOpenAiAssist,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skill_bank', label: 'Skill Bank', icon: Landmark },
    { id: 'skill_wallet', label: 'Skill Wallet', icon: Wallet },
    { id: 'skill_card', label: 'Skill Card', icon: CreditCard },
    { id: 'skill_credits', label: 'Skill Credits', icon: Coins },
  ];

  return (
    <div className="flex h-screen shrink-0 select-none">
      {/* Far-left dark blue utility icon strip (from screenshot) */}
      <div className="w-12 bg-slate-950 flex flex-col items-center justify-between py-4 border-r border-slate-900 text-slate-400">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={onOpenAiAssist}
            title="SkillWallet AI Mentor"
            className="p-2 rounded-lg text-blue-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            title="Assigned Mentor"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            title="Learning History & Timers"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
          <button
            title="Starred Projects"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Star className="w-4 h-4" />
          </button>
        </div>

        <div>
          <button
            title="Account Settings"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main vibrant blue SkillWallet sidebar */}
      <div className="w-56 bg-blue-600 text-white flex flex-col justify-between py-5 px-3">
        <div>
          {/* Logo Brand */}
          <div className="px-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-white text-blue-600 flex items-center justify-center font-black text-sm shadow-xs">
                SW
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-wide uppercase leading-tight">
                  SKILL WALLET
                </h1>
                <p className="text-[9px] text-blue-200 tracking-wider">
                  A SkillBridge Product
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-blue-700/90 text-white shadow-xs border border-blue-500/40'
                      : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User / Quick Action */}
        <div className="px-3 pt-4 border-t border-blue-500/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold ring-1 ring-white/30">
              NS
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold truncate text-white">Neha Sahi</div>
              <div className="text-[10px] text-blue-200 truncate">MERN Track · Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useItems } from '../../context/ItemsContext';
import { Compass, ShieldCheck, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, resetDemoData } = useItems();

  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#0A0A0A] border-t border-[#EAEAEA] dark:border-[#222222] mt-20 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#111111] dark:bg-[#202020] border border-black/5 dark:border-white/10 flex items-center justify-center text-white">
                <Compass className="w-3.5 h-3.5 text-[#C1122F]" />
              </div>
              <span className="font-bold text-sm text-[#111111] dark:text-[#F5F5F7] tracking-tight">
                FINDR
              </span>
            </div>
            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed max-w-xs">
              A student-run community platform dedicated to safely reuniting misplaced belongings across lecture halls, libraries, and dorms.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-semibold text-xs text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setView('browse');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#111111] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  Browse All Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setView('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#111111] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  Report a Lost Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setView('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#111111] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  Report a Found Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#111111] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  My Active Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Safe Return Points */}
          <div>
            <h4 className="font-semibold text-xs text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider mb-3">
              Designated Hubs
            </h4>
            <ul className="space-y-2 text-[#6B6B6B] dark:text-[#A1A1A6]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B] shrink-0" />
                <span>Library</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B] shrink-0" />
                <span>Lost and Found Cabinet</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B] shrink-0" />
                <span>Reception</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B] shrink-0" />
                <span>Gymkhana</span>
              </li>
            </ul>
          </div>

          {/* Guidelines & Safety */}
          <div>
            <h4 className="font-semibold text-xs text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider mb-3">
              Safety First
            </h4>
            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed mb-3">
              Always arrange meetups in well-lit public campus locations or transfer high-value items directly to university security desks.
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#C1122F] dark:hover:text-[#FF4A6B] transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo Records
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E93] dark:text-[#68686D]">
          <p>© {new Date().getFullYear()} FINDR. Built for university students.</p>
          <div className="flex items-center gap-1">
            <span>Designed with care</span>
            <span className="text-[#C1122F] dark:text-[#FF4A6B]">•</span>
            <span>Always meet in public spaces</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

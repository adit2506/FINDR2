import React from 'react';
import { useItems } from '../../context/ItemsContext';
import { Search, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const { setView } = useItems();

  const features = [
    {
      index: '01',
      title: 'Report Lost Items',
      description:
        'Misplaced your keys, charger, or student ID? Publish an instant alert with photos, location, and identifiable marks so peers can keep a watchful eye.',
      actionLabel: 'Report what you lost',
      actionView: 'report' as const,
      icon: PlusCircle,
    },
    {
      index: '02',
      title: 'Post Found Items',
      description:
        'Stumbled on an item left behind in a study carrel or dining hall? List it in under 30 seconds or specify which designated campus hub you handed it to.',
      actionLabel: 'Post a found item',
      actionView: 'report' as const,
      icon: Search,
    },
    {
      index: '03',
      title: 'Help Return Them',
      description:
        'Browse by category or search. Contact the student directly or drop by designated hubs like the Library, Lost and Found Cabinet, Reception, or Gymkhana.',
      actionLabel: 'Browse active items',
      actionView: 'browse' as const,
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-12 border-t border-[#F0F0F0] dark:border-[#1E1E1E] bg-white dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.index}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#F7F7F7]/60 dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#D4D4D4] dark:hover:border-[#383838] hover:bg-white dark:hover:bg-[#181818] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold text-[#8E8E93] dark:text-[#68686D]">
                      {feat.index}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#202020] border border-[#EAEAEA] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-[#F5F5F7] group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111111] dark:text-[#F5F5F7] tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAEAEA]/80 dark:border-[#222222]">
                  <button
                    onClick={() => {
                      setView(feat.actionView);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors cursor-pointer"
                  >
                    <span className="cherry-hover-underline">{feat.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

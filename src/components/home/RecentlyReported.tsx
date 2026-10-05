import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import { ItemCard } from '../items/ItemCard';
import { ArrowRight } from 'lucide-react';

export const RecentlyReported: React.FC = () => {
  const { items, setSelectedItem, setView, setFilters } = useItems();
  const [filterTab, setFilterTab] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');

  const filteredItems = items
    .filter((item) => {
      if (filterTab === 'ALL') return true;
      return item.status === filterTab;
    })
    .slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C1122F] dark:text-[#FF4A6B] mb-1">
              Live Campus Activity
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
              Recently Reported
            </h2>
            <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#A1A1A6]">
              Latest misplaced and recovered items logged across campus today.
            </p>
          </div>

          {/* Interactive filter tab buttons (clean segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterTab === 'ALL'
                  ? 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F7] shadow-2xs font-semibold'
                  : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterTab('LOST')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterTab === 'LOST'
                  ? 'bg-white dark:bg-[#222222] text-[#C1122F] dark:text-[#FF4A6B] shadow-2xs font-semibold'
                  : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setFilterTab('FOUND')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterTab === 'FOUND'
                  ? 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F7] shadow-2xs font-semibold'
                  : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
              }`}
            >
              Found Only
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onSelect={setSelectedItem} />
          ))}
        </div>

        {/* Bottom CTA to Browse */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              if (filterTab !== 'ALL') {
                setFilters((prev) => ({ ...prev, status: filterTab }));
              }
              setView('browse');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#161616] hover:bg-[#EFEFEF] dark:hover:bg-[#222222] border border-[#EAEAEA] dark:border-[#262626] rounded-xl transition-all cursor-pointer"
          >
            <span>Browse all campus listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

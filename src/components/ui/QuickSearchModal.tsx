import React, { useState, useEffect, useRef } from 'react';
import { useItems } from '../../context/ItemsContext';
import { StatusBadge } from '../items/StatusBadge';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, CornerDownLeft, MapPin } from 'lucide-react';
import { CATEGORIES } from '../../data/initialItems';

export const QuickSearchModal: React.FC = () => {
  const {
    isQuickSearchOpen,
    setIsQuickSearchOpen,
    items,
    setSelectedItem,
    setView,
    setFilters,
  } = useItems();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isQuickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isQuickSearchOpen]);

  if (!isQuickSearchOpen) return null;

  const results = items
    .filter((item) => {
      if (!query.trim()) return false;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);

  const handleSelectResult = (item: (typeof items)[0]) => {
    setIsQuickSearchOpen(false);
    setSelectedItem(item);
  };

  const handleCategoryShortcut = (cat: string) => {
    setIsQuickSearchOpen(false);
    setFilters((prev) => ({ ...prev, category: cat as any, searchQuery: '' }));
    setView('browse');
  };

  return (
    <AnimatePresence>
      {isQuickSearchOpen && (
        <div className="fixed inset-0 z-60 flex items-start justify-center pt-16 sm:pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs"
            onClick={() => setIsQuickSearchOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#EAEAEA] dark:border-[#242424]">
              <Search className="w-5 h-5 text-[#8E8E93] dark:text-[#7A7A7E] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items on FINDR..."
                className="w-full text-base text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] bg-transparent focus:outline-hidden"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] mr-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block font-sans text-xs bg-[#F7F7F7] dark:bg-[#202020] border border-[#EAEAEA] dark:border-[#2C2C2C] px-2 py-0.5 rounded text-[#8E8E93] dark:text-[#7A7A7E]">
                ESC
              </kbd>
            </div>

            {/* Results or Suggestions */}
            <div className="p-3 overflow-y-auto">
              {query.trim() !== '' ? (
                results.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] dark:text-[#7A7A7E]">
                      Matching Items ({results.length})
                    </div>
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F7F7] dark:hover:bg-[#1E1E1E] text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover bg-[#F7F7F7] dark:bg-[#202020] shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-[#111111] dark:text-[#F5F5F7] group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors truncate">
                                {item.title}
                              </span>
                              <StatusBadge status={item.status} isReunited={item.isReunited} size="sm" />
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] truncate mt-0.5">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                              <span aria-hidden="true">•</span>
                              <span>{item.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center text-xs text-[#8E8E93] dark:text-[#7A7A7E] group-hover:text-[#111111] dark:group-hover:text-[#F5F5F7]">
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-[#6B6B6B] dark:text-[#A1A1A6]">
                    <p>No listings match "{query}".</p>
                    <p className="mt-1 text-[#8E8E93] dark:text-[#7A7A7E]">
                      Try searching for item types like "AirPods", "Keys", or "Water bottle".
                    </p>
                  </div>
                )
              ) : (
                <div className="p-3 space-y-4">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] dark:text-[#7A7A7E] mb-2">
                      Browse by Popular Category
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryShortcut(cat)}
                          className="px-3 py-1.5 rounded-xl bg-[#F7F7F7] dark:bg-[#1E1E1E] hover:bg-[#EFEFEF] dark:hover:bg-[#252525] text-xs text-[#111111] dark:text-[#F5F5F7] transition-colors cursor-pointer"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F0F0F0] dark:border-[#222222]">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] dark:text-[#7A7A7E] mb-2">
                      Quick Actions
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => {
                          setIsQuickSearchOpen(false);
                          setView('report');
                        }}
                        className="p-3 text-left rounded-xl bg-[#F7F7F7] dark:bg-[#1E1E1E] hover:bg-[#EFEFEF] dark:hover:bg-[#252525] transition-colors font-medium text-[#111111] dark:text-[#F5F5F7] cursor-pointer"
                      >
                        + Report a Lost Item
                      </button>
                      <button
                        onClick={() => {
                          setIsQuickSearchOpen(false);
                          setView('report');
                        }}
                        className="p-3 text-left rounded-xl bg-[#F7F7F7] dark:bg-[#1E1E1E] hover:bg-[#EFEFEF] dark:hover:bg-[#252525] transition-colors font-medium text-[#111111] dark:text-[#F5F5F7] cursor-pointer"
                      >
                        + Report a Found Item
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#101010] border-t border-[#EAEAEA] dark:border-[#222222] flex items-center justify-between text-[11px] text-[#8E8E93] dark:text-[#7A7A7E]">
              <span>Navigate with mouse or touch</span>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

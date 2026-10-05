import React, { useMemo } from 'react';
import { useItems } from '../../context/ItemsContext';
import { ItemCard } from '../items/ItemCard';
import { CATEGORIES } from '../../data/initialItems';
import { ItemCategory, ItemStatus, FilterState } from '../../types';
import { Search, RotateCcw, PackageSearch, Plus } from 'lucide-react';

export const BrowsePage: React.FC = () => {
  const {
    items,
    filters,
    setFilters,
    resetFilters,
    setSelectedItem,
    setView,
  } = useItems();

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Status filter
        if (filters.status !== 'ALL' && item.status !== filters.status) {
          return false;
        }
        // Category filter
        if (filters.category !== 'ALL' && item.category !== filters.category) {
          return false;
        }
        // Search query
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (filters.sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (filters.sortBy === 'recently-updated') {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return 0;
      });
  }, [items, filters]);

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.status !== 'ALL' ||
    filters.category !== 'ALL' ||
    filters.sortBy !== 'newest';

  return (
    <div className="py-8 sm:py-12 bg-white dark:bg-[#0A0A0A] min-h-[80vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#EAEAEA] dark:border-[#222222]">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
              Browse Lost &amp; Found
            </h1>
            <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#A1A1A6]">
              Discover misplaced items reported across campus buildings and dorms.
            </p>
          </div>
          <button
            onClick={() => {
              setView('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Report an Item
          </button>
        </div>

        {/* Search Bar & Primary Status Filters */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93] dark:text-[#7A7A7E]" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                placeholder="Search for an item (e.g. AirPods, ID card, blue bottle)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#68686D] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Segmented Control (All / Lost / Found) */}
            <div className="flex items-center gap-1 p-1 bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] rounded-xl shrink-0">
              {(['ALL', 'LOST', 'FOUND'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters((prev) => ({ ...prev, status }))}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    filters.status === status
                      ? status === 'LOST'
                        ? 'bg-white dark:bg-[#222222] text-[#C1122F] dark:text-[#FF4A6B] shadow-2xs font-semibold'
                        : 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F7] shadow-2xs font-semibold'
                      : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                  }`}
                >
                  {status === 'ALL' ? 'All' : status === 'LOST' ? 'Lost' : 'Found'}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Controls: Category, Location, Sort */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'ALL' }))}
                className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filters.category === 'ALL'
                    ? 'bg-[#111111] dark:bg-[#F5F5F7] text-white dark:text-[#111111] font-medium'
                    : 'bg-[#F7F7F7] dark:bg-[#161616] text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] hover:bg-[#EFEFEF] dark:hover:bg-[#202020]'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    filters.category === cat
                      ? 'bg-[#111111] dark:bg-[#F5F5F7] text-white dark:text-[#111111] font-medium'
                      : 'bg-[#F7F7F7] dark:bg-[#161616] text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] hover:bg-[#EFEFEF] dark:hover:bg-[#202020]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Sort and Reset Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#6B6B6B] dark:text-[#A1A1A6]">
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#8E8E93] dark:text-[#7A7A7E]">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as FilterState['sortBy'],
                    }))
                  }
                  className="bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] rounded-lg px-2.5 py-1 text-xs text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="recently-updated">Recently Updated</option>
                </select>
              </div>

              {/* Clear filters trigger */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#C1122F] dark:text-[#FF4A6B] hover:underline font-medium ml-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="font-mono tabular-nums text-xs text-[#8E8E93] dark:text-[#7A7A7E]">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </div>
          </div>
        </div>

        {/* Item Cards Grid / Empty State */}
        <div className="mt-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onSelect={setSelectedItem} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-2xl border border-dashed border-[#EAEAEA] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#121212] max-w-xl mx-auto p-8">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#2E2E2E] flex items-center justify-center mx-auto mb-4 text-[#8E8E93] dark:text-[#7A7A7E]">
                <PackageSearch className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#111111] dark:text-[#F5F5F7]">
                No items found
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6]">
                Try changing your search keywords or broadening your filters.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1C] border border-[#EAEAEA] dark:border-[#2C2C2C] rounded-xl hover:bg-[#F2F2F2] dark:hover:bg-[#262626] transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
                <button
                  onClick={() => {
                    setView('report');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Report this item
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

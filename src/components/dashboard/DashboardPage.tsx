import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import { StatusBadge } from '../items/StatusBadge';
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Eye,
  MapPin,
  Calendar,
  Inbox,
  ShieldCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    items,
    userProfile,
    setView,
    setSelectedItem,
    setEditModalItem,
    markAsReunited,
    deleteItem,
    isAdmin,
    canEditItem,
  } = useItems();

  const [activeTab, setActiveTab] = useState<'active' | 'reunited' | 'all' | 'all-campus'>('active');

  const userItems = items.filter(
    (item) =>
      item.isUserReport || item.reportedBy?.email?.toLowerCase() === userProfile.email.toLowerCase()
  );

  const displayedItems = (() => {
    if (activeTab === 'all-campus' && isAdmin) {
      return items;
    }
    return userItems.filter((item) => {
      if (activeTab === 'active') return !item.isReunited;
      if (activeTab === 'reunited') return item.isReunited;
      return true;
    });
  })();

  const activeCount = userItems.filter((i) => !i.isReunited).length;
  const reunitedCount = userItems.filter((i) => i.isReunited).length;

  return (
    <div className="py-8 sm:py-12 bg-white dark:bg-[#0A0A0A] min-h-[80vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card & Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F7F7] dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#111111] dark:bg-[#222222] border border-black/5 dark:border-white/10 text-white flex items-center justify-center font-semibold text-lg shadow-sm shrink-0">
              {userProfile.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
                  {userProfile.name}
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#202020] border border-[#EAEAEA] dark:border-[#2C2C2C] text-[#6B6B6B] dark:text-[#A1A1A6]">
                  {userProfile.studentId}
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C1122F]/10 dark:bg-[#C1122F]/20 text-[#C1122F] dark:text-[#FF4A6B] border border-[#C1122F]/20 dark:border-[#C1122F]/40 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Campus Admin</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6] mt-0.5">
                {userProfile.email} • {userProfile.major}
              </p>
            </div>
          </div>

          {/* Quick stats on user profile */}
          <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-auto text-xs flex-wrap">
            <div className="bg-white dark:bg-[#1A1A1A] px-4 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#282828]">
              <span className="text-[#8E8E93] dark:text-[#7A7A7E] block text-[10px] uppercase tracking-wider">
                My Active
              </span>
              <span className="text-lg font-semibold text-[#111111] dark:text-[#F5F5F7] font-mono tabular-nums">
                {activeCount}
              </span>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] px-4 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-[#282828]">
              <span className="text-[#8E8E93] dark:text-[#7A7A7E] block text-[10px] uppercase tracking-wider">
                Reunited
              </span>
              <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                {reunitedCount}
              </span>
            </div>
            <button
              onClick={() => {
                setView('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              New Report
            </button>
          </div>
        </div>

        {/* Section title & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA] dark:border-[#222222] mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
              {activeTab === 'all-campus' && isAdmin ? 'All Campus Listings (Admin Moderation)' : 'My Reports'}
            </h2>
            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6] mt-0.5">
              {activeTab === 'all-campus' && isAdmin
                ? 'Full campus registry access: edit details, mark reunited, or manage any student listing.'
                : 'Manage your campus lost & found submissions and track recovery status.'}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Clean Segmented Tab Control */}
            <div className="flex items-center gap-1 p-1 bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] rounded-xl flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'active'
                    ? 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F7] shadow-2xs font-semibold'
                    : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reunited')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'reunited'
                    ? 'bg-white dark:bg-[#222222] text-emerald-700 dark:text-emerald-400 shadow-2xs font-semibold'
                    : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                }`}
              >
                Reunited ({reunitedCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F7] shadow-2xs font-semibold'
                    : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                }`}
              >
                All My ({userItems.length})
              </button>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setActiveTab('all-campus')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all-campus'
                      ? 'bg-[#C1122F] text-white shadow-2xs font-semibold'
                      : 'text-[#C1122F] dark:text-[#FF4A6B] hover:bg-[#C1122F]/10'
                  }`}
                >
                  All Campus ({items.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Listings List */}
        {displayedItems.length > 0 ? (
          <div className="space-y-4">
            {displayedItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    item.isReunited
                      ? 'bg-[#FAFAFA] dark:bg-[#121212] border-[#EAEAEA] dark:border-[#222222] opacity-75'
                      : 'bg-white dark:bg-[#141414] border-[#EAEAEA] dark:border-[#242424] hover:border-[#D4D4D4] dark:hover:border-[#383838] hover:shadow-xs'
                  }`}
                >
                  {/* Left: Thumbnail & Core Info */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F7F7F7] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#282828] shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge
                          status={item.status}
                          isReunited={item.isReunited}
                          size="sm"
                        />
                        <span className="text-[11px] font-medium text-[#6B6B6B] dark:text-[#A1A1A6] px-2 py-0.5 rounded bg-[#F7F7F7] dark:bg-[#1E1E1E] border border-[#EAEAEA] dark:border-[#282828]">
                          {item.category}
                        </span>
                        {item.isReunited && (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-300">
                            Back where it belongs.
                          </span>
                        )}
                        {activeTab === 'all-campus' && item.reportedBy?.name && (
                          <span className="text-[10px] text-[#8E8E93] dark:text-[#7A7A7E]">
                            Posted by: {item.reportedBy.name}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-base text-[#111111] dark:text-[#F5F5F7] tracking-tight truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#9E9E9E] dark:text-[#7A7A7E]" />
                          <span>{item.location}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#D0D0D0] dark:text-[#444444]">•</span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#9E9E9E] dark:text-[#7A7A7E]" />
                          <span>{item.dateDisplay}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0F0F0] dark:border-[#222222] w-full md:w-auto justify-end">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#1C1C1C] hover:bg-[#EFEFEF] dark:hover:bg-[#252525] rounded-xl border border-[#EAEAEA] dark:border-[#2C2C2C] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#6B6B6B] dark:text-[#A1A1A6]" />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    {/* Edit Listing */}
                    {canEditItem(item) && (
                      <button
                        type="button"
                        onClick={() => setEditModalItem(item)}
                        className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#1C1C1C] hover:bg-[#EFEFEF] dark:hover:bg-[#252525] rounded-xl border border-[#EAEAEA] dark:border-[#2C2C2C] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    )}

                    {/* Mark as Reunited */}
                    {!item.isReunited ? (
                      <button
                        type="button"
                        onClick={() => markAsReunited(item.id)}
                        className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Mark Reunited</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/50 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 inline-flex items-center gap-1.5 shadow-2xs animate-in zoom-in-95 duration-200">
                        <span className="font-bold">✓</span>
                        <span>REUNITED</span>
                      </span>
                    )}

                    {/* Delete */}
                    {canEditItem(item) && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to permanently delete "${item.title}"?`
                            )
                          ) {
                            deleteItem(item.id);
                          }
                        }}
                        className="p-2 sm:px-2.5 sm:py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl border border-transparent hover:border-red-200 dark:hover:border-red-900/50 transition-colors cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-[#FAFAFA] dark:bg-[#121212] border border-dashed border-[#D4D4D4] dark:border-[#2C2C2C]">
            <div className="w-12 h-12 rounded-2xl bg-[#EAEAEA] dark:bg-[#202020] text-[#7A7A7E] flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-[#111111] dark:text-[#F5F5F7] tracking-tight">
              No items in this tab
            </h3>
            <p className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6] max-w-sm mx-auto mt-1 mb-6">
              {activeTab === 'active'
                ? 'You do not have any active reports.'
                : 'No reunited reports recorded yet.'}
            </p>
            <button
              onClick={() => {
                setView('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Report New Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

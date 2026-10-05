import React from 'react';
import { useItems } from '../../context/ItemsContext';
import { StatusBadge } from './StatusBadge';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Calendar,
  Share2,
  Flag,
  MessageCircle,
  CheckCircle2,
  User,
  Info,
  Edit3,
  Trash2,
  Camera,
  Building,
  UserCheck,
} from 'lucide-react';

export const ItemDetailsModal: React.FC = () => {
  const {
    selectedItem,
    setSelectedItem,
    setContactModalItem,
    setReportModalItem,
    setEditModalItem,
    markAsReunited,
    deleteItem,
    addToast,
    userProfile,
    canEditItem,
  } = useItems();

  const isOwner = Boolean(
    selectedItem &&
      (selectedItem.isUserReport ||
        selectedItem.reportedBy?.email?.toLowerCase() === userProfile.email.toLowerCase())
  );

  const handleShare = () => {
    if (!selectedItem) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        message: 'Link Copied',
        description: `Direct share link for "${selectedItem.title}" copied to clipboard.`,
      });
    }
  };

  return (
    <AnimatePresence>
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xs"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#121212] border border-[#EAEAEA] dark:border-[#222222] rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close details"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border border-[#EAEAEA] dark:border-[#2A2A2A] text-[#111111] dark:text-[#F5F5F7] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Large High-Quality Photo */}
            <div className="md:w-1/2 relative min-h-[260px] sm:min-h-[340px] md:min-h-[440px] bg-[#F7F7F7] dark:bg-[#181818] overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />

              {/* Status Badge floating */}
              <div className="absolute top-4 left-4 z-10">
                <StatusBadge
                  status={selectedItem.status}
                  isReunited={selectedItem.isReunited}
                  size="md"
                />
              </div>

              {/* Reunited ribbon banner */}
              {selectedItem.isReunited && (
                <div className="absolute bottom-4 inset-x-4 z-10 p-3 rounded-2xl bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border border-emerald-200/80 dark:border-emerald-800/80 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Reunited with Owner</span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] dark:text-[#A1A1A6] mt-0.5">
                    {selectedItem.reunitedDate ? `Resolved on ${selectedItem.reunitedDate}` : 'This item has been safely returned.'}
                  </p>
                </div>
              )}

              {/* Quick Edit Photo button for Owner/Admin */}
              {canEditItem(selectedItem) && !selectedItem.isReunited && (
                <button
                  type="button"
                  onClick={() => {
                    setEditModalItem(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-md inline-flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Camera className="w-3.5 h-3.5 text-[#FF4A6B]" />
                  <span>Change Photo</span>
                </button>
              )}
            </div>

            {/* Right: Item Information */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-5">
                {/* Header info */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B] dark:text-[#8E8E93] mb-2">
                    <span className="font-medium text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider text-[11px]">
                      {selectedItem.category}
                    </span>
                    <span aria-hidden="true" className="text-[#C5C5C5] dark:text-[#444444]">•</span>
                    <span>Logged in campus system</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7] leading-tight">
                    {selectedItem.title}
                  </h2>

                  {/* Metadata tags */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6B6B6B] dark:text-[#A1A1A6]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B] shrink-0" />
                      <span className="font-medium text-[#111111] dark:text-[#F5F5F7]">
                        {selectedItem.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] shrink-0" />
                      <span>{selectedItem.dateDisplay}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-2 border-t border-[#F0F0F0] dark:border-[#222222]">
                  <h3 className="text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider mb-1.5">
                    Description
                  </h3>
                  <p className="text-sm text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Additional Identifying Details */}
                {selectedItem.identifyingDetails && (
                  <div className="p-3.5 rounded-xl bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-[#111111] dark:text-[#F5F5F7]">
                      <Info className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                      <span>Identifying Characteristics</span>
                    </div>
                    <p className="text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                      {selectedItem.identifyingDetails}
                    </p>
                  </div>
                )}

                {/* Handed To / Custody Location Card */}
                {(selectedItem.handedToLocation || (selectedItem.contactPreference === 'desk' && selectedItem.contactValue)) && (
                  <div className="p-3.5 rounded-xl bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-[#111111] dark:text-[#F5F5F7]">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                        <span>Where the Item is Handed To / Designated Hub</span>
                      </div>
                      {canEditItem(selectedItem) && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditModalItem(selectedItem);
                            setSelectedItem(null);
                          }}
                          className="text-[10px] text-[#C1122F] dark:text-[#FF4A6B] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[#333333] dark:text-[#CCCCCC] font-medium leading-relaxed">
                      {selectedItem.handedToLocation || selectedItem.contactValue}
                    </p>
                  </div>
                )}

                {/* Collection & Handover Record Card */}
                {(selectedItem.isReunited || selectedItem.collectedByName) && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between font-semibold text-emerald-900 dark:text-emerald-300">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Collected By &amp; Handover Record</span>
                      </div>
                      {canEditItem(selectedItem) && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditModalItem(selectedItem);
                            setSelectedItem(null);
                          }}
                          className="text-[10px] text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 text-emerald-950 dark:text-emerald-200">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Collected by:</span>
                        <span className="font-semibold">{selectedItem.collectedByName || 'Verified Student / Owner'}</span>
                      </div>
                      {selectedItem.collectedByContact && (
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">Contact:</span>
                          <span>{selectedItem.collectedByContact}</span>
                        </div>
                      )}
                      {selectedItem.collectedDate && (
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">Date Collected:</span>
                          <span>{selectedItem.collectedDate}</span>
                        </div>
                      )}
                      {selectedItem.collectionNotes && (
                        <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/80 italic pt-0.5">
                          Notes: "{selectedItem.collectionNotes}"
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Reported By / Item Owner */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#6B6B6B] dark:text-[#A1A1A6] border-t border-[#F0F0F0] dark:border-[#222222]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#F0F0F0] dark:bg-[#202020] border border-[#E2E2E2] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-[#F5F5F7] font-semibold text-xs shrink-0">
                      <User className="w-4 h-4 text-[#6B6B6B] dark:text-[#A1A1A6]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#111111] dark:text-[#F5F5F7]">
                          {selectedItem.reportedBy.name}
                        </span>
                        <span className="text-[10px] text-[#8E8E93] dark:text-[#7A7A7E]">
                          ({selectedItem.status === 'LOST' ? 'Owner' : 'Reporter / Finder'})
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] flex items-center gap-1.5 flex-wrap mt-0.5">
                        <span>{selectedItem.reportedBy.email}</span>
                        {selectedItem.reportedBy.phone && (
                          <>
                            <span>•</span>
                            <span>{selectedItem.reportedBy.phone}</span>
                          </>
                        )}
                        {selectedItem.reportedBy.studentId && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[10px]">{selectedItem.reportedBy.studentId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <div className="text-[10px] text-[#8E8E93] dark:text-[#7A7A7E]">Preferred contact:</div>
                    <div className="font-medium text-[#111111] dark:text-[#F5F5F7] capitalize text-xs">
                      {selectedItem.contactPreference}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="mt-8 pt-4 border-t border-[#F0F0F0] dark:border-[#222222] space-y-3">
                <div className="flex items-center gap-3">
                  {/* Primary Action: Contact Poster (if not reunited and not owner) */}
                  {!selectedItem.isReunited && !isOwner ? (
                    <button
                      onClick={() => setContactModalItem(selectedItem)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact Poster
                    </button>
                  ) : selectedItem.isReunited ? (
                    <div className="flex-1 py-3 px-4 text-center text-xs font-semibold text-[#6B6B6B] dark:text-[#A1A1A6] bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#262626] rounded-xl">
                      Listing closed • Returned
                    </div>
                  ) : null}

                  {/* Secondary Action: Share Listing */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#181818] hover:bg-[#EFEFEF] dark:hover:bg-[#222222] border border-[#EAEAEA] dark:border-[#262626] rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Edit button for Owner or Campus Admin */}
                {canEditItem(selectedItem) && (
                  <button
                    onClick={() => {
                      setEditModalItem(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#1E1E1E] hover:bg-[#EFEFEF] dark:hover:bg-[#282828] border border-[#E0E0E0] dark:border-[#303030] rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                    <span>Edit Listing</span>
                  </button>
                )}

                {/* Quick action: Mark as Reunited */}
                {!selectedItem.isReunited && canEditItem(selectedItem) ? (
                  <button
                    onClick={() => markAsReunited(selectedItem.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>I reunited this item</span>
                  </button>
                ) : selectedItem.isReunited ? (
                  <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl">
                    <span className="font-bold">✓</span>
                    <span>Reunited • Back where it belongs.</span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] pt-1 px-1">
                  <div>
                    <span>Ref: #{selectedItem.id.slice(-6)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {canEditItem(selectedItem) && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Permanently delete listing "${selectedItem.title}"?`)) {
                            deleteItem(selectedItem.id);
                          }
                        }}
                        className="hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}
                    <button
                      onClick={() => setReportModalItem(selectedItem)}
                      className="hover:text-[#C1122F] dark:hover:text-[#FF4A6B] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Flag className="w-3 h-3" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

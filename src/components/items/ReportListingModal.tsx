import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle } from 'lucide-react';

export const ReportListingModal: React.FC = () => {
  const { reportModalItem, setReportModalItem, reportListing } = useItems();
  const [reason, setReason] = useState('Already reunited or returned');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalItem) return;
    reportListing(reportModalItem.id, `${reason} - ${details}`);
    setReportModalItem(null);
  };

  const reportReasons = [
    'Already reunited or returned',
    'Inappropriate content or spam',
    'Incorrect or misleading location',
    'Duplicate listing',
    'Privacy concern / sensitive personal data',
  ];

  return (
    <AnimatePresence>
      {reportModalItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs"
            onClick={() => setReportModalItem(null)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] dark:border-[#222222]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C1122F]/10 dark:bg-[#C1122F]/20 text-[#C1122F] dark:text-[#FF4A6B] flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
                  Report Listing
                </h3>
              </div>
              <button
                onClick={() => setReportModalItem(null)}
                className="p-1 rounded-full text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#6B6B6B] dark:text-[#A1A1A6]">
              Listing: <span className="font-semibold text-[#111111] dark:text-[#F5F5F7]">{reportModalItem.title}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7]">
                  Reason for report
                </label>
                {reportReasons.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      reason === r
                        ? 'border-[#111111] dark:border-[#555555] bg-[#F7F7F7] dark:bg-[#1E1E1E] font-medium text-[#111111] dark:text-[#F5F5F7]'
                        : 'border-[#EAEAEA] dark:border-[#262626] text-[#6B6B6B] dark:text-[#A1A1A6] hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="accent-[#C1122F]"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                  Additional context (optional)
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Explain any details for student moderators..."
                  className="w-full p-2.5 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReportModalItem(null)}
                  className="px-3 py-2 text-xs font-medium text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl transition-colors cursor-pointer"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

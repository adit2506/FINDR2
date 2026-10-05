import React from 'react';
import { ItemStatus } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface StatusBadgeProps {
  status: ItemStatus;
  isReunited?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  isReunited = false,
  size = 'md',
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px]'
      : size === 'lg'
      ? 'px-3 py-1 text-sm'
      : 'px-2.5 py-0.5 text-xs';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isReunited ? (
        <motion.span
          key="reunited"
          initial={{ opacity: 0, scale: 0.92, y: -2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-1.5 font-semibold tracking-tight rounded-md border border-emerald-300/80 dark:border-emerald-800/80 bg-emerald-50/95 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 shadow-2xs ${sizeClasses}`}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-emerald-600 dark:text-emerald-400"
          >
            ✓
          </motion.span>
          <span>REUNITED</span>
        </motion.span>
      ) : status === 'LOST' ? (
        <motion.span
          key="lost"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-1.5 font-semibold tracking-tight rounded-md bg-[#C1122F]/10 dark:bg-[#C1122F]/20 text-[#C1122F] dark:text-[#FF4A6B] border border-[#C1122F]/20 dark:border-[#C1122F]/40 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1122F] dark:bg-[#FF4A6B]" />
          <span>LOST</span>
        </motion.span>
      ) : (
        <motion.span
          key="found"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-1.5 font-semibold tracking-tight rounded-md bg-[#111111] dark:bg-[#222222] border border-transparent dark:border-white/10 text-white dark:text-[#F5F5F7] ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>FOUND</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { Item } from '../../types';
import { StatusBadge } from './StatusBadge';
import { MapPin, Calendar, ArrowRight, Edit3 } from 'lucide-react';
import { useItems } from '../../context/ItemsContext';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  const { canEditItem, setEditModalItem } = useItems();

  return (
    <article
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#242424] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#C1122F]/30 dark:hover:border-[#FF4A6B]/30 hover:shadow-[0_8px_30px_rgba(193,18,47,0.08)] dark:hover:shadow-[0_8px_30px_rgba(255,74,107,0.14)] cursor-pointer text-left ${
        item.isReunited ? 'opacity-70 saturate-[0.85] bg-[#FAFAFA] dark:bg-[#101010]' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F7F7] dark:bg-[#181818]">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Status Badge floating top-left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
          <StatusBadge status={item.status} isReunited={item.isReunited} size="sm" />
        </div>

        {/* Category quiet indicator top-right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[11px] font-medium tracking-tight px-2 py-0.5 rounded bg-white/90 dark:bg-[#161616]/90 backdrop-blur-sm text-[#111111] dark:text-[#F5F5F7] shadow-xs border border-black/5 dark:border-white/10">
            {item.category}
          </span>
        </div>

        {/* Tiny signature message on image when reunited */}
        {item.isReunited && (
          <div className="absolute bottom-2.5 left-3 right-3 z-10 animate-in fade-in duration-300">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#141414]/95 backdrop-blur-sm text-[11px] font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
              <span className="font-bold text-emerald-500">✓</span>
              <span>Back where it belongs.</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-base text-[#111111] dark:text-[#F5F5F7] tracking-tight leading-snug group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors line-clamp-1">
            {item.title}
          </h3>

          {/* Unboxed clean metadata with typographic separators */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] flex-wrap">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#9E9E9E] dark:text-[#7A7A7E] shrink-0" />
              <span className="truncate max-w-[170px]">{item.location}</span>
            </span>
            <span aria-hidden="true" className="text-[#C5C5C5] dark:text-[#444444]">•</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Calendar className="w-3 h-3 text-[#9E9E9E] dark:text-[#7A7A7E]" />
              <span>{item.dateDisplay}</span>
            </span>
          </div>

          <p className="mt-2.5 text-xs text-[#6B6B6B] dark:text-[#9A9A9E] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Action Row */}
        <div className="mt-4 pt-3 border-t border-[#F0F0F0] dark:border-[#222222] flex items-center justify-between text-xs">
          <span className="text-[#9E9E9E] dark:text-[#7A7A7E]">
            {item.isReunited ? 'Item returned' : `Posted by ${item.reportedBy.name.split(' ')[0]}`}
          </span>
          <div className="flex items-center gap-2">
            {canEditItem(item) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalItem(item);
                }}
                title="Edit Listing"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#111111] dark:text-[#F5F5F7] bg-[#F4F4F5] dark:bg-[#202020] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] border border-black/5 dark:border-white/10 transition-colors shadow-2xs"
              >
                <Edit3 className="w-3 h-3 text-[#C1122F] dark:text-[#FF4A6B]" />
                <span>Edit</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1 font-medium text-[#111111] dark:text-[#F5F5F7] group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] group-hover:translate-x-0.5 transition-all">
              View
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

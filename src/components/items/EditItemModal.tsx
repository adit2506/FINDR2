import React, { useState, useEffect } from 'react';
import { useItems } from '../../context/ItemsContext';
import { ItemCategory, ItemStatus } from '../../types';
import { CATEGORIES, INITIAL_ITEMS, FALLBACK_IMAGES } from '../../data/initialItems';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Upload,
  Link2,
  Building,
  UserCheck,
  Phone,
  Calendar,
  FileText,
} from 'lucide-react';

const PRESET_PHOTOS = [
  { label: 'AirPods', url: INITIAL_ITEMS[0]?.image || '' },
  { label: 'Hydro Flask', url: INITIAL_ITEMS[1]?.image || '' },
  { label: 'Student ID', url: INITIAL_ITEMS[2]?.image || '' },
  { label: 'Backpack', url: INITIAL_ITEMS[3]?.image || '' },
  { label: 'Calculator', url: FALLBACK_IMAGES.calculator },
  { label: 'Keys', url: FALLBACK_IMAGES.keys },
  { label: 'Hoodie', url: FALLBACK_IMAGES.hoodie },
  { label: 'Charger', url: FALLBACK_IMAGES.charger },
];

export const EditItemModal: React.FC = () => {
  const { editModalItem, setEditModalItem, updateItem } = useItems();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ItemStatus>('LOST');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [identifyingDetails, setIdentifyingDetails] = useState('');
  const [image, setImage] = useState('');

  // Custody and Collector fields
  const [handedToLocation, setHandedToLocation] = useState('');
  const [collectedByName, setCollectedByName] = useState('');
  const [collectedByContact, setCollectedByContact] = useState('');
  const [collectedDate, setCollectedDate] = useState('');
  const [collectionNotes, setCollectionNotes] = useState('');
  const [isReunitedState, setIsReunitedState] = useState(false);

  useEffect(() => {
    if (editModalItem) {
      setTitle(editModalItem.title);
      setStatus(editModalItem.status);
      setCategory(editModalItem.category);
      setLocation(editModalItem.location);
      setDescription(editModalItem.description);
      setIdentifyingDetails(editModalItem.identifyingDetails || '');
      setImage(editModalItem.image || '');
      setHandedToLocation(editModalItem.handedToLocation || editModalItem.contactValue || '');
      setCollectedByName(editModalItem.collectedByName || '');
      setCollectedByContact(editModalItem.collectedByContact || '');
      setCollectedDate(editModalItem.collectedDate || editModalItem.reunitedDate || '');
      setCollectionNotes(editModalItem.collectionNotes || '');
      setIsReunitedState(Boolean(editModalItem.isReunited));
    }
  }, [editModalItem]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    const now = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    updateItem(editModalItem.id, {
      title,
      status,
      category,
      location,
      description,
      identifyingDetails,
      image,
      handedToLocation: handedToLocation.trim() || undefined,
      collectedByName: collectedByName.trim() || undefined,
      collectedByContact: collectedByContact.trim() || undefined,
      collectedDate: collectedDate.trim() || (isReunitedState ? (editModalItem.reunitedDate || now) : undefined),
      collectionNotes: collectionNotes.trim() || undefined,
      isReunited: isReunitedState,
      reunitedDate: isReunitedState ? (editModalItem.reunitedDate || now) : undefined,
    });
    setEditModalItem(null);
  };

  return (
    <AnimatePresence>
      {editModalItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs"
            onClick={() => setEditModalItem(null)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden p-6 sm:p-7 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] dark:border-[#222222]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C1122F] dark:text-[#FF4A6B]">
                  Listing Editor
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7] mt-0.5">
                  Edit Item Listing
                </h3>
              </div>
              <button
                onClick={() => setEditModalItem(null)}
                className="p-1 rounded-full text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ItemStatus)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                  >
                    <option value="LOST">Lost</option>
                    <option value="FOUND">Found</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                  Campus Location Where Found / Lost
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                />
              </div>

              {/* Custody and Handover Section */}
              <div className="p-4 rounded-2xl bg-[#FBFBFB] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] space-y-3.5">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#111111] dark:text-[#F5F5F7] uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                  <span>Where the item is handed to (Designated Hub)</span>
                </div>

                <div>
                  <input
                    type="text"
                    value={handedToLocation}
                    onChange={(e) => setHandedToLocation(e.target.value)}
                    placeholder="e.g. Library, Lost and Found Cabinet, Reception, Gymkhana..."
                    className="w-full px-3 py-2 bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                  />
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-[#8E8E93] dark:text-[#7A7A7E] mr-1">Designated hubs:</span>
                    {[
                      'Library',
                      'Lost and Found Cabinet',
                      'Reception',
                      'Gymkhana',
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setHandedToLocation(preset)}
                        className="px-2 py-0.5 rounded bg-[#F0F0F0] dark:bg-[#222222] text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] border border-black/5 dark:border-white/5 cursor-pointer transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Who Collected the Item Section */}
                <div className="pt-3 border-t border-[#EAEAEA] dark:border-[#282828] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isReunitedState}
                        onChange={(e) => setIsReunitedState(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C1122F] accent-[#C1122F] cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-[#111111] dark:text-[#F5F5F7]">
                        Item Collected / Claimed by Owner
                      </span>
                    </label>
                    {isReunitedState && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        ✓ Reunited
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                        Contact who collected the item (Name)
                      </label>
                      <div className="relative">
                        <UserCheck className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={collectedByName}
                          onChange={(e) => {
                            setCollectedByName(e.target.value);
                            if (e.target.value.trim() && !isReunitedState) {
                              setIsReunitedState(true);
                            }
                          }}
                          placeholder="e.g. Samira Khan / Owner Name"
                          className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                        Collector's Contact (Email / Phone / ID)
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={collectedByContact}
                          onChange={(e) => setCollectedByContact(e.target.value)}
                          placeholder="e.g. s.khan@campus.edu — (555) 712-4091"
                          className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                        Collection Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={collectedDate}
                          onChange={(e) => setCollectedDate(e.target.value)}
                          placeholder="e.g. October 5, 2026"
                          className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                        Verification &amp; Handover Notes
                      </label>
                      <div className="relative">
                        <FileText className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={collectionNotes}
                          onChange={(e) => setCollectionNotes(e.target.value)}
                          placeholder="e.g. Student ID barcode match verified"
                          className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                  Identifying Details / Marks
                </label>
                <input
                  type="text"
                  value={identifyingDetails}
                  onChange={(e) => setIdentifyingDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                />
              </div>

              {/* Photo Management Section */}
              <div className="space-y-3 pt-3 border-t border-[#F0F0F0] dark:border-[#222222]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7]">
                  Item Photo
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                  {/* Photo Preview */}
                  <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F7F7] dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#282828] group shadow-2xs">
                    <img
                      src={image}
                      alt="Item preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                      Photo preview
                    </div>
                  </div>

                  {/* Upload & Preset Options */}
                  <div className="sm:col-span-7 space-y-2.5">
                    {/* Device Upload */}
                    <label className="flex items-center justify-center gap-2 p-2.5 bg-[#F7F7F7] dark:bg-[#181818] hover:bg-[#EFEFEF] dark:hover:bg-[#202020] border border-dashed border-[#D0D0D0] dark:border-[#383838] rounded-xl text-xs font-medium text-[#111111] dark:text-[#F5F5F7] cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#C1122F] dark:text-[#FF4A6B]" />
                      <span>Upload picture from device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Image URL input */}
                    <div className="relative">
                      <Link2 className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E] absolute left-3 top-2.5" />
                      <input
                        type="url"
                        value={image.startsWith('data:') ? '' : image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Or paste web image URL..."
                        className="w-full pl-8 pr-3 py-1.5 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                      />
                    </div>

                    {/* Quick Campus Presets */}
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8E8E93] dark:text-[#7A7A7E] mb-1">
                        Select photo preset:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {PRESET_PHOTOS.map((p) => {
                          const isSelected = image === p.url;
                          return (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => setImage(p.url)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#111111] text-white dark:bg-white dark:text-black border-transparent'
                                  : 'bg-[#F2F2F2] dark:bg-[#1E1E1E] text-[#6B6B6B] dark:text-[#A1A1A6] border-black/5 dark:border-white/5 hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                              }`}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0F0F0] dark:border-[#222222] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#111111] dark:bg-[#282828] hover:bg-[#222222] dark:hover:bg-[#333333] border border-transparent dark:border-white/10 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

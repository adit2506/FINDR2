import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import { ItemCategory, ItemStatus } from '../../types';
import { CATEGORIES, CAMPUS_LOCATIONS, FALLBACK_IMAGES } from '../../data/initialItems';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Camera,
  AlertCircle,
} from 'lucide-react';
import airpodsPreset from '../../assets/images/airpods_case.jpg';
import bottlePreset from '../../assets/images/water_bottle.jpg';
import backpackPreset from '../../assets/images/backpack.jpg';
import cardPreset from '../../assets/images/student_id_card.jpg';

export const ReportPage: React.FC = () => {
  const { addItem, setView, userProfile } = useItems();
  const [step, setStep] = useState<'select-type' | 'form' | 'success'>('select-type');
  const [selectedType, setSelectedType] = useState<ItemStatus>('LOST');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [locationPreset, setLocationPreset] = useState(CAMPUS_LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [identifyingDetails, setIdentifyingDetails] = useState('');
  const [contactPreference, setContactPreference] = useState<'email' | 'phone' | 'desk'>('email');
  const [contactValue, setContactValue] = useState(userProfile.email);
  const [imagePreview, setImagePreview] = useState<string>(backpackPreset);

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const presetPhotos = [
    { label: 'AirPods / Audio', url: airpodsPreset },
    { label: 'Water Bottle', url: bottlePreset },
    { label: 'Backpack / Bag', url: backpackPreset },
    { label: 'Student ID / Cards', url: cardPreset },
    { label: 'Calculator / Tech', url: FALLBACK_IMAGES.calculator },
    { label: 'Keys / Dorm Lanyard', url: FALLBACK_IMAGES.keys },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || submitStatus !== 'idle') return;

    setSubmitStatus('loading');
    const finalLocation = useCustomLocation && customLocation.trim()
      ? customLocation.trim()
      : locationPreset;

    setTimeout(() => {
      addItem({
        title,
        status: selectedType,
        category,
        location: finalLocation,
        date,
        description,
        image: imagePreview || backpackPreset,
        identifyingDetails: identifyingDetails.trim() || undefined,
        contactPreference,
        contactValue: contactValue || userProfile.email,
      });

      setSubmitStatus('success');

      // Hold "✓ Item posted" on button briefly before transitioning to confirmation card
      setTimeout(() => {
        setStep('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 550);
    }, 650);
  };

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-[#0A0A0A] min-h-[85vh] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C1122F] dark:text-[#FF4A6B]">
            Campus Registry
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
            Report an Item
          </h1>
          <p className="mt-2 text-sm text-[#6B6B6B] dark:text-[#A1A1A6] max-w-md mx-auto">
            Log misplaced or recovered belongings across the university network in seconds.
          </p>
        </div>

        {/* STEP 1: Two Large Interactive Selection Cards */}
        {step === 'select-type' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* I LOST SOMETHING */}
              <button
                type="button"
                onClick={() => {
                  setSelectedType('LOST');
                  setStep('form');
                }}
                className="group relative p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#EAEAEA] dark:border-[#262626] hover:border-[#C1122F] dark:hover:border-[#FF4A6B] hover:shadow-[0_12px_40px_rgba(193,18,47,0.08)] dark:hover:shadow-[0_12px_40px_rgba(193,18,47,0.2)] transition-all text-left cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#C1122F]/10 dark:bg-[#C1122F]/20 text-[#C1122F] dark:text-[#FF4A6B] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7] group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors">
                    I Lost Something
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                    Broadcast a notice with item details and where you last saw it so campus peers can assist.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#C1122F] dark:text-[#FF4A6B]">
                  <span>Begin lost report</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* I FOUND SOMETHING */}
              <button
                type="button"
                onClick={() => {
                  setSelectedType('FOUND');
                  setStep('form');
                }}
                className="group relative p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#141414] border-2 border-[#EAEAEA] dark:border-[#262626] hover:border-[#111111] dark:hover:border-white/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all text-left cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#111111] dark:bg-[#222222] text-white dark:text-[#F5F5F7] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-transparent dark:border-white/10">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
                    I Found Something
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                    List an item you came across or handed over to a campus library or building reception.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-[#F5F5F7]">
                  <span>Begin found report</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: The Non-Intimidating Clean Form */}
        {step === 'form' && (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] space-y-7 animate-in fade-in duration-200"
          >
            {/* Status switcher pills */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] dark:border-[#222222]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B6B6B] dark:text-[#A1A1A6]">You are reporting:</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    selectedType === 'LOST'
                      ? 'bg-[#C1122F]/10 dark:bg-[#C1122F]/20 text-[#C1122F] dark:text-[#FF4A6B] border border-[#C1122F]/20 dark:border-[#C1122F]/40'
                      : 'bg-[#111111] dark:bg-[#242424] text-white dark:text-[#F5F5F7] border border-transparent dark:border-white/10'
                  }`}
                >
                  {selectedType === 'LOST' ? 'A Lost Item' : 'A Found Item'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep('select-type')}
                className="text-xs text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
              >
                Change type
              </button>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                Item Name <span className="text-[#C1122F]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Black AirPods Pro Case, Blue Hydro Flask, TI-84 Calculator..."
                className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] transition-all"
              />
            </div>

            {/* Category & Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                  Category <span className="text-[#C1122F]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                  Date {selectedType === 'LOST' ? 'Lost' : 'Found'} <span className="text-[#C1122F]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                />
              </div>
            </div>

            {/* Campus Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7]">
                  Campus Location <span className="text-[#C1122F]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomLocation((prev) => !prev)}
                  className="text-xs text-[#C1122F] dark:text-[#FF4A6B] hover:underline cursor-pointer"
                >
                  {useCustomLocation ? 'Pick from campus list' : 'Type specific room/spot'}
                </button>
              </div>

              {useCustomLocation ? (
                <input
                  type="text"
                  required
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="e.g. Science Center Room 304, Lecture Hall 2 Row E..."
                  className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                />
              ) : (
                <select
                  value={locationPreset}
                  onChange={(e) => setLocationPreset(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                Description <span className="text-[#C1122F]">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Where was it left? Describe color, brand, condition, or circumstances..."
                className="w-full p-4 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] transition-all resize-none"
              />
            </div>

            {/* Identifying Details */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7]">
                  Optional Identifying Details
                </label>
                <span className="text-[11px] text-[#8E8E93] dark:text-[#7A7A7E]">To verify rightful owner</span>
              </div>
              <input
                type="text"
                value={identifyingDetails}
                onChange={(e) => setIdentifyingDetails(e.target.value)}
                placeholder="e.g. Initials carved inside, lockscreen wallpaper description, scratches..."
                className="w-full px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-sm text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
              />
            </div>

            {/* Photo Uploader Section */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                Photo of the Item
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Current Image Preview */}
                <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F7F7] dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#282828]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                    Current photo
                  </div>
                </div>

                {/* Upload or Choose Presets */}
                <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                  {/* File input button */}
                  <label className="flex items-center justify-center gap-2 p-3 bg-[#F7F7F7] dark:bg-[#181818] hover:bg-[#EFEFEF] dark:hover:bg-[#202020] border border-dashed border-[#D0D0D0] dark:border-[#383838] rounded-xl text-xs font-medium text-[#111111] dark:text-[#F5F5F7] cursor-pointer transition-colors">
                    <Camera className="w-4 h-4 text-[#C1122F] dark:text-[#FF4A6B]" />
                    <span>Upload your photo from device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Or choose a common campus item photo */}
                  <div>
                    <span className="block text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] mb-1.5">
                      Or select a matching campus photo:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {presetPhotos.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImagePreview(preset.url)}
                          className={`p-1.5 text-left rounded-lg border text-[11px] truncate transition-colors cursor-pointer ${
                            imagePreview === preset.url
                              ? 'border-[#111111] dark:border-white/30 bg-[#111111] dark:bg-[#282828] text-white font-medium'
                              : 'border-[#EAEAEA] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] text-[#6B6B6B] dark:text-[#A1A1A6] hover:bg-white dark:hover:bg-[#202020]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Preference */}
            <div className="pt-4 border-t border-[#F0F0F0] dark:border-[#222222]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7] mb-2">
                How should people contact you?
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setContactPreference('email')}
                  className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-colors cursor-pointer ${
                    contactPreference === 'email'
                      ? 'border-[#111111] dark:border-white/20 bg-[#111111] dark:bg-[#242424] text-white'
                      : 'border-[#EAEAEA] dark:border-[#262626] text-[#6B6B6B] dark:text-[#A1A1A6] hover:bg-[#F7F7F7] dark:hover:bg-[#1C1C1C]'
                  }`}
                >
                  Campus Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactPreference('phone')}
                  className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-colors cursor-pointer ${
                    contactPreference === 'phone'
                      ? 'border-[#111111] dark:border-white/20 bg-[#111111] dark:bg-[#242424] text-white'
                      : 'border-[#EAEAEA] dark:border-[#262626] text-[#6B6B6B] dark:text-[#A1A1A6] hover:bg-[#F7F7F7] dark:hover:bg-[#1C1C1C]'
                  }`}
                >
                  Phone / SMS
                </button>
                <button
                  type="button"
                  onClick={() => setContactPreference('desk')}
                  className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-colors cursor-pointer ${
                    contactPreference === 'desk'
                      ? 'border-[#111111] dark:border-white/20 bg-[#111111] dark:bg-[#242424] text-white'
                      : 'border-[#EAEAEA] dark:border-[#262626] text-[#6B6B6B] dark:text-[#A1A1A6] hover:bg-[#F7F7F7] dark:hover:bg-[#1C1C1C]'
                  }`}
                >
                  Designated Hub Hand-off
                </button>
              </div>

              <input
                type="text"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={
                  contactPreference === 'desk'
                    ? 'e.g. Library, Lost and Found Cabinet, Reception, Gymkhana'
                    : contactPreference === 'phone'
                    ? 'e.g. (555) 123-4567'
                    : 'e.g. your.email@campus.edu'
                }
                className="w-full px-4 py-2.5 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
              />

              {contactPreference === 'desk' && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-[#8E8E93] dark:text-[#7A7A7E] mr-1">Designated hubs:</span>
                  {['Library', 'Lost and Found Cabinet', 'Reception', 'Gymkhana'].map((desk) => (
                    <button
                      key={desk}
                      type="button"
                      onClick={() => setContactValue(desk)}
                      className="px-2 py-0.5 rounded bg-[#F0F0F0] dark:bg-[#202020] text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] border border-black/5 dark:border-white/5 cursor-pointer transition-colors"
                    >
                      {desk}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between border-t border-[#F0F0F0] dark:border-[#222222]">
              <button
                type="button"
                onClick={() => setStep('select-type')}
                className="px-4 py-2 text-xs font-medium text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitStatus !== 'idle'}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl shadow-xs transition-all duration-200 min-w-[155px] cursor-pointer ${
                  submitStatus === 'success'
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white scale-[1.01]'
                    : submitStatus === 'loading'
                    ? 'bg-[#A30D26] text-white opacity-95 cursor-wait'
                    : 'bg-[#C1122F] hover:bg-[#A30D26] active:scale-[0.98] text-white'
                }`}
              >
                {submitStatus === 'loading' && (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin -ml-0.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Posting...</span>
                  </span>
                )}
                {submitStatus === 'success' && (
                  <span className="inline-flex items-center gap-1.5 animate-in zoom-in-95 duration-150 font-semibold">
                    <span>✓</span>
                    <span>Item posted</span>
                  </span>
                )}
                {submitStatus === 'idle' && (
                  <>
                    <span>Post Item</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Polished Apple Success State */}
        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6"
          >
            {/* Subtle animated checkmark */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <motion.svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.path
                  d="M8.2 12.4l2.6 2.6 5.2-5.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
            </div>

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]"
              >
                Your item has been posted.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-base text-[#6B6B6B] dark:text-[#A1A1A6]"
              >
                Hopefully it finds its way home.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={() => {
                  setView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#111111] dark:bg-[#252525] hover:bg-[#222222] dark:hover:bg-[#303030] border border-transparent dark:border-white/10 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                View Listing in My Reports
              </button>
              <button
                onClick={() => {
                  setView('browse');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#181818] hover:bg-[#EFEFEF] dark:hover:bg-[#222222] border border-[#EAEAEA] dark:border-[#262626] rounded-xl transition-all cursor-pointer"
              >
                Browse All Items
              </button>
              <button
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setIdentifyingDetails('');
                  setSubmitStatus('idle');
                  setStep('select-type');
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] rounded-xl transition-all cursor-pointer"
              >
                Report Another Item
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

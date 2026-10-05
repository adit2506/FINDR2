import React from 'react';
import { useItems } from '../../context/ItemsContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import heroImg from '../../assets/images/hero_showcase.jpg';

export const HeroSection: React.FC = () => {
  const { setView, items, setSelectedItem } = useItems();

  const sampleLost = items.find((i) => i.status === 'LOST' && !i.isReunited) || items[1];
  const sampleFound = items.find((i) => i.status === 'FOUND' && !i.isReunited) || items[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Campus Registry Pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F7] dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] text-xs text-[#111111] dark:text-[#F5F5F7] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#C1122F] animate-pulse" />
              <span>Findr Campus Registry</span>
            </motion.div>

            {/* Headline: Fades in + moves up subtly */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7] leading-[1.08] text-balance"
            >
              Lost something? <br />
              <span className="text-[#6B6B6B] dark:text-[#8E8E93]">Found something?</span>
            </motion.h1>

            {/* Subtitle follows slightly after */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-base sm:text-lg text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed max-w-xl font-normal"
            >
              Help reunite students with the things they’ve lost around campus. A fast, clean, and trusted space for everyday belongings.
            </motion.p>

            {/* Buttons follow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="pt-2 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => {
                  setView('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] hover:shadow-[0_4px_22px_rgba(193,18,47,0.38)] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Report an Item
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setView('browse');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#161616] hover:bg-[#EFEFEF] dark:hover:bg-[#202020] hover:border-[#C1122F]/40 dark:hover:border-[#FF4A6B]/40 hover:shadow-[0_4px_18px_rgba(193,18,47,0.12)] active:scale-[0.98] border border-[#EAEAEA] dark:border-[#282828] rounded-xl transition-all cursor-pointer"
              >
                Browse Lost &amp; Found
              </button>
            </motion.div>

            {/* Quiet Campus Trust Note */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="pt-4 flex items-center gap-6 text-xs text-[#8E8E93] dark:text-[#7A7A7E]"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#111111] dark:text-[#F5F5F7]" />
                Verified student directory
              </span>
              <span aria-hidden="true" className="text-[#D0D0D0] dark:text-[#333333]">•</span>
              <span>4 designated campus hubs</span>
            </motion.div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl p-2.5 bg-gradient-to-b from-[#F2F2F2] to-white dark:from-[#1E1E1E] dark:to-[#121212] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]"
            >
              {/* Main Photo Banner */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F7F7F7] dark:bg-[#1A1A1A]">
                <img
                  src={heroImg}
                  alt="Campus everyday student items on desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-medium bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    University Commons &amp; Libraries
                  </span>
                  <span className="text-white/80 font-mono text-[11px]">
                    24/7 Safe Recovery
                  </span>
                </div>
              </div>

              {/* Floating interactive sample cards */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleFound && (
                  <button
                    onClick={() => setSelectedItem(sampleFound)}
                    className="p-3 text-left rounded-xl bg-white dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] hover:border-[#D4D4D4] dark:hover:border-[#383838] hover:shadow-xs transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F7F7F7] dark:bg-[#202020]">
                      <img
                        src={sampleFound.image}
                        alt={sampleFound.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-semibold tracking-wider text-[#111111] dark:text-[#F5F5F7]">
                          FOUND
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#111111] dark:text-[#F5F5F7] truncate group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors">
                        {sampleFound.title}
                      </p>
                      <p className="text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] truncate">
                        {sampleFound.location.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                )}
                {sampleLost && (
                  <button
                    onClick={() => setSelectedItem(sampleLost)}
                    className="p-3 text-left rounded-xl bg-white dark:bg-[#161616] border border-[#EAEAEA] dark:border-[#262626] hover:border-[#D4D4D4] dark:hover:border-[#383838] hover:shadow-xs transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F7F7F7] dark:bg-[#202020]">
                      <img
                        src={sampleLost.image}
                        alt={sampleLost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1122F] dark:bg-[#FF4A6B]" />
                        <span className="text-[10px] font-semibold tracking-wider text-[#C1122F] dark:text-[#FF4A6B]">
                          LOST
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#111111] dark:text-[#F5F5F7] truncate group-hover:text-[#C1122F] dark:group-hover:text-[#FF4A6B] transition-colors">
                        {sampleLost.title}
                      </p>
                      <p className="text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] truncate">
                        {sampleLost.location.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

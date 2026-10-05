import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useItems } from '../../context/ItemsContext';
import { Search, Plus, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    setIsQuickSearchOpen,
    stats,
    isDarkMode,
    toggleDarkMode,
  } = useItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compass needle animation controls
  const needleControls = useAnimationControls();
  const isAnimatingRef = useRef(false);

  const playNeedleAnimation = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    await needleControls.start({
      rotate: [0, 180, 194, -3, 0],
      transition: {
        duration: 0.8, // 800ms strictly in 700-900ms window
        times: [0, 0.46, 0.62, 0.88, 1],
        ease: ['easeInOut', 'easeOut', 'easeInOut', 'easeOut'],
      },
    });
    isAnimatingRef.current = false;
  }, [needleControls]);

  // Only happens once when the app loads
  useEffect(() => {
    const timer = setTimeout(() => {
      playNeedleAnimation();
    }, 120);
    return () => clearTimeout(timer);
  }, [playNeedleAnimation]);

  interface NavLinkItem {
    id: 'browse' | 'report' | 'dashboard' | 'about';
    label: string;
    badge?: number;
  }

  const navLinks: NavLinkItem[] = [
    { id: 'browse', label: 'Browse Items' },
    { id: 'report', label: 'Report Item' },
    {
      id: 'dashboard',
      label: 'My Reports',
      badge: stats.userReportsCount,
    },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (targetView: 'browse' | 'report' | 'dashboard' | 'about') => {
    setView(targetView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#EAEAEA] dark:border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single Brand Zone with Compass Logo */}
          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={playNeedleAnimation}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
          >
            {/* The black rounded-square container stays completely still */}
            <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#202020] border border-black/5 dark:border-white/10 flex items-center justify-center text-white shadow-2xs select-none shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Compass Dial Outer Ring */}
                <circle
                  cx="12"
                  cy="12"
                  r="9.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-white/40 dark:text-white/35"
                />
                {/* Cardinal North notch */}
                <line
                  x1="12"
                  y1="3"
                  x2="12"
                  y2="4.8"
                  stroke="#C1122F"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                {/* Subtle East, South, West cardinal ticks */}
                <line
                  x1="19.2"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  className="text-white/20 dark:text-white/20"
                />
                <line
                  x1="12"
                  y1="19.2"
                  x2="12"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  className="text-white/20 dark:text-white/20"
                />
                <line
                  x1="3"
                  y1="12"
                  x2="4.8"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  className="text-white/20 dark:text-white/20"
                />
                {/* Precision Needle: Smoothly rotates ~180°, overshoots, then settles back */}
                <motion.g
                  animate={needleControls}
                  style={{ transformOrigin: '12px 12px' }}
                >
                  {/* Red North Needle */}
                  <polygon points="12,4.6 14.4,12 9.6,12" fill="#C1122F" />
                  {/* South Needle */}
                  <polygon points="12,19.4 14.4,12 9.6,12" fill="#A1A1A6" opacity="0.65" />
                  {/* Center Pivot Pin */}
                  <circle cx="12" cy="12" r="1.4" fill="#111111" stroke="#FFFFFF" strokeWidth="0.8" />
                </motion.g>
              </svg>
            </div>

            {/* FINDR wordmark animation:
                1. FINDR fades in (~250ms)
                2. The "I" briefly turns cherry red (#C1122F)
                3. Settles back smoothly into normal logo text color within ~500ms
            */}
            <motion.span
              initial={{ opacity: 0, x: -3 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative text-base font-bold tracking-tight text-[#111111] dark:text-[#F5F5F7] whitespace-nowrap inline-flex items-center"
            >
              <span>F</span>
              <motion.span
                animate={{
                  color: [
                    'currentColor',
                    '#C1122F',
                    '#C1122F',
                    'currentColor',
                  ],
                }}
                transition={{
                  duration: 0.52,
                  times: [0, 0.25, 0.65, 1],
                  ease: 'easeInOut',
                  delay: 0.05,
                }}
                className="inline-block"
              >
                I
              </motion.span>
              <span>NDR</span>
            </motion.span>
          </button>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = view === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`group relative text-sm tracking-tight transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'font-medium text-[#111111] dark:text-[#F5F5F7]'
                      : 'text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#F2F2F2] dark:bg-[#202020] text-[#111111] dark:text-[#F5F5F7] border border-transparent dark:border-white/5">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1122F] dark:bg-[#FF4A6B] rounded-full" />
                  ) : (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1122F]/80 dark:bg-[#FF4A6B]/80 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions + Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Search trigger */}
            <button
              onClick={() => setIsQuickSearchOpen(true)}
              aria-label="Search items"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#6B6B6B] dark:text-[#A1A1A6] bg-[#F7F7F7] dark:bg-[#161616] hover:bg-[#EFEFEF] dark:hover:bg-[#202020] hover:text-[#111111] dark:hover:text-[#F5F5F7] border border-[#EAEAEA] dark:border-[#262626] rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search items...</span>
              <kbd className="hidden lg:inline-block font-sans text-[10px] bg-white dark:bg-[#0E0E0E] border border-[#E2E2E2] dark:border-[#2C2C2C] px-1.5 py-0.5 rounded text-[#999999] dark:text-[#7A7A7E]">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] bg-[#F7F7F7] dark:bg-[#161616] hover:bg-[#EFEFEF] dark:hover:bg-[#202020] border border-[#EAEAEA] dark:border-[#262626] rounded-lg transition-colors cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#555555]" />
              )}
            </button>

            {/* Primary Cherry-Red Action CTA */}
            <button
              onClick={() => {
                setView('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer ml-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Report an Item
            </button>
          </div>

          {/* Mobile Right Controls: Search + Dark Mode + Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] hover:bg-[#F7F7F7] dark:hover:bg-[#181818] rounded-lg transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#555555]" />
              )}
            </button>
            <button
              onClick={() => setIsQuickSearchOpen(true)}
              aria-label="Quick search"
              className="p-2 text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] hover:bg-[#F7F7F7] dark:hover:bg-[#181818] rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#111111] dark:text-[#F5F5F7] hover:bg-[#F7F7F7] dark:hover:bg-[#181818] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-[#EAEAEA] dark:border-[#222222] bg-white dark:bg-[#121212] px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="space-y-1">
              <button
                onClick={() => {
                  setView('home');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  view === 'home'
                    ? 'bg-[#F7F7F7] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F5F5F7]'
                    : 'text-[#6B6B6B] dark:text-[#A1A1A6]'
                }`}
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    view === link.id
                      ? 'bg-[#F7F7F7] dark:bg-[#1E1E1E] text-[#111111] dark:text-[#F5F5F7]'
                      : 'text-[#6B6B6B] dark:text-[#A1A1A6]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F2F2F2] dark:bg-[#202020] text-[#111111] dark:text-[#F5F5F7]">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-[#F0F0F0] dark:border-[#222222]">
              <button
                onClick={() => {
                  setView('report');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Report an Item
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

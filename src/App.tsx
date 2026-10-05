/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ItemsProvider, useItems } from './context/ItemsContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeatureCards } from './components/home/FeatureCards';
import { RecentlyReported } from './components/home/RecentlyReported';
import { StatsSection } from './components/home/StatsSection';
import { BrowsePage } from './components/browse/BrowsePage';
import { ReportPage } from './components/report/ReportPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { AboutPage } from './components/about/AboutPage';
import { ItemDetailsModal } from './components/items/ItemDetailsModal';
import { ContactPosterModal } from './components/items/ContactPosterModal';
import { ReportListingModal } from './components/items/ReportListingModal';
import { EditItemModal } from './components/items/EditItemModal';
import { QuickSearchModal } from './components/ui/QuickSearchModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const { view } = useItems();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A0A0A] text-[#111111] dark:text-[#F5F5F7] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {view === 'home' && (
              <>
                <HeroSection />
                <FeatureCards />
                <RecentlyReported />
                <StatsSection />
              </>
            )}
            {view === 'browse' && <BrowsePage />}
            {view === 'report' && <ReportPage />}
            {view === 'dashboard' && <DashboardPage />}
            {view === 'about' && <AboutPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <ItemDetailsModal />
      <ContactPosterModal />
      <ReportListingModal />
      <EditItemModal />
      <QuickSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ItemsProvider>
      <MainContent />
    </ItemsProvider>
  );
}

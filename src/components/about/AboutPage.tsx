import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import {
  ShieldCheck,
  Building,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setView } = useItems();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      title: 'Report',
      description: "Tell the campus what you've lost or found in 30 seconds with photos and building location.",
    },
    {
      step: '02',
      title: 'Discover',
      description: 'Students search, browse active listings by campus zone, and verify matching details.',
    },
    {
      step: '03',
      title: 'Reunite',
      description: 'Connect safely through campus email or hand over items at designated hubs.',
    },
  ];

  const safeHubs = [
    {
      name: 'Library',
      hours: 'Mon — Fri: 7:30 AM — 11:00 PM • Weekends: 9:00 AM — 8:00 PM',
      note: 'Most popular return hub for electronics, notebooks, and water bottles.',
    },
    {
      name: 'Lost and Found Cabinet',
      hours: 'Mon — Sun: 8:00 AM — 10:00 PM',
      note: 'Accepts backpacks, coats, and keys.',
    },
    {
      name: 'Reception',
      hours: 'Open 24/7 / 365 Days',
      note: 'Mandatory safe drop-off for wallets, government IDs, and locked phones.',
    },
    {
      name: 'Gymkhana',
      hours: 'Daily: 6:00 AM — 11:00 PM',
      note: 'For gym gear, locker room misplacements, and sports accessories.',
    },
  ];

  const faqs = [
    {
      q: 'How does item verification work to prevent false claims?',
      a: 'When reporting an item, submitters can specify hidden identifying characteristics (e.g. engravings, wallpaper descriptions, stickers, or serial numbers). Claimants must provide those details prior to pickup.',
    },
    {
      q: 'What should I do if I find a student ID card or debit card?',
      a: 'We strongly suggest handing cards directly to the Library, Reception, or any designated hub. You can also log a FOUND report specifying the hub.',
    },
    {
      q: 'Is my personal phone number or email public?',
      a: 'Only the contact preference you choose (campus email, phone, or designated hub hand-off) will be displayed to logged-in campus peers.',
    },
    {
      q: 'What happens once an item is returned?',
      a: 'Either the student who posted it or the finder can mark the listing as "Reunited". The listing stays archived with a green Reunited stamp to celebrate another successful recovery.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white dark:bg-[#0A0A0A] min-h-[85vh] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Editorial Hero */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C1122F] dark:text-[#FF4A6B]">
            About FINDR
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7] leading-tight">
            Lost things shouldn't stay lost.
          </h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed">
            A student-focused platform designed to make it effortless to report, discover, and safely return misplaced belongings around campus.
          </p>
        </div>

        {/* 3-Step Process */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F7]">
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-2xl bg-[#F7F7F7] dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#242424] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#C1122F] dark:text-[#FF4A6B]">
                    {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[#111111] dark:text-[#F5F5F7] tracking-tight mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Designated Hubs */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#C1122F] dark:text-[#FF4A6B]" />
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
              Designated Hubs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] mb-6">
            If you do not want to arrange a direct student meet-up, turn the item in to any of these designated hubs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safeHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#EAEAEA] dark:border-[#242424] bg-white dark:bg-[#141414] hover:border-[#D4D4D4] dark:hover:border-[#383838] transition-colors space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#111111] dark:text-[#F5F5F7] shrink-0" />
                  <h3 className="font-semibold text-sm text-[#111111] dark:text-[#F5F5F7]">
                    {hub.name}
                  </h3>
                </div>
                <p className="text-[11px] text-[#8E8E93] dark:text-[#7A7A7E]">
                  {hub.hours}
                </p>
                <p className="text-xs text-[#444444] dark:text-[#CCCCCC] pt-1 border-t border-[#F0F0F0] dark:border-[#222222]">
                  {hub.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EAEAEA] dark:border-[#242424] bg-white dark:bg-[#141414] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-medium text-sm text-[#111111] dark:text-[#F5F5F7] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8E8E93] dark:text-[#7A7A7E] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] leading-relaxed border-t border-[#F0F0F0] dark:border-[#222222] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F7F7] dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#242424] text-center space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
            Have an item to report right now?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#A1A1A6] max-w-md mx-auto">
            Takes less than a minute. Your post reaches thousands of students on campus.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setView('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Report an Item
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

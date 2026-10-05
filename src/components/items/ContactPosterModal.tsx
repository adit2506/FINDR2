import React, { useState } from 'react';
import { useItems } from '../../context/ItemsContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, Phone, Building, CheckCircle, Shield } from 'lucide-react';

export const ContactPosterModal: React.FC = () => {
  const { contactModalItem, setContactModalItem, addToast } = useItems();
  const [message, setMessage] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('Library 1st Floor Helpdesk');
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !contactModalItem) return;

    setIsSent(true);
    setTimeout(() => {
      addToast({
        type: 'success',
        message: 'Message Sent to Poster',
        description: `Notification dispatched to ${contactModalItem.reportedBy.name}. Check your student email for replies.`,
      });
      setIsSent(false);
      setContactModalItem(null);
    }, 700);
  };

  const quickTemplates = contactModalItem
    ? [
        `Hi ${contactModalItem.reportedBy.name.split(' ')[0]}, I think this is my item!`,
        `I can meet at the Library 1st Floor to verify.`,
        `I have additional identifying marks to confirm ownership.`,
      ]
    : [];

  return (
    <AnimatePresence>
      {contactModalItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs"
            onClick={() => setContactModalItem(null)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-[#141414] border border-[#EAEAEA] dark:border-[#262626] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden p-6 sm:p-7"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] dark:border-[#222222]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C1122F] dark:text-[#FF4A6B]">
                  Direct Contact
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F7]">
                  Contact {contactModalItem.reportedBy.name}
                </h3>
              </div>
              <button
                onClick={() => setContactModalItem(null)}
                className="p-1.5 rounded-full text-[#8E8E93] dark:text-[#7A7A7E] hover:text-[#111111] dark:hover:text-[#F5F5F7] hover:bg-[#F7F7F7] dark:hover:bg-[#202020] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item snippet */}
            <div className="my-4 p-3 bg-[#F7F7F7] dark:bg-[#1A1A1A] rounded-xl border border-[#EAEAEA] dark:border-[#262626] flex items-center gap-3">
              <img
                src={contactModalItem.image}
                alt={contactModalItem.title}
                className="w-12 h-12 rounded-lg object-cover bg-white dark:bg-[#222222]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-[#111111] dark:text-[#F5F5F7] truncate">
                  {contactModalItem.title}
                </h4>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#A1A1A6] truncate">
                  {contactModalItem.location}
                </p>
              </div>
            </div>

            {/* Poster's Listed Contact info */}
            <div className="mb-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#444444] dark:text-[#CCCCCC]">
                <Mail className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E]" />
                <span>{contactModalItem.reportedBy.email}</span>
              </div>
              {contactModalItem.reportedBy.phone && (
                <div className="flex items-center gap-2 text-[#444444] dark:text-[#CCCCCC]">
                  <Phone className="w-3.5 h-3.5 text-[#8E8E93] dark:text-[#7A7A7E]" />
                  <span>{contactModalItem.reportedBy.phone}</span>
                </div>
              )}
              {contactModalItem.contactValue &&
                contactModalItem.contactPreference === 'desk' && (
                  <div className="flex items-center gap-2 text-[#C1122F] dark:text-[#FF4A6B] font-medium">
                    <Building className="w-3.5 h-3.5" />
                    <span>{contactModalItem.contactValue}</span>
                  </div>
                )}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your item, unique markings, or when you can meet..."
                  className="w-full p-3 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F7] placeholder-[#8E8E93] dark:placeholder-[#666666] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444] transition-all resize-none"
                />
              </div>

              {/* Quick reply templates */}
              <div className="flex flex-wrap gap-1.5">
                {quickTemplates.map((template, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setMessage(template)}
                    className="text-[11px] bg-[#F7F7F7] dark:bg-[#1A1A1A] hover:bg-[#EFEFEF] dark:hover:bg-[#242424] text-[#444444] dark:text-[#CCCCCC] px-2.5 py-1 rounded-md border border-[#EAEAEA] dark:border-[#262626] transition-colors cursor-pointer"
                  >
                    + {template.slice(0, 32)}...
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                    Your Contact (Email / Phone)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@campus.edu"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111111] dark:text-[#F5F5F7] mb-1">
                    Suggested Meetup Point
                  </label>
                  <select
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#282828] rounded-xl text-xs text-[#111111] dark:text-[#F5F5F7] focus:bg-white dark:focus:bg-[#1E1E1E] focus:outline-hidden focus:border-[#111111] dark:focus:border-[#444444]"
                  >
                    <option value="Library 1st Floor Helpdesk">Library 1st Floor Helpdesk</option>
                    <option value="Student Union Information Desk">Student Union Information Desk</option>
                    <option value="Campus Dining Hall Main Foyer">Campus Dining Hall Main Foyer</option>
                    <option value="North Quad Security Post">North Quad Security Post</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#8E8E93] dark:text-[#7A7A7E] bg-[#FBFBFB] dark:bg-[#181818] p-2.5 rounded-lg border border-[#F0F0F0] dark:border-[#242424]">
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Always verify serial numbers or specific details before handing over items.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setContactModalItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#6B6B6B] dark:text-[#A1A1A6] hover:text-[#111111] dark:hover:text-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSent || !message.trim()}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#C1122F] hover:bg-[#A30D26] disabled:opacity-50 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {isSent ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

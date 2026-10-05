import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item, ViewMode, FilterState, Toast, ItemCategory, ItemStatus } from '../types';
import { INITIAL_ITEMS } from '../data/initialItems';

interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  major: string;
}

interface ItemsContextType {
  items: Item[];
  view: ViewMode;
  setView: (view: ViewMode) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  isQuickSearchOpen: boolean;
  setIsQuickSearchOpen: (open: boolean) => void;
  contactModalItem: Item | null;
  setContactModalItem: (item: Item | null) => void;
  reportModalItem: Item | null;
  setReportModalItem: (item: Item | null) => void;
  editModalItem: Item | null;
  setEditModalItem: (item: Item | null) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  userProfile: UserProfile;
  addItem: (itemData: {
    title: string;
    status: ItemStatus;
    category: ItemCategory;
    location: string;
    date: string;
    description: string;
    image: string;
    identifyingDetails?: string;
    contactPreference: 'email' | 'phone' | 'desk' | 'any';
    contactValue?: string;
  }) => Item;
  updateItem: (id: string, updates: Partial<Item>) => void;
  markAsReunited: (
    id: string,
    collectionData?: {
      collectedByName?: string;
      collectedByContact?: string;
      handedToLocation?: string;
      notes?: string;
    }
  ) => void;
  deleteItem: (id: string) => void;
  reportListing: (id: string, reason: string) => void;
  resetDemoData: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
  canEditItem: (item?: Item | null) => boolean;
  stats: {
    totalReported: number;
    totalReunited: number;
    activeListings: number;
    userReportsCount: number;
  };
}

const STORAGE_KEY = 'campus_lost_and_found_items_v3';

const defaultFilters: FilterState = {
  searchQuery: '',
  status: 'ALL',
  category: 'ALL',
  sortBy: 'newest',
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_ITEMS;
  });

  const [view, setView] = useState<ViewMode>('home');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [contactModalItem, setContactModalItem] = useState<Item | null>(null);
  const [reportModalItem, setReportModalItem] = useState<Item | null>(null);
  const [editModalItem, setEditModalItem] = useState<Item | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('campus_theme_v1');
      if (stored) {
        return stored === 'dark';
      }
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('campus_theme_v1', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('campus_theme_v1', 'light');
      }
    } catch (e) {
      console.warn('Could not store theme preference', e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const userProfile: UserProfile = {
    name: 'Adit Sahni',
    email: 'sahniadit@gmail.com',
    studentId: '2026-CS-419',
    major: 'Computer Science & Engineering',
  };

  const isAdmin = userProfile.email.trim().toLowerCase() === 'sahniadit@gmail.com';

  const canEditItem = (item?: Item | null): boolean => {
    if (!item) return false;
    if (isAdmin) return true;
    const itemEmail = item.reportedBy?.email?.trim().toLowerCase();
    const myEmail = userProfile.email.trim().toLowerCase();
    return Boolean(item.isUserReport || (itemEmail && itemEmail === myEmail));
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save items to localStorage', e);
    }
  }, [items]);

  // Keep selectedItem in sync if item was updated
  useEffect(() => {
    if (selectedItem) {
      const updated = items.find((i) => i.id === selectedItem.id);
      if (updated) {
        setSelectedItem(updated);
      }
    }
  }, [items]);

  // Global keyboard shortcut: Cmd+K or '/' to open Quick Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsQuickSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsQuickSearchOpen(false);
        setSelectedItem(null);
        setContactModalItem(null);
        setReportModalItem(null);
        setEditModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = ({ type, message, description }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addItem: ItemsContextType['addItem'] = (itemData) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const newItem: Item = {
      id: 'item-' + Date.now(),
      title: itemData.title,
      status: itemData.status,
      category: itemData.category,
      location: itemData.location,
      date: itemData.date || now.toISOString().split('T')[0],
      dateDisplay: formattedDate,
      description: itemData.description,
      image: itemData.image,
      reportedBy: {
        name: userProfile.name,
        email: userProfile.email,
        studentId: userProfile.studentId,
      },
      contactPreference: itemData.contactPreference,
      contactValue: itemData.contactValue || userProfile.email,
      identifyingDetails: itemData.identifyingDetails,
      isReunited: false,
      isUserReport: true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);
    addToast({
      type: 'success',
      message: 'Item Reported Successfully',
      description: 'Your listing is now live across campus.',
    });
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
    addToast({
      type: 'info',
      message: 'Listing Updated',
      description: 'Your item changes have been saved.',
    });
  };

  const markAsReunited = (
    id: string,
    collectionData?: {
      collectedByName?: string;
      collectedByContact?: string;
      handedToLocation?: string;
      notes?: string;
    }
  ) => {
    const now = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isReunited: true,
              reunitedDate: now,
              collectedDate: item.collectedDate || now,
              collectedByName:
                collectionData?.collectedByName ||
                item.collectedByName ||
                'Verified Student / Owner',
              collectedByContact:
                collectionData?.collectedByContact || item.collectedByContact,
              handedToLocation:
                collectionData?.handedToLocation || item.handedToLocation,
              collectionNotes:
                collectionData?.notes || item.collectionNotes,
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
    addToast({
      type: 'success',
      message: 'Item Reunited',
      description: 'Back where it belongs. Thanks for helping keep our campus connected.',
    });
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
    addToast({
      type: 'info',
      message: 'Listing Removed',
      description: 'The report has been permanently deleted.',
    });
  };

  const reportListing = (_id: string, reason: string) => {
    addToast({
      type: 'info',
      message: 'Report Received',
      description: `Campus safety moderators have been notified: "${reason.slice(0, 30)}..."`,
    });
  };

  const resetDemoData = () => {
    setItems(INITIAL_ITEMS);
    localStorage.removeItem(STORAGE_KEY);
    addToast({
      type: 'info',
      message: 'Demo Data Restored',
      description: 'Reset all items to default campus sample records.',
    });
  };

  const stats = {
    totalReported: items.length,
    totalReunited: items.filter((i) => i.isReunited).length,
    activeListings: items.filter((i) => !i.isReunited).length,
    userReportsCount: items.filter((i) => i.isUserReport).length,
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        view,
        setView,
        selectedItem,
        setSelectedItem,
        filters,
        setFilters,
        resetFilters,
        isQuickSearchOpen,
        setIsQuickSearchOpen,
        contactModalItem,
        setContactModalItem,
        reportModalItem,
        setReportModalItem,
        editModalItem,
        setEditModalItem,
        toasts,
        addToast,
        removeToast,
        userProfile,
        addItem,
        updateItem,
        markAsReunited,
        deleteItem,
        reportListing,
        resetDemoData,
        isDarkMode,
        toggleDarkMode,
        isAdmin,
        canEditItem,
        stats,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};

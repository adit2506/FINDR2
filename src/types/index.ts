export type ItemStatus = 'LOST' | 'FOUND';

export type ItemCategory =
  | 'Electronics'
  | 'ID / Cards'
  | 'Bags'
  | 'Books'
  | 'Clothing'
  | 'Accessories'
  | 'Keys'
  | 'Other';

export interface Item {
  id: string;
  title: string;
  status: ItemStatus;
  category: ItemCategory;
  location: string;
  date: string; // ISO date string or human readable
  dateDisplay: string;
  description: string;
  image: string;
  reportedBy: {
    name: string;
    email: string;
    phone?: string;
    studentId?: string;
  };
  contactPreference: 'email' | 'phone' | 'desk' | 'any';
  contactValue?: string;
  identifyingDetails?: string;
  isReunited: boolean;
  reunitedDate?: string;
  handedToLocation?: string;
  collectedByName?: string;
  collectedByContact?: string;
  collectedDate?: string;
  collectionNotes?: string;
  isUserReport?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'home' | 'browse' | 'report' | 'dashboard' | 'about';

export interface FilterState {
  searchQuery: string;
  status: 'ALL' | 'LOST' | 'FOUND';
  category: 'ALL' | ItemCategory;
  location?: string;
  sortBy: 'newest' | 'oldest' | 'recently-updated';
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
  description?: string;
}

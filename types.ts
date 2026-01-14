
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  price: number;
  image: string;
  organizer: string;
  attendees: number;
  maxCapacity: number;
}

export type EventCategory = 'Music' | 'Tech' | 'Arts' | 'Sports' | 'Food' | 'Business' | 'Networking';

export interface User {
  name: string;
  email: string;
  role: 'User' | 'Organizer';
  avatar: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AnalyticsData {
  month: string;
  revenue: number;
  attendees: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'booking' | 'reminder' | 'system';
}

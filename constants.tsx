
import React from 'react';
import { Event, EventCategory, AnalyticsData } from './types';

export const CATEGORIES: EventCategory[] = [
  'Music', 'Tech', 'Arts', 'Sports', 'Food', 'Business', 'Networking'
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Sunburn Festival Goa 2026',
    description: "Asia's biggest electronic dance music festival returns to the shores of Vagator. Experience high-octane performances by global DJs, immersive stage designs, and the vibrant Goa spirit.",
    date: '2026-12-27',
    time: '14:00',
    location: 'Vagator Beach, Goa',
    category: 'Music',
    price: 8499,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
    organizer: 'Percept Live',
    attendees: 18000,
    maxCapacity: 25000
  },
  {
    id: '2',
    title: 'India AI & SaaS Summit 2026',
    description: "Join 5000+ founders, developers, and investors in Bengaluru for India's most influential tech gathering. Deep dive into LLMs, GenAI, and scaling SaaS for the global market.",
    date: '2026-10-14',
    time: '09:00',
    location: 'KTPO Convention Centre, Bengaluru',
    category: 'Tech',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    organizer: 'TechIndia Hub',
    attendees: 3200,
    maxCapacity: 5000
  },
  {
    id: '3',
    title: 'Jaipur Literature Festival 2026',
    description: "The 'Greatest Literary Show on Earth' returns to the Pink City. A kaleidoscope of literature, philosophy, and heritage featuring Nobel laureates and literary giants.",
    date: '2026-01-22',
    time: '10:00',
    location: 'Hotel Clarks Amer, Jaipur',
    category: 'Arts',
    price: 599,
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&q=80&w=1200',
    organizer: 'Teamwork Arts',
    attendees: 4500,
    maxCapacity: 10000
  },
  {
    id: '4',
    title: 'Old Delhi Midnight Kebab Trail',
    description: "A specialized culinary journey through the historic lanes of Jama Masjid. Taste authentic Nihari, Seekh Kebabs, and Shahi Tukda from century-old establishments.",
    date: '2026-09-12',
    time: '21:00',
    location: 'Matia Mahal, Chandni Chowk, Delhi',
    category: 'Food',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1585932231552-2987715d54f7?auto=format&fit=crop&q=80&w=1200',
    organizer: 'Culinary Heritage Walks',
    attendees: 12,
    maxCapacity: 15
  },
  {
    id: '5',
    title: 'Mumbai Unicorn Mixer 2026',
    description: "An exclusive networking evening for Series A+ founders and growth-stage investors on a South Mumbai rooftop. High-level networking with the creme de la creme of India's startup ecosystem.",
    date: '2026-08-20',
    time: '19:30',
    location: 'The Dome, Marine Drive, Mumbai',
    category: 'Business',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    organizer: 'Mumbai VC Council',
    attendees: 85,
    maxCapacity: 100
  }
];

export const ANALYTICS_DATA: AnalyticsData[] = [
  { month: 'Jan', revenue: 450000, attendees: 1200 },
  { month: 'Feb', revenue: 520000, attendees: 1500 },
  { month: 'Mar', revenue: 480000, attendees: 1400 },
  { month: 'Apr', revenue: 610000, attendees: 1900 },
  { month: 'May', revenue: 750000, attendees: 2500 },
  { month: 'Jun', revenue: 890000, attendees: 3200 },
];

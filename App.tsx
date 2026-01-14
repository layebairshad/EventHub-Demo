
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import AIAssistant from './components/AIAssistant';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import BookingSuccessModal from './components/BookingSuccessModal';
import MyTickets from './components/MyTickets';
import Settings from './components/Settings';
import { MOCK_EVENTS, CATEGORIES } from './constants';
import { Event, EventCategory, User, Notification } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [bookedEventIds, setBookedEventIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulation: Add random notification occasionally
  useEffect(() => {
    if (user && notifications.length === 0) {
      setNotifications([{
        id: '1',
        title: 'Welcome to EventHub!',
        message: 'Discover the best upcoming experiences tailored for you.',
        time: 'Just now',
        isRead: false,
        type: 'system'
      }]);
    }
  }, [user]);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (newUser: User) => {
    // If name contains 'Organizer', give them the role
    if (newUser.name.toLowerCase().includes('organizer') || newUser.email.includes('organizer')) {
      newUser.role = 'Organizer';
    }
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setBookedEventIds([]);
    setNotifications([]);
    setCurrentView('home');
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNote: Notification = {
      id: Date.now().toString(),
      title,
      message,
      time: 'Just now',
      isRead: false,
      type
    };
    setNotifications(prev => [newNote, ...prev]);
  };

  const handleBookTickets = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!selectedEvent) return;

    setIsBookingLoading(true);

    // Simulate payment and booking processing (Availability Check)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Update local state
    setEvents(prev => prev.map(e => 
      e.id === selectedEvent.id 
        ? { ...e, attendees: e.attendees + 1 } 
        : e
    ));

    setBookedEventIds(prev => [...new Set([...prev, selectedEvent.id])]);
    
    addNotification(
      'Booking Confirmed!', 
      `Your ticket for ${selectedEvent.title} is ready.`, 
      'booking'
    );

    setIsBookingLoading(false);
    setIsBookingSuccessOpen(true);
  };

  const handleAddEvent = (newEventData: Omit<Event, 'id' | 'attendees'>) => {
    const newEvent: Event = {
      ...newEventData,
      id: Date.now().toString(),
      attendees: 0,
      organizer: user?.name || 'Local Organizer'
    };
    setEvents(prev => [newEvent, ...prev]);
    addNotification('Event Published', `Your event "${newEvent.title}" is now live!`, 'system');
  };

  const handleUpdateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           e.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, events]);

  const bookedEvents = useMemo(() => {
    return events.filter(e => bookedEventIds.includes(e.id));
  }, [bookedEventIds, events]);

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-[40px] overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
          alt="Hero" 
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 max-w-4xl">
          <span className="px-4 py-1.5 bg-indigo-600/20 backdrop-blur-md border border-indigo-400/30 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-in slide-in-from-left duration-700">
            India's Premier Event Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight animate-in slide-in-from-left duration-700 delay-100">
            Unforgettable <span className="text-indigo-500">Experiences</span>,<br />Across India.
          </h1>
          <p className="text-gray-300 mt-6 text-lg max-w-xl leading-relaxed animate-in slide-in-from-left duration-700 delay-200">
            From the beaches of Goa to the tech hubs of Bengaluru, find festivals, workshops, and mixers that move you.
          </p>
          <div className="flex gap-4 mt-10 animate-in slide-in-from-left duration-700 delay-300">
            <button 
              onClick={() => setCurrentView('browse')}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-500/30"
            >
              Explore Events
            </button>
            <button 
              onClick={() => setCurrentView('how-it-works')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all cursor-pointer"
            >
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <p className="text-gray-500 mt-1">Hand-picked by our editors just for you.</p>
          </div>
          <button 
            onClick={() => setCurrentView('browse')}
            className="text-indigo-600 font-bold hover:underline"
          >
            View All Events →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 3).map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={(e) => { setSelectedEvent(e); setCurrentView('details'); }} 
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative overflow-hidden rounded-[60px] bg-gradient-to-b from-white to-indigo-50/50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse by Category</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto font-medium">Find exactly what you're looking for by exploring our curated categories.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentView('browse'); }}
                className="group relative p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-2xl hover:shadow-indigo-200/40 hover:border-indigo-200 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center gap-4"
              >
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl transition-all duration-300 ${
                  cat === 'Music' ? 'bg-pink-50 text-pink-500' :
                  cat === 'Tech' ? 'bg-blue-50 text-blue-500' :
                  cat === 'Arts' ? 'bg-purple-50 text-purple-500' :
                  cat === 'Sports' ? 'bg-orange-50 text-orange-500' :
                  cat === 'Food' ? 'bg-yellow-50 text-yellow-500' :
                  cat === 'Business' ? 'bg-green-50 text-green-500' : 'bg-indigo-50 text-indigo-500'
                } group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  {cat === 'Music' ? '🎵' : cat === 'Tech' ? '💻' : cat === 'Arts' ? '🎨' : cat === 'Sports' ? '🏆' : cat === 'Food' ? '🍔' : cat === 'Business' ? '📈' : '🤝'}
                </div>
                <span className="text-gray-900 font-bold text-sm tracking-wide group-hover:text-indigo-600 transition-colors">{cat}</span>
                <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                   <span className="text-indigo-400 text-lg">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="max-w-5xl mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Experience More with EventHub</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">India's smart event companion. Find, book, and join the pulse of the nation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Discover",
            desc: "Browse our curated collection of festivals, summits, and trails. Filter by city or let our AI scout find your vibe.",
            icon: "🔎",
            color: "bg-blue-50 text-blue-600"
          },
          {
            title: "Secure Booking",
            desc: "One-tap payment simulation using UPI or Card. Instant digital tickets generated for your secure dashboard.",
            icon: "🎟️",
            color: "bg-indigo-50 text-indigo-600"
          },
          {
            title: "Live Attendance",
            desc: "Arrive at the venue, scan your unique QR code from 'My Tickets', and dive straight into the experience.",
            icon: "✨",
            color: "bg-purple-50 text-purple-600"
          }
        ].map((step, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2">
            <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-[56px] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20">
            Powered by Gemini AI
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Meet your personal Event Scout.</h2>
          <p className="text-indigo-100 text-lg leading-relaxed font-medium">
            Tired of endless scrolling? Chat with our AI to get personalized recommendations based on your preferences, budget, and location. It's like having an insider in every city.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentView('browse')}
              className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-lg shadow-black/20 hover:-translate-y-1"
            >
              Try AI Scout
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 animate-in slide-in-from-right duration-1000">
           <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover shadow-2xl" />
           <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover mt-12 shadow-2xl" />
           <img src="https://images.unsplash.com/photo-1514525253361-bee43883b1d2?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover -mt-12 shadow-2xl" />
           <img src="https://images.unsplash.com/photo-1590050752117-23a9d7f28243?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover shadow-2xl" />
        </div>
      </div>
    </div>
  );

  const renderDetails = () => selectedEvent && (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-8">
          <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl">
            <img src={selectedEvent.image} className="w-full h-full object-cover" alt="" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">{selectedEvent.category}</span>
              <span className="text-sm font-medium text-gray-400">• Organized by {selectedEvent.organizer}</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900">{selectedEvent.title}</h1>
            <div className="flex flex-wrap gap-6 py-6 border-y border-gray-100 text-sm">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-gray-50 rounded-xl">📅</span>
                <div>
                  <p className="font-bold text-gray-900">{new Date(selectedEvent.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-gray-400">Date & Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-gray-50 rounded-xl">📍</span>
                <div>
                  <p className="font-bold text-gray-900">{selectedEvent.location}</p>
                  <p className="text-gray-400">Venue</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-gray-50 rounded-xl">🎟️</span>
                <div>
                  <p className="font-bold text-gray-900">₹{selectedEvent.price.toLocaleString('en-IN')}</p>
                  <p className="text-gray-400">Admission Fee</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-gray-900">About this Event</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{selectedEvent.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-28 bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-gray-900">₹{selectedEvent.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-gray-400">Per Person</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tickets Left</span>
                <span className={`font-bold ${selectedEvent.maxCapacity - selectedEvent.attendees < 10 ? 'text-red-500' : 'text-indigo-600'}`}>
                  {selectedEvent.maxCapacity - selectedEvent.attendees} left
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-1000" 
                  style={{ width: `${(selectedEvent.attendees / selectedEvent.maxCapacity) * 100}%` }}
                ></div>
              </div>
              {selectedEvent.maxCapacity - selectedEvent.attendees < 10 && (
                <p className="text-[10px] text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-center">🔥 High demand! Selling fast.</p>
              )}
            </div>

            <button 
              disabled={isBookingLoading || selectedEvent.attendees >= selectedEvent.maxCapacity}
              onClick={handleBookTickets}
              className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isBookingLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                selectedEvent.attendees >= selectedEvent.maxCapacity ? 'Sold Out' : (user ? 'Secure Checkout' : 'Sign In to Book')
              )}
            </button>
            
            <p className="text-[10px] text-center text-gray-400 px-4">
              Secure payments simulation. Supporting UPI, Cards, and Net Banking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={user} 
        notifications={notifications}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onReadNotifications={markNotificationsAsRead}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {currentView === 'home' && renderHome()}
        {currentView === 'how-it-works' && renderHowItWorks()}
        {currentView === 'browse' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore Events</h1>
                <p className="text-gray-500 mt-1">Discover what's happening around India.</p>
              </div>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={(e) => { setSelectedEvent(e); setCurrentView('details'); }} 
                />
              ))}
            </div>
          </div>
        )}
        {currentView === 'details' && renderDetails()}
        {currentView === 'dashboard' && <Dashboard events={events} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} />}
        {currentView === 'my-tickets' && <MyTickets bookedEvents={bookedEvents} onExplore={() => setCurrentView('browse')} />}
        {currentView === 'settings' && user && <Settings user={user} onUpdateUser={setUser} />}
      </main>

      <AIAssistant events={events} />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {selectedEvent && (
        <BookingSuccessModal 
          isOpen={isBookingSuccessOpen}
          onClose={() => { setIsBookingSuccessOpen(false); setCurrentView('my-tickets'); }}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default App;

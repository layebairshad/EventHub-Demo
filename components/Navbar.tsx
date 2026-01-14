
import React, { useState } from 'react';
import { User, Notification } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: User | null;
  notifications: Notification[];
  onLoginClick: () => void;
  onLogout: () => void;
  onReadNotifications: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  user, 
  notifications, 
  onLoginClick, 
  onLogout,
  onReadNotifications 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNav = (view: string) => {
    onNavigate(view);
    setShowDropdown(false);
    setShowNotifications(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => handleNav('home')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            E
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 hidden sm:block">Event<span className="text-indigo-600">Hub</span></span>
        </div>

        <div className="flex items-center gap-1 md:gap-4 text-sm font-medium">
          <div className="hidden md:flex gap-4 mr-4">
            <button 
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Explore
            </button>
            <button 
              onClick={() => handleNav('browse')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'browse' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Events
            </button>
          </div>
          
          {user && (
            <div className="relative mr-2">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); onReadNotifications(); }}
                className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative"
              >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-6 mb-4 flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">Notifications</h4>
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">Latest</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto px-2">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer mb-1">
                          <p className="text-xs font-bold text-gray-900 mb-1">{n.title}</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{n.message}</p>
                          <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-wider">{n.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-sm text-gray-400 font-medium">No new alerts</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm group"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-xl bg-indigo-50" alt="" />
                <span className="font-bold text-gray-700 hidden sm:block truncate max-w-[80px]">{user.name}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-600">▼</span>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                   <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.role}</p>
                   </div>
                   {user.role === 'Organizer' && (
                     <button onClick={() => handleNav('dashboard')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">Organizer Dashboard</button>
                   )}
                   <button onClick={() => handleNav('my-tickets')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">My Tickets</button>
                   <button onClick={() => handleNav('settings')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium text-gray-700">Account Settings</button>
                   <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm font-bold text-red-600 border-t border-gray-50 mt-1"
                   >
                     Log Out
                   </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 text-xs md:text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

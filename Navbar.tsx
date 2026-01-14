
import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, user, onLoginClick, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setShowDropdown(false);
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

        <div className="flex items-center gap-1 md:gap-6 text-sm font-medium">
          <button 
            onClick={() => handleNav('home')}
            className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}`}
          >
            Explore
          </button>
          <button 
            onClick={() => handleNav('browse')}
            className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'browse' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}`}
          >
            Events
          </button>
          
          {(user?.role === 'Organizer' || user === null) && (
            <button 
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}`}
            >
              Dashboard
            </button>
          )}

          <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm group"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-xl bg-indigo-50" alt="" />
                <span className="font-bold text-gray-700 hidden sm:block">{user.name}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">▼</span>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                   <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                   </div>
                   <button 
                    onClick={() => handleNav('my-tickets')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium ${currentView === 'my-tickets' ? 'text-indigo-600' : 'text-gray-700'}`}
                   >
                     My Tickets
                   </button>
                   <button 
                    onClick={() => handleNav('settings')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm font-medium ${currentView === 'settings' ? 'text-indigo-600' : 'text-gray-700'}`}
                   >
                     Settings
                   </button>
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
              Sign Up / Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

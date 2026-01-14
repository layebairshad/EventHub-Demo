
import React from 'react';
import { Event } from '../types';

interface MyTicketsProps {
  bookedEvents: Event[];
  onExplore: () => void;
}

const MyTickets: React.FC<MyTicketsProps> = ({ bookedEvents, onExplore }) => {
  if (bookedEvents.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100 animate-in fade-in duration-500">
        <span className="text-6xl mb-6 block">🎟️</span>
        <h3 className="text-2xl font-bold text-gray-900">No tickets yet</h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">You haven't booked any events yet. Start exploring to find your next great experience!</p>
        <button 
          onClick={onExplore}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Tickets</h1>
        <p className="text-gray-500 mt-1">Manage your upcoming event passes and check-ins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookedEvents.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
            {/* Ticket Left Side: Visual */}
            <div className="md:w-1/3 relative h-48 md:h-auto">
              <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
              <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-indigo-900/10 transition-colors"></div>
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-bold rounded-full uppercase">Confirmed</span>
              </div>
            </div>

            {/* Ticket Middle: Info */}
            <div className="flex-grow p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <span className="text-indigo-600">📍</span> {event.location}
                </p>
                <div className="mt-4 flex gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-gray-800">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-bold text-gray-800">{event.time}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                 <button className="text-xs font-bold text-indigo-600 hover:underline">View Details</button>
                 <button className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors">Download PDF</button>
              </div>
            </div>

            {/* Ticket Right: QR Part (Dashed Divider) */}
            <div className="hidden md:flex w-32 border-l-2 border-dashed border-gray-100 bg-gray-50/50 p-6 flex-col items-center justify-center gap-2">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Ticket-${event.id}`} className="w-full aspect-square opacity-80" alt="QR" />
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Scan for entry</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

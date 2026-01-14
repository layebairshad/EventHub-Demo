
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const isSoldOut = event.attendees >= event.maxCapacity;

  return (
    <div 
      onClick={() => onClick(event)}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full shadow-sm">
            {event.category}
          </span>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg rotate-12 border-2 border-white px-4 py-1 uppercase">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-widest">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-sm font-bold text-gray-900">₹{event.price.toLocaleString('en-IN')}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-grow">{event.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/person${i+event.id}/20/20`} className="w-5 h-5 rounded-full border border-white" />
                ))}
             </div>
             <span className="text-[10px] text-gray-400 font-medium">+{event.attendees.toLocaleString('en-IN')} attending</span>
          </div>
          <button className="text-xs font-bold text-indigo-600 group-hover:underline">View Details →</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

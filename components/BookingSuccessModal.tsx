
import React from 'react';
import { Event } from '../types';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-indigo-950/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
        {/* Celebration Header */}
        <div className="h-40 bg-indigo-600 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
          <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-2xl animate-bounce">
            🎉
          </div>
        </div>

        <div className="p-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">You're going!</h2>
          <p className="text-gray-500 font-medium mb-8">Your booking for <span className="text-indigo-600 font-bold">{event.title}</span> is confirmed.</p>
          
          <div className="bg-gray-50 rounded-3xl p-6 text-left border border-gray-100 mb-8 space-y-4">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Number</p>
                  <p className="font-mono text-sm text-gray-700">#EH-{Math.floor(Math.random() * 900000) + 100000}</p>
               </div>
               <div className="w-12 h-12 bg-white p-1 rounded-lg border border-gray-100">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EventHub-${event.id}`} alt="QR Code" />
               </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                  <p className="text-sm font-bold text-gray-900">{event.time}</p>
               </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Back to Exploration
            </button>
            <button 
              className="w-full py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Download PDF Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;

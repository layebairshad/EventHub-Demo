
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_DATA } from '../constants';
import { Event, EventCategory } from '../types';

interface DashboardProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id' | 'attendees'>) => void;
  onUpdateEvent: (id: string, updates: Partial<Event>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, onAddEvent, onUpdateEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Networking' as EventCategory,
    price: 0,
    maxCapacity: 100,
    date: '2026-10-10',
    location: 'Mumbai, India',
    organizer: 'My Organization',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1600',
    time: '10:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Organizer Hub</h1>
          <p className="text-gray-500">Manage your events, pricing, and analytics.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Revenue</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">₹12,45,000</h3>
          <p className="text-xs text-green-500 font-semibold mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Bookings</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{events.reduce((acc, e) => acc + e.attendees, 0).toLocaleString()}</h3>
          <p className="text-xs text-green-500 font-semibold mt-2">↑ 8% overall conversion</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Avg. Fill Rate</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">
            {Math.round((events.reduce((acc, e) => acc + (e.attendees/e.maxCapacity), 0) / events.length) * 100)}%
          </h3>
          <p className="text-xs text-indigo-500 font-semibold mt-2">Target: 85%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-6 px-2">Revenue Growth (INR)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ANALYTICS_DATA}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-900">Live Availability Management</h3>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Manual Overrides</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Event Detail</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Current Pricing</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Availability</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={e.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{e.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{e.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-gray-700">₹{e.price}</span>
                       <button 
                        onClick={() => onUpdateEvent(e.id, { price: e.price + 500 })}
                        className="text-[10px] text-indigo-600 font-bold hover:underline"
                       >
                         Change
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                       <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                         <span>{e.attendees} sold</span>
                         <span>{e.maxCapacity} cap</span>
                       </div>
                       <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-500" 
                            style={{ width: `${(e.attendees/e.maxCapacity)*100}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex gap-2">
                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">Edit</button>
                       <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400">Archive</button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
             <form onSubmit={handleSubmit} className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Event Title</label>
                      <input required type="text" className="w-full px-5 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500" 
                        value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (INR)</label>
                      <input required type="number" className="w-full px-5 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Max Capacity</label>
                      <input required type="number" className="w-full px-5 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: Number(e.target.value)})} />
                   </div>
                </div>
                <div className="flex gap-4">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">Discard</button>
                   <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Publish Event</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

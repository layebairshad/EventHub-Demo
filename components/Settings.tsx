
import React from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and personal preferences.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img src={user.avatar} className="w-24 h-24 rounded-[32px] bg-indigo-50 border-4 border-white shadow-xl" alt="" />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              ✎
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Display Name</label>
              <input 
                type="text" 
                defaultValue={user.name}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={user.email}
                disabled
                className="w-full px-5 py-3.5 bg-gray-200 border border-gray-100 rounded-2xl cursor-not-allowed opacity-60"
              />
            </div>
          </div>

          <div className="space-y-4">
             <h4 className="font-bold text-gray-900">Notifications</h4>
             <div className="space-y-3">
                {[
                  { label: "Email for event reminders", default: true },
                  { label: "New event alerts based on my interests", default: false },
                  { label: "Security & account activity", default: true }
                ].map((pref, i) => (
                  <label key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">{pref.label}</span>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${pref.default ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pref.default ? 'left-6' : 'left-1'}`}></div>
                    </div>
                  </label>
                ))}
             </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row gap-4 justify-end">
            <button className="px-8 py-3 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors">Cancel</button>
            <button 
              onClick={() => alert("Settings saved successfully!")}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-red-900">Danger Zone</h4>
          <p className="text-sm text-red-600 opacity-80">Permanently delete your account and all ticket history.</p>
        </div>
        <button className="px-6 py-3 bg-white text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;

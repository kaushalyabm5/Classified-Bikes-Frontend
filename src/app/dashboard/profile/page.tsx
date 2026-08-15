'use client';

import { useState } from 'react';
import { Mail, Shield, Bike, DollarSign, Award, Lock, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  // Demo Sold Bikes Data (Used to calculate total revenue)
  const soldBikes = [
    { id: '101', price: 24000 },
    { id: '102', price: 28500 },
    { id: '103', price: 32000 },
  ];

  // Auto-calculate total revenue from sold bikes
  const totalRevenue = soldBikes.reduce((sum, bike) => sum + bike.price, 0);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Error: New passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Error: Password must be at least 6 characters!');
      return;
    }

    // Success
    setMessage('Success: Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 text-3xl font-extrabold shadow-lg shadow-purple-950/50">
          K
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl font-bold text-white">Kaushalya</h1>
            <span className="text-xs bg-purple-950 border border-purple-800 text-purple-400 px-3 py-0.5 rounded-full font-semibold">
              Owner / Admin
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">Superbike Showroom & Dealership Manager</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-400" /> kaushalya@superbikes.com
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Full Access Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Banner (Calculated Real Revenue) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-neutral-800 rounded-xl text-purple-400">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">12</div>
            <div className="text-xs text-gray-400">Available Bikes</div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-neutral-800 rounded-xl text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{soldBikes.length}</div>
            <div className="text-xs text-gray-400">Total Bikes Sold</div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-neutral-800 rounded-xl text-purple-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">${totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Revenue (Calculated)</div>
          </div>
        </div>
      </div>

      {/* Password Change Form Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
          <Lock className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Change Security Password</h2>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold ${
              message.startsWith('Success')
                ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-400'
                : 'bg-red-950/60 border border-red-800 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md shadow-purple-600/30 text-sm"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
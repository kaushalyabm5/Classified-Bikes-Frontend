'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { changePassword } from '@/lib/api';
import { User, LogOut, ShieldCheck, KeyRound, Lock, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);

  // Change Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Password Change Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match!' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const res = await changePassword({
        username: adminUser?.username || 'admin',
        currentPassword,
        newPassword,
      });

      if (res.message === 'Password updated successfully') {
        setMessage({ type: 'success', text: 'Password updated successfully! Please login again with your new password.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Auto logout after 2 seconds to force relogin with new credentials
        setTimeout(() => {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to update password' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server connection failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/login');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Admin Account & Security</h1>

      {/* ADMIN INFO CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-neutral-800 pb-6">
          <div className="w-16 h-16 bg-purple-600/20 border border-purple-500/40 rounded-2xl flex items-center justify-center text-purple-400">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white capitalize">{adminUser?.username || 'System Admin'}</h2>
            <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-1 rounded-md inline-flex items-center gap-1 mt-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Role
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex justify-between">
            <span className="text-gray-400">Username:</span>
            <span className="font-bold text-white">{adminUser?.username || 'admin'}</span>
          </div>
          <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex justify-between">
            <span className="text-gray-400">Database Status:</span>
            <span className="font-bold text-emerald-400">Connected to MongoDB</span>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-5">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <KeyRound className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Change Admin Password</h2>
        </div>

        {message.text && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
              message.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400'
                : 'bg-red-950/60 border-red-800/40 text-red-400'
            }`}
          >
            {message.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
          <div>
            <label className="text-gray-400 block mb-1">Current Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password"
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500 pr-10"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3 top-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 text-xs mt-2"
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold rounded-xl border border-red-800/40 transition-all flex items-center justify-center gap-2 text-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out of Admin Portal</span>
      </button>
    </div>
  );
}
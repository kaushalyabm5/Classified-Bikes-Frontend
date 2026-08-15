'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Bike } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Backend connect කළ පසු token එක clear කරමු
    router.push('/login');
  };

  return (
    <header className="h-16 bg-neutral-900 border-b border-neutral-800 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Bike className="w-8 h-8 text-purple-600" />
        <span className="text-xl font-extrabold tracking-wider text-purple-600 uppercase">
          Classified Bikes
        </span>
      </div>

      {/* Right: Profile & Logout */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700"
        >
          <User className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium">Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-red-400 transition-all bg-neutral-800 hover:bg-red-950/40 px-3 py-1.5 rounded-xl border border-neutral-700 hover:border-red-800"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
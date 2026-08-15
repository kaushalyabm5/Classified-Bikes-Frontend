'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, CheckCircle2 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Available Bikes', href: '/dashboard', icon: Bike },
    { label: 'Sold Bikes', href: '/dashboard/sold', icon: CheckCircle2 },
  ];

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-gray-400 hover:bg-neutral-800 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
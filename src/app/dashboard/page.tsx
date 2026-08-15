'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

// Temporary Dummy Data
const availableBikes = [
  {
    id: '1',
    title: 'BMW S1000RR',
    brand: 'BMW',
    price: 26500,
    engineCC: '999 cc',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Ducati Panigale V4',
    brand: 'Ducati',
    price: 29999,
    engineCC: '1103 cc',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
  },
];

export default function AvailableBikesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Available Bikes</h1>
          <p className="text-gray-400 text-sm mt-1">Available bikes in Showroom</p>
        </div>

        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/20">
          <Plus className="w-5 h-5" />
          <span>Add New Bike</span>
        </button>
      </div>

      {/* Bike Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableBikes.map((bike) => (
          <Link
            key={bike.id}
            href={`/dashboard/bikes/${bike.id}`}
            className="group bg-neutral-900 border border-neutral-800 hover:border-purple-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-neutral-800">
              <img
                src={bike.image}
                alt={bike.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-md">
                  {bike.brand}
                </span>
                <h3 className="text-xl font-bold text-gray-100 mt-2 group-hover:text-purple-400 transition-colors">
                  {bike.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">Engine: {bike.engineCC}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-white">${bike.price.toLocaleString()}</span>
                <span className="text-xs text-purple-400 font-medium underline group-hover:translate-x-1 transition-transform">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
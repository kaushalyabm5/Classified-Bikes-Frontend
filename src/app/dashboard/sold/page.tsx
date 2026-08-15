'use client';

import Link from 'next/link';

// Temporary dummy data for sold bikes
const soldBikes = [
  {
    id: '101',
    title: 'Yamaha YZF-R1',
    brand: 'Yamaha',
    price: 24000,
    engineCC: '998 cc',
    soldTo: 'Kasun Kalhara',
    soldDate: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
  },
];

export default function SoldBikesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Sold Bikes</h1>
        <p className="text-gray-400 text-sm mt-1">
          Sold Bikes and owner details
        </p>
      </div>

      {/* Sold Bike Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soldBikes.map((bike) => (
          <Link
            key={bike.id}
            href={`/dashboard/sold-bikes/${bike.id}`}
            className="group bg-neutral-900 border border-neutral-800 hover:border-purple-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-neutral-800 relative">
              <img
                src={bike.image}
                alt={bike.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Sold
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-md">
                  {bike.brand}
                </span>
                <h3 className="text-xl font-bold text-gray-100 mt-2 group-hover:text-purple-400 transition-colors">
                  {bike.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">Sold To: <span className="text-gray-200 font-medium">{bike.soldTo}</span></p>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-white">${bike.price.toLocaleString()}</span>
                <span className="text-xs text-purple-400 font-medium underline group-hover:translate-x-1 transition-transform">
                  Owner Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
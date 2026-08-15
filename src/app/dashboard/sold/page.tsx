'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchBikes } from '@/lib/api';

export default function SoldBikesPage() {
  const [soldBikes, setSoldBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadSoldBikes() {
      try {
        const data = await fetchBikes('sold');
        setSoldBikes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSoldBikes();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Sold Bikes History & Sales Records</h1>

      {loading ? (
        <div className="text-gray-400">Loading sales history...</div>
      ) : soldBikes.length === 0 ? (
        <div className="text-gray-500 bg-neutral-900 p-8 rounded-2xl text-center border border-neutral-800">
          No sold bike records found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soldBikes.map((bike) => (
            <div 
              key={bike._id} 
              onClick={() => router.push(`/dashboard/sold-bikes/${bike._id}`)}
              className="bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 rounded-2xl p-4 space-y-3 cursor-pointer group transition-all duration-200"
            >
              <div className="overflow-hidden rounded-xl">
                <img 
                  src={bike.image} 
                  alt={bike.title} 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {bike.title}
                  </h3>
                  <p className="text-xs text-gray-400">{bike.brand} • {bike.year}</p>
                </div>
                <span className="text-emerald-400 font-extrabold text-sm bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                  ${(bike.salePrice || bike.price).toLocaleString()}
                </span>
              </div>
              
              {bike.owner && (
                <div className="p-3 bg-neutral-800/60 rounded-xl text-xs space-y-1 text-gray-300">
                  <p><strong className="text-gray-400">Buyer:</strong> {bike.owner.name}</p>
                  <p><strong className="text-gray-400">Contact:</strong> {bike.owner.phone}</p>
                  <p><strong className="text-gray-400">Sold Date:</strong> {bike.soldDate}</p>
                </div>
              )}
              
              <div className="text-xs text-purple-400 font-medium text-right pt-1 group-hover:underline">
                View Official Sales Invoice →
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
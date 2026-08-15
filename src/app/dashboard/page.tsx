'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBikes, deleteBike } from '@/lib/api';
import AddBikeModal from '@/components/AddBikeModal';
import { DollarSign, Bike, ShoppingBag } from 'lucide-react';

export default function DashboardPage() {
  const [bikes, setBikes] = useState<any[]>([]);
  const [soldCount, setSoldCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch bikes & calculate revenue summary
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch available bikes
      const availableData = await fetchBikes('available');
      setBikes(availableData);

      // 2. Fetch sold bikes for analytics summary
      const soldData = await fetchBikes('sold');
      setSoldCount(soldData.length);
      
      const revenue = soldData.reduce((sum: number, b: any) => sum + (b.salePrice || b.price), 0);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bike?')) {
      await deleteBike(id);
      loadDashboardData();
    }
  };

  return (
    <div className="p-6 space-y-8">
      
      {/* ANALYTICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex items-center gap-4">
          <div className="p-4 bg-purple-950/60 border border-purple-800/40 rounded-2xl text-purple-400">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Available Inventory</div>
            <div className="text-2xl font-black text-white">{bikes.length} Bikes</div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex items-center gap-4">
          <div className="p-4 bg-emerald-950/60 border border-emerald-800/40 rounded-2xl text-emerald-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Total Units Sold</div>
            <div className="text-2xl font-black text-white">{soldCount} Bikes</div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex items-center gap-4">
          <div className="p-4 bg-amber-950/60 border border-amber-800/40 rounded-2xl text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Total Revenue Generated</div>
            <div className="text-2xl font-black text-amber-400">${totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* HEADER & ADD BUTTON */}
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-2xl font-bold text-white">Available Bikes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 cursor-pointer py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/20 transition-all text-xs"
        >
          + Add New Bike
        </button>
      </div>

      {/* AVAILABLE BIKES LIST */}
      {loading ? (
        <div className="text-gray-400">Loading inventory data...</div>
      ) : bikes.length === 0 ? (
        <div className="text-gray-500 bg-neutral-900 p-8 rounded-2xl text-center border border-neutral-800">
          No bikes currently available. Click "+ Add New Bike" to populate inventory.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div key={bike._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between space-y-3">
              <Link href={`/dashboard/bikes/${bike._id}`} className="space-y-3 block group">
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src={bike.image} 
                    alt={bike.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      {bike.title}
                    </h3>
                    <p className="text-xs text-gray-400">{bike.brand} • {bike.year} • {bike.engineCC}</p>
                  </div>
                  <span className="text-purple-400 font-bold">${bike.price?.toLocaleString()}</span>
                </div>
              </Link>

              <div className="pt-2 border-t border-neutral-800/60">
                <button
                  onClick={() => handleDelete(bike._id)}
                  className="cursor-pointer w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold rounded-lg border border-red-800/40 transition-colors"
                >
                  Delete Bike
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Bike Modal */}
      {isModalOpen && (
        <AddBikeModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            loadDashboardData();
          }}
        />
      )}
    </div>
  );
}
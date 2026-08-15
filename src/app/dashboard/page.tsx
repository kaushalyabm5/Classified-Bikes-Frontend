'use client';

import { useState } from 'react';
import { PlusCircle, Bike, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import AddBikeModal from '@/components/AddBikeModal';

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initial Available Bikes State
  const [bikes, setBikes] = useState([
    {
      id: '1',
      title: 'BMW S1000RR',
      brand: 'BMW',
      price: 26500,
      engineCC: '999 cc',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Ducati Panigale V4',
      brand: 'Ducati',
      price: 31500,
      engineCC: '1103 cc',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'Kawasaki Ninja H2',
      brand: 'Kawasaki',
      price: 34000,
      engineCC: '998 cc',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop',
    },
  ]);

  const handleAddNewBike = (newBike: any) => {
    setBikes((prev) => [newBike, ...prev]);
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium">Available Inventory</span>
            <div className="text-3xl font-black text-white mt-1">{bikes.length}</div>
          </div>
          <div className="p-3 bg-purple-950/60 border border-purple-800/40 rounded-xl text-purple-400">
            <Bike className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium">Bikes Sold</span>
            <div className="text-3xl font-black text-white mt-1">3</div>
          </div>
          <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium">Total Revenue</span>
            <div className="text-3xl font-black text-white mt-1">$84,500</div>
          </div>
          <div className="p-3 bg-neutral-800 rounded-xl text-purple-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Available Bikes Header + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Available Superbikes</h2>
          <p className="text-gray-400 text-xs mt-0.5">Available Bikes in showroom</p>
        </div>

        {/* Add New Bike Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Bike</span>
        </button>
      </div>

      {/* Available Bikes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <Link
            key={bike.id}
            href={`/dashboard/bikes/${bike.id}`}
            className="group bg-neutral-900 border border-neutral-800 hover:border-purple-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-neutral-800 relative">
              <img
                src={bike.image}
                alt={bike.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-neutral-700">
                {bike.brand}
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {bike.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                  <span>{bike.engineCC}</span>
                  <span>•</span>
                  <span>{bike.year}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-white">${bike.price.toLocaleString()}</span>
                <span className="text-xs text-purple-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Add Bike Modal Component */}
      <AddBikeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBike={handleAddNewBike}
      />
    </div>
  );
}
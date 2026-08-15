'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Gauge, 
  FileText,
  Printer,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function SoldBikeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Modal State for Delete Confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Full Sale & Bike Report Data
  const soldBike = {
    id: resolvedParams.id,
    title: 'BMW S1000RR M Package',
    brand: 'BMW',
    year: 2024,
    engineCC: '999 cc',
    color: 'Black Storm Metallic',
    vin: 'WB10E2105PZ94821',
    salePrice: 28500,
    listPrice: 29900,
    discount: 1400,
    soldDate: '2026-03-15',
    paymentMethod: 'Bank Wire Transfer',
    status: 'Completed & Delivered',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop',
    
    // Buyer / Owner Information
    owner: {
      name: 'Kasun Perera',
      email: 'kasun.p@example.com',
      phone: '+94 77 123 4567',
      address: 'No. 45, Galle Road, Colombo 03, Sri Lanka',
      idNumber: '921540890V',
    },

    // Specs & Features
    specs: {
      horsepower: '205 HP @ 13,000 RPM',
      torque: '113 Nm @ 11,000 RPM',
      topSpeed: '299 km/h',
      weight: '197 kg',
      transmission: '6-speed with Quickshifter Pro',
    }
  };

  const handleDeleteBike = () => {
    // Perform deletion logic here
    alert(`Sold Bike record (${soldBike.title}) removed successfully!`);
    setIsDeleteModalOpen(false);
    router.push('/dashboard/sold');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Bar Navigation, Print Action & Delete Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard/sold"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sold Bikes</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Print Button */}
          <button 
            onClick={() => window.print()} 
            className="py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl border border-neutral-700 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>Print Report</span>
          </button>

          {/* REMOVE / DELETE BIKE BUTTON */}
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="py-2 px-4 bg-red-950/60 hover:bg-red-900/80 text-red-400 hover:text-red-200 text-xs font-semibold rounded-xl border border-red-800/40 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove Record</span>
          </button>
        </div>
      </div>

      {/* Hero Section / Title Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/40 px-3 py-1 rounded-md">
              {soldBike.brand}
            </span>
            <span className="text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 px-3 py-1 rounded-md flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Sold
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">{soldBike.title}</h1>
          <p className="text-gray-400 text-xs mt-1">VIN: {soldBike.vin} • Sale Date: {soldBike.soldDate}</p>
        </div>

        <div className="text-left md:text-right border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0 w-full md:w-auto">
          <div className="text-xs text-gray-400 font-medium">Final Selling Price</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-0.5">${soldBike.salePrice.toLocaleString()}</div>
          <div className="text-xs text-gray-500 line-through">List Price: ${soldBike.listPrice.toLocaleString()}</div>
        </div>
      </div>

      {/* 2 Column Layout: Full Bike Overview & Owner Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Bike Image + Tech Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Bike Image */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden h-72 sm:h-96 relative">
            <img 
              src={soldBike.image} 
              alt={soldBike.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="text-white text-sm font-semibold">{soldBike.color}</span>
              <span className="text-gray-300 text-xs bg-neutral-900/80 px-3 py-1 rounded-lg backdrop-blur-md">Model Year: {soldBike.year}</span>
            </div>
          </div>

          {/* Full Vehicle Specifications */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <Gauge className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Full Bike Specifications</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Engine Capacity</span>
                <span className="font-bold text-white mt-1 block">{soldBike.engineCC}</span>
              </div>
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Horsepower</span>
                <span className="font-bold text-white mt-1 block">{soldBike.specs.horsepower}</span>
              </div>
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Peak Torque</span>
                <span className="font-bold text-white mt-1 block">{soldBike.specs.torque}</span>
              </div>
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Top Speed</span>
                <span className="font-bold text-white mt-1 block">{soldBike.specs.topSpeed}</span>
              </div>
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Curb Weight</span>
                <span className="font-bold text-white mt-1 block">{soldBike.specs.weight}</span>
              </div>
              <div className="bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-800">
                <span className="text-xs text-gray-400 block">Transmission</span>
                <span className="font-bold text-white mt-1 block">{soldBike.specs.transmission}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Owner & Sale Transaction Info */}
        <div className="space-y-6">
          {/* Owner Details Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Owner / Buyer Profile</h2>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-xs text-gray-400">Full Name</span>
                <div className="text-white font-bold text-base mt-0.5">{soldBike.owner.name}</div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{soldBike.owner.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{soldBike.owner.email}</span>
              </div>

              <div className="pt-2 text-xs text-gray-400 border-t border-neutral-800">
                <span className="block text-gray-500 mb-1">Registered Address:</span>
                {soldBike.owner.address}
              </div>
            </div>
          </div>

          {/* Transaction Summary Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <FileText className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Transaction Summary</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Date of Sale</span>
                <span className="text-white font-semibold">{soldBike.soldDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white font-semibold">{soldBike.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm">
                <span className="text-gray-300 font-bold">Total Paid</span>
                <span className="text-purple-400 font-extrabold">${soldBike.salePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Danger Zone: Remove Button */}
            <div className="pt-4 border-t border-neutral-800">
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full py-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-semibold rounded-xl border border-red-800/40 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete From Sales History</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 bg-red-950 border border-red-800 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Remove Sold Bike Record?</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Are you sure you want to remove <strong className="text-white">{soldBike.title}</strong> from the sales history? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBike}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-red-600/30"
              >
                Yes, Remove Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
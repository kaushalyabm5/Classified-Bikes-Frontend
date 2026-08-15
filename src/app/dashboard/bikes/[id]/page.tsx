'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Trash2, DollarSign, Gauge, Calendar, ShieldCheck, X } from 'lucide-react';

// Temporary dummy bike data
const bikeDetails = {
  id: '1',
  title: 'BMW S1000RR',
  brand: 'BMW',
  price: 26500,
  engineCC: '999 cc',
  year: 2024,
  status: 'Available',
  description: 'The BMW S1000RR is a race-oriented sport bike produced by BMW Motorrad. Known for its exceptional power, lightweight chassis, and advanced electronic rider aids.',
  image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop',
  features: ['Traction Control', 'Quickshifter', 'ABS Pro', 'Riding Modes', 'TFT Display'],
};

export default function SingleBikeDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // State for Sell Modal
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // State for Buyer Form
  const [buyerName, setBuyerName] = useState('');
  const [buyerAge, setBuyerAge] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  // Handle selling the bike
  const handleSellBike = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Bike Sold to:', {
      bikeId: params.id,
      buyerName,
      buyerAge,
      buyerPhone,
      buyerAddress,
    });

    setIsSellModalOpen(false);
    router.push('/dashboard/sold');
  };

  // Handle bike deletion
  const handleRemoveBike = () => {
    if (confirm('Are you sure you want to remove this bike?')) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Available Bikes</span>
      </button>

      {/* Main Container */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
        {/* Left Column: Image */}
        <div className="rounded-2xl overflow-hidden bg-neutral-800 h-[350px] lg:h-full">
          <img
            src={bikeDetails.image}
            alt={bikeDetails.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Bike Specs & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-md">
                {bikeDetails.brand}
              </span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-md">
                {bikeDetails.status}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-white mt-3">
              {bikeDetails.title}
            </h1>

            <div className="text-3xl font-extrabold text-purple-400 mt-2">
              ${bikeDetails.price.toLocaleString()}
            </div>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              {bikeDetails.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-neutral-800/60 border border-neutral-800 p-3 rounded-xl flex items-center gap-3">
                <Gauge className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-xs text-gray-500">Engine</div>
                  <div className="text-sm font-semibold text-gray-200">{bikeDetails.engineCC}</div>
                </div>
              </div>
              <div className="bg-neutral-800/60 border border-neutral-800 p-3 rounded-xl flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-xs text-gray-500">Year</div>
                  <div className="text-sm font-semibold text-gray-200">{bikeDetails.year}</div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {bikeDetails.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-neutral-800 text-gray-300 px-3 py-1.5 rounded-lg border border-neutral-700/60 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>Sell This Bike</span>
            </button>

            <button
              onClick={handleRemoveBike}
              className="py-3 px-4 bg-neutral-800 hover:bg-red-950/40 text-red-400 hover:text-red-300 font-semibold rounded-xl border border-neutral-700 hover:border-red-800/60 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* SELL BIKE MODAL */}
      {isSellModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSellModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-1">Sell Bike</h2>
            <p className="text-gray-400 text-sm mb-6">Enter buyer details to complete the sale</p>

            <form onSubmit={handleSellBike} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Owner / Buyer Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Buyer Age</label>
                  <input
                    type="number"
                    required
                    value={buyerAge}
                    onChange={(e) => setBuyerAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Address</label>
                <textarea
                  required
                  rows={3}
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="Enter full address"
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 mt-4"
              >
                Confirm & Sell Bike
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchBikeById, sellBike, deleteBike } from '@/lib/api';
import { ArrowLeft, Gauge, ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react';

export default function AvailableBikeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isSelling, setIsSelling] = useState(false);

  // Buyer Form State
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    idNumber: '',
    salePrice: 0,
    paymentMethod: 'Bank Wire Transfer',
  });

  // Load bike details from database
  const loadBikeDetails = async () => {
    try {
      const data = await fetchBikeById(resolvedParams.id);
      setBike(data);
      if (data) {
        setBuyerData((prev) => ({ ...prev, salePrice: data.price }));
      }
    } catch (err) {
      console.error('Failed to load bike detail', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBikeDetails();
  }, [resolvedParams.id]);

  // Handle Delete Bike
  const handleDelete = async () => {
    if (confirm('Are you sure you want to permanently delete this bike?')) {
      await deleteBike(resolvedParams.id);
      router.push('/dashboard');
    }
  };

  // Handle Sell Bike Submission
  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSelling(true);

    try {
      const payload = {
        salePrice: buyerData.salePrice,
        paymentMethod: buyerData.paymentMethod,
        soldDate: new Date().toISOString().split('T')[0],
        owner: {
          name: buyerData.name,
          email: buyerData.email,
          phone: buyerData.phone,
          address: buyerData.address,
          idNumber: buyerData.idNumber,
        },
      };

      await sellBike(resolvedParams.id, payload);
      alert('Bike marked as SOLD successfully!');
      setIsSellModalOpen(false);
      router.push('/dashboard/sold');
    } catch (error) {
      alert('Failed to process sale.');
    } finally {
      setIsSelling(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading bike details...</div>;
  if (!bike) return <div className="p-8 text-red-400">Bike record not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 p-6">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Available Bikes</span>
      </Link>

      {/* Hero Title Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/40 px-3 py-1 rounded-md">
            {bike.brand}
          </span>
          <h1 className="text-3xl font-black text-white mt-2">{bike.title}</h1>
          <p className="text-gray-400 text-xs mt-1">VIN: {bike.vin} • Model Year: {bike.year}</p>
        </div>

        <div className="text-left md:text-right">
          <div className="text-xs text-gray-400">Listed Price</div>
          <div className="text-3xl font-extrabold text-purple-400">${bike.price?.toLocaleString()}</div>
        </div>
      </div>

      {/* Action Buttons: Sell or Delete */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setIsSellModalOpen(true)}
          className="cursor-pointer flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Sell This Bike</span>
        </button>

        <button
          onClick={handleDelete}
          className="py-3 px-6 cursor-pointer bg-red-950/60 hover:bg-red-900/80 text-red-400 text-xs font-semibold rounded-xl border border-red-800/40 transition-all flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Remove From System</span>
        </button>
      </div>

      {/* Bike Specifications Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden h-80 relative">
          <img src={bike.image} alt={bike.title} className="w-full h-full object-cover" />
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
            <Gauge className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Bike Specifications</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-800">
              <span className="text-xs text-gray-400 block">Engine Capacity</span>
              <span className="font-bold text-white mt-1 block">{bike.engineCC}</span>
            </div>
            <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-800">
              <span className="text-xs text-gray-400 block">Color</span>
              <span className="font-bold text-white mt-1 block">{bike.color}</span>
            </div>
            <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-800">
              <span className="text-xs text-gray-400 block">Status</span>
              <span className="font-bold text-emerald-400 mt-1 block capitalize">{bike.status}</span>
            </div>
            <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-800">
              <span className="text-xs text-gray-400 block">Year</span>
              <span className="font-bold text-white mt-1 block">{bike.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SELL BIKE MODAL */}
      {isSellModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg p-6 space-y-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Complete Sale Transaction
            </h2>

            <form onSubmit={handleSellSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Buyer Full Name</label>
                <input
                  required
                  className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                  onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Phone Number</label>
                  <input
                    required
                    className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    onChange={(e) => setBuyerData({ ...buyerData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">NIC / ID Number</label>
                  <input
                    required
                    className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    onChange={(e) => setBuyerData({ ...buyerData, idNumber: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                  onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Residential Address</label>
                <input
                  required
                  className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                  onChange={(e) => setBuyerData({ ...buyerData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-gray-400 block mb-1">Final Selling Price ($)</label>
                  <input
                    type="number"
                    required
                    value={buyerData.salePrice}
                    className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white font-bold"
                    onChange={(e) => setBuyerData({ ...buyerData, salePrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Payment Method</label>
                  <select
                    className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                    onChange={(e) => setBuyerData({ ...buyerData, paymentMethod: e.target.value })}
                  >
                    <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  className="cursor-pointer flex-1 py-2.5 bg-neutral-800 text-gray-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSelling}
                  className="cursor-pointer flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
                >
                  {isSelling ? 'Processing...' : 'Confirm Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
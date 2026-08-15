'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBikeById } from '@/lib/api';
import { ArrowLeft, CheckCircle2, User, Phone, Mail, MapPin, CreditCard, Calendar, Printer } from 'lucide-react';

export default function SoldBikeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetails() {
      try {
        const data = await fetchBikeById(resolvedParams.id);
        setBike(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getDetails();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-gray-400">Loading invoice receipt...</div>;
  if (!bike) return <div className="p-8 text-red-400">Sales record not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 pb-12">
      {/* Back link */}
      <Link href="/dashboard/sold" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Sold History</span>
      </Link>

      {/* Invoice Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-black text-white">Sales Invoice Receipt</h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">Status: <span className="text-emerald-400 font-bold uppercase">Transaction Completed</span></p>
          </div>

          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>

        {/* Bike Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-950/50 p-4 rounded-2xl border border-neutral-800/80">
          <img src={bike.image} alt={bike.title} className="w-full h-32 object-cover rounded-xl" />
          <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase text-purple-400">{bike.brand}</span>
            <h2 className="text-xl font-bold text-white">{bike.title}</h2>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1">
              <span>VIN: <strong className="text-gray-200">{bike.vin}</strong></span>
              <span>Year: <strong className="text-gray-200">{bike.year}</strong></span>
              <span>Engine: <strong className="text-gray-200">{bike.engineCC}</strong></span>
            </div>
          </div>
        </div>

        {/* Owner / Buyer Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Buyer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
              <User className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-gray-400">Full Name</div>
                <div className="font-bold text-white text-sm">{bike.owner?.name || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-gray-400">Phone Number</div>
                <div className="font-bold text-white text-sm">{bike.owner?.phone || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-gray-400">Email Address</div>
                <div className="font-bold text-white text-sm">{bike.owner?.email || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-gray-400">NIC / Passport No</div>
                <div className="font-bold text-white text-sm">{bike.owner?.idNumber || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 text-xs">
            <span className="text-gray-400 block mb-0.5">Residential Address</span>
            <span className="font-bold text-white">{bike.owner?.address || 'N/A'}</span>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-3">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Summary</h3>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-400" /> Sold Date</span>
            <span className="text-white font-medium">{bike.soldDate || 'N/A'}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-purple-400" /> Payment Method</span>
            <span className="text-white font-medium">{bike.paymentMethod || 'Bank Wire Transfer'}</span>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-sm font-bold text-white">Total Amount Paid</span>
            <span className="text-2xl font-black text-emerald-400">${(bike.salePrice || bike.price).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
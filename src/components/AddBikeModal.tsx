'use client';

import { useState } from 'react';
import { X, PlusCircle, Upload, DollarSign, Gauge, ShieldAlert } from 'lucide-react';

interface AddBikeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBike: (newBike: any) => void;
}

export default function AddBikeModal({ isOpen, onClose, onAddBike }: AddBikeModalProps) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('BMW');
  const [price, setPrice] = useState('');
  const [engineCC, setEngineCC] = useState('');
  const [year, setYear] = useState('2026');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBike = {
      id: Date.now().toString(),
      title,
      brand,
      price: Number(price),
      engineCC: `${engineCC} cc`,
      year: Number(year),
      status: 'Available',
      image: image || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop',
      description,
    };

    onAddBike(newBike);
    onClose();
    // Clear inputs
    setTitle('');
    setPrice('');
    setEngineCC('');
    setDescription('');
    setImage('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-purple-950/60 border border-purple-800/40 rounded-xl text-purple-400">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Add New Superbike</h2>
            <p className="text-gray-400 text-xs">Enter new inventory details to display on showroom</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Bike Model Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. BMW M1000RR"
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="BMW">BMW</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Kawasaki">Kawasaki</option>
                <option value="Ducati">Ducati</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Price ($ USD)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 32000"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Engine Capacity (CC)</label>
              <input
                type="text"
                required
                value={engineCC}
                onChange={(e) => setEngineCC(e.target.value)}
                placeholder="e.g. 999"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Model Year</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key specs, performance numbers, condition..."
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 mt-4"
          >
            Add Bike to Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
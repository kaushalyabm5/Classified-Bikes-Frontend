'use client';

import { useState } from 'react';
import { createBike } from '@/lib/api';

interface AddBikeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBikeModal({ onClose, onSuccess }: AddBikeModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    year: 2024,
    engineCC: '',
    color: '',
    vin: '',
    price: 0,
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBike(formData);
      onSuccess(); // Close modal and refresh UI
    } catch (error) {
      alert('Failed to save bike');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold text-white">Add New Bike</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title (e.g. BMW S1000RR)"
            required
            className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Brand"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
            <input
              placeholder="Year"
              type="number"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Engine CC (e.g. 999cc)"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, engineCC: e.target.value })}
            />
            <input
              placeholder="Color"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="VIN / Chassis No"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            />
            <input
              placeholder="Price ($)"
              type="number"
              required
              className="p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <input
            placeholder="Image URL"
            required
            className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="cursor-pointer px-4 py-2 bg-neutral-800 text-gray-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg font-bold">
              {loading ? 'Saving...' : 'Add Bike'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
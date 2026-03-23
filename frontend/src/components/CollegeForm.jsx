import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function CollegeForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    fees: '',
    courses: '',
    placementStats: { averagePackage: '', highestPackage: '', placementRate: '' },
    facilities: '',
    images: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('placement.')) {
      const field = name.split('.')[1];
      setForm({ ...form, placementStats: { ...form.placementStats, [field]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        fees: Number(form.fees),
        courses: form.courses.split(',').map(s => s.trim()),
        facilities: form.facilities.split(',').map(s => s.trim()),
        images: form.images.split(',').map(s => s.trim()),
        placementStats: {
          averagePackage: Number(form.placementStats.averagePackage),
          highestPackage: Number(form.placementStats.highestPackage),
          placementRate: Number(form.placementStats.placementRate)
        }
      };
      await api.post('/colleges', payload);
      toast.success('College added');
      onSuccess();
      setForm({
        name: '', location: '', fees: '', courses: '', placementStats: { averagePackage: '', highestPackage: '', placementRate: '' }, facilities: '', images: ''
      });
    } catch (err) {
      toast.error('Failed to add college');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="College Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        required
      />
      <input
        name="fees"
        type="number"
        placeholder="Fees (per year)"
        value={form.fees}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        required
      />
      <input
        name="courses"
        placeholder="Courses (comma separated)"
        value={form.courses}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        required
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          name="placement.averagePackage"
          placeholder="Average Package (LPA)"
          value={form.placementStats.averagePackage}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        />
        <input
          name="placement.highestPackage"
          placeholder="Highest Package (LPA)"
          value={form.placementStats.highestPackage}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        />
        <input
          name="placement.placementRate"
          type="number"
          placeholder="Placement Rate %"
          value={form.placementStats.placementRate}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
        />
      </div>

      <input
        name="facilities"
        placeholder="Facilities (comma separated)"
        value={form.facilities}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
      />
      <input
        name="images"
        placeholder="Image URLs (comma separated)"
        value={form.images}
        onChange={handleChange}
        className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white transition rounded-xl bg-[#f97316] hover:bg-[#ea580c]"
      >
        Add College
      </button>
    </form>
  );
}
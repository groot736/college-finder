import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AdmissionForm({ collegeId }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    interest: '',
    budget: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', { college: collegeId, ...formData });
      toast.success('Request sent! Counselor will contact you.');
      setFormData({ ...formData, phone: '', interest: '', budget: '' });
    } catch (err) {
      toast.error('Failed to send request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Get Admission Help</h3>
      <div className="space-y-3">
        <input type="text" placeholder="Name" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="tel" placeholder="Phone" className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
        <input type="text" placeholder="Course Interest" className="w-full border p-2 rounded" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} />
        <input type="text" placeholder="Budget" className="w-full border p-2 rounded" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Submit Request</button>
      </div>
    </form>
  );
}
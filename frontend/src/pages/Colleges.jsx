import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import CollegeCard from '../components/CollegeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaSearch, FaUniversity } from 'react-icons/fa';

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({ budget: '', location: '', course: '', type: '' });
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchColleges = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const res = await api.get(`/colleges?${params}`);
      setColleges(res.data || []);
    } catch (err) {
      console.error('Error fetching colleges:', err);
      toast.error('Failed to load colleges: ' + (err.response?.data?.error || err.message));
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const tabs = [
    { id: 'all', label: 'All Colleges', type: '' },
    { id: 'government', label: 'Government Colleges', type: 'government' },
    { id: 'private', label: 'Private Colleges', type: 'private' }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab.id);
    setFilters({ ...filters, type: tab.type });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="relative px-4 pt-10 pb-6 mx-auto max-w-7xl md:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-56 h-56 rounded-full top-2 -left-12 bg-[#f97316]/15 blur-3xl" />
          <div className="absolute w-56 h-56 rounded-full -right-12 top-8 bg-[#0f766e]/15 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-6 border rounded-3xl md:p-8 border-[#152238]/10 bg-white/75 backdrop-blur"
        >
          <span className="section-kicker">College Explorer</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#152238] md:text-5xl">
            Find the right campus in minutes, not months.
          </h1>
          <p className="max-w-3xl mt-3 text-[#355070]">
            Filter by budget, location, courses, and institute type. The layout is designed to help you decide faster.
          </p>
        </motion.div>
      </section>

      <section className="px-4 mx-auto max-w-7xl md:px-6">
        <div className="p-5 border rounded-2xl md:p-6 border-[#152238]/10 bg-white/80">
          <div className="flex flex-wrap gap-2 mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#152238] text-white'
                    : 'bg-[#152238]/5 text-[#152238] hover:bg-[#152238]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="number"
              placeholder="Max Budget (INR)"
              className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
            <input
              type="text"
              placeholder="Course"
              className="w-full px-4 py-3 text-sm border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
            />
            <button
              onClick={fetchColleges}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition rounded-xl bg-[#f97316] hover:bg-[#ea580c]"
            >
              <FaSearch />
              Apply Filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-7 mb-5">
          <p className="text-sm font-semibold text-[#355070]">
            Showing <span className="text-[#152238]">{colleges.length}</span> colleges
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-10 h-10 border-4 rounded-full border-[#152238]/20 border-t-[#152238] animate-spin" />
            <p className="mt-4 text-[#355070]">Loading colleges...</p>
          </div>
        ) : colleges.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {colleges.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="py-20 text-center border rounded-2xl border-[#152238]/10 bg-white/75"
          >
            <FaUniversity className="mx-auto mb-4 text-5xl text-[#152238]/50" />
            <h3 className="mb-2 text-2xl font-bold text-[#152238]">No colleges found</h3>
            <p className="text-[#355070]">Try adjusting your filters or switching institute type.</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

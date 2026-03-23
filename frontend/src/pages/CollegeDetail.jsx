import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import AdmissionForm from '../components/AdmissionForm';
import { motion } from 'framer-motion';
import { FaBook, FaChartLine, FaMapMarkerAlt, FaRupeeSign, FaUniversity } from 'react-icons/fa';

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCollege = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/colleges/${id}`);
        setCollege(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Unable to load college details right now.');
      } finally {
        setLoading(false);
      }
    };

    loadCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="px-4 mx-auto max-w-7xl md:px-6">
          <div className="py-24 text-center border rounded-3xl border-[#152238]/10 bg-white/75">
            <div className="inline-block w-10 h-10 border-4 rounded-full border-[#152238]/20 border-t-[#152238] animate-spin" />
            <p className="mt-4 text-[#355070]">Loading college details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="px-4 mx-auto max-w-7xl md:px-6">
          <div className="py-24 text-center border rounded-3xl border-[#152238]/10 bg-white/75">
            <FaUniversity className="mx-auto mb-4 text-5xl text-[#152238]/50" />
            <h2 className="text-2xl font-bold text-[#152238]">Could not load this college</h2>
            <p className="mt-2 text-[#355070]">{error || 'Please try again in a moment.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const photos = college.images?.length ? college.images : [college.image].filter(Boolean);
  const primaryImage = photos?.[0] || 'https://via.placeholder.com/1200x700';
  const placementRate = college.placementStats?.placementRate ?? 'N/A';
  const avgPackage = college.placementStats?.averagePackage ?? 'N/A';
  const highPackage = college.placementStats?.highestPackage ?? 'N/A';

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="px-4 mx-auto max-w-7xl md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border md:p-8 rounded-3xl border-[#152238]/10 bg-white/80"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <img
                src={primaryImage}
                alt={college.name}
                className="object-cover w-full h-[320px] md:h-[420px] rounded-2xl shadow-[0_16px_35px_rgba(21,34,56,0.15)]"
              />

              {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3 mt-4 md:grid-cols-4">
                  {photos.slice(1, 5).map((img, i) => (
                    <img
                      key={img + i}
                      src={img}
                      alt={`${college.name} campus ${i + 2}`}
                      className="object-cover w-full h-24 rounded-xl"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="section-kicker">College Profile</span>
              <h1 className="mt-4 text-4xl font-extrabold text-[#152238]">{college.name}</h1>
              <p className="flex items-center gap-2 mt-3 text-[#355070]">
                <FaMapMarkerAlt className="text-[#0f766e]" />
                {college.location}
              </p>

              <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2">
                <div className="p-4 rounded-xl bg-[#152238]/5">
                  <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Annual Fees</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#152238] inline-flex items-center">
                    <FaRupeeSign className="mr-1 text-[#f97316]" />
                    {college.fees?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#152238]/5">
                  <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Placement Rate</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#152238] inline-flex items-center">
                    <FaChartLine className="mr-2 text-[#0f766e]" />
                    {placementRate}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#152238]/5">
                  <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Average Package</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#152238]">₹{avgPackage}L</p>
                </div>
                <div className="p-4 rounded-xl bg-[#152238]/5">
                  <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Highest Package</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#152238]">₹{highPackage}L</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-[#152238] inline-flex items-center gap-2">
                  <FaBook className="text-[#0f766e]" />
                  Courses Offered
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {college.courses?.length ? (
                    college.courses.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 text-sm font-semibold rounded-full bg-[#152238]/10 text-[#152238]"
                      >
                        {course}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#355070]">Courses data not available</span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-[#152238]">Campus Facilities</h3>
                <p className="mt-2 text-[#355070]">
                  {college.facilities?.length ? college.facilities.join(', ') : 'Facilities data not available'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 mt-8 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
            <h2 className="text-2xl font-extrabold text-[#152238]">Start Admission Enquiry</h2>
            <p className="mt-1 mb-4 text-sm text-[#355070]">Fill this form and get a guided admission response.</p>
            <AdmissionForm collegeId={college._id} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
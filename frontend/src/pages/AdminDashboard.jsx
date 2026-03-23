import { useState, useEffect } from 'react';
import api from '../services/api';
import CollegeForm from '../components/CollegeForm';
import toast from 'react-hot-toast';
import { FaChartBar, FaClipboardCheck, FaSchool, FaUsers } from 'react-icons/fa';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    try {
      const [requestsRes, statsRes] = await Promise.all([
        api.get('/requests'),
        api.get('/admin/stats')
      ]);
      setRequests(requestsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to load data';
      toast.error(`Failed to load data: ${message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      toast.success('Status updated');
      fetchData();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="px-4 mx-auto max-w-7xl md:px-6">
        <div className="p-6 border rounded-3xl md:p-8 border-[#152238]/10 bg-white/80">
          <span className="section-kicker">Admin center</span>
          <h1 className="mt-4 text-4xl font-extrabold text-[#152238] inline-flex items-center gap-3">
            <FaChartBar className="text-[#0f766e]" />
            Admin Dashboard
          </h1>
          <p className="mt-2 text-[#355070]">Monitor platform performance and manage admission requests.</p>

          <div className="grid gap-4 mt-8 md:grid-cols-3">
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#355070]">
                <FaUsers /> Total Users
              </p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{stats.totalUsers || 0}</p>
            </div>
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#355070]">
                <FaSchool /> Colleges
              </p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{stats.totalColleges || 0}</p>
            </div>
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#355070]">
                <FaClipboardCheck /> Pending Requests
              </p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{stats.pendingRequests || 0}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="p-6 border rounded-3xl border-[#152238]/10 bg-white/85 h-fit">
            <h2 className="text-2xl font-bold text-[#152238]">Add New College</h2>
            <p className="mt-1 mb-4 text-sm text-[#355070]">Add complete details to keep listings high quality.</p>
            <CollegeForm onSuccess={fetchData} />
          </section>

          <section className="overflow-hidden border rounded-3xl border-[#152238]/10 bg-white/85">
            <div className="px-6 py-4 border-b border-[#152238]/10 bg-[#152238] text-[#fff8ef]">
              <h2 className="text-xl font-semibold">Admission Requests</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#fff8ef] text-[#152238]">
                  <tr>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">College</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id} className="border-t border-[#152238]/10 hover:bg-[#fff8ef]/70">
                      <td className="p-3 font-medium text-[#152238]">{req.name}</td>
                      <td className="p-3 text-[#355070]">{req.college?.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 text-xs font-bold uppercase rounded-full bg-[#152238]/10 text-[#152238]">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          onChange={(e) => updateStatus(req._id, e.target.value)}
                          value={req.status}
                          className="w-full px-2 py-1 text-sm border rounded-lg border-[#152238]/20"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
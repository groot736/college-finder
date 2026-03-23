import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaClipboardList, FaEnvelope, FaPhone, FaUserGraduate } from 'react-icons/fa';

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get('/requests/my').then((res) => setRequests(res.data));
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-[#f59e0b]/15 text-[#b45309]';
      case 'contacted':
        return 'bg-[#0284c7]/15 text-[#0369a1]';
      case 'resolved':
        return 'bg-[#16a34a]/15 text-[#166534]';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const resolvedCount = requests.filter((r) => r.status === 'resolved').length;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="px-4 mx-auto max-w-7xl md:px-6">
        <div className="p-6 border rounded-3xl md:p-8 border-[#152238]/10 bg-white/80">
          <span className="section-kicker">Student dashboard</span>
          <h1 className="mt-4 text-4xl font-extrabold text-[#152238] inline-flex items-center gap-3">
            <FaUserGraduate className="text-[#0f766e]" />
            Welcome, {user?.name}
          </h1>
          <p className="mt-2 text-[#355070]">Track your admission enquiry progress at one place.</p>

          <div className="grid gap-4 mt-8 md:grid-cols-3">
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Total Requests</p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{requests.length}</p>
            </div>
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Pending</p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{pendingCount}</p>
            </div>
            <div className="p-5 border rounded-2xl border-[#152238]/10 bg-[#fff8ef]">
              <p className="text-xs font-bold tracking-wide uppercase text-[#355070]">Resolved</p>
              <p className="mt-2 text-3xl font-extrabold text-[#152238]">{resolvedCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden border rounded-3xl border-[#152238]/10 bg-white/85">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#152238]/10 bg-[#152238] text-[#fff8ef]">
            <FaClipboardList />
            <h2 className="text-lg font-semibold">Your Admission Requests</h2>
          </div>

          {requests.length === 0 ? (
            <p className="p-10 text-center text-[#355070]">No requests yet. Explore colleges and apply.</p>
          ) : (
            <div className="divide-y divide-[#152238]/10">
              {requests.map((req) => (
                <div key={req._id} className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-[#fff8ef] transition">
                  <div>
                    <p className="text-lg font-semibold text-[#152238]">{req.college?.name || 'College unavailable'}</p>
                    <p className="inline-flex items-center gap-2 mt-2 text-sm text-[#355070]">
                      <FaEnvelope /> {req.name}
                      <span className="text-[#152238]/30">|</span>
                      <FaPhone /> {req.phone}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusClass(req.status)}`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

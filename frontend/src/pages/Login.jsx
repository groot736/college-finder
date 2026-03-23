import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (err) {
      const message = err.response?.data?.error || (err.message === 'Network Error' ? 'Server se connection nahi ho paaya. Backend run karo aur phir try karo.' : 'Login failed');
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full -top-12 left-4 bg-[#f97316]/20 blur-3xl" />
        <div className="absolute w-72 h-72 rounded-full -right-16 bottom-8 bg-[#0f766e]/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative max-w-md p-8 mx-auto border shadow-xl bg-white/85 rounded-3xl border-[#152238]/10"
      >
        <span className="section-kicker">Welcome back</span>
        <h2 className="mt-4 text-4xl font-extrabold text-[#152238]">Login to continue</h2>
        <p className="mt-2 text-sm text-[#355070]">Admin login bhi isi page se hota hai.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Email</span>
            <div className="relative">
              <FaEnvelope className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
              />
            </div>
          </label>

          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Password</span>
            <div className="relative">
              <FaLock className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
              />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 mt-2 font-semibold text-white transition rounded-xl bg-[#f97316] hover:bg-[#ea580c]"
          >
            Login
            <FaArrowRight className="text-xs" />
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#355070]">
          Do not have an account?{' '}
          <Link to="/register" className="font-semibold text-[#152238] hover:text-[#f97316] transition">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
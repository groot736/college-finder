import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post('/auth/student/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.message === 'Network Error'
          ? 'Server se connection nahi ho paaya. Backend run karo aur phir try karo.'
          : 'Registration failed');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full -top-20 -left-10 bg-[#f97316]/20 blur-3xl" />
        <div className="absolute w-72 h-72 rounded-full -right-12 bottom-0 bg-[#0f766e]/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative max-w-xl p-8 mx-auto border shadow-xl bg-white/85 rounded-3xl border-[#152238]/10"
      >
        <span className="section-kicker">Create account</span>
        <h1 className="mt-4 text-4xl font-extrabold text-[#152238]">Start your journey</h1>
        <p className="mt-2 text-sm text-[#355070]">
          Join students discovering better college and career decisions.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Full Name</span>
            <div className="relative">
              <FaUser className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
                placeholder="Your full name"
              />
            </div>
          </label>

          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Email</span>
            <div className="relative">
              <FaEnvelope className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Password</span>
            <div className="relative">
              <FaLock className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-10 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-3 top-1/2 text-[#355070]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="block mb-1 text-xs font-semibold tracking-wide uppercase text-[#355070]">Confirm Password</span>
            <div className="relative">
              <FaLock className="absolute text-sm -translate-y-1/2 left-3 top-1/2 text-[#355070]" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-10 border rounded-xl border-[#152238]/15 focus:outline-none focus:ring-2 focus:ring-[#152238]/20"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute -translate-y-1/2 right-3 top-1/2 text-[#355070]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center w-full gap-2 px-4 py-3 mt-2 font-semibold text-white transition rounded-xl bg-[#f97316] hover:bg-[#ea580c] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <FaArrowRight className="text-xs" />}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#355070]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#152238] hover:text-[#f97316] transition">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

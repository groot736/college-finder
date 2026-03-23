import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
  FaGraduationCap,
  FaSearch,
  FaStar,
  FaUniversity,
  FaVial,
} from 'react-icons/fa';

const heroPoints = [
  'Personalized college recommendations',
  'Admission strategy mapped to your profile',
  'Career clarity in less than 5 minutes',
];

const premiumSteps = [
  {
    title: 'Discover',
    description: 'Filter colleges by rank, fees, placement, and location with zero confusion.',
    icon: FaSearch,
  },
  {
    title: 'Evaluate',
    description: 'Compare shortlists instantly and see what actually fits your goals.',
    icon: FaChartLine,
  },
  {
    title: 'Decide',
    description: 'Move ahead with confidence using practical admission insights.',
    icon: FaGraduationCap,
  },
];

const featuredInstitutes = [
  { name: 'IIT Bombay', tag: 'Engineering' },
  { name: 'IIT Delhi', tag: 'Technology' },
  { name: 'NIT Trichy', tag: 'Engineering' },
  { name: 'Delhi University', tag: 'Humanities' },
  { name: 'VIT Vellore', tag: 'Innovation' },
  { name: 'SRM Chennai', tag: 'Research' },
];

const testimonials = [
  {
    quote: 'Shortlisting took me one evening instead of two months. Everything felt clear.',
    name: 'Aarav Mehta',
    college: 'NIT Trichy',
  },
  {
    quote: 'The career test gave me direction when I was fully confused after class 12.',
    name: 'Kashish Verma',
    college: 'Delhi University',
  },
  {
    quote: 'Loved the clean insights. I could pitch my final options to my parents in one screen.',
    name: 'Riya Patel',
    college: 'VIT Vellore',
  },
];

export default function Home() {
  const [counts, setCounts] = useState({ students: 0, colleges: 0, success: 0 });

  const targetCounts = useMemo(
    () => ({
      students: 15000,
      colleges: 750,
      success: 97,
    }),
    []
  );

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCounts({
        students: Math.floor(targetCounts.students * progress),
        colleges: Math.floor(targetCounts.colleges * progress),
        success: Math.floor(targetCounts.success * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [targetCounts]);

  return (
    <div className="overflow-hidden">
      <section className="relative pt-28 pb-20 hero-grid">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 rounded-full -top-20 -left-16 bg-[#f97316]/20 blur-3xl" />
          <div className="absolute w-72 h-72 rounded-full -right-20 top-20 bg-[#0f766e]/20 blur-3xl" />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-kicker">Trusted by ambitious students</span>
              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-[#152238] md:text-6xl">
                A college platform that looks premium and works like a mentor.
              </h1>
              <p className="max-w-xl mt-5 text-lg text-[#355070]">
                From first shortlist to final admission, every decision gets easier with clear data,
                better visuals, and practical guidance.
              </p>

              <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                <Link to="/colleges" className="brand-button">
                  Explore Colleges
                  <FaArrowRight />
                </Link>
                <Link to="/career-test" className="ghost-button">
                  <FaVial />
                  Start Career Test
                </Link>
              </div>

              <div className="grid gap-3 mt-8">
                {heroPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.25, duration: 0.35 }}
                    className="inline-flex items-center gap-3 text-sm font-medium text-[#152238]"
                  >
                    <FaCheckCircle className="text-[#0f766e]" />
                    {point}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 hero-outline rounded-3xl"
            >
              <div className="p-5 rounded-2xl bg-[#152238] text-[#fff8ef]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-wide uppercase text-[#fff8ef]/80">Admission Pulse</p>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#0f766e]">Live</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">Your profile is matching with 23 high-fit colleges</h3>
                <p className="mt-3 text-sm text-[#fff8ef]/75">
                  Recommended by score, affordability, and placement consistency.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-4 rounded-xl bg-white/80 border border-[#152238]/10 text-center">
                  <p className="text-2xl font-extrabold text-[#152238]">{counts.students.toLocaleString()}+</p>
                  <p className="text-xs font-semibold text-[#355070]">Students</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-[#152238]/10 text-center">
                  <p className="text-2xl font-extrabold text-[#152238]">{counts.colleges}+</p>
                  <p className="text-xs font-semibold text-[#355070]">Colleges</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-[#152238]/10 text-center">
                  <p className="text-2xl font-extrabold text-[#152238]">{counts.success}%</p>
                  <p className="text-xs font-semibold text-[#355070]">Success</p>
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 mt-4 font-bold text-white rounded-xl bg-[#f97316] hover:bg-[#ea580c] transition"
              >
                Build My Admission Plan
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 mx-auto max-w-7xl md:px-6">
        <div className="max-w-2xl">
          <span className="section-kicker">How it works</span>
          <h2 className="mt-4 section-title">Simple flow, powerful outcomes</h2>
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {premiumSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-6 border rounded-2xl border-[#152238]/10 bg-white/75 backdrop-blur"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white rounded-xl bg-[#152238]">
                  <Icon />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#152238]">{step.title}</h3>
                <p className="mt-2 text-[#355070]">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[#152238] text-[#fff8ef]">
        <div className="px-4 mx-auto max-w-7xl md:px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="section-kicker bg-[#fff8ef]/15 text-[#fff8ef]">Featured institutes</span>
              <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Top choices students shortlist first</h2>
            </div>
            <Link to="/colleges" className="ghost-button !text-[#fff8ef] !border-[#fff8ef]/25 !bg-[#fff8ef]/10">
              View all colleges
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredInstitutes.map((college, index) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="p-5 rounded-xl bg-white/10 border border-white/15"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/15">
                  <FaUniversity />
                </div>
                <h3 className="mt-4 text-2xl font-bold">{college.name}</h3>
                <p className="mt-1 text-sm text-[#fff8ef]/70">{college.tag}</p>
                <div className="flex items-center gap-1 mt-4 text-[#fbbf24]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 mx-auto max-w-7xl md:px-6">
        <div className="max-w-2xl">
          <span className="section-kicker">Student voices</span>
          <h2 className="mt-4 section-title">Proof that experience matters</h2>
        </div>

        <div className="grid gap-5 mt-10 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-6 border rounded-2xl border-[#152238]/10 bg-white/75"
            >
              <p className="text-[#152238]">"{item.quote}"</p>
              <div className="pt-4 mt-4 border-t border-[#152238]/10">
                <p className="font-bold text-[#152238]">{item.name}</p>
                <p className="text-sm text-[#355070]">{item.college}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 mx-auto max-w-7xl md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl border border-[#152238]/10 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white"
        >
          <h2 className="text-4xl font-extrabold md:text-5xl">Give your future a sharper start today.</h2>
          <p className="max-w-2xl mt-4 text-white/90">
            Explore better-fit colleges, unlock your career path, and present your final shortlist with confidence.
          </p>
          <div className="flex flex-col gap-4 mt-8 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-[#152238] rounded-xl bg-white hover:bg-[#fff8ef] transition"
            >
              Create Free Account
              <FaArrowRight />
            </Link>
            <Link
              to="/career-test"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold border rounded-xl border-white/50 hover:bg-white/10 transition"
            >
              Take Career Test
              <FaVial />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

export default function CollegeCard({ college }) {
  const rating = Number(college.rating || 4.5).toFixed(1);

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={2000}>
      <article className="overflow-hidden transition-all duration-300 border group rounded-2xl border-[#152238]/10 bg-white/80 shadow-[0_14px_32px_rgba(21,34,56,0.08)] hover:shadow-[0_20px_40px_rgba(21,34,56,0.14)]">
        <div className="relative aspect-[4/3] h-48 overflow-hidden bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1]">
          <img 
            src={college.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&w=400&fit=crop&q=80'}
            alt={college.name} 
            loading="lazy"
            className="absolute inset-0 object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full top-3 right-3 bg-white/95 text-[#152238] shadow-md">
            <FaStar className="text-[#f59e0b]" />
            {rating}
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 p-6 min-h-[230px]">
          <div>
            <h3 className="mb-3 text-2xl font-bold text-[#152238] leading-snug line-clamp-2">{college.name}</h3>
            <div className="flex items-center mb-4 text-sm text-[#355070]">
              <FaMapMarkerAlt className="mr-1 text-[#0f766e]" />
              <span>{college.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center p-2 text-sm rounded-lg bg-[#152238]/5 text-[#152238]">
                <FaRupeeSign className="mr-1 text-[#f97316]" />
                <span className="font-semibold">₹{college.fees?.toLocaleString()}</span>
              </div>
              <div className="flex items-center p-2 text-sm rounded-lg bg-[#152238]/5 text-[#152238]">
                <FaChartLine className="mr-1 text-[#0f766e]" />
                <span className="font-semibold">{college.placementStats?.placementRate}% placed</span>
              </div>
            </div>
          </div>

          <Link 
            to={`/college/${college._id}`}
            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 mt-5 font-semibold text-white transition-all duration-300 rounded-xl bg-[#152238] hover:bg-[#0f172a]"
          >
            View Details
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </article>
    </Tilt>
  );
}

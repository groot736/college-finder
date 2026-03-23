import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    name: 'Rahul Sharma',
    text: 'CollegeFinder helped me get admission in my dream college! The career test was spot on.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Priya Mehta',
    text: 'I was confused about which course to choose. The recommendations were very helpful.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Amit Kumar',
    text: 'The admission help team guided me through the entire process. Highly recommended!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    name: 'Neha Singh',
    text: 'Found the perfect college within my budget. Thank you CollegeFinder!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Student Success Stories</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Thousands of students have found their perfect colleges with us.
        </p>
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="glass-card p-6 rounded-2xl hover:scale-105 transition duration-300 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-blue-400" />
                  <div>
                    <h4 className="font-bold text-lg text-white">{t.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
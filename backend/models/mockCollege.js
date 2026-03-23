const colleges = new Map();

const sampleColleges = [
  // GOVERNMENT COLLEGES - IITs, NITs, Central Universities etc.
  {
    _id: '1',
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    type: 'government',
    fees: 230000,
    courses: ['B.Tech CSE', 'B.Tech EE', 'MBA', 'M.Tech', 'PhD'],
    placementStats: { averagePackage: 23.5, highestPackage: 4.0, placementRate: 98 },
    rating: 9.8,
    description: 'India\'s top engineering institute, world-class research and placements',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
  },
  {
    _id: '2',
    name: 'IIT Delhi',
    location: 'Delhi',
    type: 'government',
    fees: 235000,
    courses: ['B.Tech CSE', 'B.Tech ME', 'M.Tech', 'MBA'],
    placementStats: { averagePackage: 21.0, highestPackage: 2.1, placementRate: 97 },
    rating: 9.7,
    description: 'Premier technical institute with excellent industry connections',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
  },
  {
    _id: '3',
    name: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    type: 'government',
    fees: 225000,
    courses: ['B.Tech CSE', 'B.Tech Civil', 'MS', 'PhD'],
    placementStats: { averagePackage: 22.0, highestPackage: 1.3, placementRate: 96 },
    rating: 9.6,
    description: 'Oldest IIT, strong in research and entrepreneurship',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
  },
  {
    _id: '4',
    name: 'IIT Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    type: 'government',
    fees: 225000,
    courses: ['B.Tech CSE', 'B.Tech Aero', 'M.Des', 'PhD'],
    placementStats: { averagePackage: 20.5, highestPackage: 1.9, placementRate: 95 },
    rating: 9.5,
    description: 'Renowned for aerospace, design and computer science',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
  },
  {
    _id: '5',
    name: 'IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    type: 'government',
    fees: 225000,
    courses: ['B.Tech CSE', 'B.Arch', 'LLB', 'MCP'],
    placementStats: { averagePackage: 19.5, highestPackage: 2.0, placementRate: 94 },
    rating: 9.4,
    description: 'Largest IIT campus, diverse programs including law',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    _id: '6',
    name: 'IIT Roorkee',
    location: 'Roorkee, Uttarakhand',
    type: 'government',
    fees: 225000,
    courses: ['B.Tech CSE', 'B.Tech EE', 'MBA', 'M.Tech'],
    placementStats: { averagePackage: 18.0, highestPackage: 1.5, placementRate: 92 },
    rating: 9.2,
    description: 'India\'s oldest technical institute',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400'
  },
  {
    _id: '7',
    name: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'government',
    fees: 140000,
    courses: ['B.Tech CSE', 'B.Tech ECE', 'M.Tech', 'MBA'],
    placementStats: { averagePackage: 12.5, highestPackage: 1.2, placementRate: 95 },
    rating: 9.0,
    description: 'Top NIT with excellent placements',
    image: 'https://images.unsplash.com/photo-1576091160399-1c6b6e9e9f2f?w=400'
  },
  {
    _id: '8',
    name: 'NIT Surathkal',
    location: 'Mangalore, Karnataka',
    type: 'government',
    fees: 145000,
    courses: ['B.Tech IT', 'B.Tech ME', 'M.Tech'],
    placementStats: { averagePackage: 14.0, highestPackage: 0.88, placementRate: 93 },
    rating: 8.9,
    description: 'Beautiful campus, strong IT placements',
    image: 'https://images.unsplash.com/photo-1516321310764-9c1a6e1e0229?w=400'
  },
  {
    _id: '9',
    name: 'JNU Delhi',
    location: 'Delhi',
    type: 'government',
    fees: 5000,
    courses: ['BA Hons', 'MA Political Science', 'M.Phil', 'PhD'],
    placementStats: { averagePackage: 8.0, highestPackage: 0.25, placementRate: 80 },
    rating: 9.2,
    description: 'Top humanities and social sciences university',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    _id: '10',
    name: 'AIIMS Delhi',
    location: 'Delhi',
    type: 'government',
    fees: 1500,
    courses: ['MBBS', 'MD', 'MS', 'Nursing'],
    placementStats: { averagePackage: 15.0, highestPackage: 1.0, placementRate: 100 },
    rating: 9.8,
    description: 'India\'s premier medical institute',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
  },
  // More government colleges...
  {
    _id: '11',
    name: 'IIT Guwahati',
    location: 'Guwahati, Assam',
    type: 'government',
    fees: 225000,
    courses: ['B.Tech CSE', 'B.Tech Biotech', 'M.Tech'],
    rating: 9.1,
    description: 'Northeast\'s top engineering institute',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
  },
  {
    _id: '12',
    name: 'IISc Bangalore',
    location: 'Bangalore, Karnataka',
    type: 'government',
    fees: 30000,
    courses: ['M.Tech', 'PhD', 'BS Research'],
    rating: 9.9,
    description: 'India\'s top research institution',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
  },
  {
    _id: '13',
    name: 'Delhi University',
    location: 'Delhi',
    type: 'government',
    fees: 20000,
    courses: ['BA', 'B.Com', 'LLB', 'MA'],
    rating: 8.8,
    description: 'Largest university in India',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
  },
  {
    _id: '14',
    name: 'BHU Varanasi',
    location: 'Varanasi, Uttar Pradesh',
    type: 'government',
    fees: 15000,
    courses: ['B.Tech', 'MBBS', 'BA', 'PhD'],
    rating: 8.7,
    description: 'Oldest residential university in Asia',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
  },
  {
    _id: '15',
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    type: 'government',
    fees: 10000,
    courses: ['B.Tech CSE', 'B.E EE', 'MA'],
    rating: 8.9,
    description: 'Top state university in eastern India',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    _id: '16',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    type: 'private',
    fees: 500000,
    courses: ['B.E CSE', 'M.E', 'MBA', 'PhD'],
    placementStats: { averagePackage: 30.0, highestPackage: 1.3, placementRate: 98 },
    rating: 9.3,
    description: 'Deemed university with practice school system',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400'
  },
  // PRIVATE COLLEGES
  {
    _id: '17',
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    type: 'private',
    fees: 200000,
    courses: ['B.Tech CSE', 'B.Tech ECE', 'M.Tech'],
    placementStats: { averagePackage: 8.0, highestPackage: 0.88, placementRate: 90 },
    rating: 8.4,
    description: 'Large private engineering university',
    image: 'https://images.unsplash.com/photo-1576091160399-1c6b6e9e9f2f?w=400'
  },
  {
    _id: '18',
    name: 'SRM Chennai',
    location: 'Chennai, Tamil Nadu',
    type: 'private',
    fees: 250000,
    courses: ['B.Tech AI', 'B.Arch', 'MBA'],
    placementStats: { averagePackage: 7.5, highestPackage: 0.52, placementRate: 88 },
    rating: 8.2,
    description: 'Multi-disciplinary private university',
    image: 'https://images.unsplash.com/photo-1516321310764-9c1a6e1e0229?w=400'
  },
  {
    _id: '19',
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    type: 'private',
    fees: 320000,
    courses: ['B.Tech CSE', 'B.Tech ME', 'M.Tech'],
    placementStats: { averagePackage: 9.5, highestPackage: 0.57, placementRate: 92 },
    rating: 8.6,
    description: 'Top private engineering college',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    _id: '20',
    name: 'Amity Noida',
    location: 'Noida, Uttar Pradesh',
    type: 'private',
    fees: 300000,
    courses: ['B.Tech', 'BBA', 'MBA', 'Law'],
    placementStats: { averagePackage: 6.0, highestPackage: 0.57, placementRate: 85 },
    rating: 8.0,
    description: 'Large private university chain',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
  },
  {
    _id: '21',
    name: 'Thapar Institute',
    location: 'Patiala, Punjab',
    type: 'private',
    fees: 220000,
    courses: ['B.E CSE', 'ME', 'MBA'],
    placementStats: { averagePackage: 11.0, highestPackage: 0.55, placementRate: 94 },
    rating: 8.5,
    description: 'Heritage private engineering institute',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
  },
  {
    _id: '22',
    name: 'LPU Jalandhar',
    location: 'Jalandhar, Punjab',
    type: 'private',
    fees: 250000,
    courses: ['B.Tech', 'B.Com', 'BBA', 'PhD'],
    placementStats: { averagePackage: 7.0, highestPackage: 0.3, placementRate: 80 },
    rating: 7.8,
    description: 'Largest private university by enrollment',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
  },
  // Add more to reach ~100 total...
  // North India Govt
  {
    _id: '23',
    name: 'IIT Delhi',
    location: 'Delhi NCR',
    type: 'government',
    fees: 235000,
    courses: ['B.Tech', 'M.Tech', 'MS'],
    rating: 9.7,
    description: 'Technology leadership institute',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
  },
  {
    _id: '24',
    name: 'NIT Kurukshetra',
    location: 'Kurukshetra, Haryana',
    type: 'government',
    fees: 145000,
    courses: ['B.Tech CSE', 'M.Tech'],
    rating: 8.3,
    description: 'Strong engineering programs',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400'
  },
  // South India Private
  {
    _id: '25',
    name: 'PES University',
    location: 'Bangalore, Karnataka',
    type: 'private',
    fees: 400000,
    courses: ['B.Tech CSE', 'MBA'],
    rating: 8.1,
    description: 'Tech-focused private university',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    _id: '26',
    name: 'RV College of Engineering',
    location: 'Bangalore, Karnataka',
    type: 'private',
    fees: 300000,
    courses: ['B.E CSE', 'M.Tech'],
    rating: 8.4,
    description: 'Top private engineering college in Karnataka',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400'
  },
  // Expand similarly for West, East, Central India govt/private colleges
  // Total ~100 colleges covering all regions: IIT/NIT/IIIT (govt), VIT/SRM/LPU (private), state universities, medical/pharma etc.
];

// Seed sample data
sampleColleges.forEach(college => colleges.set(college._id, college));

const MockCollege = {
  find: async (filter) => Array.from(colleges.values()).filter(c => {
    if (filter.fees) return c.fees <= filter.fees.$lte;
    if (filter.location) return c.location.toLowerCase().includes(filter.location.toLowerCase());
    if (filter.courses) return filter.courses.$in.some(course => c.courses.some(crs => crs.toLowerCase().includes(course)));
    if (filter.type) return c.type === filter.type;
    return true;
  }),
  findById: async (id) => colleges.get(id) || null,
  create: async (data) => {
    const id = Date.now().toString();
    const college = { _id: id, ...data };
    colleges.set(id, college);
    return college;
  },
  findByIdAndUpdate: async (id, data) => {
    const college = colleges.get(id);
    if (college) {
      Object.assign(college, data);
      colleges.set(id, college);
      return college;
    }
    return null;
  },
  findByIdAndDelete: async (id) => {
    colleges.delete(id);
    return { message: 'College deleted' };
  }
};

module.exports = MockCollege;

const mongoose = require('mongoose');
const College = require('./models/College');
require('dotenv').config();

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    type: "government",
    fees: 220000,
    courses: ["Computer Science", "Electrical", "Mechanical"],
    placementStats: { averagePackage: 22, highestPackage: 55, placementRate: 95 },
    facilities: ["Library", "Hostel", "Sports Complex", "Lab"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.8,
    description: "Indian Institute of Technology Bombay is one of the premier engineering institutes in India."
  },
  {
    name: "Delhi University",
    location: "Delhi",
    type: "private",
    fees: 45000,
    courses: ["B.Com", "BA Economics", "B.Sc Computer Science"],
    placementStats: { averagePackage: 8, highestPackage: 20, placementRate: 70 },
    facilities: ["Library", "Hostel", "Cafeteria"],
    images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600"],
    rating: 4.2,
    description: "University of Delhi is a premier university in India known for its undergraduate programs."
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "private",
    fees: 450000,
    courses: ["Computer Science", "Electronics", "Mechanical"],
    placementStats: { averagePackage: 18, highestPackage: 45, placementRate: 92 },
    facilities: ["Library", "Hostel", "Sports", "WiFi Campus"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.7,
    description: "Birla Institute of Technology and Science, Pilani is a deemed university with high placement records."
  },
  {
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    type: "private",
    fees: 198000,
    courses: ["Computer Science", "IT", "Electronics"],
    placementStats: { averagePackage: 12, highestPackage: 39, placementRate: 90 },
    facilities: ["Library", "Hostel", "Sports", "Lab"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.3,
    description: "VIT is known for its engineering programs and excellent placement record."
  },
  {
    name: "Christ University",
    location: "Bangalore, Karnataka",
    type: "private",
    fees: 85000,
    courses: ["BBA", "B.Com", "BA Psychology"],
    placementStats: { averagePackage: 6, highestPackage: 15, placementRate: 75 },
    facilities: ["Library", "Hostel", "Cafeteria", "Sports"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.4,
    description: "Christ University is a premier institution for commerce and arts streams."
  },
  {
    name: "SRM Institute",
    location: "Chennai, Tamil Nadu",
    type: "private",
    fees: 250000,
    courses: ["Computer Science", "Electronics", "Mechanical"],
    placementStats: { averagePackage: 8, highestPackage: 30, placementRate: 85 },
    facilities: ["Library", "Hostel", "Sports", "Lab"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.1,
    description: "SRM is a multi-disciplinary university with strong industry connections."
  },
  {
    name: "Manipal Institute",
    location: "Manipal, Karnataka",
    type: "private",
    fees: 380000,
    courses: ["Computer Science", "Electronics", "Biotech"],
    placementStats: { averagePackage: 14, highestPackage: 42, placementRate: 88 },
    facilities: ["Library", "Hostel", "Sports", "Beach nearby"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.5,
    description: "Manipal Academy of Higher Education is known for its quality education and campus life."
  },
  {
    name: "LPU Jalandhar",
    location: "Jalandhar, Punjab",
    type: "private",
    fees: 160000,
    courses: ["Computer Science", "MBA", "B.Tech"],
    placementStats: { averagePackage: 6, highestPackage: 28, placementRate: 80 },
    facilities: ["Library", "Hostel", "Sports", "Lab"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.0,
    description: "Lovely Professional University is one of the largest universities in India."
  },
  {
    name: "Amity University",
    location: "Noida, UP",
    type: "private",
    fees: 350000,
    courses: ["Computer Science", "Law", "Business"],
    placementStats: { averagePackage: 7, highestPackage: 25, placementRate: 78 },
    facilities: ["Library", "Hostel", "Sports", "Lab"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.2,
    description: "Amity is a private university with multiple campuses across India."
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    type: "government",
    fees: 24000,
    courses: ["Computer Science", "Electrical", "Mechanical"],
    placementStats: { averagePackage: 14, highestPackage: 38, placementRate: 85 },
    facilities: ["Library", "Hostel", "Sports"],
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"],
    rating: 4.6,
    description: "Jadavpur University is a state university known for its engineering and arts programs."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 Seed DB connected');
    
    await College.deleteMany({});
    const inserted = await College.insertMany(colleges);
    console.log(`✅ ${inserted.length} colleges added!`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();


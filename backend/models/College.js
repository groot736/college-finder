const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  type: { type: String, enum: ['government', 'private'], required: true },
  fees: Number,
  courses: [String],
  placementStats: {
    averagePackage: Number,
    highestPackage: Number,
    placementRate: Number
  },
  facilities: [String],
  images: [String],
  virtualTourUrl: String,
  rating: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
}, {});

// Indexes for fast queries
collegeSchema.index({ name: 'text', description: 'text' });
collegeSchema.index({ location: 1, type: 1 });
collegeSchema.index({ rating: -1 });
collegeSchema.index({ fees: 1 });
collegeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('College', collegeSchema);
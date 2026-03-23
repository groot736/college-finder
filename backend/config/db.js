const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️  MONGO_URI not set in .env - Skipping DB connection');
    return { error: 'MONGO_URI missing' };
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: true,
      bufferTimeoutMS: 10000
    });
    console.log('✅ MongoDB connected successfully');
    return { connected: true };
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.code === 'ENOTFOUND') {
      console.error('💡 Check your MONGO_URI - DNS resolution failed');
    } else if (err.code === 'ETIMEDOUT') {
      console.error('💡 Connection timeout - Check network/MongoDB Atlas IP whitelist');
    }
    return { error: err.message };
  }
};

module.exports = connectDB;

const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');
const testRoutes = require('./routes/test');
const requestRoutes = require('./routes/requests');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const connectDB = require('./config/db');

// Global error handler first
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// Health check (no DB needed)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server OK', timestamp: new Date().toISOString() });
});

let dbStatus = { connected: false };

const PORT = process.env.PORT || 5000;

// Routes (DB ops will wait internal)
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/test', testRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Init DB async (non-blocking)
const initDB = async () => {
  try {
    const dbResult = await connectDB();
    dbStatus.connected = true;
    console.log('✅ MongoDB connected');

    if (dbResult?.connected && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await User.create({
          name: process.env.ADMIN_NAME || 'Platform Admin',
          email: process.env.ADMIN_EMAIL,
          password: hashedPassword,
          role: 'admin',
        });
        console.log(`✅ Admin account created: ${process.env.ADMIN_EMAIL}`);
      } else if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log(`✅ Existing user promoted to admin: ${process.env.ADMIN_EMAIL}`);
      }
    } else {
      console.log('ℹ️  Admin bootstrap skipped (set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env)');
    }
  } catch (err) {
    console.error('MongoDB error:', err.message);
    dbStatus.error = err.message;
  }
};

initDB();

process.on('SIGINT', () => {
  server.close(() => console.log('Server closed'));
});

console.log(`✅ Ready! http://localhost:${PORT}`);
console.log('DB initializing...');

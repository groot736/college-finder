const mongoose = require('mongoose');
const College = require('./models/College');
require('dotenv').config({ path: __dirname + '/.env' });
require('fs');

async function seedAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const govtData = require('./data/govt-colleges.json');
    const privateData = require('./data/private-colleges.json');
    
    // Clear existing
    await College.deleteMany({});
    
    // Add type to data
    const allColleges = [...govtData.map(c => ({...c, type: 'government'})), ...privateData.map(c => ({...c, type: 'private'}))];
    
    const inserted = await College.insertMany(allColleges);
    console.log(`✅ ${inserted.length} colleges seeded! (Govt: ${govtData.length}, Private: ${privateData.length})`);
    
    await mongoose.connection.close();
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    process.exit(0);
  }
}

seedAll();

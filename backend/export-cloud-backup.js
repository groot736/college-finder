require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

async function run() {
  if (!uri) {
    throw new Error('MONGO_URI missing in backend/.env');
  }

  await mongoose.connect(uri);

  const collections = await mongoose.connection.db.listCollections({}, { nameOnly: true }).toArray();
  const names = collections.map((c) => c.name).filter((name) => !name.startsWith('system.'));

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'backups', timestamp);
  fs.mkdirSync(backupDir, { recursive: true });

  for (const name of names) {
    const docs = await mongoose.connection.db.collection(name).find({}).toArray();
    const filePath = path.join(backupDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));
    console.log(`Exported ${name}: ${docs.length} documents`);
  }

  console.log(`Backup saved at: ${backupDir}`);
  await mongoose.connection.close();
}

run()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error('Backup failed:', err.message);
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
    }
    process.exit(1);
  });

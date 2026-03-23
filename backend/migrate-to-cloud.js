require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');

const SOURCE_URI = process.env.SOURCE_MONGO_URI || process.env.MONGO_URI;
const TARGET_URI = process.env.TARGET_MONGO_URI;
const CLEAR_TARGET = (process.env.CLEAR_TARGET_BEFORE_MIGRATE || 'true').toLowerCase() === 'true';

const EXCLUDED_COLLECTIONS = new Set(['system.indexes', 'system.profile']);

async function migrateCollection(sourceDb, targetDb, name) {
  const sourceCollection = sourceDb.collection(name);
  const targetCollection = targetDb.collection(name);

  const docs = await sourceCollection.find({}).toArray();

  if (CLEAR_TARGET) {
    await targetCollection.deleteMany({});
  }

  if (docs.length) {
    await targetCollection.insertMany(docs, { ordered: false });
  }

  console.log(`Migrated ${name}: ${docs.length} documents`);
}

async function run() {
  if (!SOURCE_URI) {
    throw new Error('SOURCE_MONGO_URI or MONGO_URI is required in backend/.env');
  }
  if (!TARGET_URI) {
    throw new Error('TARGET_MONGO_URI is required in backend/.env');
  }

  const sourceConn = await mongoose.createConnection(SOURCE_URI).asPromise();
  const targetConn = await mongoose.createConnection(TARGET_URI).asPromise();

  try {
    const collections = await sourceConn.db.listCollections({}, { nameOnly: true }).toArray();
    const names = collections
      .map((item) => item.name)
      .filter((name) => !EXCLUDED_COLLECTIONS.has(name));

    console.log(`Found ${names.length} collections in source database`);

    for (const name of names) {
      await migrateCollection(sourceConn.db, targetConn.db, name);
    }

    console.log('Migration completed successfully');
    console.log('Set MONGO_URI in backend/.env to TARGET_MONGO_URI value for permanent cloud usage');
  } finally {
    await sourceConn.close();
    await targetConn.close();
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err.message);
    process.exit(1);
  });

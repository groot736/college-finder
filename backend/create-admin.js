require('dotenv').config({ path: __dirname + '/.env' });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

const connect = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI missing in backend/.env');
  }
  await mongoose.connect(process.env.MONGO_URI);
};

const getArg = (name) => {
  const prefix = `--${name}=`;
  const raw = process.argv.find((arg) => arg.startsWith(prefix));
  return raw ? raw.slice(prefix.length) : '';
};

async function run() {
  const name = getArg('name') || process.env.ADMIN_NAME || 'Platform Admin';
  const email = getArg('email') || process.env.ADMIN_EMAIL;
  const password = getArg('password') || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Provide admin credentials using backend/.env (ADMIN_EMAIL, ADMIN_PASSWORD) or CLI args (--email=, --password=)');
  }

  await connect();

  const existing = await User.findOne({ email });
  const hashed = await bcrypt.hash(password, 10);

  if (!existing) {
    await User.create({ name, email, password: hashed, role: 'admin' });
    console.log(`Admin created: ${email}`);
  } else {
    existing.name = name;
    existing.password = hashed;
    existing.role = 'admin';
    await existing.save();
    console.log(`Admin updated/promoted: ${email}`);
  }

  await mongoose.connection.close();
}

run()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error('Failed to create admin:', err.message);
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
    }
    process.exit(1);
  });

import mongoose from 'mongoose';

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.info('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.info('MongoDB disconnected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default { connectDB, disconnectDB };
